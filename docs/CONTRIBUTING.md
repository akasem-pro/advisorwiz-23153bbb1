
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

### Testing Strategy

We aim for at least 80% test coverage on all core modules, with particular emphasis on:
- Matching algorithms
- User authentication flows
- Data persistence layers
- Critical user journeys

### Types of Tests

- **Unit tests**: Test individual components and functions in isolation
- **Integration tests**: Test interactions between components and services
- **E2E tests**: Test complete user flows from start to finish
- **Performance tests**: Test system performance under various conditions

### Writing Effective Tests

- Focus on testing behavior, not implementation details
- Use descriptive test names that explain what is being tested
- Follow the AAA pattern (Arrange, Act, Assert)
- Mock external dependencies when necessary
- Consider edge cases and error scenarios

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- src/tests/matching/matchCaching.test.ts

# Run tests matching a specific pattern
npm test -- -t "should process batch calculations efficiently"
```

### Continuous Integration

All tests are run automatically on:
- Every pull request to the main branch
- Every commit to the main branch

The CI pipeline includes:
- Linting
- Type checking
- Unit and integration tests
- Performance benchmarks for critical paths
- Accessibility audits

## Documentation

- Update documentation when changing functionality
- Document complex algorithms and business logic
- Use JSDoc for documenting functions and components

## Performance Monitoring

When working with the performance monitoring system:

- Use the provided utilities in `utils/performance/` directory
- Record meaningful performance marks with `recordPerformanceMark`
- Leverage the enhanced performance tracking system for complex metrics
- Respect the Web Vitals guidelines when adding new UI elements
- Test changes against Core Web Vitals metrics
- Make sure A/B test integrations properly track performance impacts

### Performance Monitoring Usage Examples

```typescript
// Example of recording simple performance marks
import { recordPerformanceMark } from '../utils/performance';

// Record when a component loads
useEffect(() => {
  recordPerformanceMark('component-loaded');
}, []);

// Record before and after expensive operations
recordPerformanceMark('operation-start');
const result = expensiveOperation();
recordPerformanceMark('operation-end', 'operation-duration', 'operation-start');

// Example of enhanced performance tracking for complex metrics
import { trackEnhancedPerformance } from '../utils/performance';

// Track a complex operation with tags and metadata
trackEnhancedPerformance('matching-calculation', durationMs, {
  tags: {
    userType: 'advisor',
    featureArea: 'matching',
    matchType: 'expertise'
  },
  persist: true,
  sendImmediately: false
});
```

### Web Vitals Integration

The performance monitoring system automatically tracks Core Web Vitals:

- LCP (Largest Contentful Paint)
- FID (First Input Delay)
- CLS (Cumulative Layout Shift)
- INP (Interaction to Next Paint)

These metrics are correlated with user interactions and reported to analytics for monitoring.

For more details, refer to [PERFORMANCE_MONITORING.md](./PERFORMANCE_MONITORING.md).

## Quality Assurance

### Manual Testing

Before submitting a PR, manually test your changes:
- Test on multiple browsers (Chrome, Firefox, Safari)
- Test on different screen sizes (desktop, tablet, mobile)
- Test with keyboard navigation
- Test with a screen reader if modifying UI elements

### Accessibility Testing

- Run the built-in accessibility audit tool: `npm run a11y-audit`
- Ensure all interactive elements are keyboard accessible
- Maintain proper heading hierarchy
- Use appropriate ARIA attributes
- Ensure sufficient color contrast (minimum 4.5:1 for normal text)

### Security Best Practices

- Validate all user inputs
- Use parameterized queries for database operations
- Follow the principle of least privilege
- Keep dependencies updated
- Do not commit secrets or credentials
- Use content security policies

### Performance Optimization

- Minimize bundle size
- Optimize images
- Use code splitting and lazy loading
- Implement caching strategies
- Avoid unnecessary re-renders
- Profile and optimize expensive operations

## Reporting Bugs

When reporting bugs, please include:
- Detailed steps to reproduce the bug
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Environment information (browser, OS, etc.)
- Performance metrics if relevant

## Feature Requests

Feature requests are welcome! Please provide:
- A clear description of the feature
- The problem it solves
- Potential implementation ideas (optional)
- Performance impact considerations

## Code of Conduct

Please be respectful and inclusive when contributing to this project. Harassment or abusive behavior will not be tolerated.

## Questions and Support

If you have questions or need support, please:
1. Check the documentation
2. Look for existing issues
3. Create a new issue with the label "question"
