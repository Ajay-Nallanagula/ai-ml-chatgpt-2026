# Claude Certified Architect – Foundations: Mock Exam 1

Format: 60 single-select multiple-choice questions (4 options, 1 correct answer), grouped by domain.
Answers and rationale are provided separately in `Prompt_mock_1_answers.md`.

---

## Domain 1: Agentic Architecture & Orchestration (Q1–Q16)

**Q1.** A warehouse inventory agent runs tool calls in a loop. The loop code checks whether the assistant's latest text output contains the substring "Done" to decide whether to stop calling tools. In production, the agent sometimes stops mid-task because an intermediate tool result happens to include the word "Done" (e.g., a shipment status of "Done"), and sometimes never stops because the model phrases its wrap-up differently each time. What is the correct fix?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q1"> A) Add a system prompt rule requiring the model to always say the exact word "Done" as its final sentence.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q1"> B) Terminate the loop when the API response's `stop_reason` is `"end_turn"` rather than `"tool_use"`, instead of inspecting text content.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q1"> C) Strip the word "Done" out of all tool results before they are appended to the conversation.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q1"> D) Add a fixed iteration cap of 5 tool calls and stop the loop once that cap is reached.</label><br>

---

**Q2.** A legal-document-summarization agent's loop has no explicit stopping condition based on the API response at all — it simply runs until a hardcoded limit of 25 tool calls is reached, then returns whatever text was last produced, even if the model was still in the middle of calling a tool. What is the most accurate characterization of this design?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q2"> A) It is correct, because iteration caps are the documented primary mechanism for ending agentic loops.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q2"> B) It is risky because it treats a safety boundary as the primary termination signal instead of relying on `stop_reason` to detect when the model has actually finished (`"end_turn"`) versus when it still intends to act (`"tool_use"`).</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q2"> C) It is correct as long as the cap is raised to at least 100 tool calls, since higher caps eliminate premature termination.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q2"> D) It is incorrect only because 25 is an arbitrary number; any sufficiently large fixed cap resolves the issue.</label><br>

---

**Q3.** A customer-onboarding coordinator always fans a request out to four subagents — identity verification, address validation, credit check, and document review — even for a simple request like "What information do I need to open an account?", which requires none of those lookups. This adds ~30 seconds of unnecessary latency per simple query. What change most directly addresses this?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q3"> A) Merge all four subagents into a single generalist onboarding subagent to cut latency in half.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q3"> B) Have the coordinator classify query complexity/type first and invoke only the subset of subagents relevant to that specific request.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q3"> C) Keep the fixed four-subagent pipeline but run the subagents in parallel instead of sequentially.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q3"> D) Instruct each subagent to return an empty result immediately if it determines its analysis is unnecessary.</label><br>

---

**Q4.** A research coordinator delegates to three subagents (statistics lookup, expert-quote gathering, and trend analysis). Each subagent returns findings in a different ad hoc shape — one returns a paragraph, one returns a bulleted list with no source labels, and one returns raw JSON. The coordinator's synthesis step frequently drops or garbles findings from at least one subagent. What is the most effective fix?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q4"> A) Ask the synthesis step to "try harder" to parse each subagent's format correctly.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q4"> B) Require the coordinator to run each subagent's output through a generic text-cleanup pass before synthesis.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q4"> C) Define a common structured output format (e.g., consistent JSON fields for claim, source, and category) that all three subagents must use, and pass that structured format to synthesis.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q4"> D) Drop the subagent whose output is hardest to parse and rely on the other two for synthesis.</label><br>

---

**Q5.** A coordinator agent's configuration lists `allowedTools: ["web_search", "summarize_text"]`. When tested, the coordinator never spawns any of its intended subagents, even though its system prompt describes a multi-agent workflow in detail. What is the most likely cause?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q5"> A) The subagents themselves are missing `allowedTools` entries.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q5"> B) The coordinator's `allowedTools` list does not include the subagent-invocation tool, so the model has no way to spawn subagents regardless of what the system prompt says.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q5"> C) The system prompt needs to list the subagent names in all capital letters for the model to recognize them.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q5"> D) Subagent spawning is disabled by default and requires a separate SDK license flag.</label><br>

---

**Q6.** A document-intake subagent returns extracted clauses to a coordinator as a single unstructured paragraph of prose, with no indication of which source document or page each clause came from. Downstream, the coordinator cannot tell the compliance-report agent where each clause originated. What is the correct fix at the context-passing boundary?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q6"> A) Have the compliance-report agent guess provenance based on writing style.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q6"> B) Have the document-intake subagent emit structured records that separate clause content from metadata (source document, page number), and pass that structure forward unmodified.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q6"> C) Instruct the coordinator to re-run document intake a second time to double check itself.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q6"> D) Concatenate the raw source documents into the compliance-report agent's prompt instead of passing subagent output at all.</label><br>

---

**Q7.** A coordinator must gather pricing data from three independent competitor websites using three separate web-research subagents. There is no dependency between the three lookups. How should the coordinator invoke them to minimize total wall-clock time?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q7"> A) Invoke all three subagents sequentially, since running more than one subagent per turn is not supported.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q7"> B) Emit all three subagent invocation calls within a single response so they execute concurrently.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q7"> C) Merge the three lookups into one subagent invocation with three different prompts issued one after another.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q7"> D) Alternate turns between subagents, giving each a partial prompt before moving to the next.</label><br>

---

**Q8.** An internal HR agent processes employee offboarding through required steps: (1) verify manager approval via `get_approval_status`, (2) revoke system access via `revoke_access`, (3) process final paycheck via `issue_final_payment`. Logs show that in rare cases `revoke_access` is called before `get_approval_status` has returned an approved status, revoking access for employees whose offboarding was never actually approved. A teammate proposes adding the sentence "Always confirm approval before revoking access" to the system prompt. Why is this insufficient on its own?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q8"> A) It is not insufficient — system prompt instructions are always followed exactly by the model.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q8"> B) Natural-language ordering instructions are probabilistic guidance, not an enforced constraint; a programmatic prerequisite that blocks `revoke_access` until an approved status is returned is needed to guarantee the ordering.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q8"> C) The instruction is insufficient only because it should be phrased as a numbered list instead of a sentence.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q8"> D) The instruction should instead be moved into the `revoke_access` tool's description rather than the system prompt.</label><br>

---

**Q9.** A traveler submits one message to a travel-support agent containing three independent requests: rebook a canceled flight, get a refund for a hotel, and update their frequent-flyer number. The agent currently resolves these one at a time in a single continuous exchange, taking several minutes total because each requires separate tool round-trips. What restructuring would most improve throughput without sacrificing accuracy?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q9"> A) Ask the customer to split their message into three separate conversations.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q9"> B) Decompose the message into three independent investigation items, resolve them using shared customer context (potentially in parallel tool calls), and compile one combined response.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q9"> C) Only resolve the first request found in the message and tell the customer to resend the others individually.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q9"> D) Cache the customer's identity lookup and otherwise keep the three requests fully sequential and isolated.</label><br>

---

**Q10.** A financial services agent must never disburse a loan payout above $10,000 without a compliance officer's sign-off. The system prompt currently states this rule in plain language, and audits show a small percentage of high-value payouts are still processed without sign-off. What is the most reliable way to guarantee this constraint is never violated?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q10"> A) Repeat the rule twice in the system prompt using stronger wording ("under no circumstances").</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q10"> B) Add several few-shot examples showing the agent requesting sign-off for high-value payouts.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q10"> C) Implement a hook that intercepts the payout tool call, checks the amount, and blocks or redirects execution to the sign-off workflow whenever the amount exceeds $10,000.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q10"> D) Add a post-hoc reconciliation job that reviews payouts nightly and reverses any that lacked sign-off.</label><br>

---

**Q11.** A support agent integrates with three backend systems that each represent "priority" differently: one uses `1`/`2`/`3`, one uses `"low"`/`"med"`/`"high"`, and one uses a 0–100 urgency score. The agent frequently misjudges which tickets are actually urgent because it reasons directly over these mismatched representations. What is the most appropriate architectural fix?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q11"> A) Add a paragraph to the system prompt explaining how to interpret each system's priority scale.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q11"> B) Implement a `PostToolUse` hook that normalizes each backend's priority representation into one consistent scale before the result reaches the model.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q11"> C) Ask the model to convert the values itself each time, since it is capable of arithmetic.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q11"> D) Only display raw values to the model and let a human reconcile discrepancies after the fact.</label><br>

---

**Q12.** A DevOps agent has access to a `run_deployment` tool that can push code to production. The team wants to guarantee that this tool never executes for any deployment targeting the `prod-payments` cluster without a second engineer's explicit approval recorded in the request, regardless of what the model decides. Which mechanism enforces this most reliably?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q12"> A) A `PreToolUse` hook that inspects the `run_deployment` call's target cluster and blocks execution unless an approval record is present.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q12"> B) A system prompt clause instructing the model never to deploy to `prod-payments` without approval.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q12"> C) A few-shot example showing the model refusing to deploy without approval.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q12"> D) A monitoring dashboard that alerts a human after an unapproved deployment has already occurred.</label><br>

---

**Q13.** A codebase-exploration agent's `PostToolUse` hook currently passes through the full raw stdout of every `Bash` command (sometimes thousands of lines) in addition to a short formatted summary the hook generates. Sessions are hitting context limits far faster than expected during long investigations. What change reduces unnecessary context consumption most effectively?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q13"> A) Remove the hook and let the model read raw Bash output unmodified.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q13"> B) Modify the hook to return only the formatted summary to the model, dropping the verbose raw output instead of keeping both.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q13"> C) Increase `max_tokens` so the model can process more of the combined output per turn.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q13"> D) Move the hook from `PostToolUse` to `PreToolUse` so it runs before the command executes.</label><br>

---

**Q14.** A team is building an agent to run a fixed, well-documented compliance checklist against every new vendor contract: check for an indemnification clause, check for a termination clause, and check for a data-privacy clause — always in that order, always the same three checks. Which decomposition strategy fits this task best?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q14"> A) Dynamic adaptive decomposition, since compliance requirements may vary contract to contract.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q14"> B) Prompt chaining with a fixed sequence of three focused passes, one per checklist item, since the scope and steps are already fully known in advance.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q14"> C) A single subagent with no defined steps, trusting the model to infer the checklist from context.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q14"> D) Spawn a new independent agent per contract clause type with no shared context between them.</label><br>

---

**Q15.** An SRE team asks an agent to determine why error rates spiked in a distributed system sometime in the last 48 hours, across an unknown and possibly large set of services. The exact scope of investigation cannot be known before the agent starts looking. Which decomposition approach is most appropriate?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q15"> A) A fixed prompt chain of three pre-defined steps (check logs, check metrics, check deploys) executed in that exact order regardless of findings.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q15"> B) Dynamic adaptive decomposition: the agent first surveys recent deploys and error signals, then generates and prioritizes further investigation subtasks based on what it discovers at each stage.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q15"> C) A single exhaustive pass that reads every service's full logs at once before drawing any conclusion.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q15"> D) Two independent agents that each investigate half the services alphabetically, with no coordination between them.</label><br>

---

**Q16.** An analyst has spent an hour with Claude Code building context on a dataset's quality issues and now wants to try two different remediation strategies — one that imputes missing values, one that drops incomplete rows — starting from the exact same accumulated understanding, without either exploration affecting the other. What is the best session-management approach?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q16"> A) Use `--continue` twice in two separate terminal windows to resume the same session concurrently.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q16"> B) Fork the current session into two independent branches so each remediation strategy can be explored separately from the same shared starting point.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q16"> C) Run `/compact` between the two explorations to keep context small.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q16"> D) Start two brand-new sessions and manually retype a summary of the dataset issues into each.</label><br>

---

## Domain 2: Tool Design & MCP Integration (Q17–Q27)

**Q17.** A support agent has two tools, `get_account_status` and `get_subscription_status`, both with one-line descriptions and both accepting an account ID. Logs show the agent frequently calls `get_account_status` when the user is actually asking about their subscription renewal date. What is the most effective first step?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q17"> A) Rename `get_subscription_status` to something more distinctive, without changing either description.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q17"> B) Expand each tool's description with the specific data it returns, example queries it's meant to answer, and how it differs from the other tool.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q17"> C) Add a routing keyword-matcher that intercepts the user's message before the model sees it.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q17"> D) Merge both tools into one and let the backend infer which data set to query.</label><br>

---

**Q18.** A `schedule_delivery` tool's description reads: "Schedules a delivery for a given time." It does not specify a time format. Logs show the agent frequently passes free-text phrases like "sometime next week," which the backend cannot parse, causing failures. What change most directly reduces these errors?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q18"> A) Add an instruction to the system prompt: "Always use a precise time format when calling schedule_delivery."</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q18"> B) Update the tool description to state the exact accepted format (e.g., ISO 8601 datetime), including a concrete example value.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q18"> C) Add input validation that silently rounds ambiguous phrases to the nearest business day.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q18"> D) Split the tool into `schedule_delivery_today` and `schedule_delivery_future` to reduce ambiguity.</label><br>

---

**Q19.** A `submit_claim` MCP tool returns the identical error body for every failure: `{"status": "error", "message": "Unable to process"}`. This single message is returned for duplicate claims, missing required fields, expired policy numbers, and backend outages. The agent currently reacts to all of these the same way, by telling the customer to "try again later," which is wrong for most of these cases. What is the core problem?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q19"> A) The tool should never return errors; it should always return a partial success.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q19"> B) The tool's error responses collapse fundamentally different failure categories into one undifferentiated message, giving the agent no basis for choosing an appropriate recovery action.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q19"> C) The agent should stop calling `submit_claim` altogether and escalate every claim to a human.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q19"> D) The error message should be translated into more languages to serve international customers.</label><br>

---

**Q20.** A `search_inventory` tool returns `{"items": [], "status": "success"}` both when a search genuinely finds no matching items and when the underlying inventory database is temporarily unreachable. An agent recently told several customers "that item is out of stock" when the database was actually down. What is the correct fix to the tool's response design?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q20"> A) Never return an empty `items` array under any circumstances; substitute similar items instead.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q20"> B) Use the `isError` field (or equivalent) to distinguish a genuine backend access failure from a valid, successful search that legitimately found zero matches.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q20"> C) Add a `confidence` score to every response so the agent can guess whether zero results is real.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q20"> D) Automatically retry the search internally until at least one item is returned.</label><br>

---

**Q21.** A `charge_card` tool returns `{"isError": true, "message": "Card declined"}` when a customer's card is declined by their bank for insufficient funds. The agent currently retries the charge two more times automatically, generating two additional decline notifications to the customer's bank. What is missing from the error response design?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q21"> A) A `retry_after` field telling the agent exactly when to retry.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q21"> B) An `isRetryable: false` field (or equivalent) plus a clear explanation that this is a non-transient decline, not a system error, so the agent knows not to retry automatically.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q21"> C) The raw bank response code, so the agent can decide for itself whether retrying is safe.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q21"> D) A `isError: false` flag so the decline is not treated as an error at all.</label><br>

---

**Q22.** A `finalize_order` agent must always call a `generate_order_summary` tool before returning its final answer to the customer, with no exceptions and no possibility of the model choosing to skip it or call a different tool instead. Which `tool_choice` setting achieves this?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q22"> A) `tool_choice: "auto"`</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q22"> B) `tool_choice: "any"`</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q22"> C) `tool_choice: {"type": "tool", "name": "generate_order_summary"}`</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q22"> D) Remove all other tools so `generate_order_summary` is the last one listed.</label><br>

---

**Q23.** A report-formatting agent's only job is to take already-gathered findings and produce a clean final document. It has been granted access to the full tool set used elsewhere in the system: web search, a code interpreter, a database query tool, and an email-sending tool, on the reasoning that "more tools means more flexibility." What problem does this most likely introduce?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q23"> A) The model will refuse to produce any output because it is overwhelmed by tool choice.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q23"> B) Access to tools outside its narrow purpose increases the risk that the agent misuses them — for example, running a fresh web search or sending an email instead of simply formatting the findings it was given.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q23"> C) The additional tool schemas will exceed the model's maximum context window on every call.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q23"> D) Formatting agents cannot be granted any tools at all under current API constraints.</label><br>

---

**Q24.** A team wants to share an internal ticketing-system MCP server configuration across the whole engineering org so that everyone who clones the monorepo automatically has it available, without committing anyone's personal API token to source control. What is the correct approach?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q24"> A) Commit a project-scoped MCP config file where the token is referenced via environment-variable expansion (e.g., `${TICKETING_API_TOKEN}`) rather than hardcoded.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q24"> B) Hardcode one shared token directly into the committed config file for simplicity.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q24"> C) Document the required MCP server setup in the root `CLAUDE.md` under a special section, since CLAUDE.md files can register MCP servers directly.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q24"> D) Have each engineer email their token to the platform team, who inject it into a shared config file checked into a separate private repo.</label><br>

---

**Q25.** A developer-productivity agent connected to an internal knowledge-base MCP server repeatedly issues several exploratory tool calls just to discover what documents and datasets exist before it can answer even simple questions, adding noticeable latency to routine queries. What MCP-level change most directly reduces this discovery overhead?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q25"> A) Expose the available documents/datasets as MCP resources so the agent has visibility into what exists at connection time, rather than needing exploratory calls each session.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q25"> B) Add a `list_everything` tool that the agent must remember to call first.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q25"> C) Reduce the number of tools on the server so there is less to discover.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q25"> D) Cache the agent's own exploratory tool call outputs locally between unrelated sessions.</label><br>

---

**Q26.** A developer-productivity agent needs to locate every Python file in a large monorepo that references a deprecated internal package named `old_metrics_client`. Which built-in tool is best suited to this specific task?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q26"> A) `Bash` with a hand-written `find` command piped through a custom parser.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q26"> B) `Read` on the repository root to get a directory listing, then `Read` each file one at a time.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q26"> C) `Grep`, searching for the import pattern across the codebase directly.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q26"> D) `Glob` alone, since it can search file contents as well as file names.</label><br>

---

**Q27.** While using `Edit` to change a configuration value, the agent receives an error: "Match not unique: found 4 occurrences of the target text." The surrounding code contains several nearly identical configuration blocks. What is the correct next step?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q27"> A) Switch to `Bash` and run a `sed` command that replaces every occurrence at once.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q27"> B) Use `Read` to view the full file, identify enough surrounding context to make the target text unique, and retry `Edit` with a larger, uniquely-identifying `old_string`.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q27"> C) Use `Write` to regenerate the entire file from memory without re-reading it.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q27"> D) Call `Edit` repeatedly with the same arguments until one of the attempts succeeds by chance.</label><br>

---

## Domain 3: Claude Code Configuration & Workflows (Q28–Q39)

**Q28.** A senior engineer maintains detailed API-design conventions in their own `~/.claude/CLAUDE.md`. A new hire clones the same repository but Claude Code does not appear to follow those conventions for them. What is the most likely explanation?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q28"> A) The new hire needs to reinstall Claude Code, since fresh installs ignore all CLAUDE.md files initially.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q28"> B) `~/.claude/CLAUDE.md` is a user-scoped file local to that engineer's machine; it is not part of the repository and is never transmitted to teammates when they clone it.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q28"> C) CLAUDE.md files require an `@team` directive at the top to be shared across users.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q28"> D) The new hire's copy of the repository is missing a `.claude/sync` marker file.</label><br>

---

**Q29.** A repository's root `CLAUDE.md` has grown past 500 lines covering backend conventions, frontend conventions, database migration rules, and deployment checklists all in one file. Engineers report Claude sometimes applies frontend rules while working on backend code. What is the best remediation?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q29"> A) Split the content into focused files under `.claude/rules/`, using path-scoped frontmatter so each file's conventions apply only to relevant files.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q29"> B) Leave the single file as-is but add a table of contents at the top.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q29"> C) Delete the file entirely and rely on Claude's general training knowledge of best practices.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q29"> D) Convert the file into a single very long comment inserted at the top of every source file in the repo.</label><br>

---

**Q30.** A team wants a `/deploy-checklist` command available to every engineer automatically when they clone the repository, without any manual per-developer setup. Where should this command be defined?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q30"> A) In `~/.claude/commands/` on each engineer's personal machine.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q30"> B) In the project's `.claude/commands/` directory, committed to the repository.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q30"> C) Inside a personal dotfiles repository that each engineer maintains separately.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q30"> D) As a paragraph inside the root `CLAUDE.md` describing the checklist steps in prose.</label><br>

---

**Q31.** A `/generate-service` skill runs dozens of exploratory reads and shell commands to study existing service patterns before producing scaffolding output, filling the main conversation with intermediate noise that teammates find distracting when reviewing the session transcript. What is the most direct way to prevent this exploratory work from cluttering the main session?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q31"> A) Restrict the skill's `allowed-tools` to an empty list so it cannot use any tools.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q31"> B) Run the exploratory work through an isolated subagent invocation so only its final structured result — not the intermediate tool calls — lands in the main session.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q31"> C) Rename the skill file so it is treated as a slash command instead of a skill.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q31"> D) Ask developers to manually delete the intermediate messages from their transcript afterward.</label><br>

---

**Q32.** A monorepo has a `mobile/` directory with its own linting rules, testing conventions, and file-naming patterns that only apply within that directory. The team wants these conventions to load automatically whenever Claude works inside `mobile/`, without affecting sessions working elsewhere in the repo. What is the correct approach?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q32"> A) Add the mobile conventions to the root `CLAUDE.md` under a heading titled "Mobile," relying on the model to recognize when it applies.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q32"> B) Create a rules file (e.g., `.claude/rules/mobile.md`) with YAML frontmatter scoping it to the `mobile/**` path glob, containing the mobile-specific conventions.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q32"> C) Create a skill named `mobile-conventions` that must be manually invoked at the start of every mobile-related session.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q32"> D) Instruct every developer to paste the mobile conventions into the chat manually before working in that directory.</label><br>

---

**Q33.** Integration test files are scattered across many directories throughout a codebase, interspersed with the application code they test. The team wants one consistent set of test-writing conventions applied automatically no matter which directory a test file lives in. What is the most maintainable solution?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q33"> A) Create a `CLAUDE.md` inside every directory that happens to contain a test file.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q33"> B) Create a rules file with a path glob that matches test-file patterns (e.g., `**/*.test.ts`, `**/*_test.py`) regardless of directory, so the convention follows the file type rather than its location.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q33"> C) Add a single generic instruction to the root `CLAUDE.md` saying "write good tests."</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q33"> D) Move all test files into one central `tests/` directory before applying any conventions.</label><br>

---

**Q34.** An engineer is asked to migrate an application's authentication from session cookies to JWTs across a codebase with unclear internal boundaries and several undocumented dependencies on the current session behavior. Which approach is most appropriate to start with?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q34"> A) Enter plan mode to explore the current authentication flow, map dependencies, and propose an approach before any files are changed.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q34"> B) Begin direct execution immediately, since JWT migrations follow a well-known standard pattern regardless of codebase specifics.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q34"> C) Write out the entire target JWT implementation from memory first, then adapt the codebase to match it.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q34"> D) Delete the existing session-cookie code first so there is no legacy behavior to account for during exploration.</label><br>

---

**Q35.** An engineer asks Claude Code to increase a hardcoded timeout constant from 30 to 60 seconds in one specific function whose behavior and callers are already fully understood. Which approach fits best?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q35"> A) Plan mode, because any numeric constant change could theoretically have downstream effects worth exploring first.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q35"> B) Direct execution, since the change is small, well-scoped, and does not involve architectural decisions or unclear dependencies.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q35"> C) Plan mode, followed immediately by a second plan-mode pass to double-check the first plan.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q35"> D) Direct execution, but only after first writing a full design document describing the one-line change.</label><br>

---

**Q36.** A developer has twice told Claude "always format currency values with two decimal places and a leading dollar sign" while reviewing generated reporting code, but the output remains inconsistent — some values show three decimals, some omit the dollar sign. What is the most effective next step?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q36"> A) Repeat the same instruction a third time using more forceful wording.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q36"> B) Provide 2–3 concrete before/after examples of the exact transformation expected, including edge cases like whole-dollar amounts and negative values.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q36"> C) Switch into plan mode so Claude can explore the codebase before formatting any currency.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q36"> D) Ask Claude to write a general style guide document instead of fixing the immediate code.</label><br>

---

**Q37.** Claude Code produces a function with three unrelated issues: an incorrect boolean condition, a missing default parameter value, and a variable name that shadows an outer-scope variable. None of the three issues interact with each other. What is the recommended way to work through fixing them?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q37"> A) Report all three in one exhaustive message and let Claude fix everything simultaneously.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q37"> B) Address each issue in its own message, verifying the fix before moving to the next, since they are independent and unrelated.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q37"> C) Ask Claude to regenerate the entire function from scratch rather than making targeted fixes.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q37"> D) Fix only the issue that seems most severe and leave the other two for a future session.</label><br>

---

**Q38.** Before writing any code for a new rate-limiting feature on a legacy service whose retry and backoff behavior is not well understood by the current team, an engineer wants Claude to proactively surface unstated assumptions, edge cases, and design tradeoffs. Which technique fits best?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q38"> A) Provide a finished specification and ask Claude to implement it exactly as written.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q38"> B) Use the interview pattern: have Claude ask clarifying questions about the service's current behavior, constraints, and requirements before proposing any design.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q38"> C) Ask Claude to implement a generic rate limiter based on common patterns, then review the output afterward for fit.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q38"> D) Start with a minimal proof-of-concept and iterate purely based on test failures.</label><br>

---

**Q39.** A CI job invokes `claude "Summarize the diff and flag risky changes"` as part of a pull-request pipeline. The job hangs indefinitely, and logs show Claude Code waiting on interactive input. What is the correct fix?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q39"> A) Add the `-p` (print/non-interactive) flag to the invocation so it runs headlessly without waiting on a terminal.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q39"> B) Increase the CI job's timeout so it eventually finishes waiting.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q39"> C) Set an environment variable named `CI=true` and expect Claude Code to detect it automatically with no other changes.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q39"> D) Replace the CLI invocation with a manual copy-paste of the diff into a chat session.</label><br>

---

## Domain 4: Prompt Engineering & Structured Output (Q40–Q51)

**Q40.** An automated PR-review prompt flags "possible race condition" on nearly every function that touches shared state, including code with mutexes and locks already correctly applied. Adding "only flag things you're confident about" to the prompt had no measurable effect. What is the most effective next step?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q40"> A) Add explicit criteria distinguishing an actual reportable race condition (e.g., shared state accessed without synchronization across concurrent paths) from correctly-synchronized code, with concrete examples of each.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q40"> B) Remove the race-condition category from the review entirely, since false positives cannot be reduced.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q40"> C) Switch to a larger model tier, assuming a bigger model will apply better judgment automatically.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q40"> D) Add a self-reported confidence score and discard findings below an arbitrary threshold, without changing the underlying criteria.</label><br>

---

**Q41.** A style-review prompt flags every function longer than 20 lines as "needs refactoring," including functions the team considers appropriately long (e.g., a single well-organized validation routine with no duplicated logic). Developers want length flagged only when it correlates with actual complexity, such as deep nesting or repeated logic blocks. How should the prompt be revised?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q41"> A) Instruct Claude to "use good judgment about what counts as too long."</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q41"> B) Define explicit criteria: flag functions that combine excessive length with specific complexity signals (e.g., nesting depth, duplicated blocks), and exclude long-but-simple functions such as flat validation routines.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q41"> C) Lower the line-count threshold from 20 to 10 so more functions get flagged for review.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q41"> D) Remove the length check but keep all other style checks unchanged.</label><br>

---

**Q42.** Multiple engineers use Claude to draft incident postmortem summaries, but the output format varies widely — some include a timeline, some don't; some list root cause first, others last. The team wants every postmortem to follow the same structure: summary, timeline, root cause, remediation. What is the most effective way to achieve consistent structure?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q42"> A) Add a one-line instruction: "Please use a consistent format."</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q42"> B) Provide 2–3 few-shot examples showing the exact desired postmortem structure end-to-end, including how each section should be written.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q42"> C) Ask engineers to manually reformat the output themselves after generation.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q42"> D) Increase the model's `max_tokens` so it has room to include more sections.</label><br>

---

**Q43.** A clause-classification system correctly handles clearly-worded standard clauses but consistently mislabels clauses that blend two categories, such as a clause combining confidentiality and non-compete language. Which few-shot approach most directly improves accuracy on this specific weakness?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q43"> A) Add more few-shot examples of clean, unambiguous clauses to reinforce the general schema.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q43"> B) Add few-shot examples specifically demonstrating the reasoning for classifying blended/ambiguous clauses, showing why a confidentiality-plus-non-compete clause belongs to one category over the other.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q43"> C) Remove the ambiguous category entirely from the classification schema.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q43"> D) Increase the number of categories so ambiguous clauses always have a dedicated bucket.</label><br>

---

**Q44.** An extraction pipeline asks Claude to return JSON inside a text response. Roughly 4% of outputs contain malformed JSON — trailing commas, unescaped quotes, or truncation — breaking the downstream parser. What is the most reliable way to eliminate this class of error?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q44"> A) Add a stronger instruction: "Respond with only valid JSON and nothing else."</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q44"> B) Use tool use with a defined input schema instead of prompted JSON, and read the structured data directly from the `tool_use` block.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q44"> C) Add a regex-based cleanup step that attempts to repair common JSON mistakes after the fact.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q44"> D) Retry the exact same prompt up to 5 times whenever parsing fails.</label><br>

---

**Q45.** A document-routing pipeline offers two tools, `extract_invoice` and `extract_purchase_order`, with `tool_choice: "auto"`. For about a quarter of documents, the model responds with a plain-text description of the document instead of calling either tool. What is the correct fix?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q45"> A) Set `tool_choice: "any"` so the model is required to call some tool, without specifying which one.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q45"> B) Add a system prompt line saying "never respond with plain text."</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q45"> C) Reduce the number of tools to one generic `extract_document` tool with a `type` field, which is the only fix guaranteed to work.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q45"> D) Increase `max_tokens` so the model has room to call a tool after its text description.</label><br>

---

**Q46.** An invoice-extraction pipeline uses a strict schema via tool use. 6% of extractions pass schema validation but fail a business rule: `subtotal + tax` does not equal `total`. The source documents are complete and well-formed. How should the retry logic be designed?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q46"> A) Retry the identical prompt up to 3 times and expect the arithmetic to self-correct through repetition alone.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q46"> B) On failure, feed back the original document, the failed extraction, and the specific validation error (e.g., "subtotal + tax = X but total = Y") so the model can self-correct with concrete feedback.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q46"> C) Discard all documents that fail this check and route them to human review with no retry attempt.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q46"> D) Add a `computed_total` field that the pipeline itself fills in, and silently ignore the model's `total` value going forward.</label><br>

---

**Q47.** A "witness signature date" field extracts as null for a specific batch of contracts even after 4 retries, each including the validation error in the follow-up prompt. What should be investigated before attempting further retries?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q47"> A) Whether the field is actually present in the source document at all, or whether the contract only references a signature page that exists as an unincluded exhibit.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q47"> B) Whether the retry count should be raised from 4 to 8.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q47"> C) Whether switching to a larger model tier will resolve the extraction regardless of document content.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q47"> D) Whether making the field required (rather than optional) in the schema will force the model to produce a value.</label><br>

---

**Q48.** A team runs two Claude-based workflows: a blocking pre-deploy gate that must finish before a release can proceed, and a weekly cross-repo dependency audit reviewed by engineers the following Monday. Someone proposes moving both to the Message Batches API for the associated cost savings. How should this proposal be evaluated?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q48"> A) Use the Batches API for the weekly dependency audit, since it isn't time-sensitive, but keep the pre-deploy gate on real-time calls, since it blocks a release and cannot tolerate batch processing windows.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q48"> B) Move both workflows to the Batches API and add a polling loop to the release pipeline to wait for batch completion.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q48"> C) Keep both workflows on real-time calls, since batch processing introduces ordering complexity for the audit.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q48"> D) Move both to the Batches API with a fallback that "cancels" the release if the batch takes too long.</label><br>

---

**Q49.** A weekly compliance scan submits 20,000 documents as a single Message Batch. A few hundred individual requests within the batch come back as errors while the rest succeed. What is the correct way to handle this partial failure?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q49"> A) Resubmit the entire batch of 20,000 documents to avoid the complexity of tracking which ones failed.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q49"> B) Use each request's `custom_id` to identify exactly which documents returned errors, and resubmit only those specific documents in a new, smaller batch.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q49"> C) Treat the whole batch as failed and fall back to processing all 20,000 documents through real-time calls instead.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q49"> D) Ignore the failed requests, since a few hundred out of 20,000 is within acceptable tolerance by default.</label><br>

---

**Q50.** A single review pass over an 18-file pull request produces uneven results: thorough feedback on the first few files, cursory comments on the rest, and at least one obvious bug missed entirely. What restructuring addresses this most directly?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q50"> A) Split the review into focused passes — one pass analyzing each file individually for local issues, followed by a separate pass examining cross-file interactions.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q50"> B) Require every pull request to be under 5 files before any automated review can run.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q50"> C) Switch to a model with a larger context window as the only necessary change, keeping the single-pass structure.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q50"> D) Run the identical single-pass review three times and keep whichever result is longest.</label><br>

---

**Q51.** A developer has Claude generate a 250-line data-validation module in one session, then asks that same session to review its own output for bugs. The review reports "no issues found," but a teammate's manual read catches a logic error in an edge-case branch within minutes. What is the most likely explanation, and the best fix?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q51"> A) The generation used too small a model tier; switching both generation and review to a larger tier fixes the gap.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q51"> B) The reviewing instance still carries the reasoning context from generating the code, making it less likely to challenge its own prior decisions; using a separate, independent Claude instance with no generation context for the review addresses this.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q51"> C) The review prompt needs to be more polite and encouraging to produce better results.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q51"> D) Reviews are inherently unreliable and should be replaced entirely with automated linting tools.</label><br>

---

## Domain 5: Context Management & Reliability (Q52–Q60)

**Q52.** A technical-support conversation runs 25+ turns about a device that overheated during a firmware update. Early on, the customer specified the exact firmware version (v4.2.1) and the exact time the device shut down (2:14 PM). Later in the conversation, the agent refers only to "the update that caused the issue" without those specifics, and the customer has to repeat details already given. What technique would prevent this?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q52"> A) Run `/compact` once at the very start of the conversation before any turns occur.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q52"> B) Extract concrete facts (firmware version, exact timestamp, device model) into a persistent "case facts" block included at the start of every subsequent prompt in the conversation.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q52"> C) Switch to a model with a larger context window so nothing needs to be summarized.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q52"> D) Instruct the agent to re-read the entire transcript before every single response.</label><br>

---

**Q53.** A support agent resolves only 50% of tickets on first contact, well under a 75% target, largely because it attempts to autonomously resolve cases that actually require a policy exception while escalating some genuinely simple cases unnecessarily. What is the most effective way to fix this calibration?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q53"> A) Add explicit escalation criteria to the system prompt, paired with few-shot examples that contrast cases that should be escalated against cases that should be resolved autonomously.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q53"> B) Train a separate classifier model on historical tickets and route every request through it before the agent begins.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q53"> C) Add sentiment analysis and escalate automatically whenever detected frustration crosses a threshold.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q53"> D) Remove the agent's ability to escalate entirely, forcing it to resolve every case autonomously.</label><br>

---

**Q54.** A customer says, "I want to talk to a real person, I've called about this three times already." The agent recognizes it could technically resolve the issue in two tool calls and responds, "No problem, let me look into that for you," proceeding with automated investigation instead of honoring the request. The customer repeats the request for a human a second time. What is wrong, and what should change?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q54"> A) The agent should complete its automated fix first and only escalate afterward if the customer still objects.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q54"> B) The agent should honor an explicit, clearly stated request to speak with a human immediately, rather than proceeding with automated resolution regardless of its own confidence in solving the issue.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q54"> C) The agent should measure the customer's frustration level numerically before deciding whether the request is genuine.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q54"> D) The agent behaved correctly, since resolving the issue quickly is in the customer's best interest.</label><br>

---

**Q55.** A payment-verification subagent starts silently catching its own internal timeouts and returning `{"status": "success", "verified": null}` instead of surfacing the failure. The coordinator treats this as a completed, successful verification and proceeds to finalize the transaction without ever knowing verification did not actually happen. What is the core problem with this design?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q55"> A) Swallowing the failure and reporting fabricated success removes the coordinator's ability to make any recovery decision, letting incomplete work silently masquerade as complete work.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q55"> B) The subagent should have retried the verification exactly once more before giving up, and no other change is needed.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q55"> C) The coordinator should independently double-check every subagent's work regardless of what the subagent reports, making the subagent's reporting behavior irrelevant.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q55"> D) The timeout should simply be extended so it stops occurring, which fully resolves the underlying issue.</label><br>

---

**Q56.** During a two-hour deep-dive into a legacy inventory system's pricing logic, an agent's later answers begin describing "typical e-commerce pricing patterns" in generic terms rather than the specific custom discount-stacking logic it identified an hour earlier, and its statements start contradicting its own earlier findings. What is the most likely cause and best mitigation?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q56"> A) A rate limit was reached; add delays between tool calls to resolve it.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q56"> B) As the session grows very long, specific earlier findings compete with the model's general background knowledge and are more likely to be underweighted; mitigate by having the agent maintain a running scratchpad file of key findings throughout the session.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q56"> C) The codebase is too large for one agent; the fix is to split it into independent subsystems explored by separate agents with no coordination.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q56"> D) The agent should switch from `Read` to `Bash`-based file inspection to reduce the amount of context consumed.</label><br>

---

**Q57.** A two-phase investigation first spends 40 minutes mapping a service's dependency graph, then moves into a second phase evaluating that service for scaling bottlenecks. Partway into phase two, the agent describes the service as using "a standard message queue" when phase one had actually identified a custom in-house queue implementation with unusual backpressure behavior. What technique best preserves findings across this phase boundary?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q57"> A) Maintain a scratchpad file that records key findings at the end of each phase, and have subsequent phases reference that file explicitly rather than relying purely on conversation history.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q57"> B) Run `/compact` right before phase two begins so there is more room for new context.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q57"> C) Start phase two in a completely fresh session with no information carried over at all.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q57"> D) Raise `max_tokens` so the model can generate longer responses during phase two.</label><br>

---

**Q58.** A medical-billing extraction system reports 96% overall field-extraction accuracy on its validation set, and the team is ready to remove human review entirely. A data scientist objects that the aggregate number could be misleading. What is the strongest basis for that objection?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q58"> A) 96% accuracy guarantees exactly 4% of claims contain errors, which is inherently too high for any healthcare use case.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q58"> B) The aggregate figure can conceal significantly lower accuracy on specific document types or fields (e.g., a rare claim category performing at 80%), which would only be visible through stratified, per-category analysis before removing review.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q58"> C) The validation set is too small to be statistically meaningful regardless of its accuracy figure.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q58"> D) Human review should never be removed from any healthcare workflow under any circumstances, independent of measured accuracy.</label><br>

---

**Q59.** A team wants to route extractions automatically: high self-reported confidence proceeds without review, low confidence goes to a human. An engineer proposes using the model's raw stated confidence value directly as the routing threshold, with no additional validation. What is the key flaw?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q59"> A) Confidence scores measurably increase the number of tokens generated per response, which is the main concern.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q59"> B) Raw, uncalibrated confidence scores are not automatically reliable predictors of correctness; the threshold must first be calibrated against a labeled validation set to determine what score level actually corresponds to acceptable accuracy.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q59"> C) Confidence scores only work when the model outputs a single extraction; multi-field documents require a different approach.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q59"> D) Using confidence scores requires maintaining two entirely separate model deployments, which is operationally infeasible.</label><br>

---

**Q60.** A market-research synthesis agent produces a final report stating "customer churn increased 12% year-over-year" without indicating which of the five subagents' findings it came from. When a reviewer wants to verify the figure, no individual subagent output was retained in a form that ties back to that specific claim. What structural change would prevent this loss of provenance?

<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q60"> A) Add a generic "Sources consulted" list at the end of the report naming all sources touched by any subagent.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q60"> B) Require subagents to output structured claim-to-source mappings (claim text, source identifier, and supporting excerpt), and require the synthesis agent to preserve and merge those mappings into the final report rather than summarizing them away.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q60"> C) Store raw subagent transcripts in a separate log for occasional manual lookup, without changing how the report itself is produced.</label><br>
<label><input type="radio" style="width:1.3em; height:1.3em; margin-right:8px; vertical-align:middle;" name="q60"> D) Add a final review pass where a separate agent checks the report's tone and grammar against the raw subagent outputs.</label><br>

---

*End of Mock Exam 1 — 60 questions. See `Prompt_mock_1_answers.md` for the answer key and rationale.*
