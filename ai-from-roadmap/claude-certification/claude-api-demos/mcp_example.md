# Creating an MCP Server in TypeScript with @anthropic-ai/sdk

## How they relate

- **`@anthropic-ai/sdk`** — calls the Messages API. It can *consume* MCP tools two ways:
  - **MCP connector** (server-side): pass `mcp_servers` + an `mcp_toolset` tool on `client.beta.messages.create()` and Anthropic connects to your remote MCP server directly — no local client code needed.
  - **MCP client helpers** (`anthropic.lib.tools.mcp` in Python, or manual conversion in TS): convert an MCP server's tools into a format the SDK's tool runner can call.
- **`@modelcontextprotocol/sdk`** — this is what you use to *build* an MCP server (or client) that exposes tools/resources/prompts over the Model Context Protocol.

So "creating an MCP server in TypeScript" is a `@modelcontextprotocol/sdk` task; `@anthropic-ai/sdk` is how Claude (or your app) later talks to it.

## Setting up an MCP server (TypeScript)

```bash
npm install @modelcontextprotocol/sdk zod
```

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "weather-server",
  version: "1.0.0",
});

server.registerTool(
  "get_weather",
  {
    title: "Get Weather",
    description: "Get current weather for a location",
    inputSchema: { location: z.string().describe("City and state") },
  },
  async ({ location }) => ({
    content: [{ type: "text", text: `The weather in ${location} is sunny, 72°F` }],
  })
);

const transport = new StdioServerTransport();
await server.connect(transport);
```

Run it as a subprocess (stdio transport, most common for local tools) or use `StreamableHTTPServerTransport` if you want it reachable over HTTP/SSE for remote clients (e.g. the MCP connector above).

## Connecting Claude to it

- **Local server (stdio)**: use the Python SDK's `anthropic.lib.tools.mcp` helpers (`async_mcp_tool`) with the official `mcp` Python client to bridge tools into `client.beta.messages.tool_runner()`. TypeScript doesn't have an equivalent bridge documented yet — you'd manually list the server's tools (`client.listTools()`) and map them to `@anthropic-ai/sdk`'s tool schema, then dispatch `tool_use` calls via `client.callTool()`.
- **Remote server (HTTP)**: simplest path — no client-side MCP code at all. Just declare it on the request:

```typescript
const response = await client.beta.messages.create({
  model: "claude-opus-5",
  max_tokens: 1024,
  betas: ["mcp-client-2025-11-20"],
  mcp_servers: [{ type: "url", url: "https://your-server.example.com/mcp", name: "weather" }],
  tools: [{ type: "mcp_toolset", mcp_server_name: "weather" }],
  messages: [{ role: "user", content: "What's the weather in Paris?" }],
});
```

## Registering tools/resources/prompts: Python decorators vs. TypeScript

The Python MCP SDK's `FastMCP` uses decorators (`@mcp.tool()`, `@mcp.resource()`, `@mcp.prompt()`) to declaratively register functions as MCP primitives, auto-generating the schema from type hints and docstrings. TypeScript's `@modelcontextprotocol/sdk` has no decorators — it uses explicit registration methods on `McpServer` that do the same job, with an explicit config object instead of inferred type hints/docstrings.

| Python (`FastMCP`) | TypeScript (`McpServer`) | Purpose |
|---|---|---|
| `@mcp.tool()` | `server.registerTool(...)` | Register a callable action the model can invoke |
| `@mcp.resource(uri)` | `server.registerResource(...)` | Register a readable data source (no model "call" needed) |
| `@mcp.prompt()` | `server.registerPrompt(...)` | Register a reusable prompt template |

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({ name: "weather-server", version: "1.0.0" });

// Equivalent of @mcp.tool()
server.registerTool(
  "get_weather",
  {
    title: "Get Weather",
    description: "Get current weather for a location",
    inputSchema: { location: z.string().describe("City and state, e.g. San Francisco, CA") },
  },
  async ({ location }) => ({
    content: [{ type: "text", text: `The weather in ${location} is sunny, 72°F` }],
  })
);

// Equivalent of @mcp.resource("config://settings")
server.registerResource(
  "settings",
  "config://settings",
  { title: "Settings", description: "Expose read-only data the client can fetch" },
  async (uri) => ({
    contents: [{ uri: uri.href, text: "some config data" }],
  })
);

// Equivalent of @mcp.prompt()
server.registerPrompt(
  "review_prompt",
  {
    title: "Review Prompt",
    description: "Reusable prompt template clients can request",
    argsSchema: { code: z.string() },
  },
  ({ code }) => ({
    messages: [
      { role: "user", content: { type: "text", text: `Please review this code:\n\n${code}` } },
    ],
  })
);

const transport = new StdioServerTransport();
await server.connect(transport);
```

Key differences from Python:
- **No inference from type hints/docstrings** — you explicitly pass `inputSchema` (Zod), `title`, and `description` as a config object; TS can't introspect a docstring the way Python's decorator does.
- Zod schemas replace Python type hints for input validation.
- Same three primitives (tool / resource / prompt), same underlying MCP protocol — just registration calls instead of decorators, consistent with how JS/TS generally favors explicit config objects over Python's decorator sugar.

## Calling a local/custom MCP server (client side)

To call a local/custom MCP server, use the **client** side of `@modelcontextprotocol/sdk` — `Client` + a transport matching how the server runs (stdio for a local subprocess, HTTP for a networked one).

### 1. Connecting to a local server (stdio — most common)

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: "node",
  args: ["./weather-server.js"], // path to your compiled server entrypoint
});

const client = new Client({ name: "my-client", version: "1.0.0" });
await client.connect(transport);

// Discover what the server offers
const { tools } = await client.listTools();
console.log(tools); // [{ name: "get_weather", description: "...", inputSchema: {...} }]

// Call a tool directly
const result = await client.callTool({
  name: "get_weather",
  arguments: { location: "Paris" },
});
console.log(result.content); // [{ type: "text", text: "The weather in Paris is sunny, 72°F" }]

await client.close();
```

Same pattern for resources and prompts:

```typescript
const { resources } = await client.listResources();
const resourceData = await client.readResource({ uri: "config://settings" });

const { prompts } = await client.listPrompts();
const promptResult = await client.getPrompt({ name: "review_prompt", arguments: { code: "..." } });
```

### 2. Connecting to a remote/HTTP server

If the server uses `StreamableHTTPServerTransport`, the client uses the matching HTTP transport instead:

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const transport = new StreamableHTTPClientTransport(
  new URL("https://your-server.example.com/mcp")
);

const client = new Client({ name: "my-client", version: "1.0.0" });
await client.connect(transport);

const result = await client.callTool({ name: "get_weather", arguments: { location: "Paris" } });
```

### 3. Bridging into Claude's tool-calling loop

The examples above just call MCP tools directly — they don't involve Claude yet. To let **Claude** decide when to call them, there are two options:

- **Local server → manual bridge**: list the server's tools via `client.listTools()`, map each into `@anthropic-ai/sdk`'s tool schema, run your own agentic loop, and when Claude emits a `tool_use` block, dispatch it via `client.callTool()` and send the result back as a `tool_result`.
- **Remote server → no bridge needed**: use the `mcp_servers` + `mcp_toolset` request parameters shown earlier — Anthropic connects to the server directly server-side, so there's no local MCP client code to write at all.

## Debugging with MCP Inspector

`@modelcontextprotocol/inspector` is a standalone visual debugging tool for MCP servers — separate from `@modelcontextprotocol/sdk`, but built to test servers made with it. It launches a local web UI that connects to your server and lets you:

- Browse and invoke registered **tools** with a form generated from your Zod/JSON schema
- Browse **resources** and read their contents
- Browse and fill in **prompts**
- Inspect the raw JSON-RPC messages going back and forth
- Test both stdio and HTTP/SSE transports

No install needed — run directly against your server:

```bash
npx @modelcontextprotocol/inspector node ./weather-server.js
```

This spawns your server over stdio and opens a browser UI (default `http://localhost:6274`) where you can click `get_weather`, fill in `location`, hit call, and see the response — without writing any client code.

For an HTTP server, point it at the URL instead:

```bash
npx @modelcontextprotocol/inspector
# then in the UI, choose "Streamable HTTP" and enter your server's URL
```

Use this to sanity-check a server (confirm `registerTool` actually exposes what you expect) before wiring up a real client or the Claude MCP connector.

## Where mcp.json / claude.json config files fit in

These are a different layer entirely — **host/client configuration files**, not something `@modelcontextprotocol/sdk` reads or writes itself. They tell a *host application* (Claude Desktop, Claude Code, VS Code, Cursor) which MCP servers to launch/connect to, so you don't have to write any `Client`/transport code yourself — the host app does that internally using the SDK.

```
Your custom server (built with @modelcontextprotocol/sdk)
        ↑ launched/connected via
Config file (mcp.json / .mcp.json / claude_desktop_config.json)
        ↑ read by
Host application (Claude Desktop, Claude Code, VS Code, Cursor)
        ↑ acts as the MCP client, using the SDK's Client class internally
```

This is a **third way** to connect Claude to your server, alongside the two covered earlier:

| Approach | Who writes client code | Where |
|---|---|---|
| Manual bridge (`Client` + `StdioClientTransport`/HTTP) | You | Your own app |
| Remote MCP connector (`mcp_servers` on the API request) | Nobody — Anthropic connects server-side | Direct API call |
| **Host config file** (`.mcp.json`, `claude.json`, etc.) | Nobody — the host app connects | Claude Desktop / Claude Code / IDE |

### The specific files

- **`.mcp.json`** (project root) — used by **Claude Code** to register project-scoped MCP servers. Checked into the repo, shared with your team.
- **`~/.claude.json`** (home directory) — Claude Code's user-level config; also holds an `mcpServers` section for servers you want available everywhere, not just one project. Usually edited via `claude mcp add` rather than by hand.
- **`claude_desktop_config.json`** — same idea, for the **Claude Desktop app** (different filename, same `mcpServers` shape).
- **`mcp.json`** — the generic convention other editors (VS Code, Cursor, Windsurf) use for the same purpose.

All share roughly the same shape — a map of server name → how to launch/reach it:

```json
{
  "mcpServers": {
    "weather-server": {
      "command": "node",
      "args": ["./weather-server.js"]
    },
    "remote-weather": {
      "url": "https://your-server.example.com/mcp"
    }
  }
}
```

Add one and restart the host app — it spawns/connects to your server automatically and exposes its tools to Claude, with no `Client`/transport code needed on your side at all.
