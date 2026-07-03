# Student Management Dashboard

A complete frontend unit testing project demonstrating test-driven development (TDD) principles using HTML, CSS, Vanilla JavaScript, Jest, and Testing Library.

## Project Overview

This project is a beginner-friendly, fully responsive Student Management Dashboard. It allows users to perform CRUD (Create, Read, Update, Delete) operations on student records, search and filter students, and persists data using `localStorage`. The core focus of this project is to showcase comprehensive frontend unit testing for logic, validation, storage, and UI manipulation.

## Features

- **Add Student**: Add new students with validation (name, email, age, department).
- **Edit Student**: Update existing student records.
- **Delete Student**: Remove students with confirmation.
- **Search Students**: Real-time search by name or email.
- **Filter Students**: Filter the student list by department.
- **Form Validation**: Comprehensive client-side validation with error messages.
- **Responsive Design**: Modern UI with a responsive table and card layouts.
- **Local Storage**: Data persistence using the browser's `localStorage`.
- **Notifications**: Success and error toast notifications.
- **Empty State**: Friendly messages when no students match the criteria.

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6 Modules)
- **Testing**: Jest, `@testing-library/dom`, `@testing-library/jest-dom`
- **Environment**: Node.js, npm, Babel (for ES modules support in Jest)

## Installation

1. Clone the repository or download the project files.
2. Navigate to the project directory.
3. Install the dependencies:

\`\`\`bash
npm install
\`\`\`

## How to Run

To run the application locally, you can use any local development server (like VS Code Live Server or Vite if configured). Since this project uses ES6 modules, it must be served over HTTP (not opened directly as a `file://` URL).

If using Vite (as configured in `package.json`):

\`\`\`bash
npm run dev
\`\`\`

## How to Run Tests

The project includes comprehensive unit tests using Jest. 

To run the test suite once:
\`\`\`bash
npm test
\`\`\`

To run the tests in watch mode (ideal for development):
\`\`\`bash
npm run test:watch
\`\`\`

## Coverage Report

The testing suite aims for high test coverage (>95%). To generate and view the coverage report:

\`\`\`bash
npm run coverage
\`\`\`

This command will output a coverage summary in the terminal and generate an HTML report in the `coverage/` directory. You can open `coverage/lcov-report/index.html` in your browser to view detailed line-by-line coverage.

## Folder Structure

\`\`\`
student-testing-project/
├── index.html              # Main HTML entry point
├── css/
│   └── style.css           # Styling and layout
├── js/
│   ├── app.js              # Main application initialization and events
│   ├── storage.js          # Local storage wrapper
│   ├── student.js          # Student data logic and manipulation
│   ├── ui.js               # DOM manipulation and rendering
│   └── validation.js       # Form validation logic
├── tests/
│   ├── setup.js            # Jest setup file (imports jest-dom)
│   ├── storage.test.js     # Tests for storage functions
│   ├── student.test.js     # Tests for student logic
│   ├── ui.test.js          # Tests for UI rendering
│   └── validation.test.js  # Tests for validation logic
├── babel.config.cjs        # Babel configuration for Jest
├── jest.config.js          # Jest configuration
├── package.json            # Project metadata and scripts
└── README.md               # Project documentation
\`\`\`

## Future Improvements

- Add pagination for large lists of students.
- Implement sorting functionality on table headers.
- Export student data to CSV/PDF.
- Add end-to-end (E2E) testing using Cypress or Playwright.
- Connect to a real backend API/database (e.g., Firebase, Node/Express).
