# Claude Certified Architect. Foundations: Practice Exam

---

## Exam Format

- **Format:** Multiple choice, 4 options per question (1 correct, 3 distractors)
- **Unanswered questions:** Scored as incorrect. No penalty for guessing.
- **Result:** Pass/fail designation
- **Scoring:** Scaled score 100-1,000. Minimum passing score: **720**

Questions are scenario-based, grounded in realistic use cases: building agentic systems for customer support, designing multi-agent research pipelines, integrating Claude Code into CI/CD workflows, building developer productivity tools, and extracting structured data from unstructured documents. Candidates must demonstrate practical judgment about architecture, configuration, and tradeoffs in production deployments.

---

## Content Domains & Weightings

| Domain | Topic                                  | Weight | Questions           |
| ------ | -------------------------------------- | ------ | ------------------- |
| 1      | Agentic Architecture & Orchestration   | 27%    | Q1, Q7-Q9, Q13-Q29  |
| 2      | Tool Design & MCP Integration          | 18%    | Q2, Q30-Q40         |
| 3      | Claude Code Configuration & Workflows  | 20%    | Q4-Q6, Q10, Q41-Q54 |
| 4      | Prompt Engineering & Structured Output | 20%    | Q11-Q12, Q55-Q68    |
| 5      | Context Management & Reliability       | 15%    | Q3, Q69-Q77         |

---

## Domain-Task Index

### Domain 1: Agentic Architecture & Orchestration (27%)

| Task | Description                                       | Questions     |
| ---- | ------------------------------------------------- | ------------- |
| 1.1  | Agentic loops for autonomous task execution       | Q13, Q14, Q15 |
| 1.2  | Multi-agent coordinator-subagent patterns         | Q7, Q16, Q17  |
| 1.3  | Subagent invocation, context passing, spawning    | Q18, Q19, Q20 |
| 1.4  | Multi-step workflows with enforcement and handoff | Q1, Q21, Q22  |
| 1.5  | Agent SDK hooks for tool call interception        | Q23, Q24, Q25 |
| 1.6  | Task decomposition strategies                     | Q26, Q27      |
| 1.7  | Session state, resumption, and forking            | Q28, Q29      |

### Domain 2: Tool Design & MCP Integration (18%)

| Task | Description                                          | Questions         |
| ---- | ---------------------------------------------------- | ----------------- |
| 2.1  | Tool interface design with clear descriptions        | Q2, Q30, Q31      |
| 2.2  | Structured error responses for MCP tools             | Q8, Q32, Q33, Q34 |
| 2.3  | Tool distribution across agents and tool_choice      | Q9, Q35, Q36      |
| 2.4  | MCP server integration into Claude Code              | Q37, Q38          |
| 2.5  | Built-in tools (Read, Write, Edit, Bash, Grep, Glob) | Q39, Q40          |

### Domain 3: Claude Code Configuration & Workflows (20%)

| Task | Description                                            | Questions               |
| ---- | ------------------------------------------------------ | ----------------------- |
| 3.1  | CLAUDE.md hierarchy, scoping, modular organization     | Q41, Q42, Q54           |
| 3.2  | Custom slash commands and skills                       | Q4, Q43                 |
| 3.3  | Path-specific rules for conditional convention loading | Q6, Q44                 |
| 3.4  | Plan mode vs direct execution                          | Q5, Q45, Q46            |
| 3.5  | Iterative refinement techniques                        | Q47, Q48, Q49, Q51, Q52 |
| 3.6  | Claude Code in CI/CD pipelines                         | Q10, Q50, Q53           |

### Domain 4: Prompt Engineering & Structured Output (20%)

| Task | Description                                                  | Questions     |
| ---- | ------------------------------------------------------------ | ------------- |
| 4.1  | Explicit criteria for precision and false positive reduction | Q55, Q56, Q57 |
| 4.2  | Few-shot prompting for consistency and quality               | Q58, Q59, Q60 |
| 4.3  | Structured output using tool use and JSON schemas            | Q61, Q62      |
| 4.4  | Validation, retry, and feedback loops                        | Q63, Q64, Q67 |
| 4.5  | Batch processing strategies                                  | Q11, Q65      |
| 4.6  | Multi-instance and multi-pass review architectures           | Q12, Q66, Q68 |

### Domain 5: Context Management & Reliability (15%)

| Task | Description                                       | Questions |
| ---- | ------------------------------------------------- | --------- |
| 5.1  | Conversation context preservation                 | Q69, Q70  |
| 5.2  | Escalation and ambiguity resolution               | Q3, Q71   |
| 5.3  | Error propagation across multi-agent systems      | Q72       |
| 5.4  | Context management in large codebase exploration  | Q73, Q74  |
| 5.5  | Human review workflows and confidence calibration | Q75, Q76  |
| 5.6  | Information provenance and uncertainty            | Q77       |

---

## Exam Scenarios

4 of the 6 scenarios below are selected at random for each exam. Each scenario frames a set of questions.

### Scenario 1: Customer Support Resolution Agent

You are building a customer support resolution agent using the Claude Agent SDK. The agent handles high-ambiguity requests like returns, billing disputes, and account issues. It has access to your backend systems through custom MCP tools (`get_customer`, `lookup_order`, `process_refund`, `escalate_to_human`). Target: 80%+ first-contact resolution while knowing when to escalate.

**Primary domains:** Domain 1, Domain 2, Domain 5

---

### Scenario 2: Code Generation with Claude Code

You are using Claude Code to accelerate software development for code generation, refactoring, debugging, and documentation. You need to integrate it with custom slash commands, CLAUDE.md configurations, and understand when to use plan mode vs direct execution.

**Primary domains:** Domain 3, Domain 5

---

### Scenario 3: Multi-Agent Research System

You are building a multi-agent research system using the Claude Agent SDK. A coordinator agent delegates to specialized subagents: web search, document analysis, synthesis, and report generation. The system produces comprehensive cited reports.

**Primary domains:** Domain 1, Domain 2, Domain 5

---

### Scenario 4: Developer Productivity with Claude

You are building developer productivity tools using the Claude Agent SDK. The agent helps engineers explore unfamiliar codebases, understand legacy systems, generate boilerplate, and automate repetitive tasks. Uses built-in tools (Read, Write, Bash, Grep, Glob) and MCP servers.

**Primary domains:** Domain 2, Domain 3, Domain 1

---

### Scenario 5: Claude Code for Continuous Integration

You are integrating Claude Code into CI/CD pipelines. The system runs automated code reviews, generates test cases, and provides pull request feedback. You need prompts that provide actionable feedback and minimize false positives.

**Primary domains:** Domain 3, Domain 4

---

### Scenario 6: Structured Data Extraction

You are building a structured data extraction system using Claude. The system extracts information from unstructured documents, validates output using JSON schemas, and maintains high accuracy. Must handle edge cases gracefully and integrate with downstream systems.

**Primary domains:** Domain 4, Domain 5

---



**Q1.** Production data shows that in 12% of cases, your agent skips `get_customer` entirely and calls `lookup_order` using only the customer's stated name, occasionally leading to misidentified accounts and incorrect refunds. What change would most effectively address this reliability issue?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q1"> A) Add a programmatic prerequisite that blocks `lookup_order` and `process_refund` calls until `get_customer` has returned a verified customer ID.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q1"> B) Enhance the system prompt to state that customer verification via `get_customer` is mandatory before any order operations.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q1"> C) Add few-shot examples showing the agent always calling `get_customer` first, even when customers volunteer order details.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q1"> D) Implement a routing classifier that analyzes each request and enables only the subset of tools appropriate for that request type.</label><br>

---

**Q13.** You are building a customer support agent using the Claude Agent SDK. The agent processes billing disputes by calling tools like `lookup_order`, `get_invoice`, and `process_refund`. A code review notes that after each tool call, your loop checks whether Claude's response text contains the phrase "I have completed" to decide whether to stop.

What is the primary problem with this loop termination approach?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q13"> A) The agent will never terminate because `process_refund` always returns a success message that prevents "I have completed" from appearing.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q13"> B) Relying on natural language signals in the assistant's text is unreliable; the correct approach is to inspect `stop_reason` and only terminate when it equals `"end_turn"`.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q13"> C) The loop should terminate as soon as any tool call fails, since continuing after a failure will corrupt the conversation history.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q13"> D) Checking response text is only valid in synchronous mode; you must use a callback handler for proper loop control in async contexts.</label><br>

---

**Q14.** A developer productivity agent investigates bug reports by calling `search_codebase`, `read_file`, and `run_tests`. During a code review, a colleague proposes adding an iteration cap: if the loop has not finished after 15 tool calls, terminate with a generic "investigation incomplete" response.

What is the correct characterization of this design?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q14"> A) Iteration caps are the recommended primary stopping mechanism because they prevent runaway costs in production.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q14"> B) Iteration caps are a reasonable safety boundary for long-running tasks but should not be the primary termination mechanism; `stop_reason: "end_turn"` remains the authoritative signal.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q14"> C) The iteration cap should be replaced with a time-based timeout, since token counts are a more reliable measure of completion than iteration count.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q14"> D) Iteration caps are unnecessary if the system prompt instructs the agent to always request only the minimum tools needed.</label><br>

---

**Q15.** Your multi-agent research system's agentic loop appends each tool result to the conversation history before sending the next request. A teammate suggests instead storing all tool results in a separate database and providing only a summary to the model at each iteration, rather than the full result.

Under what condition would this change most likely degrade agent performance?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q15"> A) When the tool results contain binary data such as images or file attachments.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q15"> B) When the model needs to reason across multiple tool results simultaneously to determine its next action, since summaries may omit details required for that reasoning.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q15"> C) When the number of tool calls per session exceeds 10, since larger histories slow down the API.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q15"> D) When tools return results faster than 200ms, making history appending redundant.</label><br>

---


**Q7.** After running on "impact of AI on creative industries," each subagent completes successfully but the final reports cover only visual arts, missing music, writing, and film production. The coordinator decomposed the topic into: "AI in digital art creation," "AI in graphic design," and "AI in photography." What is the most likely root cause?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q7"> A) The synthesis agent lacks instructions for identifying coverage gaps in the findings it receives from other agents.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q7"> B) The coordinator agent's task decomposition is too narrow, resulting in subagent assignments that don't cover all relevant domains.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q7"> C) The web search agent's queries are not comprehensive enough and need to be expanded to cover more creative industry sectors.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q7"> D) The document analysis agent is filtering out sources related to non-visual creative industries due to overly restrictive relevance criteria.</label><br>

---

**Q16.** Your multi-agent research system uses a coordinator that always routes every query through all four subagents (web search, document analysis, synthesis, and report generation) regardless of query complexity. For a simple factual question like "What year was the Anthropic API released?", the system takes 45 seconds and incurs unnecessary cost.

What design change most directly addresses this?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q16"> A) Replace the coordinator with a static routing table that maps query keywords to specific subagent pipelines.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q16"> B) Have each subagent evaluate its own relevance to the current query and self-select into or out of the pipeline.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q16"> C) Design the coordinator to dynamically select which subagents to invoke based on query complexity and type, rather than always routing through the full pipeline.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q16"> D) Reduce the number of subagents from four to two by merging web search and document analysis into a single "retrieval" agent.</label><br>

---

**Q17.** A coordinator agent in your research system has delegated document analysis to a subagent. After the subagent finishes, the coordinator notices the findings are incomplete: the subagent covered only three of the five specified sources. The coordinator needs to get the remaining two sources analyzed.

What is the correct approach for re-delegating this work?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q17"> A) Invoke the synthesis agent with the partial findings and instruct it to infer what the missing sources likely contain based on patterns from the three completed analyses.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q17"> B) The coordinator should re-invoke the document analysis subagent with an explicit prompt specifying only the two missing sources, including the previously completed findings as context.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q17"> C) Send all five sources again to a new document analysis subagent instance, which will re-analyze the three already-completed sources along with the two missing ones.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q17"> D) Let the coordinator generate its own analysis of the remaining two sources directly, rather than spawning another subagent delegation.</label><br>

---


**Q18.** You are building a coordinator that delegates research tasks to subagents using the `Task` tool. When you test the system, the coordinator cannot invoke any subagents. Reviewing the coordinator's `AgentDefinition`, you notice the `allowedTools` field is set to `["web_search", "read_document"]`.

What is the most likely cause of the failure?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q18"> A) The `Task` tool requires an explicit `subagent_endpoint` configuration before it can be invoked.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q18"> B) `"Task"` is not included in the coordinator's `allowedTools`, so it cannot spawn subagents.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q18"> C) The coordinator's system prompt does not include instructions to use the `Task` tool, so the model never attempts to call it.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q18"> D) Subagent invocation requires the coordinator to be running in plan mode rather than direct execution mode.</label><br>

---

**Q19.** Your multi-agent research system has a web search subagent that consistently returns findings without identifying which sources correspond to which claims. When the synthesis agent receives these findings, it cannot produce properly cited reports.

What is the correct fix during context passing from the web search subagent to the synthesis agent?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q19"> A) Instruct the synthesis agent to run its own web searches to re-locate the original sources.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q19"> B) Use structured data formats that separate claim content from metadata (source URLs, publication dates, page numbers) in the subagent's output, and include this structure when passing context to the synthesis agent.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q19"> C) Have the coordinator concatenate all subagent outputs into a single text block before forwarding to synthesis, since synthesis will extract citations naturally.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q19"> D) Configure the web search subagent to return only source URLs, and have the synthesis agent re-read each source to reconstruct the findings.</label><br>

---

**Q20.** A coordinator needs to research three independent subtopics in parallel: market trends, competitor analysis, and regulatory environment. Each requires a separate web search subagent. How should the coordinator spawn these subagents to maximize throughput?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q20"> A) Spawn the subtopics sequentially: start the first subagent, wait for its result, then start the second, and so on, to avoid context conflicts.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q20"> B) Emit all three `Task` tool calls in a single coordinator response, which allows the subagents to run in parallel.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q20"> C) Route all three subtopics through a single subagent sequentially, sharing context between them to reduce total memory usage.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q20"> D) Use a single subagent with three separate prompts in sequence, passing prior results as context for each subsequent prompt.</label><br>

---


**Q21.** Your customer support agent handles account closure requests. The workflow requires: (1) verify customer identity via `get_customer`, (2) check for active subscriptions via `check_subscriptions`, (3) process closure via `close_account`. Production logs show the agent occasionally calls `close_account` before completing the identity verification step, resulting in unauthorized account closures.

A colleague suggests adding a system prompt instruction: "Always verify identity before closing accounts." What is the most effective approach?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q21"> A) The system prompt instruction is sufficient because it explicitly describes the required order.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q21"> B) Add few-shot examples showing the correct three-step sequence alongside the system prompt instruction.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q21"> C) Implement a programmatic prerequisite that blocks `close_account` from executing until `get_customer` has returned a verified customer ID.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q21"> D) Add a routing classifier that analyzes the request type and pre-selects the appropriate tools before the agent begins.</label><br>

---

**Q22.** A customer contacts your support agent about three issues in a single message: a billing charge dispute, a missing order, and a request to update their email address. The agent processes these sequentially, taking 3-4 minutes per request. A senior architect suggests you redesign the handling approach.

What design change would most improve efficiency while maintaining accuracy?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q22"> A) Instruct the agent to address only the highest-priority issue per conversation turn and ask the customer to submit separate tickets for the remaining issues.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q22"> B) Decompose the three concerns into distinct investigation items and process each in parallel using shared customer context, then compile a unified response.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q22"> C) Process the three issues sequentially but cache intermediate results so subsequent issues benefit from data already retrieved.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q22"> D) Delegate all three issues to a single specialized "multi-issue" subagent that handles complex requests with multiple concerns.</label><br>

---


**Q23.** Your customer support agent integrates with three backend MCP tools: a legacy billing system returning Unix timestamps, an order management system returning ISO 8601 dates, and a subscription service returning numeric status codes (1=active, 2=paused, 3=cancelled). The agent frequently misinterprets these heterogeneous formats when reasoning about customer records.

What is the most appropriate architectural fix?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q23"> A) Update each backend system to return a uniform date and status format before the agent calls them.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q23"> B) Add format conversion instructions to the system prompt explaining how to interpret each tool's output conventions.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q23"> C) Implement `PostToolUse` hooks that intercept tool results from each source and normalize timestamps, dates, and status codes into a consistent format before the model processes them.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q23"> D) Add a post-processing step after the agent produces its final response to re-format any dates and statuses that appear in the output.</label><br>

---

**Q24.** Your customer support agent has a policy: refunds above $500 require manager approval and must not be processed autonomously. Your system prompt states "Do not process refunds above $500 without manager approval." Production logs show this rule is violated in approximately 3% of cases.

What is the most effective way to guarantee compliance?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q24"> A) Strengthen the system prompt language: "You are strictly forbidden from processing refunds above $500 without explicit manager approval under any circumstances."</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q24"> B) Add 10 few-shot examples in the system prompt, all demonstrating the agent requesting manager approval for high-value refunds.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q24"> C) Implement a hook that intercepts outgoing `process_refund` tool calls, checks the refund amount, and blocks execution or redirects to the manager approval workflow when the amount exceeds $500.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q24"> D) Implement a validation step that runs after `process_refund` completes and reverses any refunds that exceeded the threshold.</label><br>

---

**Q25.** A developer productivity agent has a `PostToolUse` hook that transforms raw Bash output. Currently the hook appends a formatted summary but also preserves the full raw output in the result passed to the model. Sessions exploring large codebases are hitting context limits faster than expected.

What change would most effectively reduce unnecessary context consumption from tool results?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q25"> A) Disable the `PostToolUse` hook entirely and let the model process raw Bash output directly.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q25"> B) Modify the hook to return only the formatted summary to the model, trimming the verbose raw output rather than preserving it alongside the summary.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q25"> C) Increase the model's `max_tokens` parameter to accommodate the additional context from both raw and formatted output.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q25"> D) Switch from `PostToolUse` hooks to pre-processing the Bash commands themselves to produce shorter output.</label><br>

---


**Q26.** You are building an automated code review system using Claude. The review must cover three aspects for every pull request: security vulnerabilities, style compliance, and performance implications. Each aspect has clear, defined criteria documented in your engineering handbook.

Which decomposition strategy is most appropriate?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q26"> A) Dynamic adaptive decomposition: have the agent start by scanning the full PR and generate a review plan based on what it finds.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q26"> B) Prompt chaining with sequential focused passes: one pass per review aspect (security, style, performance), each with dedicated criteria.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q26"> C) A single comprehensive pass that examines all three aspects simultaneously to capture cross-cutting concerns.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q26"> D) Spawn three fully independent agents without shared context, then merge their outputs in a final aggregation step.</label><br>

---

**Q27.** An engineering team asks you to design a Claude-based system to investigate a production incident. The system must root-cause a bug that was introduced somewhere in the past two weeks across an unknown set of files and services. The scope of the investigation cannot be known in advance.

Which decomposition approach is most appropriate?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q27"> A) Prompt chaining: design a fixed sequence of investigation steps (check logs, read configs, trace service calls) that the agent executes in order.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q27"> B) Dynamic adaptive decomposition: the agent first maps the affected services and symptom timeline, then generates and prioritizes investigation subtasks based on what is discovered at each step.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q27"> C) Split the investigation between two agents: one agent reads logs while the other reads source code, and they report findings independently to a human operator.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q27"> D) Have the agent run a comprehensive search of all changed files in the past two weeks and produce a ranked list of candidates for manual review.</label><br>

---


**Q28.** A developer has been using Claude Code to investigate a legacy authentication service. After several hours, they have built up a detailed session with findings about the service's token validation logic. They need to step away and return tomorrow. Three core files in the authentication module will be modified overnight by another team.

What is the most reliable approach for resuming the investigation productively the next day?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q28"> A) Resume the named session with `--resume <session-name>` and notify the agent about the specific files that were changed, so it can re-analyze those files in the context of its prior understanding.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q28"> B) Start a completely new session each time, since stale tool results from the previous session make resumption unreliable for any scenario.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q28"> C) Resume the named session without any notification about file changes; the agent will detect modifications automatically when it next reads those files.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q28"> D) Use `fork_session` to create a branch of the current session before stepping away, then resume from the fork the next day.</label><br>

---

**Q29.** You are leading a research investigation using Claude Code. You have completed an initial analysis of a competitor's public API documentation and want to explore two divergent architectural approaches for your response strategy: one focused on feature parity, one focused on differentiation. You want both explorations to start from the same analysis baseline.

Which session management approach best fits this scenario?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q29"> A) Run two separate new sessions, each with a copy of the analysis findings injected as context in the initial prompt.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q29"> B) Use `--resume` to resume the current session twice in parallel, once for each exploration direction.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q29"> C) Use `fork_session` to create two independent branches from the current session, then explore each approach in its respective branch.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q29"> D) Continue in the same session, exploring one approach, then using `/compact` to clear context before exploring the second approach.</label><br>

---



**Q2.** Production logs show the agent frequently calls `get_customer` when users ask about orders, instead of calling `lookup_order`. Both tools have minimal descriptions and accept similar identifier formats. What's the most effective first step to improve tool selection reliability?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q2"> A) Add few-shot examples to the system prompt demonstrating correct tool selection patterns, with 5-8 examples.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q2"> B) Expand each tool's description to include input formats it handles, example queries, edge cases, and boundaries explaining when to use it versus similar tools.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q2"> C) Implement a routing layer that parses user input before each turn and pre-selects the appropriate tool based on detected keywords.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q2"> D) Consolidate both tools into a single `lookup_entity` tool that accepts any identifier and internally determines which backend to query.</label><br>

---

**Q30.** Your customer support agent has a `lookup_order` tool that is called at the right times, but frequently returns errors. Logs show the agent passes free-text descriptions like "order from last Tuesday" instead of the required ISO-8601 timestamp format. The tool description reads: "Retrieves order details given a date or identifier." No examples or format constraints are provided.

What change to the tool definition would most directly reduce these input format errors?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q30"> A) Add input format constraints, accepted value formats, and example inputs to the tool description so the model knows exactly how to format its calls.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q30"> B) Add a system prompt instruction: "Always use ISO-8601 format when calling lookup_order."</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q30"> C) Add input schema validation that rejects malformed inputs and returns an error to the agent.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q30"> D) Split `lookup_order` into two tools: `lookup_order_by_id` and `lookup_order_by_date` to reduce ambiguity.</label><br>

---

**Q31.** Your customer support agent has three tools with overlapping names and descriptions: `get_account_info` ("Get information about the account"), `fetch_account_details` ("Fetch account details"), and `retrieve_customer_record` ("Retrieve customer information"). All three call different backend systems with different data. The agent frequently picks the wrong tool.

Which approach most effectively resolves the misrouting?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q31"> A) Add a system prompt instruction listing all three tools and specifying exactly when each should be used based on the request type.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q31"> B) Rename the tools to reflect their distinct data sources and rewrite their descriptions to explain what data each returns, what backend it queries, and what use case it serves.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q31"> C) Consolidate all three tools into one tool with a `source` parameter that specifies which backend to query.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q31"> D) Keep the current tools but randomize which one the agent calls, then merge the responses in a post-processing step.</label><br>

---


**Q8.** The web search subagent times out while researching a complex topic. You need to design how this failure information flows back to the coordinator agent. Which error propagation approach best enables intelligent recovery?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q8"> A) Return structured error context to the coordinator including the failure type, the attempted query, any partial results, and potential alternative approaches.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q8"> B) Implement automatic retry logic with exponential backoff within the subagent, returning a generic "search unavailable" status only after all retries are exhausted.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q8"> C) Catch the timeout within the subagent and return an empty result set marked as successful.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q8"> D) Propagate the timeout exception directly to a top-level handler that terminates the entire research workflow.</label><br>

---

**Q32.** Your customer support MCP tool `process_refund` returns the same error response for all failures: `{"status": "error", "message": "Operation failed"}`. The agent currently handles all errors by apologizing to the customer and ending the conversation. Logs show this response is triggered by: network timeouts, invalid refund amounts, refunds blocked by fraud detection, and expired order IDs.

What structured error response design would most improve the agent's ability to recover appropriately?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q32"> A) Return different HTTP status codes for each failure type and have the agent interpret the status code to determine recovery action.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q32"> B) Return structured error metadata including `errorCategory` (transient/validation/permission/business), `isRetryable` boolean, and a human-readable explanation specific to the failure reason.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q32"> C) Return a verbose error log with the full stack trace and system state so the agent has maximum information to reason from.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q32"> D) Return a numeric error code and have the system prompt map each code to a recovery action.</label><br>

---

**Q33.** A web search subagent in your research system calls `search_web` and receives the following response: `{"results": [], "status": "success"}`. The subagent reports to the coordinator: "Web search was successful but no relevant results were found." Later you discover the search API was actually down and returning empty results for all queries.

What change to the MCP tool's error handling would prevent this confusion?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q33"> A) Always return a non-empty results array by including fallback content when the actual search returns nothing.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q33"> B) Distinguish between access failures (where the backend could not be reached or returned an error) and valid empty results (where the search succeeded but found no matches), using the `isError` flag for the former.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q33"> C) Add a `confidence` field to the response so the agent can infer whether the empty result is a real outcome or a failure.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q33"> D) Implement automatic retry in the MCP tool itself, so the agent never sees an empty result unless all retries were exhausted.</label><br>

---

**Q34.** Your MCP tool `check_fraud_risk` returns `{"isError": true, "message": "Refund blocked"}` when a refund is flagged by fraud detection. The agent interprets this as a transient failure and retries the refund three times before giving up. Each retry generates a separate fraud alert in your compliance system.

What is the missing element in the error response design?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q34"> A) The response should include a `retry_after` timestamp so the agent knows when to retry.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q34"> B) The response should include `isRetryable: false` and a customer-appropriate explanation distinguishing this business rule block from a transient system error.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q34"> C) The tool should suppress the `isError` flag for fraud blocks and instead return the result as a successful response with a `blocked: true` field.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q34"> D) The response should include the fraud risk score so the agent can decide whether the score is high enough to justify blocking.</label><br>

---


**Q9.** The synthesis agent frequently needs to verify specific claims while combining findings. Currently, this creates 2-3 round trips per task, increasing latency by 40%. 85% of verifications are simple fact-checks; 15% require deeper investigation. What's the most effective approach to reduce overhead while maintaining reliability?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q9"> A) Give the synthesis agent a scoped `verify_fact` tool for simple lookups, while complex verifications continue delegating to the web search agent through the coordinator.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q9"> B) Have the synthesis agent accumulate all verification needs and return them as a batch to the coordinator at the end of its pass.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q9"> C) Give the synthesis agent access to all web search tools so it can handle any verification need directly without round-trips.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q9"> D) Have the web search agent proactively cache extra context around each source during initial research, anticipating what the synthesis agent might need to verify.</label><br>

---

**Q35.** You are building a multi-agent research system with a synthesis agent whose sole job is combining findings from subagents and producing a structured report. You have given the synthesis agent access to all 18 tools in your system: web search, file reading, database queries, email sending, calendar access, and more, reasoning that more tools provide more flexibility.

What problem does this configuration most likely introduce?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q35"> A) The synthesis agent will refuse to call any tools because it is overwhelmed by the number of choices.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q35"> B) Having access to tools outside its specialization increases the likelihood the synthesis agent will misuse them, such as initiating new web searches instead of synthesizing the provided findings.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q35"> C) 18 tools will exceed the context window limit for tool schemas, causing API errors on every request.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q35"> D) The additional tools will slow down the synthesis agent because the model must read all tool descriptions before producing output.</label><br>

---

**Q36.** Your customer support system requires that every response from the `draft_response` agent includes a structured JSON summary before the agent returns its output. You want to guarantee the agent calls the `generate_summary` tool on every invocation, not optionally.

Which `tool_choice` configuration achieves this?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q36"> A) Set `tool_choice: "auto"` so the model decides when the summary tool is needed.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q36"> B) Set `tool_choice: "any"` so the model must call at least one tool, though it may choose a different tool instead.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q36"> C) Set `tool_choice: {"type": "tool", "name": "generate_summary"}` to force the model to call `generate_summary` specifically.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q36"> D) Remove all other tools from the agent's tool list so `generate_summary` is the only option available.</label><br>

---


**Q37.** Your team is setting up a shared GitHub MCP server for all engineers on a project. The server requires a GitHub API token for authentication. You want every engineer who clones the repository to have the MCP server available without each person having to manually configure it, and you want to avoid committing the actual token to version control.

What is the correct configuration approach?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q37"> A) Add the MCP server to `~/.claude.json` on each developer's machine with their personal token hardcoded.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q37"> B) Add the MCP server to the project-scoped `.mcp.json` file with the token specified using environment variable expansion (e.g., `${GITHUB_TOKEN}`), and commit `.mcp.json` to the repository.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q37"> C) Add the MCP server configuration to the root `CLAUDE.md` file under a `[mcp_servers]` section.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q37"> D) Create a setup script that each developer runs once to add the MCP server to their personal `~/.claude.json` with their token.</label><br>

---

**Q38.** A developer productivity agent frequently makes multiple exploratory tool calls to discover what data sources are available in your MCP server before it can answer user questions. This pattern increases latency and consumes context for routine requests.

What MCP feature most directly addresses this discovery overhead?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q38"> A) Add a `list_tools` meta-tool to the MCP server that returns all available tool names and descriptions.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q38"> B) Expose content catalogs as MCP resources, giving the agent visibility into available data at connection time rather than through exploratory tool calls.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q38"> C) Reduce the number of tools in the MCP server by merging similar tools together to minimize the discovery surface.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q38"> D) Add a caching layer that stores the results of previous exploratory calls and reuses them across sessions.</label><br>

---


**Q39.** A developer productivity agent needs to find all TypeScript files in a project that import from a deprecated module named `legacy-auth`. The project has thousands of files across many directories.

Which combination of built-in tools is most appropriate for this task?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q39"> A) Use `Bash` to run `find . -name "*.ts"` and then `Bash` again to run `grep` on each file found.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q39"> B) Use `Glob` to find all `.ts` files, then use `Read` to open each file and check whether it contains the import.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q39"> C) Use `Grep` to search for the import pattern across all TypeScript files in the codebase.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q39"> D) Use `Read` on the project root directory to get a file listing, then recursively `Read` each subdirectory.</label><br>

---

**Q40.** A developer productivity agent needs to update a configuration value in a file. The value appears in a block of code that contains several nearly identical lines. When the agent uses `Edit`, the tool returns an error: "Match not unique: found 3 occurrences of the target text."

What is the correct fallback approach?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q40"> A) Use `Bash` to run a `sed` command to replace all occurrences of the target text simultaneously.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q40"> B) Use `Read` to load the full file contents, identify the exact surrounding context needed to make the edit unique, and retry `Edit` with a larger `old_string` that uniquely identifies the correct location.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q40"> C) Use `Write` to overwrite the entire file with a corrected version, based on the contents loaded by `Read`.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q40"> D) Use `Grep` to locate the line number of each occurrence, then use `Edit` with a line number parameter to target the correct one.</label><br>

---



**Q41.** A senior engineer adds detailed coding standards and security guidelines to their `~/.claude/CLAUDE.md` file. When a new team member joins and clones the repository, they report that Claude Code behaves differently and does not appear to follow the team's documented standards. What is the most likely cause?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q41"> A) The new team member's Claude Code version is outdated and does not support shared configuration files.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q41"> B) The `~/.claude/CLAUDE.md` file is user-scoped and not version-controlled, so teammates do not receive it when they clone the repository.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q41"> C) CLAUDE.md files must be placed in the `.claude/` subdirectory to be recognized; a root-level `CLAUDE.md` is ignored.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q41"> D) The configuration hierarchy requires the project-level file to explicitly import from user-level files using `@import`.</label><br>

---

**Q42.** Your monorepo has a root `CLAUDE.md` that has grown to over 400 lines, covering Python conventions, TypeScript conventions, infrastructure rules, and testing standards. Developers report that Claude sometimes applies the wrong conventions to the wrong files, and the file is difficult to maintain. What is the best approach to reorganize this configuration?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q42"> A) Split the content into multiple files in `.claude/rules/`, with each file covering a focused topic, and use path-scoped YAML frontmatter to activate rules only for relevant files.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q42"> B) Create a separate `CLAUDE.md` in each top-level package directory and delete the root file entirely.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q42"> C) Add inline section headers to the monolithic file and use the `/memory` command to tell Claude which section to prioritize for each task.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q42"> D) Break the root `CLAUDE.md` into topic files and use `@import` directives in the root file to pull them all in unconditionally.</label><br>

---

**Q54.** You maintain a monorepo with five packages: a Python backend, a TypeScript frontend, a Go service, shared infrastructure Terraform, and a documentation site. Each package has different linting standards, testing conventions, and framework-specific rules. The root `CLAUDE.md` has grown to 600 lines and developers report that rules intended for one package often bleed into sessions working on another. What is the most modular and maintainable solution using CLAUDE.md configuration?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q54"> A) Create a `CLAUDE.md` in each package directory with that package's rules, and use `@import` in the root `CLAUDE.md` to include shared conventions that apply to all packages.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q54"> B) Keep the 600-line root file but add explicit section headers and instruct developers to tell Claude which section applies at the start of each session.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q54"> C) Delete the root `CLAUDE.md` and rely entirely on package-level files, accepting that shared conventions must be duplicated across packages.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q54"> D) Move all rules into `.claude/rules/` files and tag each with a `projects:` key in their frontmatter specifying which subdirectory the rule applies to.</label><br>

---


**Q4.** You want to create a custom `/review` slash command that runs your team's standard code review checklist and should be available to every developer when they clone or pull the repository. Where should you create this command file?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q4"> A) In the `.claude/commands/` directory in the project repository</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q4"> B) In `~/.claude/commands/` in each developer's home directory</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q4"> C) In the `CLAUDE.md` file at the project root</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q4"> D) In a `.claude/config.json` file with a `commands` array</label><br>

---

**Q43.** A developer wants a `/scaffold` skill that generates boilerplate for a new microservice. The skill runs many exploratory file reads and Bash commands to understand existing patterns before generating output, producing hundreds of lines of intermediate output. Teammates complain this pollutes their main conversation context. Which frontmatter setting resolves this?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q43"> A) Set `allowed-tools: []` in the skill's frontmatter to prevent tool use during execution.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q43"> B) Set `context: fork` in the skill's frontmatter to run the skill in an isolated sub-agent context that does not affect the main session.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q43"> C) Move the skill file from `.claude/skills/` to `.claude/commands/` so it runs as a command rather than a skill.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q43"> D) Add `argument-hint: "service-name"` to the frontmatter so the skill receives a clean input without inheriting session context.</label><br>

---


**Q6.** Your codebase has distinct areas with different conventions. Test files are spread throughout the codebase alongside the code they test. You want all tests to follow the same conventions regardless of location. What's the most maintainable way to ensure Claude automatically applies the correct conventions when generating code?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q6"> A) Create rule files in `.claude/rules/` with YAML frontmatter specifying glob patterns to conditionally apply conventions based on file paths.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q6"> B) Consolidate all conventions in the root `CLAUDE.md` file under headers for each area, relying on Claude to infer which section applies.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q6"> C) Create skills in `.claude/skills/` for each code type that include the relevant conventions in their `SKILL.md` files.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q6"> D) Place a separate `CLAUDE.md` file in each subdirectory containing that area's specific conventions.</label><br>

---

**Q44.** Your team uses Terraform for infrastructure but only in the `infra/` directory. You want Claude to automatically apply Terraform naming conventions and module structure rules only when editing `.tf` files, without those rules appearing in unrelated Python or TypeScript sessions. What is the correct approach?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q44"> A) Create a `CLAUDE.md` file inside `infra/` that contains the Terraform rules so they apply only within that subdirectory.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q44"> B) Create a rules file in `.claude/rules/terraform.md` with YAML frontmatter specifying `paths: ["infra/**/*"]` and listing the Terraform conventions.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q44"> C) Add the Terraform rules to the root `CLAUDE.md` under a clearly marked section, and instruct Claude in the system prompt to apply them only to `.tf` files.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q44"> D) Create a skill in `.claude/skills/terraform.md` with `allowed-tools` restricted to file operations on the `infra/` directory.</label><br>

---


**Q5.** You've been assigned to restructure a monolithic application into microservices. This will involve changes across dozens of files and requires decisions about service boundaries and module dependencies. Which approach should you take?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q5"> A) Enter plan mode to explore the codebase, understand dependencies, and design an implementation approach before making changes.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q5"> B) Start with direct execution and make changes incrementally, letting the implementation reveal the natural service boundaries.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q5"> C) Use direct execution with comprehensive upfront instructions detailing exactly how each service should be structured.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q5"> D) Begin in direct execution mode and only switch to plan mode if you encounter unexpected complexity during implementation.</label><br>

---

**Q45.** A developer asks Claude Code to add a single null-check to one function in a utility module. The function signature, expected behavior, and fix are all clear. Should they use plan mode or direct execution?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q45"> A) Plan mode, because any code change could have unexpected side effects that need exploration before committing.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q45"> B) Direct execution, because the task is well-scoped with a clear fix that does not require architectural decisions or multi-file analysis.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q45"> C) Plan mode, because exploring the codebase first prevents Claude from making assumptions about dependencies.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q45"> D) Use direct execution first, but run a quick plan mode scan afterward to catch any side effects before committing.</label><br>

---

**Q46.** A developer is using plan mode to explore a large codebase before deciding how to approach a library migration. During exploration, Claude generates dozens of tool results including full file reads, search outputs, and dependency traces. The developer notices the main conversation context is filling up rapidly and fears context exhaustion before the plan is complete. What is the most appropriate technique to preserve main session context during verbose exploration?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q46"> A) Switch to direct execution partway through exploration so that Claude uses fewer tool calls.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q46"> B) Use the Explore subagent to isolate verbose discovery output, having it return a structured summary to the main session rather than accumulating raw results.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q46"> C) Run `/compact` immediately after each tool call to keep the context window from growing.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q46"> D) Restrict Claude to reading only entry point files during plan mode to limit tool call volume.</label><br>

---


**Q47.** A developer asks Claude Code to reformat date strings in a data pipeline. After the first attempt, the output format is partially correct but inconsistent: some dates are formatted as `YYYY-MM-DD`, others as `MM/DD/YYYY`. Prose instructions like "always use ISO 8601" have been tried twice without improvement. What technique is most likely to resolve the inconsistency?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q47"> A) Rewrite the instruction to be more emphatic, using capitalization and repetition to signal importance.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q47"> B) Provide 2-3 concrete input/output examples showing the exact transformation expected, including edge cases like two-digit years and ambiguous formats.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q47"> C) Switch to plan mode so Claude can explore the codebase before formatting dates.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q47"> D) Ask Claude to generate a formatting function first, then apply it in a second pass.</label><br>

---

**Q48.** A development team is using Claude Code to implement a new authentication module. Before any implementation begins, the team lead wants to ensure Claude surfaces potential security considerations, edge cases, and design tradeoffs that the team may not have anticipated. Which iterative refinement technique is most appropriate here?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q48"> A) Write a detailed specification document and pass it to Claude for direct implementation.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q48"> B) Use the interview pattern: ask Claude to question the team about their requirements, constraints, and assumptions before proposing a design.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q48"> C) Start with a minimal implementation and iterate by describing issues found during code review.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q48"> D) Provide a complete test suite first and ask Claude to write code that passes all tests.</label><br>

---

**Q49.** Claude Code generated a data transformation function that has three separate issues: an off-by-one error in a loop, a missing null check for an optional field, and an incorrect sort order. Each issue is in a completely different part of the function and none of them interact. What is the recommended approach for addressing these issues?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q49"> A) Report all three issues in a single detailed message so Claude has full context for all fixes at once.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q49"> B) Fix them sequentially: address each issue in a separate message and verify the fix before moving to the next.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q49"> C) Ask Claude to regenerate the entire function from scratch rather than patching the existing code.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q49"> D) Address the off-by-one error and null check together since they are in loops, then fix the sort order separately.</label><br>

---

**Q51.** A developer has identified three issues in a data processing module: two logic bugs that interact because they both affect the same intermediate result, and a set of five inconsistent variable names scattered across multiple files. The logic bugs produce incorrect output only when both are present; the naming violations are independent style issues. How should these issues be addressed using iterative refinement?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q51"> A) Report all eight issues in a single message so Claude can resolve them together with full context.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q51"> B) Send the two interacting logic bugs in one message so Claude can resolve them together, then address the naming violations sequentially in separate follow-up messages after verifying the bug fixes.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q51"> C) Fix all naming violations first since they are simpler, then tackle the two logic bugs in a single message.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q51"> D) Fix each of the eight issues in eight separate sequential messages, verifying each before proceeding.</label><br>

---

**Q52.** A team is adding a caching layer to an existing microservice. The service was written two years ago by engineers who are no longer on the team, and its internal patterns for dependency injection and lifecycle management are unfamiliar to the current developer. Before writing any code, the developer wants to ensure Claude surfaces all relevant design considerations. Which iterative refinement technique is most appropriate?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q52"> A) Ask Claude to implement a generic Redis-based caching layer using standard patterns for the framework, then review its output for compatibility issues.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q52"> B) Use the interview pattern: ask Claude to question you about the service's architecture, existing lifecycle hooks, and caching requirements before proposing any design.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q52"> C) Provide the service's entry point files to Claude and ask it to generate a caching design document for review.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q52"> D) Start with a minimal proof-of-concept cache for one endpoint and iterate by describing any failures encountered during testing.</label><br>

---


**Q10.** Your pipeline script runs `claude "Analyze this pull request for security issues"` but the job hangs indefinitely. Logs indicate Claude Code is waiting for interactive input. What's the correct approach?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q10"> A) Add the `-p` flag: `claude -p "Analyze this pull request for security issues"`</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q10"> B) Set the environment variable `CLAUDE_HEADLESS=true` before running the command</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q10"> C) Redirect stdin from `/dev/null`: `claude "Analyze this pull request for security issues" < /dev/null`</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q10"> D) Add the `--batch` flag: `claude --batch "Analyze this pull request for security issues"`</label><br>

---

**Q50.** A CI pipeline runs Claude Code to generate test cases for each pull request. The team discovers that Claude is consistently suggesting test scenarios that already exist in the existing test files, wasting review time. Which approach in the CLAUDE.md configuration most directly addresses this problem?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q50"> A) Add the `-p` flag to the CI invocation command to prevent interactive prompts.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q50"> B) Use `--output-format json` with `--json-schema` so that test suggestions are machine-parseable for deduplication.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q50"> C) Document in `CLAUDE.md` the testing standards, available fixtures, and instruct Claude to review existing test files before suggesting new scenarios.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q50"> D) Add a post-processing script to the pipeline that compares Claude's suggestions against the existing test files and filters duplicates.</label><br>

---

**Q53.** A CI pipeline uses Claude Code to review pull requests and needs to post inline comments on specific lines in GitHub. The pipeline currently receives Claude's output as unstructured text, which requires a fragile regex parser to extract file paths, line numbers, and comment text. The parser breaks regularly as Claude's output format drifts between runs. What is the most robust solution?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q53"> A) Add stricter formatting instructions to the system prompt specifying the exact text structure expected, and add validation to reject any response that does not match.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q53"> B) Use `--output-format json` combined with `--json-schema` to define a schema with `file`, `line`, and `comment` fields, so each finding is machine-parseable by construction.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q53"> C) Add a post-processing step that uses a second Claude call to normalize the first response into a consistent structured format.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q53"> D) Switch from inline comments to a single summary comment, which is easier to extract since it does not require line-level parsing.</label><br>

---



**Q55.** A CI code review prompt flags 60% of pull requests for "potential security vulnerabilities." Developers have stopped reading the reports because nearly all flags are false positives on standard input validation patterns they consider acceptable. Adding "only report high-confidence findings" to the prompt has had no measurable effect. What is the most effective next step?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q55"> A) Replace the security review prompt with a rule-based static analysis tool that has zero false positives.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q55"> B) Temporarily disable the security category and add explicit criteria defining which patterns constitute a reportable vulnerability versus acceptable practice, with concrete code examples for each.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q55"> C) Increase the review model to a larger tier to improve its judgment on security issues.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q55"> D) Add a post-processing confidence threshold: discard any finding where Claude rates its own confidence below 80%.</label><br>

---

**Q56.** A Claude-based pull request reviewer raises "magic number" warnings on every numeric literal in the codebase, including well-understood constants like HTTP status codes and standard buffer sizes. Developers want magic numbers flagged only when they appear in business logic with no explanation. How should the prompt be updated?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q56"> A) Add an instruction to "use good judgment about whether numbers are truly magic numbers."</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q56"> B) Define explicit criteria: flag numeric literals that appear in business logic calculations with no accompanying comment or named constant; exclude HTTP status codes, standard buffer sizes, and any value documented in a comment.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q56"> C) Add a severity field to findings and instruct Claude to omit any finding with severity "low."</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q56"> D) Provide a list of allowed numeric values that should never be flagged.</label><br>

---

**Q57.** A Claude-based code reviewer is generating inconsistent feedback on documentation quality: sometimes flagging missing docstrings for private helper functions, sometimes not; sometimes requiring full parameter descriptions, sometimes accepting one-line summaries. The team wants consistent, predictable documentation feedback on public API functions only. Which change most directly addresses the inconsistency?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q57"> A) Instruct Claude to "apply documentation standards consistently and carefully."</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q57"> B) Define explicit documentation criteria: public API functions must have a docstring with a one-sentence summary, parameter descriptions, and return value description; private functions are excluded from documentation checks.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q57"> C) Run three parallel review instances and accept feedback that appears in at least two of the three.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q57"> D) Restrict the review prompt to only one concern at a time, alternating between security, documentation, and style in separate runs.</label><br>

---



**Q58.** A team uses Claude to generate code review comments for pull requests. The comments are technically accurate but vary widely in format: some include file paths and line numbers, others are vague summaries, some use bullet points, and others write prose paragraphs. Developers want a consistent, actionable format: file path, line number, issue description, suggested fix. What is the most effective way to achieve this?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q58"> A) Add a format specification to the system prompt listing the required fields.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q58"> B) Provide 2-4 few-shot examples in the prompt showing the exact desired output format for different types of issues, including file path, line number, issue description, and suggested fix.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q58"> C) Use `--output-format json` and parse the results in a post-processing step to normalize format.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q58"> D) Ask Claude to self-review its output and reformat any comment that does not match the required structure.</label><br>

---

**Q59.** A structured data extraction system is extracting contract clauses from legal documents. The model handles standard clauses well but consistently misclassifies ambiguous clauses that could fit two or more categories, such as a clause that contains both termination conditions and force majeure language. What few-shot prompting approach is most effective for improving accuracy on these edge cases?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q59"> A) Add more few-shot examples of standard, unambiguous clauses to reinforce the classification schema overall.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q59"> B) Create targeted few-shot examples that specifically demonstrate ambiguous-case handling: showing the reasoning for why a clause with both termination and force majeure language belongs to one category and not the other.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q59"> C) Switch from classification to extraction: ask Claude to extract the clause text without categorizing it, then apply a rule-based classifier.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q59"> D) Add a confidence score field and route all low-confidence classifications to human review without attempting to improve the model's judgment.</label><br>

---

**Q60.** A document extraction system uses Claude to pull financial figures from quarterly earnings reports. The reports have varied formats: some use tables, some use inline prose, some use both. Extraction accuracy for tabular data is high (94%) but prose-only documents show only 72% accuracy. What is the most targeted approach to improve prose extraction accuracy?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q60"> A) Increase the system prompt's emphasis on accuracy with stronger language and more detailed instructions.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q60"> B) Add few-shot examples specifically showing correct extraction from prose-formatted documents, including cases where numbers appear in sentence form rather than tables.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q60"> C) Pre-process all documents to convert prose financial data into table format before sending to Claude.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q60"> D) Use a separate prompt for prose documents that instructs Claude to first identify all sentences containing numbers, then extract figures from those sentences only.</label><br>

---



**Q61.** Your extraction pipeline uses a prompt that requests JSON output with a code block. In production, approximately 3% of responses have JSON syntax errors: missing commas, unescaped characters, or truncated objects. These errors break your downstream parser and require manual reprocessing. What is the most reliable way to eliminate JSON syntax errors?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q61"> A) Add a validation step that re-runs the prompt if the output fails JSON parsing, up to 3 retries.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q61"> B) Switch to tool use with a defined JSON schema as the input parameter; extract structured data from the `tool_use` response block.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q61"> C) Add an instruction to the prompt: "Your response must be valid JSON. Double-check for syntax errors before responding."</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q61"> D) Use a regex post-processor to fix the most common syntax errors before passing output to the parser.</label><br>

---

**Q62.** Your structured data extraction pipeline processes invoices. You have two extraction tools: `extract_invoice_schema` and `extract_receipt_schema`. For each document, you do not know in advance which type it is. After switching to `tool_choice: "auto"`, you observe that 30% of the time the model returns a text description of what it found rather than calling either tool. What is the correct fix?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q62"> A) Set `tool_choice: "any"` to guarantee the model calls one of the available extraction tools without specifying which one.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q62"> B) Set `tool_choice: {"type": "tool", "name": "extract_invoice_schema"}` to always call a specific tool.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q62"> C) Add a system prompt instruction: "Always call one of the extraction tools and never return text."</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q62"> D) Merge both schemas into a single `extract_document_schema` tool with an optional `document_type` field.</label><br>

---



**Q63.** An invoice extraction pipeline uses tool use with a strict JSON schema. After validation, 8% of extracted invoices fail a business rule check: the sum of line item amounts does not equal the `total_amount` field. These are semantic errors, not schema syntax errors. The invoices are well-formed documents with no missing data. How should you implement the retry loop?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q63"> A) Retry up to 3 times with the same prompt; schema-compliant extraction will converge on a valid answer with additional attempts.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q63"> B) On failure, append the original document, the failed extraction, and the specific validation error ("line items sum to X but total_amount is Y") to the follow-up prompt for model self-correction.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q63"> C) Flag all invoices with this error as missing data and route them directly to human review without retry.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q63"> D) Add a `calculated_total` field to the schema and populate it with the sum of line items in post-processing, then use the calculated total as the canonical value.</label><br>

---

**Q64.** A CI code review pipeline is generating false positive findings at a high rate. The team wants to understand which specific code constructs are being flagged incorrectly so they can refine the prompt. The current findings output only includes `file`, `line`, and `description`. What schema change would best enable systematic false positive analysis?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q64"> A) Add a `confidence` field (0-100) to each finding so the team can filter by confidence threshold.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q64"> B) Add a `detected_pattern` field to each finding that records the specific code construct or pattern that triggered the finding.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q64"> C) Add a `category` field so findings can be grouped by issue type for aggregate analysis.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q64"> D) Add an `is_false_positive` boolean field and instruct Claude to self-label its own false positives.</label><br>

---

**Q67.** A financial document extraction pipeline is failing on the "guarantor address" field for a set of loan summaries. After 3 retry attempts with error feedback, the field still extracts as null. Each retry prompt includes the original document and the validation error. What should you investigate before scheduling further retries?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q67"> A) Increase the retry limit from 3 to 5, since complex field extraction may require more attempts to converge.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q67"> B) Check whether the guarantor address is actually present in the loan summary document, or whether the document only references it by directing the reader to an external exhibit.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q67"> C) Switch to a larger model tier for the retry attempts, since the current model may lack the reasoning capacity for this field.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q67"> D) Restructure the schema to make the guarantor address field optional, allowing the pipeline to proceed when the field cannot be extracted.</label><br>

---



**Q11.** Your team wants to reduce API costs. Two workflows: (1) a blocking pre-merge check that must complete before developers can merge, and (2) a technical debt report generated overnight for review the next morning. Your manager proposes switching both to the Message Batches API for 50% cost savings. How should you evaluate this proposal?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q11"> A) Use batch processing for the technical debt reports only; keep real-time calls for pre-merge checks.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q11"> B) Switch both workflows to batch processing with status polling to check for completion.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q11"> C) Keep real-time calls for both workflows to avoid batch result ordering issues.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q11"> D) Switch both to batch processing with a timeout fallback to real-time if batches take too long.</label><br>

---

**Q65.** A compliance team runs a weekly audit that analyzes 50,000 contract documents for regulatory clauses. The audit results are reviewed by a compliance analyst every Monday morning. The team is considering the Message Batches API. A colleague raises a concern: "What if a batch fails partway through the 50,000 documents?" How should partial batch failures be handled?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q65"> A) Always resubmit the entire batch; tracking partial failures adds implementation complexity.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q65"> B) Use the `custom_id` field to correlate each request with its response, identify which documents returned error responses, and resubmit only those documents in a new batch.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q65"> C) Set a shorter processing window timeout to force faster completion and reduce the risk of partial failures.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q65"> D) Switch to real-time API calls with retry logic; the batch API is not suitable for mission-critical compliance workloads.</label><br>

---



**Q12.** A pull request modifies 14 files across the stock tracking module. Your single-pass review produces inconsistent results: detailed feedback for some files, superficial comments for others, obvious bugs missed, and contradictory feedback. How should you restructure the review?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q12"> A) Split into focused passes: analyze each file individually for local issues, then run a separate integration-focused pass examining cross-file data flow.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q12"> B) Require developers to split large PRs into smaller submissions of 3-4 files before the automated review runs.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q12"> C) Switch to a higher-tier model with a larger context window to give all 14 files adequate attention in one pass.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q12"> D) Run three independent review passes on the full PR and only flag issues that appear in at least two of the three runs.</label><br>

---

**Q66.** A developer generates a 300-line module using Claude Code in one session, then asks the same session to review the code for bugs. The review returns "looks good" with minor style suggestions but misses two logic errors that a colleague catches in manual review. What is the most likely cause, and what architectural change addresses it?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q66"> A) The context window was too large; the fix is to limit code generation to smaller chunks so the review has less to process.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q66"> B) The reviewing instance retains reasoning context from generation, making it less likely to question its own decisions. Use a second independent Claude instance without the generation context to perform the review.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q66"> C) The review prompt was too vague; adding more explicit review criteria to the same session would catch the missed errors.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q66"> D) The model tier used for generation is more capable than the one used for review; switching both to the same tier resolves the quality gap.</label><br>

---

**Q68.** A developer builds a code generation pipeline where Claude generates a 200-line module, and then the same session reviews the generated code for correctness. The review returns only minor style suggestions and misses a logic error in the error handling path. A second developer reviewing the code manually finds the bug immediately. What architectural change would make the review phase more effective?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q68"> A) Add more explicit review criteria to the generation session's system prompt to help it catch logic errors.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q68"> B) Use a second independent Claude instance without the generation context to perform the review, since the generating instance retains reasoning context that makes it less likely to question its own decisions.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q68"> C) Run the review immediately after generation before any other tool calls accumulate in the context window.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q68"> D) Switch to a larger model tier for the review step to improve reasoning quality.</label><br>

---



**Q69.** A customer support agent is handling a complex billing dispute that spans 20+ turns. A customer mentioned early in the conversation that they were charged $847.50 on March 3rd for a service they cancelled on February 28th. Midway through the conversation, the agent references the charge as "the overcharge from last month" without the specific amount. The customer disputes the agent's understanding of the case. What context management technique would prevent this?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q69"> A) Use `/compact` at the start of each conversation to summarize prior turns into a shorter representation.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q69"> B) Extract transactional facts (amounts, dates, order numbers, statuses) into a persistent "case facts" block that is included at the beginning of every subsequent prompt in the conversation.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q69"> C) Increase the model's context window by switching to a larger tier to retain the full conversation without summarization.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q69"> D) Instruct the agent to re-read the full conversation history before each response.</label><br>

---

**Q70.** A multi-agent research pipeline aggregates findings from six subagents, each returning 800-1,200 tokens of raw tool output and reasoning. The synthesis agent receives all results in a single large message. The final report consistently omits or contradicts findings that appeared in the middle sections of the aggregated input. What is the most likely cause and the most effective mitigation?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q70"> A) The subagents are returning conflicting information; add a deduplication step before synthesis.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q70"> B) The synthesis agent is hitting its output token limit; increase `max_tokens` to allow a longer response.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q70"> C) The "lost in the middle" effect causes models to reliably process content at the beginning and end of long inputs but miss middle sections. Mitigate by placing key findings summaries at the beginning of aggregated inputs and organizing sections with explicit headers.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q70"> D) The synthesis agent's context window is exhausted; route some subagent outputs through a secondary summarization agent before passing to synthesis.</label><br>

---



**Q3.** Your agent achieves 55% first-contact resolution, well below the 80% target. Logs show it escalates straightforward cases while attempting to autonomously handle complex situations requiring policy exceptions. What's the most effective way to improve escalation calibration?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q3"> A) Add explicit escalation criteria to your system prompt with few-shot examples demonstrating when to escalate versus resolve autonomously.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q3"> B) Have the agent self-report a confidence score (1-10) before each response and automatically route requests to humans when confidence falls below a threshold.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q3"> C) Deploy a separate classifier model trained on historical tickets to predict which requests need escalation before the main agent begins processing.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q3"> D) Implement sentiment analysis to detect customer frustration levels and automatically escalate when negative sentiment exceeds a threshold.</label><br>

---

**Q71.** A customer opens a support chat saying "I'd like to speak to a human please. I've been dealing with this billing issue for three weeks and I'm frustrated." The agent has already identified this as a standard billing adjustment that it can resolve in 2 steps using its available tools. Your agent responds by saying "I can help with that right away, let me pull up your account." and proceeds to investigate. The customer repeats their request for a human. What is wrong with this behavior and what should be corrected?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q71"> A) The agent should honor an explicit customer request for a human agent immediately on first request, without attempting investigation first.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q71"> B) The agent should detect negative sentiment and escalate once the frustration score exceeds a defined threshold.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q71"> C) The agent should complete its investigation, present the proposed solution, and escalate only if the customer still insists afterward.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q71"> D) The agent should apologize for the wait, then proceed with automated resolution since the case is within its capability.</label><br>

---



**Q72.** Your web search subagent encounters a timeout while fetching results for a competitor analysis. The engineering team implements a change so the subagent catches the timeout internally and returns an empty result set with `status: "success"` and `results: []`. The coordinator receives this and the synthesis agent produces a report that is missing the competitive section entirely, with no indication anything went wrong. What is the problem with this approach?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q72"> A) Silently returning an empty success result prevents the coordinator from making any recovery decision and allows incomplete work to pass as complete output.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q72"> B) The synthesis agent should be responsible for detecting empty sections and re-triggering the search subagent directly.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q72"> C) The coordinator should always validate that each subagent returned non-empty results before proceeding to synthesis.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q72"> D) The timeout threshold should be increased so that the subagent does not time out before returning real results.</label><br>

---



**Q73.** An agent is performing a deep exploration of a 200,000-line legacy codebase to understand its payment processing flow. After approximately 90 minutes and dozens of file reads, the agent begins referencing "standard patterns in payment systems" rather than the specific classes and flows it found earlier, and its answers become inconsistent with findings from the first hour. What is the most likely cause and the best mitigation strategy?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q73"> A) The agent has reached a rate limit; the fix is to add delays between tool calls to stay within limits.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q73"> B) Context degradation: as the session grows, specific findings from early in the session compete with general knowledge and the agent's position-attention effects. Mitigate by having the agent maintain a scratchpad file recording key findings throughout the session.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q73"> C) The legacy codebase's file structure is too complex for a single agent; break it into independent subsystems and run separate agents on each subsystem simultaneously.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q73"> D) The agent is using the wrong tools; switching from `Read` to `Grep` for file exploration would reduce context consumption.</label><br>

---

**Q74.** You are running a multi-phase codebase investigation using the Claude Agent SDK. After 45 minutes of exploration (reading files, tracing call chains, building a dependency map) you move into the second phase: identifying security vulnerabilities in the authentication module. You notice the agent is now describing the authentication module as "using standard JWT patterns" when earlier in the session it had found a custom token signing implementation. What technique would most effectively preserve key findings across these phase boundaries?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q74"> A) Have the agent maintain a scratchpad file that records key findings after each phase, and reference that file at the start of subsequent phases rather than relying on conversation history.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q74"> B) Use `/compact` before starting the second phase to free up context space and allow the agent to re-read files as needed.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q74"> C) Restart the session with a fresh context at the start of each phase, passing a manual summary of what you found.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q74"> D) Increase the `max_tokens` parameter so the model can hold more context without compressing earlier findings.</label><br>

---



**Q75.** A structured data extraction system for insurance claims achieves 97% overall accuracy on a validation set. The team proposes automating the full workflow without human review. A colleague argues this aggregate metric masks important risks. What is the most important concern?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q75"> A) 97% accuracy means 3% of claims will have errors, which could create legal liability if unchecked.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q75"> B) Aggregate accuracy metrics can mask poor performance on specific document types or fields. A claim type or field category with 85% accuracy would be hidden by strong performance elsewhere, and stratified analysis is needed before automating.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q75"> C) The validation set may not be representative of production data volumes, so the 97% figure cannot be trusted.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q75"> D) Human review should always be retained regardless of accuracy metrics because automation of insurance decisions creates regulatory risk.</label><br>

---

**Q76.** An extraction pipeline achieves high accuracy on average but the team wants to implement confidence-based routing: high-confidence extractions proceed automatically while low-confidence ones go to human review. A developer proposes using the model's stated confidence scores directly as the routing threshold. What is the critical flaw in this approach?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q76"> A) Confidence scores add tokens to every response, increasing API costs unnecessarily.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q76"> B) Model confidence scores must be calibrated against a labeled validation set to determine what score threshold actually corresponds to acceptable accuracy. Uncalibrated raw scores are not reliable predictors of extraction correctness.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q76"> C) Confidence scores only work when the model outputs a single extraction; multi-field documents require a different approach.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q76"> D) Routing on confidence scores creates two separate code paths that are harder to maintain than a single uniform review workflow.</label><br>

---



**Q77.** A research synthesis agent is combining findings from five subagents that searched different sources. The final report states that "AI adoption in healthcare reached 45% in 2024" but does not cite which source this came from. A reviewer cannot verify the claim because the subagents' individual outputs were not preserved. What structural change to the pipeline would prevent this provenance loss?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q77"> A) Require the synthesis agent to add a generic "Sources consulted" section at the end of the report listing all sources accessed.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q77"> B) Require subagents to output structured claim-source mappings (claim text, source URL, document name, relevant excerpt) and instruct the synthesis agent to preserve and merge these mappings into the final report rather than summarizing them away.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q77"> C) Store all raw subagent outputs in a separate log file so they can be consulted if a claim needs verification.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q77"> D) Add a post-synthesis review step where a separate agent checks each claim in the report against the raw subagent outputs.</label><br>
