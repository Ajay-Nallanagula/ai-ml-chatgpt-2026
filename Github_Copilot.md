
## Epam Github Copilot Creds:
--------------------------
```
### Username: Ajay-Nallanagula1_epam 

NOTE: 

1) Please note that you should log in using your EPAM-provided GitHub username, which is in the following format: firstname-lastname_epam(EG:Ajay-Nallanagula1_epam). Once you enter your username, you will be redirected to the EPAM SSO page for authentication.

2) After the end user name is specified on the sign in form, you will be suggested to sign in via SSO.
```

- [epam GITHUB Copilot Licence Docs](https://kb.epam.com/display/public/EPMSAM/GitHub+Copilot)

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)

### Difference between Ask Vs Edit Vs Agent
Inside copilot-chat
<image src="./images/AskVsEditVsAgent.png" alt="Ask Vs Edit Vs Agent" style="width: 550px;"/> <br/>

- `Ask` lets you query Copilot for explanations, code suggestions, or help—without changing your code.

- `Edit` applies Copilot’s suggestions directly to your code, making modifications based on your prompt.

- `Agent` performs more advanced, multi-step tasks (like refactoring or debugging) by interacting with your code and workspace context. Agent final output will be a working code.

[Ask Vs Edit Vs Agent Video Link](https://videoportal.epam.com/video/rJdlDLGJ#t=2s)

### Next Edit Suggestions
<image src="./images/NextEditSuggestions.png" alt="Next Edit Suggestions" style="width: 550px;"/> <br/>

<image src="./images/NextEditSuggestions2.png" alt="Next Edit Suggestions" style="width: 550px;"/> <br/>

### Copilot Chat Commands

Explain about @,#,/ commands 

GitHub Copilot: Certainly! In GitHub Copilot Chat, special commands starting with `@`, `#`, and `/` help you interact with the tool more efficiently:

- **@ (Mention):**  
  Use `@` to refer to specific files, symbols, or code blocks. For example, `@main.py` or `@MyClass` tells Copilot Chat to focus on that file or symbol.

- **# (Reference):**  
  Use `#` to reference issues, pull requests, or discussions from your repository. For example, `#123` refers to issue or PR number 123.

- **/ (Slash Commands):**  
  Use `/` to trigger built-in actions or Copilot Chat features. Examples:
  - `/explain` — Asks Copilot to explain the selected code.
  - `/test` — Generates unit tests for the selected code.
  - `/fix` — Suggests fixes for errors in the code.

These commands help you get targeted, context-aware assistance directly in Visual Studio Code.

### Co-Pilot Instructions File 

The below will help you in placing the copilot instructions file in your repo root and customize it as per your project needs.
You can apply in VSCode-->Settings-->Search for "Copilot Instructions"-->Edit in settings.json, 

Video: https://videoportal.epam.com/video/V7gZDLpJ#st=1&t=3s 

- You can find Sample Instructions file here: 
https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions

- Example:  https://medium.com/@anil.goyal0057/mastering-github-copilot-custom-instructions-with-github-copilot-instructions-md-f353e5abf2b1


Creating a Co-pilot instruction file for a Frontend project is a great way to ensure your team adheres to best practices, maintains code quality, and promotes consistency across the codebase. Below is a structured list of topics and rules that you might want to include in the instructions file for effective usage of GitHub Co-pilot or any other AI-assisted coding tool.

---

## Co-pilot Instructions for Frontend Project: Best Practices

ChatGPT: You are a Team lead for a Frontend project, You need to write a Co-pilot Instructions files set for best practices , what all things you would include in it 


This document provides guidelines and best practices for using Co-pilot effectively in the context of our Frontend project. These instructions aim to ensure consistent, maintainable, and high-quality code across the team.

---

## 1. **Code Consistency and Style**
1.1 Follow the **Prettier** and **ESLint** rules set for this project. Make sure Co-pilot suggestions align with these styles.  
1.2 Always follow the naming conventions defined in our project.  
  - Variables and functions use `camelCase`.  
  - Constants use `UPPER_SNAKE_CASE`.  
  - File names use `kebab-case`.  
1.3 Avoid acceptance of Co-pilot's suggestions if they conflict with our configured style or existing patterns in the codebase.  

---

## 2. **File and Folder Structure**
2.1 Organization follows the established folder structure:
   - `src/` for source code
   - `components/` for reusable React/Vue/Angular UI components
   - `utils/` for utility and helper functions
   - `services/` for API calls and data fetch logic
   - `state/` for state management (Redux/Zustand/Context API)
2.2 Always ensure Co-pilot suggestions respect the current folder structure.

---

## 3. **Reusable Components**
3.1 Prioritize modular, reusable components. If Co-pilot suggests overly specific components, refactor for reusability.  
3.2 All props should be properly typed/documented (e.g., using **TypeScript** or PropTypes).  
3.3 Follow accessible design principles:  
   - Use semantic HTML where applicable.  
   - Implement `aria-*` attributes for dynamic components.

---

## 4. **TypeScript Best Practices (if applicable)**
4.1 Every function, props, and state should be typed explicitly. Avoid `any` unless absolutely necessary.  
4.2 Use interfaces for objects over type aliases for consistency.  
4.3 Prefer utility types (e.g., `Partial`, `Readonly`) whenever possible.  

---

## 5. **Code Documentation**
5.1 Document functions and components using JS/TSdoc. For example:  

   ```typescript
   /**
    * Adds two numbers and returns the result.
    * @param a - First number
    * @param b - Second number
    * @returns Sum of the two numbers
    */
   function add(a: number, b: number): number {
     return a + b;
   }
   ```

5.2 If Co-pilot writes undocumented functions, make sure to add the appropriate documentation.  

---

## 6. **Testing**
6.1 **Unit Tests:** Co-pilot suggestions should include test cases for the components or functions being generated. Don't blindly accept suggestions without testing.  
6.2 Use tools like **Jest** or **React Testing Library** for writing tests.  
6.3 Avoid mock-heavy test suggestions for critical business logic; aim for real-world data-based testing.  

---

## 7. **State Management**
7.1 For components' local state, prefer **useState** or **useReducer** when applicable.  
7.2 For global state, validate suggestions for each case (e.g., Redux or Context API):
   - Encapsulate global state logic in one place (e.g., Redux reducers or slices).  
   - Avoid storing redundant or derived state data unless necessary.

---

## 8. **REST API Calls/GraphQL Integration**
8.1 Use **Axios**/`fetch` for REST APIs and **Apollo Client** for GraphQL (or the relevant stack defined by the project).  
8.2 Ensure Co-pilot suggestions include:
   - Error handling.  
   - Considerations for loading states.  
   - Security headers or tokens where necessary.  
8.3 Modularize API logic into the `services/` folder for maintainability.

---

## 9. **Performance Considerations**
9.1 Validate Co-pilot’s suggestions against project constraints for performance:
   - Avoid expensive operations in render cycles (e.g., mapping large arrays without memoization).  
   - Use `React.memo`/`useMemo`/`useCallback` judiciously for optimization.  
9.2 Ensure lazy loading is adopted for heavy components or routes.

---

## 10. **Accessibility**
10.1 Ensure Co-pilot suggestions include proper HTML semantics and accessibility attributes (`aria-*`, role, etc.).  
10.2 Validate that all interactive elements (e.g., buttons, inputs) are keyboard-navigable.  
10.3 Test accessibility using tools like **Lighthouse** or **axe**.

---

## 11. **Accepting Co-pilot Suggestions**
11.1 Always review Co-pilot suggestions for:  
   - Functionality that fits context correctly.  
   - Consistent structure and readability.  
   - Security flaws (e.g., unescaped user input, hardcoded sensitive strings).  
11.2 Customize suggestions to match the project’s requirements rather than accepting them blindly.  

---

## 12. **Security Best Practices**
12.1 Avoid hardcoding sensitive data (API keys, secrets, etc.) in your code. Use environment variables instead.  
12.2 Ensure Co-pilot suggestions don't insert unsafe code patterns (e.g., `eval`, SQL injections, or insecure dependencies).  
12.3 Validate all user inputs and sanitize accordingly.  

---

## 13. **Version Control and Git**
13.1 Quality-over-quantity: Ensure Co-pilot’s code suggestions do not bloat PRs unnecessarily.  
13.2 Write meaningful and comprehensive Git commit messages. Avoid generic terms like "Implemented new feature."  

---

## 14. **Component Libraries and Frameworks**
14.1 Follow pre-approved frameworks/libraries for the project (e.g., Material-UI, TailwindCSS).  
14.2 Co-pilot suggestions should blend seamlessly with the library's conventions (use Material-UI styles over raw inline styles, etc.).

---

## 15. **Error Handling & Debugging**
15.1 Always wrap API calls with proper error handling (e.g., try-catch blocks).  
15.2 Avoid console logs in production builds. Use logging libraries like **LogRocket** or **Sentry** for structured error tracking.  
15.3 Promote graceful failure mechanisms (e.g., fallback UIs for components or routes).  

---

## 16. **Prohibited Patterns**
These practices should be avoided in our codebase:  
16.1 Inline styles for complex components (use CSS modules, Styled-Components, or approved framework techniques).  
16.2 Commented-out code or unused imports.  
16.3 Overwriting state directly in React (`state.value =`).  
16.4 Long, nested callback chains; prefer async/await instead.

---

By following these guidelines, we can use Co-pilot as an effective tool to accelerate our workflow while maintaining high standards for code readability, accessibility, and maintainability.

## Model Context Protocol:
<image src="./images/BeforeMCPVsAfterMCP.png" alt="BeforeMCPVsAfterMCP" style="width: 550px;"/> <br/>

- On the left side ("Before MCP"), the LLM interacts directly with each service through its own unique API. This means developers must handle different integration patterns and protocols for every service, increasing complexity and maintenance overhead.

- On the right side ("After MCP"), the Model Context Protocol (MCP) acts as an intermediary. The LLM communicates with MCP using a unified API, and MCP then handles the unique APIs for each service. This abstraction simplifies integration, reduces code duplication, and makes it easier to add or update services in the future. The image helps clarify how MCP streamlines the connection between LLMs and external platforms.

- MCP acts as a bridge between LLMs and various external services, providing a standardized way for LLMs to access and interact with these services. This protocol abstracts the complexities of different service APIs, allowing LLMs to communicate through a unified interface.

- Each Service Connector implements the MCP interface, translating MCP requests into service-specific API calls. This modular approach enables easy integration of new services by simply adding new connectors without modifying the LLM or existing connectors.

- [SOURCE ON GITHUB MCP Server](https://github.com/github/github-mcp-server)

- [AVAILABLE MCP's](https://github.com/modelcontextprotocol/servers)


