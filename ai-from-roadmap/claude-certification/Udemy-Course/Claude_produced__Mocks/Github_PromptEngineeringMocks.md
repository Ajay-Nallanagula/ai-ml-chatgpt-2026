# Claude Certified Architect. Foundations: Practice Exam (Mock Set 2)

> 60 questions across 5 domains | Passing score: 720 (scaled 100-1,000)

---

## Exam Format

- **Format:** Multiple choice, 4 options per question (1 correct, 3 distractors)
- **Unanswered questions:** Scored as incorrect. No penalty for guessing.
- **Result:** Pass/fail designation
- **Scoring:** Scaled score 100-1,000. Minimum passing score: **720**

Questions are scenario-based, grounded in realistic use cases across agentic architecture, tool/MCP design, Claude Code workflows, prompt engineering, and reliability engineering. Candidates must demonstrate practical judgment about architecture, configuration, and tradeoffs in production deployments. Answers are not shown inline — see the **Answer Key & Rationale** section at the end of this document.

---

## Content Domains & Weightings

| Domain | Topic                                  | Weight | Questions |
| ------ | --------------------------------------- | ------ | --------- |
| 1      | Agentic Architecture & Orchestration    | 27%    | Q1-Q16    |
| 2      | Tool Design & MCP Integration           | 18%    | Q17-Q27   |
| 3      | Claude Code Configuration & Workflows   | 20%    | Q28-Q39   |
| 4      | Prompt Engineering & Structured Output  | 20%    | Q40-Q51   |
| 5      | Context Management & Reliability        | 15%    | Q52-Q60   |

---

## Domain-Task Index

### Domain 1: Agentic Architecture & Orchestration (27%)

| Task | Description                                       | Questions |
| ---- | -------------------------------------------------- | --------- |
| 1.1  | Agentic loops for autonomous task execution        | Q1-Q3     |
| 1.2  | Multi-agent coordinator-subagent patterns          | Q4-Q6     |
| 1.3  | Subagent invocation, context passing, spawning     | Q7-Q8     |
| 1.4  | Multi-step workflows with enforcement and handoff  | Q9-Q10    |
| 1.5  | Agent SDK hooks for tool call interception         | Q11-Q12   |
| 1.6  | Task decomposition strategies                      | Q13-Q14   |
| 1.7  | Session state, resumption, and forking             | Q15-Q16   |

### Domain 2: Tool Design & MCP Integration (18%)

| Task | Description                                          | Questions |
| ---- | ----------------------------------------------------- | --------- |
| 2.1  | Tool interface design with clear descriptions         | Q17-Q19   |
| 2.2  | Structured error responses for MCP tools              | Q20-Q22   |
| 2.3  | Tool distribution across agents and `tool_choice`     | Q23-Q24   |
| 2.4  | MCP server integration into Claude Code               | Q25-Q26   |
| 2.5  | Built-in tools (Read, Write, Edit, Bash, Grep, Glob)   | Q27       |

### Domain 3: Claude Code Configuration & Workflows (20%)

| Task | Description                                            | Questions |
| ---- | -------------------------------------------------------- | --------- |
| 3.1  | CLAUDE.md hierarchy, scoping, modular organization       | Q28-Q29   |
| 3.2  | Custom slash commands and skills                         | Q30-Q31   |
| 3.3  | Path-specific rules for conditional convention loading   | Q32-Q33   |
| 3.4  | Plan mode vs direct execution                             | Q34-Q35   |
| 3.5  | Iterative refinement techniques                           | Q36-Q37   |
| 3.6  | Claude Code in CI/CD pipelines                            | Q38-Q39   |

### Domain 4: Prompt Engineering & Structured Output (20%)

| Task | Description                                                   | Questions |
| ---- | --------------------------------------------------------------- | --------- |
| 4.1  | Explicit criteria for precision and false positive reduction    | Q40-Q41   |
| 4.2  | Few-shot prompting for consistency and quality                  | Q42-Q43   |
| 4.3  | Structured output using tool use and JSON schemas                | Q44-Q45   |
| 4.4  | Validation, retry, and feedback loops                            | Q46-Q47   |
| 4.5  | Batch processing strategies                                      | Q48-Q49   |
| 4.6  | Multi-instance and multi-pass review architectures               | Q50-Q51   |

### Domain 5: Context Management & Reliability (15%)

| Task | Description                                       | Questions |
| ---- | -------------------------------------------------- | --------- |
| 5.1  | Conversation context preservation                  | Q52-Q53   |
| 5.2  | Escalation and ambiguity resolution                | Q54-Q55   |
| 5.3  | Error propagation across multi-agent systems       | Q56       |
| 5.4  | Context management in large codebase exploration   | Q57-Q58   |
| 5.5  | Human review workflows and confidence calibration  | Q59       |
| 5.6  | Information provenance and uncertainty             | Q60       |

---

## Domain 1: Agentic Architecture & Orchestration

### Task 1.1: Design and implement agentic loops for autonomous task execution

**Q1.** A deployment agent's loop treats any assistant response containing the word "deployed" as the signal to stop iterating and report success. Occasionally the agent discusses "the deployed environment" in passing without actually finishing the deployment, and the loop exits prematurely.

What is the correct fix?

- A) Increase the iteration cap so the loop has more chances to reach a genuine termination point.
- B) Replace the text-matching check with an inspection of `stop_reason`, terminating only when it equals `"end_turn"`.
- C) Require the agent to end every completed-deployment message with a specific emoji so text matching becomes unambiguous.
- D) Move the termination check into a `PreToolUse` hook that blocks any tool call containing the word "deployed."

---

**Q2.** An agent that automates database migrations uses tool calls (`run_migration`, `verify_schema`, `rollback`) in a loop. A teammate wants to add a hard cap of 8 tool calls per migration task to control cost, and asks whether this should replace the `stop_reason` check entirely.

- A) Yes — an iteration cap is more reliable than `stop_reason` because it is deterministic regardless of model behavior.
- B) No — the iteration cap should serve only as a safety boundary; `stop_reason: "end_turn"` remains the authoritative signal that the task is actually finished.
- C) No — instead of an iteration cap, add a time-based timeout, since token count better reflects task complexity than call count.
- D) Yes, but only for migrations that touch more than one table.

---

**Q3.** Your incident-response agent's loop appends every tool result into conversation history. To reduce token usage, an engineer proposes storing only a one-line summary of each tool result in history, with full results kept in an external log the agent can query on demand.

Under which condition would this design most likely hurt agent performance?

- A) When tool results are returned faster than the agent can process them.
- B) When the agent must cross-reference several earlier tool outputs together to decide its next diagnostic step, since a one-line summary may omit the specific field values needed for that reasoning.
- C) When the number of tool calls exceeds 5 in a single incident.
- D) When the incident is resolved in under 10 minutes.

---

### Task 1.2: Orchestrate multi-agent systems with coordinator-subagent patterns

**Q4.** A coordinator for a "competitive intelligence" pipeline decomposed the task "analyze competitor pricing strategies" into three subagent assignments: "scrape competitor pricing pages," "compare listed prices," and "summarize price changes." The final report never addresses competitors' promotional discounting or bundling strategies, even though multiple sources discuss them.

What is the most likely root cause?

- A) The subagents used low-quality web search queries that missed promotional content.
- B) The coordinator's task decomposition itself was too narrow, so no subagent was ever assigned to investigate discounting or bundling.
- C) The synthesis agent dropped the promotional findings while compressing the report.
- D) The report generation agent's output format doesn't have a section for promotions.

---

**Q5.** A coordinator always spawns a "sentiment analysis" subagent and a "keyword extraction" subagent for every incoming customer message, even for a one-word message like "thanks." This adds unnecessary latency and cost for trivial interactions.

What is the most direct fix?

- A) Merge the two subagents into a single "message analysis" subagent to cut overhead in half.
- B) Have each subagent decide for itself, upon being invoked, whether the message is worth analyzing, and skip the work if not.
- C) Have the coordinator evaluate message complexity first and dynamically choose which subagents (if any) to invoke, rather than always invoking the full pipeline.
- D) Cache subagent results so repeated trivial messages don't re-trigger analysis.

---

**Q6.** A coordinator delegated "summarize the last five board meeting transcripts" to a document-analysis subagent. The subagent's result only summarizes three of the five transcripts because two files failed to load. The coordinator needs the remaining two summarized.

What is the correct re-delegation approach?

- A) Re-invoke the subagent with all five transcripts again so it has full context to redo the work consistently.
- B) Re-invoke the subagent, specifying only the two transcripts that failed to load, and provide the three existing summaries as context so nothing is duplicated.
- C) Have the coordinator write placeholder summaries for the missing two transcripts based on the topics already found.
- D) Skip the missing two transcripts and note the gap in the final report without further action.

---

### Task 1.3: Configure subagent invocation, context passing, and spawning

**Q7.** You configure a "planner" agent with `allowedTools: ["read_file", "search_docs"]`. In testing, the planner never spawns any of the three specialist subagents you defined, even though its system prompt clearly instructs it to delegate research to them.

What is the most likely cause?

- A) The specialist subagents themselves are missing a `system` prompt, so they refuse invocation.
- B) `"Task"` is not present in the planner's `allowedTools`, so it has no mechanism available to spawn subagents regardless of prompt instructions.
- C) The planner needs to be run in plan mode before it is allowed to delegate to subagents.
- D) Subagent definitions must be registered in `CLAUDE.md` before the `Task` tool can reference them.

---

**Q8.** A "translation" subagent returns translated text but strips out all formatting markers (headers, bullet points) that were present in the source document. When the coordinator passes this to a "formatting" subagent to reassemble the final document, formatting can't be restored because the association between text and structure was lost during translation.

What is the correct fix for the context handoff?

- A) Have the formatting subagent guess at reasonable formatting based on sentence length and content.
- B) Have the translation subagent return structured output that pairs translated segments with their original structural role (heading, bullet, paragraph), and pass this structured data to the formatting subagent.
- C) Skip the formatting subagent entirely and have the coordinator apply a single, generic template to all output.
- D) Run translation and formatting as one combined subagent so no handoff is needed.

---

### Task 1.4: Implement multi-step workflows with enforcement and handoff patterns

**Q9.** A financial approval agent must complete: (1) validate requestor identity via `verify_employee`, (2) check budget availability via `check_budget`, (3) approve the expense via `approve_expense`. Logs show `approve_expense` is occasionally called before `check_budget` completes, resulting in over-budget approvals. The team's fix so far has been adding "Always check budget before approving" to the system prompt, with no measurable improvement.

What should be done instead?

- A) Add a second, stronger prompt reminder immediately before the approval step in the conversation.
- B) Add a programmatic prerequisite that blocks `approve_expense` from executing until `check_budget` has returned a result confirming sufficient funds.
- C) Add few-shot examples of the correct three-step order in the system prompt.
- D) Replace the three separate tools with a single `process_expense` tool and let the model decide internally what order to run the checks in.

---

**Q10.** A customer support agent receives a message containing a refund request, a shipping address change, and a product question — three unrelated asks in one message. The agent currently resolves them one at a time, re-fetching customer context for each, taking several minutes total.

What is the best redesign for efficiency without losing accuracy?

- A) Instruct the agent to handle only the first request per turn and ask the customer to send the others separately.
- B) Decompose the message into independent investigation items and process them in parallel using the customer context already retrieved once, then compose a single combined response.
- C) Process the three items sequentially, but skip re-fetching context if it was already fetched in the same session.
- D) Create a dedicated "multi-request" subagent that specializes in messages with more than one ask.

---

### Task 1.5: Apply Agent SDK hooks for tool call interception and data normalization

**Q11.** Your logistics agent integrates with three carrier APIs that each report shipment status differently: one uses string codes ("IN_TRANSIT"), one uses numeric codes (3), and one uses free text ("On its way to destination"). The agent frequently gives contradictory status updates to customers because it misreads these formats.

What is the best architectural fix?

- A) Add a lengthy system prompt section explaining how to interpret each carrier's status format.
- B) Implement `PostToolUse` hooks that intercept each carrier's raw response and normalize the status into one consistent internal vocabulary before the model reasons about it.
- C) Ask the model to always double-check carrier status by calling the tool twice before responding.
- D) Add a final formatting pass after the agent's response to unify how the status is phrased to the customer.

---

**Q12.** Your agent's policy states that no `delete_record` tool call should ever run against a production database table flagged `protected: true`, but this is currently just a line in the system prompt. An audit finds two occasions in the last month where a protected record was deleted anyway.

What change most reliably prevents this from recurring?

- A) Move the policy language to the very top of the system prompt so it receives more attention.
- B) Add several few-shot examples showing the agent refusing to delete protected records.
- C) Implement a `PreToolUse` hook that inspects every `delete_record` call, checks the target table's `protected` flag against a source of truth, and blocks the call if the flag is set.
- D) Add a confirmation step where the agent asks a rhetorical "are you sure?" before every delete call.

---

### Task 1.6: Design task decomposition strategies for complex workflows

**Q13.** Your team needs a Claude-based system to produce a quarterly compliance report that must always cover four fixed, well-understood sections: data retention, access controls, audit logging, and incident response — each governed by a documented checklist.

Which decomposition strategy fits best?

- A) Dynamic adaptive decomposition, letting the agent discover which sections are relevant to this quarter's data.
- B) Prompt chaining with one focused pass per section, each pass applying that section's specific checklist.
- C) A single pass that covers all four sections at once to preserve cross-section context.
- D) Four fully independent agents with no shared context, merged only in a final formatting step.

---

**Q14.** You are asked to build an agent that investigates why a specific customer's monthly bill is higher than expected. The affected services, root cause, and number of relevant billing line items are all unknown in advance and vary per customer.

Which decomposition approach is most appropriate?

- A) A fixed sequence: always check the base plan first, then add-ons, then usage overages, then taxes, in that exact order.
- B) Dynamic adaptive decomposition, where the agent first surveys the account's line items and then prioritizes investigation into whichever categories show anomalies.
- C) Two independent agents — one reviewing plan details, one reviewing usage logs — that never share findings.
- D) A single exhaustive pass that recomputes the entire bill from raw usage data before looking at anything else.

---

### Task 1.7: Manage session state, resumption, and forking

**Q15.** A developer has spent an afternoon using Claude Code to trace a race condition across a concurrency-heavy service. They must leave for the day and will continue tomorrow; no files will change overnight.

What is the most reliable way to continue productively tomorrow?

- A) Start a brand-new session tomorrow, since long sessions accumulate stale reasoning that should be discarded.
- B) Resume the named session with `--resume <session-name>`, preserving today's accumulated findings for tomorrow's continuation.
- C) Use `fork_session` to branch off a copy of today's session before closing the laptop.
- D) Save the transcript to a text file and paste it back in as the first message of a new session tomorrow.

---

**Q16.** A researcher has an established baseline of findings from analyzing a dataset and wants to try two different statistical modeling approaches on that same baseline, comparing their results side by side without either approach affecting the other's context.

Which session management approach fits best?

- A) Use `--resume` twice in sequence, running one approach, noting the result, then reverting and running the other.
- B) Use `fork_session` to create two independent branches from the current session, exploring one modeling approach in each branch.
- C) Run `/compact` between the two approaches to clear context and start the second approach fresh.
- D) Paste the baseline findings into two brand-new sessions manually.

---

## Domain 2: Tool Design & MCP Integration

### Task 2.1: Design effective tool interfaces with clear descriptions and boundaries

**Q17.** Logs show the agent frequently calls `get_employee_record` when a user asks about payroll, instead of the correct `get_payroll_details` tool. Both tools have one-line descriptions and accept an employee ID in the same format.

What is the most effective first step to fix tool selection?

- A) Add 6-8 few-shot examples to the system prompt showing correct tool choice for payroll questions.
- B) Expand each tool's description with the specific data it returns, example queries it serves, and explicit guidance on when to use it versus the other tool.
- C) Build a keyword-based router that pre-selects the tool before the model sees the request.
- D) Merge both tools into one `get_employee_data` tool with a `category` parameter.

---

**Q18.** A `search_knowledge_base` tool's description says only: "Searches the knowledge base and returns results." The agent frequently passes overly broad single-word queries that return hundreds of low-relevance results, forcing multiple follow-up searches.

What is the most direct fix?

- A) Add a system prompt instruction telling the agent to "search more specifically."
- B) Expand the tool description to specify the expected query format (e.g., multi-word natural-language phrases), give example effective queries, and state the number of results returned per call.
- C) Cap the number of results the tool can return to force more targeted queries.
- D) Add a second tool, `search_knowledge_base_specific`, for narrower searches.

---

**Q19.** Your system has `get_user_profile` ("Gets user profile"), `fetch_account_data` ("Fetches account data"), and `retrieve_member_info` ("Retrieves member information") — three tools querying three genuinely different backends, but the agent frequently calls the wrong one.

What is the most effective fix?

- A) Add a system prompt paragraph listing when to use each of the three tools.
- B) Rename the tools to reflect their actual data sources and rewrite each description to state exactly what data it returns, what system it queries, and when to prefer it over the other two.
- C) Consolidate all three into one tool with a `source` parameter naming the backend.
- D) Call all three tools in parallel on every request and let a post-processing step pick the most relevant result.

---

### Task 2.2: Implement structured error responses for MCP tools

**Q20.** Your `submit_purchase_order` MCP tool returns the same generic error for every failure: `{"error": "Failed"}`. This is triggered by out-of-stock items, invalid vendor IDs, exceeded budget limits, and network timeouts, and the agent handles every case identically by apologizing and stopping.

What error response redesign would most improve recovery?

- A) Return an HTTP status code for each case and let the agent branch on the numeric code.
- B) Return structured metadata with an `errorCategory` (transient/validation/business/permission), an `isRetryable` boolean, and a specific human-readable reason.
- C) Return a full stack trace so the agent has maximum diagnostic detail.
- D) Return a numeric error code mapped to recovery actions documented in the system prompt.

---

**Q21.** A `check_inventory` tool call returns `{"count": 0, "status": "success"}` both when an item genuinely has zero stock and when the inventory service itself is unreachable and defaults to reporting zero. The agent tells customers items are "out of stock" even when the real issue is a service outage.

What change prevents this confusion?

- A) Always return a non-zero placeholder count when the service can't be reached.
- B) Distinguish backend/service failures from genuine zero-stock results, using an `isError` flag for the former so the two conditions are never conflated.
- C) Add a `confidence` score so the agent can guess whether the zero is real.
- D) Retry the inventory check silently up to five times before ever returning a result.

---

**Q22.** Your `apply_discount_code` MCP tool returns `{"isError": true, "message": "Code rejected"}` when a discount code fails business validation (e.g., already used, expired). The agent interprets every `isError: true` response as transient and retries the same code up to three times, each retry logging a separate fraud-flag event downstream.

What is missing from the error response design?

- A) A `retry_after` field telling the agent when it is safe to retry.
- B) An `isRetryable: false` field plus a clear explanation that this is a business-rule rejection, not a transient failure, so the agent stops retrying.
- C) Suppressing `isError` for business rejections and returning them as normal successful responses instead.
- D) Including the discount code's original terms and conditions text in the error response.

---

### Task 2.3: Distribute tools appropriately across agents and configure tool_choice

**Q23.** A "report writer" agent's only job is to format findings that other agents have already gathered into a polished document. It has been given every tool in the system — including tools to query databases and send emails — reasoning that this gives it maximum flexibility if it needs anything.

What problem does this most likely cause?

- A) The report writer will refuse to produce output because it is overwhelmed by tool choices.
- B) Access to tools outside its narrow specialization increases the chance the report writer misuses them — for example, running its own new database queries instead of formatting the findings it was given.
- C) The additional tool schemas will exceed the context window and cause every request to fail.
- D) Extra tools slow down response time because the model reads every tool description before producing any output text.

---

**Q24.** You want to guarantee that a `redact_pii` tool is called on every document before an agent's response is returned to the user — not optionally, and not some other tool instead.

Which `tool_choice` setting achieves this?

- A) `tool_choice: "auto"`
- B) `tool_choice: "any"`
- C) `tool_choice: {"type": "tool", "name": "redact_pii"}`
- D) Removing every other tool from the agent's tool list so `redact_pii` is the only option

---

### Task 2.4: Integrate MCP servers into Claude Code and agent workflows

**Q25.** Your team wants every developer who clones the repo to automatically get a shared internal wiki MCP server configured, without hardcoding the API token used to authenticate, and without requiring each developer to run manual setup.

What is the correct approach?

- A) Commit the MCP server config to `~/.claude.json` with the token filled in for the whole team to share.
- B) Add the server to project-scoped `.mcp.json`, referencing the token via environment variable expansion (e.g., `${WIKI_TOKEN}`), and commit `.mcp.json` to the repository.
- C) Document the setup steps in the project README and let each developer configure it manually.
- D) Store the MCP server configuration inside `CLAUDE.md` under a dedicated `[mcp]` heading.

---

**Q26.** A developer agent connected to an internal analytics MCP server routinely makes 3-4 exploratory tool calls just to figure out which datasets and tables exist before it can answer a simple question, adding noticeable latency to every session.

Which MCP capability most directly reduces this discovery overhead?

- A) Add a `list_all_tools` meta-tool that enumerates every tool name and description.
- B) Expose the available datasets and tables as MCP resources so the agent has visibility into what's available at connection time rather than discovering it through tool calls.
- C) Reduce the number of analytics tools by merging similar ones together.
- D) Cache the results of prior exploratory calls across all sessions indefinitely.

---

### Task 2.5: Select and apply built-in tools (Read, Write, Edit, Bash, Grep, Glob) effectively

**Q27.** A developer productivity agent must find every Python file across a large monorepo that references a deprecated environment variable named `LEGACY_API_KEY`.

Which built-in tool is most appropriate for this content search?

- A) `Bash` running a manually written `find` and `grep` pipeline
- B) `Glob` to enumerate `.py` files, followed by `Read` on each one to check for the string
- C) `Grep` to search directly for the variable name across all Python files
- D) `Read` on the repository root to get a directory listing, then recursive `Read` calls

---

## Domain 3: Claude Code Configuration & Workflows

### Task 3.1: Configure CLAUDE.md files with appropriate hierarchy, scoping, and modular organization

**Q28.** A team lead documents a detailed API design style guide in their personal `~/.claude/CLAUDE.md`. A new hire clones the repository and reports that Claude Code does not follow the style guide at all.

What is the most likely cause?

- A) The new hire needs to manually enable "shared configuration mode" in their settings.
- B) `~/.claude/CLAUDE.md` is user-scoped and never committed to version control, so it never reaches anyone but the team lead.
- C) CLAUDE.md files only take effect if placed inside a `.claude/` folder at the project root.
- D) The project-level CLAUDE.md must explicitly `@import` the user-level file for it to apply.

---

**Q29.** A 500-line root `CLAUDE.md` mixes frontend styling rules, backend API conventions, and database migration guidelines. Developers report Claude sometimes applies backend conventions while editing frontend files.

What is the best fix?

- A) Split the content into `.claude/rules/` files, each scoped to relevant file paths via YAML frontmatter, so only relevant rules load per file being edited.
- B) Add a table of contents at the top of the file so Claude can more easily navigate it.
- C) Tell developers to mention which section applies at the start of every session.
- D) Break the file into topic files and `@import` all of them unconditionally in the root file.

---

### Task 3.2: Create and configure custom slash commands and skills

**Q30.** You want to create a `/release-notes` slash command that every engineer on the team can use immediately after cloning the repo, with no manual setup.

Where should the command file live?

- A) `.claude/commands/` in the project repository
- B) `~/.claude/commands/` in each developer's home directory
- C) Inside `CLAUDE.md` under a `## Commands` heading
- D) A `.claude/commands.yaml` manifest file

---

**Q31.** A `/audit-deps` skill runs many exploratory `Bash` calls and dependency-file reads before producing a final dependency risk report. Developers complain the exploratory output clutters their main conversation.

Which frontmatter setting resolves this?

- A) `allowed-tools: []`, disabling tool use for the skill entirely
- B) `context: fork`, running the skill in an isolated sub-agent context so only the final report returns to the main session
- C) Moving the skill into `.claude/commands/` instead
- D) `argument-hint`, to constrain what arguments the skill accepts

---

### Task 3.3: Apply path-specific rules for conditional convention loading

**Q32.** Your repository has database migration files scattered across many service directories, and you want consistent migration-naming conventions applied automatically regardless of which directory a migration file lives in.

What is the most maintainable approach?

- A) A rule file in `.claude/rules/` with YAML frontmatter specifying a glob pattern that matches migration files by name pattern, regardless of directory.
- B) One root `CLAUDE.md` section with a big list of every migration directory.
- C) A skill describing migration conventions that must be manually invoked each session.
- D) A separate `CLAUDE.md` placed in every directory that happens to contain a migration file.

---

**Q33.** Your `infra/` directory uses Terraform, but you don't want Terraform-specific naming rules to appear in unrelated sessions editing application code.

What is the correct approach?

- A) Place the Terraform rules in the root `CLAUDE.md`, clearly labeled, and trust Claude to apply them only where relevant.
- B) Create a `.claude/rules/terraform.md` file with frontmatter scoping it to `infra/**/*`, containing the Terraform conventions.
- C) Create a `CLAUDE.md` inside `infra/` and rely on Claude to always read every CLAUDE.md in the tree for every session.
- D) Add an `allowed-tools` restriction on all file operations outside `infra/`.

---

### Task 3.4: Determine when to use plan mode vs direct execution

**Q34.** A developer needs to add proper index columns to three database tables to fix a known slow-query problem; the exact indexes and tables are already identified from a query profiler.

Should they use plan mode or direct execution?

- A) Plan mode, since any schema change carries risk and deserves exploration first.
- B) Direct execution, since the fix is well-scoped with a known target and no architectural decisions remain to be made.
- C) Plan mode, so Claude can independently re-derive which indexes are needed.
- D) Direct execution first, then a plan-mode pass afterward to double-check.

---

**Q35.** A team is deciding whether to migrate a monolith's authentication logic into a separate service, affecting session handling, token issuance, and dozens of call sites, with no agreed design yet.

Which approach is appropriate?

- A) Direct execution with clear, comprehensive upfront instructions covering every affected file.
- B) Plan mode, to explore the current authentication logic, understand dependencies, and propose a design before any code changes are made.
- C) Direct execution, refactoring incrementally and letting the service boundary emerge from the changes.
- D) Direct execution restricted to only the token issuance logic first, ignoring session handling for now.

---

### Task 3.5: Apply iterative refinement techniques for progressive improvement

**Q36.** Claude Code is asked to normalize phone numbers in a customer database. After two rounds of the instruction "always use E.164 format," output is still inconsistent — some numbers keep local formatting, others are only partially converted.

What is the most effective next step?

- A) Repeat the instruction with stronger emphasis and capitalization.
- B) Provide 2-3 concrete before/after examples covering different input formats (with and without country code, with extensions) showing exactly the expected transformation.
- C) Switch to plan mode so Claude can research the E.164 standard before converting.
- D) Ask Claude to write a phone-number-formatting function first, then run it in a second pass.

---

**Q37.** Before implementing a new payments webhook handler, a team lead wants Claude to first surface edge cases, security considerations, and design tradeoffs the team hasn't yet discussed — rather than jumping straight to code.

What technique is most appropriate?

- A) Hand Claude a finished specification document and ask it to implement it directly.
- B) Use the interview pattern: have Claude ask the team clarifying questions about requirements, failure modes, and constraints before proposing any design.
- C) Start with a minimal handler and iterate based on issues found in code review.
- D) Provide a complete test suite upfront and have Claude write code to satisfy it.

---

### Task 3.6: Integrate Claude Code into CI/CD pipelines

**Q38.** A CI job runs `claude "Summarize failed test output"` and the job never completes; logs show Claude Code waiting on interactive input.

What is the correct fix?

- A) Add the `-p` (print/non-interactive) flag to the invocation.
- B) Set `CLAUDE_NONINTERACTIVE=1` as an environment variable.
- C) Pipe an empty string into stdin before the command runs.
- D) Add a `--ci` flag to the command.

---

**Q39.** A CI pipeline uses Claude Code to generate a structured list of flaky test candidates that a downstream script consumes. The current setup parses Claude's free-text response with regex, and the parser regularly breaks as the wording shifts between runs.

What is the most robust fix?

- A) Add stricter prose formatting instructions to the prompt and reject any response that deviates.
- B) Use `--output-format json` with a `--json-schema` defining the exact fields expected (`test_name`, `failure_rate`, `reason`), making the output machine-parseable by construction.
- C) Run a second Claude call to clean up the first response into a consistent format.
- D) Switch to a single free-text summary comment instead of a structured list.

---

## Domain 4: Prompt Engineering & Structured Output

### Task 4.1: Design prompts with explicit criteria to improve precision and reduce false positives

**Q40.** A code review prompt flags "possible race condition" on nearly every function that touches a shared variable, even well-guarded ones using proper locking. Adding "only flag high-confidence issues" hasn't helped.

What is the most effective next step?

- A) Disable the concurrency-review category entirely until a better tool exists.
- B) Define explicit criteria distinguishing a reportable race condition (shared mutable state accessed without a lock/guard across threads) from acceptable patterns (properly locked access), with concrete code examples of each.
- C) Switch to a larger model tier, assuming it will exercise better judgment.
- D) Add a self-reported confidence field and discard findings below 80%.

---

**Q41.** A support-ticket triage prompt is supposed to flag "urgent" tickets, but it flags nearly every ticket that mentions the word "immediately," including routine requests that use the word casually ("please respond immediately if you have any questions").

How should the prompt be fixed?

- A) Instruct the model to "use good judgment" about what counts as urgent.
- B) Define explicit urgency criteria (e.g., service outage, security incident, data loss, payment failure blocking a transaction) and explicitly exclude casual phrasing that merely contains urgency-adjacent words.
- C) Add a severity score and instruct the model to suppress anything below "medium."
- D) Provide a list of specific words that should never trigger the urgent flag.

---

### Task 4.2: Apply few-shot prompting to improve output consistency and quality

**Q42.** An internal tool generates release-note bullet points from commit messages, but output style varies wildly: some bullets are one word, some are full paragraphs, some include ticket numbers and some don't.

What is the most effective fix for consistency?

- A) Add a prose instruction listing the required style rules.
- B) Provide 3-4 few-shot examples showing commit-message inputs paired with correctly formatted release-note bullets, covering different commit types (feature, fix, chore).
- C) Post-process every output with a regex normalizer.
- D) Ask the model to self-review and reformat any bullet that seems inconsistent.

---

**Q43.** A contract clause classifier handles clearly-worded clauses well but frequently misclassifies clauses that blend two categories, such as language that is both a warranty and a limitation of liability.

What few-shot approach best improves accuracy on these ambiguous cases?

- A) Add more examples of clearly-worded, unambiguous clauses to reinforce the overall category definitions.
- B) Add targeted few-shot examples specifically demonstrating ambiguous, blended clauses, with the reasoning for why each belongs to one category over the other.
- C) Stop classifying and only extract clause text, applying a separate rule-based classifier afterward.
- D) Route every clause below a certain length to human review by default.

---

### Task 4.3: Enforce structured output using tool use and JSON schemas

**Q44.** An extraction pipeline asks for JSON in a fenced code block in the prompt text. Roughly 4% of production responses contain JSON syntax errors (trailing commas, unescaped quotes) that break the downstream parser.

What is the most reliable fix?

- A) Add a retry loop that re-runs the same prompt up to 3 times whenever parsing fails.
- B) Switch to tool use with a defined input schema, and read the extracted fields from the structured `tool_use` block instead of parsing free-text JSON.
- C) Add a stronger prompt instruction: "Double-check your JSON syntax before responding."
- D) Add a regex-based auto-fixer for the most common JSON syntax mistakes.

---

**Q45.** A pipeline has two extraction tools, `extract_purchase_order` and `extract_delivery_note`, and the document type isn't known ahead of time. With `tool_choice: "auto"`, the model returns a plain-text description instead of calling either tool about 25% of the time.

What is the correct fix?

- A) Set `tool_choice: "any"` so the model is required to call one of the available tools, though it decides which.
- B) Set `tool_choice` to force `extract_purchase_order` specifically on every call.
- C) Add an instruction telling the model to "never respond with plain text."
- D) Merge both tools into one `extract_document` tool with an optional `document_type` field.

---

### Task 4.4: Implement validation, retry, and feedback loops for extraction quality

**Q46.** An expense report extraction pipeline validates that each report's line items sum to the stated `total`. About 6% of extractions fail this check even though the source documents are well-formed and complete.

What is the recommended retry design?

- A) Retry the same prompt up to 3 times unmodified, expecting the model to converge.
- B) On failure, include the original document, the failed extraction, and the specific mismatch (e.g., "line items sum to $412.00 but total is listed as $420.00") in a follow-up prompt so the model can self-correct with concrete feedback.
- C) Immediately route every mismatch to human review with no retry attempt.
- D) Add a `computed_total` field populated in post-processing and treat that as the source of truth going forward, ignoring the discrepancy.

---

**Q47.** A code review pipeline is producing many false positives, but the findings schema only contains `file`, `line`, and `description` — giving the team no way to see which specific pattern triggered each incorrect flag.

What schema addition would most help the team systematically reduce false positives?

- A) A `confidence` score field so results can be filtered by threshold.
- B) A `detected_pattern` field recording the exact code construct or pattern that triggered the finding, so the team can trace and refine which patterns cause false positives.
- C) A `category` field grouping findings by issue type.
- D) An `is_false_positive` field the model self-labels.

---

### Task 4.5: Design efficient batch processing strategies

**Q48.** Two workloads: (1) a blocking pre-deploy gate that must finish before a deployment proceeds, and (2) a monthly usage-trends report generated for review the following week. A manager proposes switching both to the Message Batches API for cost savings.

What is the correct evaluation?

- A) Both workloads are good fits for batching since batching always reduces cost regardless of latency needs.
- B) Only the monthly report is a good fit for batching; the blocking pre-deploy gate needs synchronous, real-time responses and should stay on standard calls.
- C) Neither workload should use batching, since batch result ordering is inherently unreliable.
- D) Both should use batching, with a timeout fallback to real-time calls if the batch takes too long.

---

**Q49.** A team runs a nightly batch job classifying 80,000 support tickets by category using the Message Batches API. A batch occasionally has a subset of requests return error responses due to malformed input documents.

How should these partial failures be handled?

- A) Always resubmit the entire batch of 80,000 tickets to avoid tracking individual failures.
- B) Use the `custom_id` on each request to match it to its response, identify which specific tickets errored, and resubmit only those tickets in a smaller follow-up batch.
- C) Shorten the batch processing window so failures surface faster.
- D) Abandon batch processing for this workload entirely in favor of real-time calls with retries.

---

### Task 4.6: Design multi-instance and multi-pass review architectures

**Q50.** A pull request touches 11 files across a payments module. A single review pass gives detailed feedback on some files but only superficial comments on others, and misses an obvious bug in one file entirely.

How should the review be restructured?

- A) Require the PR to be split into smaller submissions before any automated review runs.
- B) Split the review into focused passes — one pass analyzing each file individually for local issues, followed by a separate pass examining cross-file interactions.
- C) Switch to a model with a larger context window so all 11 files get equal attention in one pass.
- D) Run three full independent reviews of the entire PR and keep only issues flagged by at least two.

---

**Q51.** In one session, Claude generates a 250-line data-validation module and is then asked, in the same session, to review its own code for bugs. The self-review says "looks correct," but a manual review later finds a boundary-condition bug.

What is the most likely cause and the best architectural fix?

- A) The context window was too full; the fix is to generate smaller modules going forward.
- B) The reviewing instance still carries the reasoning context from generation, making it less likely to question its own prior decisions; use a second, independent Claude instance with no generation context to perform the review.
- C) The review prompt lacked detail; adding a longer review checklist to the same session would resolve it.
- D) A larger model tier is needed for review than was used for generation.

---

## Domain 5: Context Management & Reliability

### Task 5.1: Manage conversation context to preserve critical information across long interactions

**Q52.** A 25-turn technical support conversation begins with a customer stating their device's serial number and the exact firmware version affected by a bug. Later in the conversation, the agent asks the customer to "please confirm your firmware version again," even though it was already stated once.

What context technique would prevent this?

- A) Run `/compact` automatically every 5 turns to keep the context window small.
- B) Extract stable facts (serial number, firmware version, reported symptom) into a persistent "case facts" block included at the top of every subsequent prompt in the conversation.
- C) Upgrade to a model with a larger context window so nothing needs to be dropped.
- D) Instruct the agent to re-read the entire transcript before every response.

---

**Q53.** A synthesis agent receives one large combined message containing findings from five research subagents, each 900-1,300 tokens long. The final synthesis consistently omits or misrepresents findings that fall in the middle of that combined input, while findings at the start and end are represented accurately.

What is the best mitigation?

- A) Deduplicate the subagent outputs before passing them to synthesis.
- B) This is the "lost in the middle" effect; mitigate by placing the most important findings summaries near the beginning of the input and clearly labeling each section with headers.
- C) Increase `max_tokens` on the synthesis call so it can produce a longer response.
- D) Route the middle sections through an additional summarization pass before synthesis, discarding the original text.

---

### Task 5.2: Design effective escalation and ambiguity resolution patterns

**Q54.** A support agent's first-contact resolution rate is only 48%, well below target. Logs show it frequently escalates simple, well-understood requests to a human while attempting to autonomously resolve complex policy-exception cases it isn't equipped to handle.

What is the most effective fix?

- A) Add explicit escalation criteria to the system prompt, with few-shot examples distinguishing cases that should be resolved autonomously from cases that require escalation.
- B) Have the agent self-report a numeric confidence score before every response and escalate anything below a fixed threshold.
- C) Train a separate classifier on historical tickets to pre-route requests before the agent ever sees them.
- D) Add sentiment detection and escalate automatically whenever negative sentiment crosses a threshold.

---

**Q55.** A customer explicitly says "please transfer me to a human agent" at the start of a chat. The agent instead responds "Let me look into that for you" and begins its own investigation, even though the request is clearly within its ability to resolve automatically. The customer repeats the request for a human twice more before being escalated.

What is the correct behavior?

- A) The agent should honor the explicit request for a human immediately, rather than substituting its own judgment about whether the case needs escalation.
- B) The agent should proceed with automated resolution, since it can genuinely resolve the case faster than a human could.
- C) The agent should escalate only after the customer repeats the request a third time, to avoid over-escalating.
- D) The agent should ask the customer to confirm they still want a human before honoring the request.

---

### Task 5.3: Implement error propagation strategies across multi-agent systems

**Q56.** A pricing-lookup subagent silently catches an upstream API timeout and returns `{"status": "success", "price": null}`. The coordinator passes this along, and the final quote to the customer simply omits the price for that item with no explanation of why.

What is wrong with this design?

- A) Silently returning a success status on failure prevents the coordinator from making any recovery decision, letting an incomplete result pass through as if it were complete.
- B) The quote-generation agent should be responsible for detecting missing prices and retrying the lookup itself, bypassing the coordinator.
- C) The coordinator should reject any subagent result containing a `null` field, regardless of context.
- D) The timeout threshold on the pricing API call should simply be increased.

---

### Task 5.4: Manage context effectively in large codebase exploration

**Q57.** An agent explores a 150,000-line codebase to trace how a specific caching layer works. After 70+ minutes and many file reads, it starts describing "typical caching patterns" in general terms instead of the specific implementation details it found earlier, and its later answers contradict its earlier ones.

What is the best mitigation?

- A) Add artificial delays between tool calls to avoid rate limiting.
- B) This reflects context degradation over a long session; mitigate by having the agent maintain a scratchpad file recording key findings as it goes, and referring back to that file rather than relying purely on conversation memory.
- C) Split the codebase into independent subsystems investigated by separate agents running at the same time with no shared context.
- D) Switch from `Read` to `Grep` throughout the exploration to reduce token usage.

---

**Q58.** A multi-phase investigation first spends 40 minutes mapping a service's dependency graph, then moves to a second phase analyzing performance bottlenecks. By the second phase, the agent describes a component it had earlier identified as using a custom caching layer as instead "using a standard off-the-shelf cache," contradicting its own earlier finding.

What technique best preserves findings across the phase boundary?

- A) Have the agent write key findings to a scratchpad file at the end of each phase, and explicitly reference that file when starting the next phase rather than relying on conversation history alone.
- B) Run `/compact` at the phase boundary to free context space before continuing.
- C) Restart with a brand-new session for the second phase, providing only a short manual summary.
- D) Increase `max_tokens` so more of the first phase's detail is retained automatically.

---

### Task 5.5: Design human review workflows and confidence calibration

**Q59.** An automated résumé-screening pipeline reports 96% overall extraction accuracy and the team proposes removing human review entirely. A data scientist objects that this aggregate number could be hiding a serious problem.

What is the most important concern?

- A) 96% accuracy inherently implies the remaining 4% are edge cases too rare to matter in practice.
- B) Aggregate accuracy can mask much lower performance on specific fields or candidate categories — a field with only 80% accuracy could be hidden behind strong overall performance elsewhere, so stratified analysis is needed before removing review.
- C) The validation set is too small to produce any reliable accuracy figure at all.
- D) Human review should be retained purely because employment-related automation always carries legal risk, independent of the accuracy figures.

---

### Task 5.6: Preserve information provenance and handle uncertainty in multi-source synthesis

**Q60.** A research synthesis agent produces a report claiming "customer churn dropped 18% after the pricing change," but does not indicate which subagent or source this figure came from. A reviewer cannot verify the number because the underlying subagent outputs were discarded after synthesis.

What structural change would prevent this?

- A) Add a generic "Sources consulted" list at the end of the report with every source that was accessed.
- B) Require each subagent to output structured claim-source pairs (the specific claim, its source, and a supporting excerpt) and require the synthesis agent to preserve and carry forward these pairs rather than summarizing them away.
- C) Log all raw subagent outputs to a separate file that can be manually searched if a claim is later questioned.
- D) Add a post-hoc review agent that checks a sample of claims against the raw subagent logs after the fact.

---

## Answer Key & Rationale

> Attempt the exam above before consulting this section.

### Domain 1

**Q1.** Answer: B — `stop_reason` is the deterministic termination signal; natural-language phrase matching is unreliable since Claude's exact wording varies.
**Q2.** Answer: B — Iteration caps are safety boundaries, not primary termination logic; `end_turn` remains authoritative.
**Q3.** Answer: B — Summaries can omit the specific values needed for multi-result reasoning, degrading decision quality.
**Q4.** Answer: B — The coordinator's own decomposition excluded entire relevant categories; subagents did their assigned jobs correctly.
**Q5.** Answer: C — A coordinator that dynamically selects subagents based on complexity avoids wasted work on trivial inputs.
**Q6.** Answer: B — Re-delegate only the missing scope, with prior findings as context, to avoid redundant work.
**Q7.** Answer: B — Without `"Task"` in `allowedTools`, the coordinator has no spawning mechanism regardless of prompting.
**Q8.** Answer: B — Structured data that preserves claim/structure metadata survives the handoff; unstructured text loses it.
**Q9.** Answer: B — Programmatic prerequisites give deterministic ordering guarantees prompt instructions cannot.
**Q10.** Answer: B — Decomposing independent concerns into parallel investigations with shared context cuts latency without losing accuracy.
**Q11.** Answer: B — `PostToolUse` hooks normalize heterogeneous formats before the model reasons on them, avoiding misinterpretation.
**Q12.** Answer: C — A `PreToolUse` hook enforces the business rule deterministically, independent of prompt compliance.
**Q13.** Answer: B — Prompt chaining with focused sequential passes fits fixed, well-defined multi-aspect workflows.
**Q14.** Answer: B — Dynamic adaptive decomposition fits open-ended investigations where scope is unknown in advance.
**Q15.** Answer: B — `--resume` continues the named session, preserving accumulated context across the gap.
**Q16.** Answer: B — `fork_session` creates independent branches from a shared baseline for divergent exploration.

### Domain 2

**Q17.** Answer: B — Tool descriptions are the primary signal for tool selection; expanding them addresses the root cause directly.
**Q18.** Answer: B — Format constraints, examples, and expected query shape in the description guide correct usage.
**Q19.** Answer: B — Distinct names and descriptions explaining data source and use case resolve ambiguous overlap.
**Q20.** Answer: B — Structured error metadata (`errorCategory`, `isRetryable`, explanation) enables differentiated recovery.
**Q21.** Answer: B — Distinguishing access failures from genuine empty/zero results via `isError` prevents misinterpretation.
**Q22.** Answer: B — `isRetryable: false` plus an explanation of the business-rule nature stops needless, harmful retries.
**Q23.** Answer: B — Tools outside an agent's specialization increase misuse risk, breaking the intended workflow.
**Q24.** Answer: C — Forcing a specific named tool via `tool_choice` is the only setting that guarantees that exact tool runs every time.
**Q25.** Answer: B — Project-scoped `.mcp.json` with environment variable expansion shares config via version control without committing secrets.
**Q26.** Answer: B — MCP resources expose catalogs at connection time, eliminating exploratory discovery calls.
**Q27.** Answer: C — `Grep` searches file contents directly and efficiently across the codebase for the target string.

### Domain 3

**Q28.** Answer: B — User-scoped `~/.claude/CLAUDE.md` is never committed, so it never reaches other developers.
**Q29.** Answer: A — Path-scoped rule files in `.claude/rules/` load only relevant conventions per file being edited.
**Q30.** Answer: A — Project-scoped `.claude/commands/` is version-controlled and available to everyone automatically.
**Q31.** Answer: B — `context: fork` isolates verbose exploratory work in a sub-agent context, keeping the main session clean.
**Q32.** Answer: A — A glob-pattern rule file applies conventions by filename pattern regardless of directory location.
**Q33.** Answer: B — A path-scoped rule file limited to `infra/**/*` keeps Terraform rules out of unrelated sessions.
**Q34.** Answer: B — A well-scoped fix with a known target and no open design decisions is appropriate for direct execution.
**Q35.** Answer: B — Large-scale architectural changes with unresolved design decisions call for plan mode exploration first.
**Q36.** Answer: B — Concrete before/after examples resolve formatting ambiguity that prose instructions failed to fix.
**Q37.** Answer: B — The interview pattern surfaces unstated requirements and tradeoffs before any design commitment.
**Q38.** Answer: A — The `-p` (print/non-interactive) flag is the documented way to run Claude Code non-interactively.
**Q39.** Answer: B — `--output-format json` with `--json-schema` makes output machine-parseable by construction, ending drift-related parser breakage.

### Domain 4

**Q40.** Answer: B — Explicit, example-backed criteria distinguish real issues from acceptable patterns, directly reducing false positives.
**Q41.** Answer: B — Defining true urgency criteria (with exclusions for casual phrasing) fixes keyword-triggered over-flagging.
**Q42.** Answer: B — Concrete few-shot examples across commit types establish a consistent, unambiguous output format.
**Q43.** Answer: B — Targeted examples of ambiguous, blended cases with reasoning improve accuracy specifically on edge cases.
**Q44.** Answer: B — Tool use with a defined schema eliminates free-text JSON syntax errors by construction.
**Q45.** Answer: A — `tool_choice: "any"` guarantees a tool call while letting the model pick the correct extraction tool.
**Q46.** Answer: B — Including the specific validation mismatch in the retry prompt gives the model concrete grounds for self-correction.
**Q47.** Answer: B — A `detected_pattern` field lets the team trace exactly which construct triggers each false positive.
**Q48.** Answer: B — Non-blocking, delayed-review workloads suit batching; latency-critical blocking gates need real-time calls.
**Q49.** Answer: B — `custom_id` correlation lets you isolate and resubmit only the failed subset, not the whole batch.
**Q50.** Answer: B — Splitting review into focused per-file and cross-file passes prevents attention dilution across many files.
**Q51.** Answer: B — A same-session self-review inherits generation context and is less critical; an independent instance without that context reviews more objectively.

### Domain 5

**Q52.** Answer: B — A persistent "case facts" block preserves stable transactional details across many conversation turns.
**Q53.** Answer: B — Placing key summaries at the start/using headers counters the "lost in the middle" effect on long combined inputs.
**Q54.** Answer: A — Explicit escalation criteria with few-shot examples directly recalibrates when to escalate versus resolve.
**Q55.** Answer: A — An explicit human-handoff request should be honored immediately, not overridden by the agent's own judgment.
**Q56.** Answer: A — Silently returning success on failure removes the coordinator's ability to detect and recover from the gap.
**Q57.** Answer: B — A scratchpad file anchors long-session agents to specific earlier findings, countering context degradation.
**Q58.** Answer: A — Writing and referencing a scratchpad file across phase boundaries prevents findings from being overwritten by generic patterns.
**Q59.** Answer: B — Aggregate accuracy can hide much weaker performance on specific fields or categories; stratified analysis is required first.
**Q60.** Answer: B — Structured claim-source pairs preserved end-to-end (not summarized away) maintain verifiable provenance.
