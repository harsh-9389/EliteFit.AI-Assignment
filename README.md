# Task Management Application

This is a simple task management application built with React and TypeScript. The application allows users to add, edit, delete, and search tasks. It also categorizes tasks into upcoming, overdue, and completed sections based on their due dates.

## Features

- **User Name Prompt**: Prompts the user for their name if it is not already stored in local storage.
- **Add Task**: Allows users to add tasks with a title, priority, due date, and description.
- **Edit Task**: Users can edit existing tasks.
- **Delete Task**: Users can delete tasks.
- **Complete Task**: Users can mark tasks as completed.
- **Search Tasks**: Users can search tasks by title, description, due date, or priority.
- **Task Categorization**: Automatically moves tasks to the overdue section if their due date has passed.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **PrimeReact**: A collection of rich UI components for React.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/harsh-9389/task-management-app.git
    cd task-management-app
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

4. Open your browser and navigate to given url in the terminal.

## Usage

1. **Add a Task**:
    - Enter the task title, priority, due date, and description.
    - Click the "Add Task" button.

2. **Edit a Task**:
    - Click the "Edit" button next to the task you want to edit.
    - Modify the task details and click the "Update Task" button.

3. **Delete a Task**:
    - Click the "Delete" button next to the task you want to delete.

4. **Complete a Task**:
    - Click the "Complete" button next to the task you want to mark as completed.

5. **Search Tasks**:
    - Enter a search query in the search input field to filter tasks by title, description, due date, or priority.

## File Structure

- `src/`
    - `App.tsx`: Main application component.
    - `index.css`: Tailwind CSS configuration.
    - `main.tsx`: Entry point of the application.
    - `declarations.d.ts`: TypeScript declarations for CSS modules.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Contact

For any questions or feedback, please contact [harsh-9389](https://github.com/harsh-9389).