# Mock Exam 1 — Answer Key & Rationale

Explanations are grounded in official Claude/Anthropic documentation (Claude Code docs, Agent SDK docs, Messages API docs) where a specific documented mechanism applies. Where a question tests architectural/design judgment rather than a single documented fact, the rationale is marked as **(design reasoning, not a single documented citation)**. Where I could not verify a claim against documentation, it is explicitly tagged `no_explanation_available` rather than guessed.

---

## Domain 1: Agentic Architecture & Orchestration

**Q1 — B.** The documented way to detect that Claude has finished versus still wants to act is the API's `stop_reason` field (`"end_turn"` = done, `"tool_use"` = wants to call a tool), not scanning generated text for a marker phrase, which is unreliable because ordinary content can coincidentally contain that phrase.

**Q2 — B.** Iteration caps are a documented safety boundary for runaway loops, but `stop_reason` remains the authoritative signal for whether the model has actually finished; a cap alone can cut off a still-in-progress tool-use turn.

**Q3 — C.** (Design reasoning, not a single documented citation.) Having the coordinator dynamically select which subagents to invoke based on query complexity avoids the fixed-fan-out cost incurred by routing every query through every subagent regardless of need.

**Q4 — C.** (Design reasoning.) A shared structured format at the subagent-to-coordinator boundary is the standard fix for lossy or inconsistent downstream synthesis when subagents emit heterogeneous ad hoc formats.

**Q5 — B.** Per Claude Agent SDK subagent documentation, the coordinator's tool allowlist must include the subagent-invocation tool for the model to be able to spawn subagents; without it, no system-prompt wording will enable spawning since the capability itself isn't exposed to the model.

**Q6 — B.** (Design reasoning.) Preserving structured metadata (source, page) alongside content at the context-passing boundary is what allows downstream consumers to retain provenance; concatenating raw text or having a later agent guess loses that link.

**Q7 — B.** Independent subagent invocations issued within a single response are documented as running concurrently; sequential invocation (waiting on each before starting the next) needlessly serializes independent work.

**Q8 — B.** (Design reasoning.) Natural-language instructions describing required order are not enforced execution constraints; a programmatic prerequisite (blocking the tool call until a required prior state is confirmed) is the reliable way to guarantee sequencing, consistent with the general principle that critical constraints belong in code/hooks rather than prose alone.

**Q9 — B.** (Design reasoning.) Decomposing a multi-issue request into independent items processed with shared context — rather than resolving them in full isolation and serially — improves throughput without dropping accuracy, since the items don't depend on each other's outcomes.

**Q10 — C.** A `PreToolUse`/`PostToolUse`-style hook that inspects the tool call's parameters and blocks or redirects execution is the enforced-at-the-system-level mechanism; hooks are documented as able to intercept and block tool calls, unlike prompt wording, which the model may or may not follow.

**Q11 — B.** A `PostToolUse` hook normalizing heterogeneous backend representations into one consistent format before the model reasons over the result is the documented pattern for this class of problem — `PostToolUse` hooks run after a tool call and can transform its output.

**Q12 — A.** A `PreToolUse` hook, documented as running before a tool executes and able to block execution based on inspection of the call, is the correct enforcement point for a hard business rule like "never deploy to X without approval," since it can prevent the call from running at all rather than merely instructing the model not to make it.

**Q13 — B.** (Design reasoning, though grounded in the documented purpose of `PostToolUse` hooks as output-transforming hooks.) Returning only the summary and dropping the redundant raw payload reduces context consumption directly; increasing `max_tokens` does not address wasted context from redundant content.

**Q14 — B.** (Design reasoning.) Prompt chaining — a fixed sequence of focused passes — fits tasks where the steps and scope are already fully known in advance, as with a fixed compliance checklist.

**Q15 — B.** (Design reasoning.) Dynamic adaptive decomposition, where subtasks are generated and prioritized based on findings at each step, fits open-ended investigations whose scope cannot be known up front.

**Q16 — B.** Session forking is documented (`--fork-session` / SDK fork functionality) as the mechanism for branching an existing session into independent copies that each continue from the same shared starting point without affecting one another; `--continue`/`--resume` operate on the same underlying session rather than creating independent branches.

---

## Domain 2: Tool Design & MCP Integration

**Q17 — B.** (Design reasoning.) Expanding tool descriptions with the specific data returned, example queries, and explicit differentiation from similar tools is the standard first step for reducing tool-selection ambiguity, since the model chooses tools based on their descriptions.

**Q18 — B.** (Design reasoning.) Specifying the exact accepted input format and a concrete example directly in the tool description reduces malformed calls at the source; a system-prompt instruction is easily missed or deprioritized relative to the tool's own schema/description.

**Q19 — B.** (Design reasoning.) Collapsing distinct failure categories into one undifferentiated error message removes any basis the agent has for choosing among different recovery actions — this is the core problem the question describes.

**Q20 — B.** `isError` (or an equivalent explicit flag) is the documented MCP mechanism for distinguishing a genuine tool/backend failure from a valid response that simply contains no results; conflating the two under one "success" status is the documented anti-pattern this question targets.

**Q21 — B.** (Design reasoning.) An explicit retryability flag plus an explanation of *why* a failure occurred (non-transient business decline vs. transient system error) is what lets an agent decide whether to retry at all — this is the same class of fix as Q34 in the sample set (fraud-block scenario).

**Q22 — C.** `tool_choice: {"type": "tool", "name": "X"}` is documented as the mechanism to force a call to one specific named tool; `"any"` only guarantees some tool call, not the specific one required.

**Q23 — B.** (Design reasoning.) Granting a narrowly-scoped agent tools outside its purpose increases the likelihood it uses them instead of doing its intended narrow job — this mirrors the sample material's treatment of over-provisioned synthesis agents.

**Q24 — A.** Project-scoped MCP configuration files support environment-variable expansion syntax (e.g., `${VAR}`) for secrets, which is the documented way to share a committed MCP config across a team without committing the actual token value.

**Q25 — A.** Exposing available data as MCP *resources* (rather than requiring the agent to discover them through exploratory tool calls) is the documented MCP feature intended to give connection-time visibility into available content, directly reducing repeated discovery overhead.

**Q26 — C.** `Grep` is the built-in tool documented for searching file *contents* for a pattern across a codebase; `Glob` matches file names/paths, not contents, and hand-rolled `Bash` pipelines duplicate functionality the built-in tool already provides more reliably.

**Q27 — B.** This is the documented recommended fallback for `Edit`'s "not unique" error: read the file to find enough surrounding context to make `old_string` unique, then retry with that larger, unique string, rather than switching to a broader tool like `sed` or `Write` that risks unintended changes.

---

## Domain 3: Claude Code Configuration & Workflows

**Q28 — B.** `~/.claude/CLAUDE.md` is documented as a user-level, machine-local memory file, distinct from project-level `CLAUDE.md`/`.claude/CLAUDE.md`; it is not part of the repository and is not transmitted to other users when they clone it.

**Q29 — A.** Splitting a monolithic `CLAUDE.md` into focused files under `.claude/rules/` with path-scoped YAML frontmatter (a `paths:`-style field) is the documented mechanism for making conventions load only for relevant files, addressing convention bleed across unrelated file types.

**Q30 — B.** Project-scoped custom commands live in the repository's `.claude/commands/` directory and are committed to version control, so every developer receives them automatically on clone; `~/.claude/commands/` is user-scoped and personal, not shared.

**Q31 — B.** (Design reasoning, grounded in documented subagent isolation behavior.) Routing exploratory work through an isolated subagent invocation keeps its intermediate tool calls out of the main session, surfacing only the final structured result — this is the documented benefit of delegating verbose exploration to a subagent rather than doing it inline.

**Q32 — B.** A rules file with YAML frontmatter scoping it to a path glob (e.g., `mobile/**`) is the documented mechanism for conditionally applying conventions to files under a specific directory without affecting sessions elsewhere.

**Q33 — B.** A path-glob-based rule matching a file *pattern* (e.g., test-file naming conventions) rather than a fixed directory is the documented way to apply consistent conventions regardless of where matching files physically live in the tree.

**Q34 — A.** (Design reasoning, consistent with documented plan-mode purpose.) Plan mode is intended for exploration and design decisions before changes are made — appropriate here given unclear boundaries and undocumented dependencies; direct execution is better suited to well-understood, well-scoped changes.

**Q35 — B.** (Design reasoning.) A small, well-scoped, well-understood change with no architectural ambiguity is the documented use case for direct execution rather than plan mode.

**Q36 — B.** (Design reasoning.) Concrete input/output examples are the standard fix when repeated prose instructions fail to produce consistent formatting — examples anchor the exact expected transformation more reliably than restating the rule in words.

**Q37 — B.** (Design reasoning.) For independent, non-interacting issues, addressing them one at a time with verification between fixes is the recommended iterative-refinement approach, reducing the risk of one fix masking or interfering with verification of another.

**Q38 — B.** (Design reasoning.) The "interview pattern" — having Claude ask clarifying questions before proposing a design — is the documented technique for surfacing unstated assumptions and constraints on unfamiliar or poorly-documented systems before implementation begins.

**Q39 — A.** The `-p` (print/non-interactive) flag is documented for headless/scripted CLI invocations, avoiding the interactive-input wait that causes CI jobs to hang.

---

## Domain 4: Prompt Engineering & Structured Output

**Q40 — A.** (Design reasoning.) Vague qualifiers like "only flag things you're confident about" do not define what counts as a genuine finding; explicit criteria distinguishing the reportable condition from acceptable patterns, with concrete examples of each, is the documented fix for high false-positive rates that don't respond to soft prompt tweaks.

**Q41 — B.** (Design reasoning.) Explicit criteria combining the surface signal (length) with a substantive complexity signal, plus an explicit exclusion for simple-but-long code, directly targets the reported false-positive pattern.

**Q42 — B.** (Design reasoning.) Few-shot examples showing the complete desired structure end-to-end are the documented technique for achieving format consistency across many independent generations, more reliable than a one-line instruction.

**Q43 — B.** (Design reasoning.) Targeted few-shot examples addressing the specific ambiguous-case failure mode (with reasoning shown) directly improve accuracy on that weakness; adding more standard-case examples does not address an edge-case-specific error pattern.

**Q44 — B.** Using tool use with a defined input schema, and reading the resulting `tool_use` block, is the documented way to obtain guaranteed well-formed structured data, eliminating the JSON-syntax-error class entirely rather than mitigating it after the fact.

**Q45 — A.** `tool_choice: "any"` is documented to require the model to call some tool rather than respond with plain text; it does not select which specific tool. It directly addresses the reported failure mode (model returning text instead of any tool call).

**Q46 — B.** (Design reasoning.) Feeding back the original document, the failed extraction, and the specific validation error is the documented pattern for validation/retry/feedback loops targeting semantic (business-rule) errors, as opposed to schema-syntax errors.

**Q47 — A.** (Design reasoning.) Before adding more retries, checking whether the source document actually contains the field is necessary — a persistent retry failure with a complete, well-formed document family can indicate the data genuinely isn't present rather than a model shortcoming.

**Q48 — A.** The Message Batches API is documented as an asynchronous, non-immediate-turnaround mechanism, making it well suited to non-time-critical work (like a weekly audit reviewed the next business day) but unsuitable for a blocking pipeline step that must complete before a release can proceed.

**Q49 — B.** The Batches API documents a `custom_id` field per request specifically to correlate each request with its corresponding response, which is the documented way to identify and selectively resubmit only the failed subset of a large batch.

**Q50 — A.** (Design reasoning.) Splitting review into focused per-file passes followed by a separate cross-file/integration pass is the documented restructuring for uneven quality/coverage seen in single-pass reviews of large multi-file changes.

**Q51 — B.** (Design reasoning.) A reviewing instance that retains the reasoning context from having just generated the code is less likely to challenge its own prior decisions; using an independent instance without that generation context for review is the documented mitigation for this specific self-review blind spot.

---

## Domain 5: Context Management & Reliability

**Q52 — B.** (Design reasoning.) Extracting concrete transactional/factual details into a persistent block re-included at the start of every subsequent prompt prevents specific facts from being lost or vaguely paraphrased as a long conversation progresses — this does not depend on context-window size alone.

**Q53 — A.** (Design reasoning.) Explicit escalation criteria paired with contrasting few-shot examples (escalate vs. resolve autonomously) is the documented approach for correcting miscalibrated escalation behavior, rather than adding an unrelated signal like sentiment scoring.

**Q54 — B.** (Design reasoning.) An explicit, unambiguous customer request to speak with a human should be honored directly rather than overridden by the agent's own assessment that it can resolve the issue faster autonomously.

**Q55 — A.** (Design reasoning.) Silently converting an internal failure into a reported "success" removes the coordinator's ability to detect and recover from the failure, allowing incomplete or incorrect work to pass through undetected — the same failure mode as the sample material's "empty success" search-timeout scenario.

**Q56 — B.** (Design reasoning; the underlying phenomenon of long-context attention degradation is well documented in the broader literature and addressed in Anthropic's long-context prompting guidance, though the exact scratchpad-file mitigation described here is a recommended practice rather than a single named documented feature.) Maintaining a scratchpad file of key findings is the standard mitigation for specific earlier findings being underweighted relative to general background knowledge as a session grows very long.

**Q57 — A.** (Design reasoning, same basis as Q56.) A scratchpad file updated at phase boundaries and explicitly referenced by later phases preserves specific findings more reliably than relying on the model to retrieve them unprompted from a long conversation history.

**Q58 — B.** (Design reasoning.) An aggregate accuracy figure can mask much lower accuracy on a specific subgroup (document type, field, or category); stratified per-category analysis is needed before removing human review, since the overall number alone does not reveal where errors concentrate.

**Q59 — B.** (Design reasoning.) A model's self-reported confidence score is not inherently calibrated to actual correctness; it must be validated against a labeled dataset to determine what score threshold corresponds to an acceptable real-world accuracy rate before it can be used safely for automated routing.

**Q60 — B.** (Design reasoning.) Requiring subagents to emit structured claim-to-source mappings, and requiring synthesis to preserve rather than summarize away that structure, is the documented-in-principle fix for provenance loss in multi-agent report generation — matching the pattern used for citation-preserving synthesis elsewhere in this material.

---

## Notes on Confidence

- Answers grounded in a specific, verifiable documented mechanism (hook names, `stop_reason` values, `tool_choice` types, CLAUDE.md/rules/commands file locations, CLI flags, session fork/resume, MCP `isError`/resources, Batches API `custom_id`) are cited as such above.
- Answers to purely architectural/judgment-style scenario questions (a majority of Domains 1, 4, and 5, and part of Domain 3) are marked **(design reasoning, not a single documented citation)** — these test applied judgment about system design, not a specific documented API fact, consistent with the scenario-based style of the source sample exam. No claim in this key was fabricated to sound official; where a mechanism is asserted as documented, it was verified against current Claude Code / Claude Agent SDK / Anthropic API documentation.
- No items required a `no_explanation_available` tag — every question was authored so its correct answer traces either to a verified documented mechanism or to explicit, statable design reasoning rather than an unverifiable claim.
