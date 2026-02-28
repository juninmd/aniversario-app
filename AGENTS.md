```markdown
# AGENTS.md - AI Coding Agent Guidelines

These guidelines are designed to ensure the consistent, high-quality development of AI coding agents within this repository. Adherence to these principles will significantly improve maintainability, testability, and overall project robustness.

## 1. DRY (Don't Repeat Yourself)

*   **Single Responsibility Principle:** Each agent should have a single, well-defined purpose.  Avoid creating agents with overly complex responsibilities.
*   **Component Reuse:**  Design agents to be modular and reusable across different projects.  Implement common functionalities into dedicated components.
*   **Abstraction:**  Use abstractions to hide implementation details and expose only essential interfaces.
*   **Code Standardization:**  Adopt consistent coding style, naming conventions, and data structures across all agents.

## 2. KISS (Keep It Simple, Stupid)

*   **Minimize Complexity:** Keep agent code concise and easy to understand.  Avoid unnecessary lines of code.
*   **Logical Structure:**  Arrange code in a logical order, following a consistent architectural pattern.
*   **Clear Intent:** Each function and module should have a clear and well-defined purpose.
*   **Avoid Over-Engineering:** Don't introduce unnecessary features or logic that doesn't directly contribute to the agent’s core functionality.

## 3. SOLID Principles

*   **Single Responsibility Principle (SRP):**  Each class/module should have one and only one reason to change.
*   **Open/Closed Principle (OCP):**  The agent should be open for extension but closed for modification.  (This is implicitly related to DRY & KISS)
*   **Liskov Substitution Principle (LSP):**  Subclasses should be substitutable for their base classes without altering the correctness of the program.
*   **Interface Segregation Principle (ISP):**  Clients should not be forced to depend on methods they do not use.
*   **Dependency Inversion Principle (DIP):**  High-level modules should be dependent on low-level modules, and low-level modules should be dependent on only abstract interfaces.

## 4. YAGNI (You Aren't Gonna Need It)

*   **Focus on Requirements:**  Only implement functionality that is explicitly required by the current task or the agent’s specifications.
*   **Avoid Unnecessary Code:**  Don’t add code that is not essential for the current stage of development.
*   **Refactor on Demand:**  Prioritize refactoring based on demonstrable value and need, rather than arbitrary changes.

## 5. Development Practices

*   **Testing:** All development must be productive. Mocking/faking implementations *only* for unit and integration testing.
*   **Code Reviews:** Every significant code change requires a formal code review by at least two team members.
*   **Documentation:**  Clear and concise documentation for each agent is crucial.  Include comments explaining design decisions and complex logic.
*   **Version Control:** Use Git with a well-defined branching strategy (e.g., Gitflow).
*   **CI/CD:** Implement a CI/CD pipeline to automate testing and deployment.

## 6. Code Length Constraints

*   **Maximum Code Length:**  Each file must not exceed 180 lines of code.
*   **Code Splitting:**  Consider code splitting strategies to improve load times.

## 7. Test Coverage Requirements

*   **Target Coverage:**  Aim for at least 80% test coverage.
*   **Test Suite:**  Maintain a comprehensive test suite covering all critical functionalities.
*   **Test Case Design:**  Focus on creating isolated and meaningful test cases that accurately reflect the agent's behavior.

## 8. File Structure

*   **Modular Design:** Organize files into logical modules/components.
*   **Consistent Naming:** Follow a consistent naming convention across the repository.
*   **Clear Directory Structure:** Use a clear and intuitive directory structure.

## 9.  Specific Considerations (Example - adaptable to agent types)

*   **AgentX (Data Processing):** Ensure data validation logic is explicitly defined and tested.
*   **AgentY (Dialogue Management):**  Implement a robust state machine for managing conversation flow.
*   **AgentZ (Resource Allocation):**  Thoroughly test the agent's resource allocation algorithms.

## 10.  General Guidelines

*   **Prioritize Readability:** Code should be easy to read and understand.
*   **Error Handling:** Implement robust error handling to prevent unexpected crashes.
*   **Logging:** Add logging statements to provide debugging information.



These guidelines are a starting point and will be reviewed and updated as the project evolves.  Any deviation from these principles requires discussion and agreement with the team.
```