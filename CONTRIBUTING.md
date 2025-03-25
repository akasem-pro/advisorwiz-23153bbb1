
# Contributing to AdvisorWiz

Thank you for your interest in contributing to AdvisorWiz! This document provides guidelines and instructions for contributing to the project.

## Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd advisorwiz
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Run tests**
   ```bash
   npm test
   ```

## Project Structure

- `src/components` - UI components organized by feature
- `src/context` - React context providers
- `src/hooks` - Custom React hooks
- `src/features` - Feature-specific code (auth, matching, etc.)
- `src/pages` - Page-level components
- `src/services` - Service layer for API communication
- `src/utils` - Utility functions and helpers
- `src/tests` - Test files and utilities

## Coding Standards

- Follow the existing code style (TypeScript, React patterns)
- Write tests for new features
- Keep components small and focused
- Use the shadcn/ui component library for UI elements
- Implement responsive designs using Tailwind CSS
- Document complex functionality with comments

## Pull Request Process

1. Create a branch with a descriptive name related to the feature or fix
2. Make your changes and ensure tests pass
3. Update documentation if necessary
4. Submit a pull request with a clear description of changes
5. Wait for review and address any feedback

## Architecture Decisions

AdvisorWiz follows these architectural principles:

- **Component-Based Architecture**: UI is broken down into reusable components
- **Context API for State Management**: Global state is managed via React Context
- **Custom Hooks for Logic Reuse**: Business logic is extracted into custom hooks
- **Service Layer for API Calls**: All API communication is abstracted in services
- **Feature-based Organization**: Code is organized by feature rather than type

## Performance Considerations

- Use React.memo for expensive components
- Implement virtualization for long lists
- Optimize images and assets
- Minimize dependencies and bundle size
