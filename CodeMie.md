## Helpful links
[MASTER LINK](https://elearn.epam.com/learning/course/course-v1:EPAM+EAIRCA+0325/block-v1:EPAM+EAIRCA+0325+type@sequential+block@2dda445af6f64d84be47cb099fff2877/block-v1:EPAM+EAIRCA+0325+type@vertical+block@2655330151254708b65e354266fd619d)

- [AI/Run CodeMie channel on Video Portal](https://epa.ms/codemie-channel)
- [List of onboarding videos](https://videoportal.epam.com/playlist/VYj2gGY0)
- [List of Coding videos](https://epa.ms/codemie-coding)
- [List of Testing videos](https://epa.ms/codemie-testing)
- [Videos for BA](https://epa.ms/codemie-ba)
- [Release management videos](https://epa.ms/codemie-release)


## Important
- [CodeMie-PART-1] Course (https://learn.epam.com/catalog/detailsPage?id=8a946681-a483-4e3c-b079-00d150db9b08) ** DONE **
- [CodeMie-PART-2] Course (https://learn.epam.com/catalog/detailsPage?id=3545d9b3-17fc-4b6c-8937-0d02d374c928)


# CodeMie in Action
- CodeMie provides a practical solution for implementing intelligent automation into your routine tasks.
- `AI AGENTS`: Imagine you are sitting at your desk, staring at a mountain of tasks—researching for a project, analyzing data, scheduling meetings, and organizing files. Sounds overwhelming, doesn't it? Now imagine having a personal assistant who helps you deal with these tasks with lightning speed, precision, and even a touch of creativity. That is exactly what AI agents can do for you!
- `Workflows`, enables different Assistants to share information and work in a sequential order to achieve common goals. Within these workflows, each Assistant handles specific subtasks, contributing to the successful completion of the overall task.

- Temperature (Optional): Controls the output's randomness. A lower temperature makes the output more deterministic and focused, while a higher temperature increases diversity and variety in responses. If you want a neutral result, keep the temperature in the middle, around 0.5-1.

- Top P (Optional): An alternative to Temperature that controls response variety by limiting the
cumulative probability of word (token) choices.

- `System instructions` are core guidelines that shape the Assistant's behavior, knowledge, and capabilities. They remain constant throughout all user interactions unless the Assistant owner/admin modifies them.
- `User prompts` are specific questions or requests that users send to the Assistant during conversations. They change with each interaction.
- `Tools`: Assistant's real power lies in its ability to perform specific actions by integrating with external systems. This functionality is what makes assistants truly valuable, helping various specialists streamline tasks and work more efficiently. Tools will enable working with external systems like JIRA, Confluence, GitHub, and more. 
`Tools` also tailor LLMs knowledge by using a method called Retrieval-Augmented Generation (RAG).  This lets the models access and use new information from external sources, even if they weren’t trained on that data initially.
```
Purpose:

Tools expand your Assistant's capabilities by connecting it to external services or systems, allowing more than just question-and-answer interactions.

How `Tools` Works:

Almost all tools require setup integrations with access credentials (like Alias, URLs, or tokens).
The LLM that drives the Assistant generates structured function calls that trigger external systems, executing real-time actions such as creating, reading, updating, and deleting records/content (CRUD operations).
Because Tools query or update external systems in real-time, any new or changed information is visible immediately, without the need for re-indexing.
Data Retrieval (Keyword Search):

When using a tool to look up information, the search uses full-text matching, which involves scanning documents for specific keywords or phrases to find relevant content.
Example:

– Query: "How to treat flu"

– Document content: "methods of treating viral infections"

– Keyword search misses this document if the exact term "flu" is not present.

```


- A `data source` in EPAM AI/Run CodeMie is an additional custom knowledge base for Assistants, relying on a RAG approach. It offers specific information that your Assistant can reference when completing the task.
```
How `data source` Works?

Data Sources transform textual data into vector embeddings and store them in a vector database. This process is called "indexing". When you add a data source, the platform automatically converts the content into embeddings, which may take some time depending on data volume and source type.
Indexed data is stored as vector embeddings, since it is a way to convert words, sentences, and other data into numbers so the LLM can perform a semantic search, retrieving the most relevant pieces of information.
Once a data source is created, its embeddings (indexed copies of data) remain static. If the original source content changes, the data source must be reindexed or replaced to refresh these embeddings.
Data Retrieval (Semantic Search):

When an Assistant receives a query, the query text is also converted into embeddings. Similar vectors are then identified in the vector database (data source), delivering contextually relevant results.
Unlike simple keyword matching, semantic search considers the intent and contextual meaning of the query to provide more relevant results.
Example:

– Query: "How to treat flu"

– Document content: "methods of treating viral infections"

– Semantic search recognizes that "flu" and "viral infections" are contextually related, so it returns the relevant document.
```

