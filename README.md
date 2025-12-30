## Project Description

This is a complete CRUD (Create, Read, Update, Delete) application built with Angular. The application allows users to manage employee records with full CRUD functionality using browser's localStorage for data persistence.

### Features

- **Create**: Add new employee records with validation
- **Read**: Display all employees in a table view
- **Update**: Edit existing employee records
- **Delete**: Remove employee records with confirmation
- **Validation**: Form validation for required fields and email format
- **Data Persistence**: Uses browser's localStorage to persist data between sessions

### Technologies Used

- **Angular 19+**: Frontend framework
- **TypeScript**: Programming language
- **RxJS**: Reactive programming library for handling asynchronous operations
- **HTML5**: Markup language
- **SCSS/CSS**: Styling
- **Bootstrap**: CSS framework for responsive design
- **localStorage**: Browser storage API for data persistence

### Project Architecture

- **Components**:
  - `AppComponent`: Main component handling the UI and user interactions
- **Services**:
  - `EmployeeService`: Handles all CRUD operations and data persistence
- **Models**:
  - `Employee`: Defines the structure of employee data
- **Forms**:
  - Reactive forms with validation

### Specific Features

- Reactive forms with validation
- Proper error handling
- Responsive design with Bootstrap
- Type safety with TypeScript interfaces
- Observable pattern for data operations
- Clean and maintainable code structure

### Installation and Usage

1. Make sure you have Node.js and Angular CLI installed
2. Clone or download the project
3. Run `npm install` to install dependencies
4. Run `ng serve` to start the development server
5. Open your browser to `http://localhost:4200`

### Folder Structure

```
src/
├── app/
│   ├── model/
│   │   └── Employee.ts          # Employee data model
│   ├── services/
│   │   └── employee.service.ts  # CRUD operations service
│   └── app.component.ts/html    # Main application component
```

### Applied Best Practices

- Reactive forms over template-driven forms
- Observable pattern for asynchronous operations
- Proper error handling
- Component-based architecture
- Separation of concerns
- Type safety with TypeScript
- Immutable data patterns
- Proper memory management
