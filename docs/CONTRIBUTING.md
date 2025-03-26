
# Contributing to AdvisorWiz

Thank you for considering contributing to AdvisorWiz! This document provides detailed guidelines to help you contribute effectively.

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Git

### Development Environment Setup

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

## Development Workflow

### Branch Naming Convention

- Feature branches: `feature/feature-name`
- Bug fixes: `fix/bug-description`
- Documentation: `docs/what-is-being-documented`
- Performance improvements: `perf/what-is-being-improved`

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code changes that neither fix bugs nor add features
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Changes to build process or auxiliary tools

Example:
```
feat(matching): implement advisor expertise weighting algorithm

This change adds a new algorithm that weights advisor expertise
based on consumer preferences, improving match quality by 15%.

Closes #123
```

### Pull Request Process

1. Create a branch for your changes
2. Make your changes
3. Write or update tests as necessary
4. Ensure all tests pass
5. Submit a pull request to the `main` branch
6. Await code review and address any feedback

## Code Standards

Please follow the code standards outlined in [CODE_STANDARDS.md](./CODE_STANDARDS.md).

## Testing Guidelines

- Write unit tests for utility functions and hooks
- Write component tests for UI components
- Aim for a good balance of unit, integration, and e2e tests
- Test edge cases and error scenarios

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## Documentation

- Update documentation when changing functionality
- Document complex algorithms and business logic
- Use JSDoc for documenting functions and components

## Reporting Bugs

When reporting bugs, please include:
- Detailed steps to reproduce the bug
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Environment information (browser, OS, etc.)

## Feature Requests

Feature requests are welcome! Please provide:
- A clear description of the feature
- The problem it solves
- Potential implementation ideas (optional)

## Code of Conduct

Please be respectful and inclusive when contributing to this project. Harassment or abusive behavior will not be tolerated.

## Questions and Support

If you have questions or need support, please:
1. Check the documentation
2. Look for existing issues
3. Create a new issue with the label "question"
