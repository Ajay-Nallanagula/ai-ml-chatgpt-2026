## INTRO GenAI Fundamentals
[Course Link](https://learn.epam.com/catalog/detailsPage?id=c2deabdd-7bd9-45df-b62e-c6952930aba6)
- Imagine a world where your fridge reorders groceries before you run out, and your car avoids rush hour traffic like a seasoned pro. This isn't science fiction anymore – it's the exciting frontier of Artificial Intelligence (AI).

- There are 3 types of AI
 - `Artificial Narrow Intelligence(ANI)`: can process analyse vast amounts of data. cannot make decisions , cannot do deep understanding, cannot learn new skills , runs on predefined algorithms , requires human intervention.
 - `Artificial General Intelligence(AGI)`: Artificial General Intelligence, also known as strong AI, can understand, learn, and apply knowledge in a broad range of tasks at the level of a human being. However, it's important to note that such AI, capable of matching human intelligence, has yet to be developed.
 - `Artificial Super Intelligence(AGI)`: Superintelligent AI is a type of AI that surpasses human intelligence across all tasks. While this concept is mainly speculative, and such an AI is yet to be developed, it's often featured in tech discussions and sci-fi literature.

- AI is not here to replace human abilities but to enhance them. It provides options for automating normal and monotonous tasks. This automation saves you time and allows you to focus on more creative and intellectual tasks that require human insight and inventiveness.

## Jargons and Concepts in AI
- AI involves various systems and concepts 
- These include machine learning (ML), deep learning (DL), natural language processing (NLP), generative AI (GenAI), and language models (LM).
- AI focuses on creating intelligent systems that can perform tasks that usually require human intelligence, such as speech recognition, natural language processing, text generation, and decision-making.<br/>
<image src="./images/AI_UMBERELLA.png" alt="AI_UMBERELLA" style="width:550px"/>

- `Machine Learning`: Machine learning is a branch of AI that focuses on developing algorithms and statistical models that allow computer systems to learn from experience and improve their skills without explicitly programming instructions. ML enables computers to analyze data, detect patterns within data, and make predictions or decisions.

- `Deep Learning(DL)`: Deep learning is a subset of ML that uses multi-layered artificial neural networks to deliver state-of-the-art accuracy in object detection, speech recognition, and language translation tasks. DL systems process and analyze various data, such as images, sound, and text, in a way similar to the human brain. 

- `Natural language processing (NLP)`: Natural language processing is a subfield of AI that focuses on the interaction between computers and humans through natural language. It can combine ML models and techniques with specific language algorithms to decode human language. NLP enables computer systems to understand, interpret, generate, and manipulate natural language texts and speech. At a high level, NLP takes human language as an input, processes it, and converts it into the language of numbers that the computer will understand, and vice versa.

- `Generative AI (GenAI)`:  Generative AI (GenAI) is a branch of artificial intelligence that utilizes Machine Learning (ML), specifically deep learning techniques implemented through powerful neural networks, to analyze massive datasets and identify patterns. NLP helps it interpret human language. By leveraging these patterns, GenAI can then produce entirely new and original content, like realistic images, music, text, video, or other creative formats.

- `Language Model`: Language models are a type of GenAI. They consist of a neural network with many parameters trained on large quantities of data to understand text. LMs process natural language inputs and predict the next word based on what they have already seen. LMs can also generate new texts based on a given prompt or context.

- GenAI originated in machine translation and natural language processing and initially focused on the development of speech recognition systems. However, in the late 2010s, the introduction of the `transformer architecture`(do chatgpt) revolutionized the field. <br/>

- ```Transformer Architecture: Transformer architecture is a way to process information, especially sequences like sentences or audio, by paying attention to the relationships between different parts of the sequence. Unlike older methods that processed information step-by-step, Transformers use a "self-attention" mechanism to understand how all parts of the sequence relate to each other simultaneously. This allows them to understand context and meaning more effectively, especially in complex tasks like language translation or generating human-like text```

<image src="./images/Tools_Softwares.png" alt="Tools_Softwares.png" style="width:550px; margin: 10px"/>

## Types of Language Models
- Language models (LMs) are sophisticated artificial intelligence systems meticulously trained on extensive textual datasets to comprehend and produce human language. 
- By employing NLP techniques, these models can predict text sequences, and they play a crucial role in various applications, including chatbots and content generation.
Based on the size and complexity, you can distinguish two main types of language models:

Based on the size and complexity, you can distinguish two main types of language models:
- `LLMs(Large Language Models)`:
  - LLMs are trained on large datasets, use advanced techniques of Deep Learning
  - finds out complex realtionships between words.
  Examples:
        GPT-4 by OpenAI
        Gemini Flash v1.5 by Google
        Claude v3 Opus by Anthropic
  - LLM's need huge compute power, hosting them locally is cumbersome task because of the high resource its requires, hence the alternate is `Cloud Service Provider(CSP)`

- `Small Language Models(SLM's)`:
    - Small language models (SLMs) are compact versions of LLMs that require less training data, have simpler architectures, and are quicker to develop
    - They are suitable for specific tasks and domains, offering focused expertise, and are applicable for devices with limited processing power.
    Examples:
        Gemma Models by Google
        Phi-2 by Microsoft
        7B by Mistral
        Orca 2 by Microsoft
    - They can be hosted locally on devices with minimal processing capability or on modest server infrastructures. They were designed to be more accessible and practical for specific tasks or domains with little computing complexity.

- A specific LLM group is GPT(generative pre-trained transformer)
    - They use transformer architecture, pre-trained on massive text data
    - Example: ChatGPT
- `Disadvantages of GPT`
    - They are trained on specific initial training data 
    - all the responses evolve from this initial training data only.
    - They are not upto date GPT have `knowledge cutoff` ,events trends etc happening after training data 

## TOKENS
- Have you ever wondered how LLMs understand your prompts? LLMs break down the prompts into tiny building blocks called tokens.
- Token is a single, distinct unit of meaning in natural language, which can be whole words, parts of words, or even punctuation. It is the smallest segment of a text that still makes sense. In Generative AI, tokens are bits of data that an AI model interprets, processes, and generates.
- The process of breaking down text data into tokens following certain predetermined rules is called `tokenization`.
- tokenization is a mechanism working in the background within LLM, so as a user, you indirectly interact with it.
[Tokenisation Playground](https://platform.openai.com/tokenizer)
- Maximum Input Length: There is a limitation to tokens , hence see the usage document of GPT
- Optimizing Сosts: Most LLMs charge based on the number of tokens used. Keeping your prompts concise helps with cost efficiency. 

## How LLMs Work?
- LLMs learn patterns and relationships between words and phrases during the pre-trained process. They learn statistical patterns, grammar, and semantics of human language using massive amounts of text data from the Internet and books. This allows them to collect a vast knowledge base and predict the next word given the context of the preceding words using mathematical calculations and probability.
- Probabilities are established during the training phase and heavily rely on the dataset used to train the model.

#### How does the LLM makes sense of your input?
That heavily depends on the LLM architecture, which is `Transformer Architecture`<br/>
<image src="./images/Transformer_Architecture.png" alt="Transformer_Architecture" style="width:550px"/>

### Prompts
- Prompt defines task, provides context, specifies the desired output format or style, and guides the LLM towards a specific outcome.
- The effectiveness of a model's reaction is heavily dependent on prompt quality, with well-crafted prompts leading to better outcomes
- To write efficent queries/prompts is Prompt  Engineering
- To gain Prmpt Eng. skill, one must learn about AI behavior, language nuances, and the specific requirements of the AI tool.

### Limitations of LLM's
- `Cognitive Constraints`: LLMs perceive and process information differently from humans, leading to potential output limitations. They might make mistakes, produce fake facts ("hallucinate"), or generate biased responses.
- `Security Risks`: They may be susceptible to various forms of cyber threats, including being tricked, attacked, or misused.
- `Privacy Legal Concerns`: LLMs may store and utilize input data. As such, issues surrounding data protection, responsibilities, rights, and compliance with legal regulations arise when using LLMs.
- `Decision Logic Transparency`: LLMs perform extensive computations using a complex array of internal settings and parameters. This complexity often makes the input-output relationships within these models difficult to decipher, causing most commercial LLMs to operate as "black boxes."
Companies developing LLMs typically do not disclose the technical details of these algorithms not only to protect proprietary technology but also to minimize security vulnerabilities.


### Cognitive Constraints and Interaction Challenges
- `Non-Human Cognition`: Below example, The Chatbot imitates a manager, as per the trained dataset it recieved training from
The inability of LLMs to reason and their sensitivity to the semantics of the input (such as using synonyms) may lead to inconsistencies, logical gaps, or repetitions, particularly over long conversations.
    Example:
    ![Non-Human Cognition](images/image.png)

- `Hallicinations`: factual inaccuracies, Fabrication or Misinterpretation, Nonsensical output
    Example:
    factual inaccuracies:
    Prompt: Who was the first to walk on Mars
    Response: Neil Armstrong was the first man to walk on Mars.

    Fabrication or Misinterpretation:
    Can generate fake urls , to give response without actual response

    Nonsensical output
    Prompt: Can Pigs fly
    Response: Yes Pigs can fly with tiny umberallas when the wind is strong

- `Biased Outputs`
Prompt: Tell me about a Nurse
Response: she works in hospital, clicnic. She provides care
The model assumes that a nurse is female. This is a biased output because it perpetuates the stereotype that nursing is a female profession, which is not accurate. Both men and women work as nurses.

- `Lack of Knowledge`
Prompt: Who is President of USA
Response As of my last Update in 2021 , Joe Bidenis the president . Please verify

- Stochastic Nature: The response for the same prompt in two different instances can be different wording, vocabulary though the content remains same , thats because of the randomness in the datasets algos.

#### How to Mitigate:
- `Prompt Engineering`
- `Retrieval-Augmented Generation (RAG)`: For outdated responses, Lack of Knowledge related issues  , can take aid of external links , data sources , Not all LLM's allow this
- `Feedback`: Take feedback from users , developers can use this feedback and retrain
- Cross-Verification
- Combining Models: Check the answers from two different LLM's and mix and match 

### LM Landscape. Leading Vendors and Cloud Service Providers
- LM: Language Models
- Leading organizations that created innovative LMs:
       - Anthropic (Claude)
       - Cohere (Command)
       - Google (Gemini, Gemma)
       - Meta (Llama)
       - OpenAI (GPT, DALL-E, DaVinci) GPT: Generative Pre-training Transformer.
- The three main LLM vendors for generic use cases are OpenAI, Anthropic, and Google.
- We can access them using Direct API's or Cloud Services. These are open source and hene generic .

### LM Parameters: How to choose your LM ?
  - Selecting the best language model (LM) for your needs requires carefully analyzing technical and behavioral parameters, that aligns your task or goal.
  - `Technical Parameters`: 
    - `Model Type Complexity` : Identify your task, text-generation , Q&A, translation etc . Each LM has its own advantages , choose based on your task. *Model Complexity* is the compute power, the training resources of LM , this also have to be kept in mind
    - `Training Data Size and Diversity`: Large datasets and diverse datasets have better model performance, they can generalize better, however interpretability will be the issue. For SLM's interpretability will not be issue due to focused training, helps in sentiment analysis.
    - `Consuming options and Scalability`: Consider the deployment options also Cloud or APIs or on-device-deployments , choice is also worth considering.
    - `Context Window`: How much memory is there when the LM is processing information is context window, this is measured in tokens, which is an inportant factor to consider.
    - `Knowledge Cut-off`: Recent knowledge cut-off is crucial for tasks requiring up-to-date information (e.g., stock prices, current events) or projects in fast-changing fields (e.g., technology, medicine). This depends on your task and goal. For Historical docs, archives this might be less critical.
    - `Cost`: Consider the continuous costs of utilizing the model. LLMs often demand more resources than their smaller, less sophisticated SLM counterparts. This could lead to increased costs for tasks needing frequent model interaction.

- `Behavioural Parameters`: 
    - `Performance`: How good , generalized the model output is according to your needs or task or goal.
    - `Explainability & Transparency`:  How the model is forming the output, is it transparent clear terms 
    - `Bias and Fairness`: Language models can inherit biases from their training data. Assess potential biases to ensure the model aligns with your ethical considerations.
    - `Safety and Security`: Security features are crucial to prevent model misuse and ensure data privacy. Assess the models regarding their compliance with industry or regional standards and your project requirements.

Technical Parameters is easy to identify, but how will you identify Behavioural Parameters , to solve this we have `benchmarks`.

### Benchmarks
- An LLM benchmark is a standardized performance test used to evaluate various capabilities of AI language models.
- Providing a benchmark makes it easier to compare one model against another and, ultimately, select the best one for your proposed use case.
- Some of the parameters on which LLMS are scored from 0 to 100.
   - [Perplexity](https://huggingface.co/spaces/evaluate-metric/perplexity): predict next word in the sequence.Lower score the best score.
   - GLUE/SuperGLUE: General Language Understanding Evaluation. How well the LM understands the language [GLUE Benchmark](https://gluebenchmark.com/leaderboard/)
   - MMLU: Massive Multitask Language Understanding, This benchmark goes beyond traditional NLP tasks, assessing the model's understanding across various subjects and domains.
   - Human Evaluation: Human judgment is crucial in assessing fluency, coherence, and task-specific success.

### Enhancing LLM Capabilites with Plugins
AI tools are applications or interfaces that leverage the capabilities of LLMs to perform specific tasks or deliver particular services. They often incorporate additional features and user interfaces that make them more accessible and practical for everyday use. These LLM Tools are mostly created by the same vendor.
- You will focus on several primary methods for augmenting LLM capabilities within      
        *AI-based tools*
        - Using LLM plugins.
        - Implementing the Retrieval-Augmented Generation (RAG) framework
        - A combination of two previous approaches

- `LLM plugins` are additional tools, services, or software components that can be integrated with LLMs into different applications to access external data sources, perform specific tasks, or interact with other systems

- Different Plugins are:
    - `Information Retrieval Plugins`: search external DB's, Internet specific repos.
    These help LLM in to pull uptodate statistics, summarize content from web pages to provide more relevant responses to user queries.
    Example: Browser Plugin Bing Chat Powered by GPT-4.
    OpenWeatherMap API plugin, which provides weather data.
    - `Domain-Specific Knowledge Plugins`: These plugins are designed to provide specialized expertise or detailed information in specific fields or domains, such as medicine, law, finance, or academia.
    Example: The PubMed API integrated into LLM-based healthcare applications
    - `Task Automation Plugins`:  These plugins enable LLM-based applications to enhance user productivity by performing specific actions or tasks, such as calendar management, email sending, or file manipulation.
    Example: Zapier allows users to connect and trigger actions across various web applications and services, automating routine workflows based on user inputs or specific conditions.
    - `Calculation and Analysis Plugins`: These plugins provide advanced mathematical or analytical capabilities, encompassing scientific calculators, statistical analysis tools, or data visualization functions.
    Example: Wolfarm Apha
    - `Language Translation Plugins`: These plugins enhance the multilingual capabilities of LLMs, enabling real-time translation of user prompts or documents.
    Example: The Google Translate API can be integrated into LLM-based chatbots and customer service applications to provide instant translation for users communicating in different languages.<br/>
    <image src="./images/Plugins_Adv_DisAdv.png" alt="Plugins_Adv_DisAdv" style="width:550px"/>

  ## Retrieval-Augmented Generation (RAG)
    - Retrieval-augmented generation (RAG) systems enhance LLMs' inherent capabilities by pulling information that is not in the initial training dataset from external databases or documents before generating responses. 
    - It works by retrieving relevant information from a knowledge base, incorporating it into a language model's input, and generating responses based on both the original query and the retrieved data.
    - RAG Systems include Two key components:
        - `Retriever`: This component functions like a search engine, scanning a data source to find and retrieve the most relevant documents or pieces of information that can help answer a user request. 
        - `Generator`: This is a core LLM (such as GPT-4) that generates the final output based on the user input and the retrieved context.
       <image src="./images/GPT_RAG_Response_FLOW.png" alt="GPT_RAG_Response_FLOW" style="width:550px"/>

    - Disadvantages of RAG:
     - Potential delays in real-time user interactions due to the speed of the data retrieval process
     - Dependency on the quality and reliability of the data sources and materials
     - Higher computational resource requirements compared to traditional models due to the dual processing of generative and retrieval components.

     