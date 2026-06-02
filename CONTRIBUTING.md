# Contributing to aniversario-app

Thank you for your interest in contributing to this project! Please follow these guidelines to ensure a smooth contribution process.

## Development Workflow

1. Fork the repository
2. Create a new branch from `develop` for your feature/fix
3. Make your changes
4. Ensure all tests pass and code quality checks are met
5. Submit a pull request to the `develop` branch

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment. The pipeline includes:

### Stages
1. **Lint** - Code quality checks using ESLint
2. **Test** - Unit and integration tests with coverage reporting
3. **Build** - JavaScript bundling for React Native
4. **Deploy** - Deployment to production (triggered on main branch pushes)

### Quality Gates
- All linting checks must pass
- Minimum 80% code coverage required
- No security vulnerabilities in dependencies
- Successful build of JavaScript bundle

### Environment Variables
The following secrets must be configured in the repository settings:
- `EXPO_TOKEN` - For Expo CLI authentication
- Any API keys or credentials needed for deployment

## Pull Request Guidelines

1. Keep PRs focused on a single issue/feature
2. Write clear, descriptive PR titles
3. Include relevant issue numbers in PR description
4. Ensure all checks pass before requesting review
5. Respond to code review comments promptly

## Testing

- Write unit tests for new business logic
- Maintain or improve existing test coverage
- Run `yarn test` locally before submitting
- Tests should cover edge cases and error conditions

## Code Style

- Follow JavaScript ES6+ standards
- Use meaningful variable and function names
- Comment complex logic but avoid obvious comments
- Keep functions small and focused

## Reporting Issues

When reporting bugs or requesting features:
1. Check if the issue already exists
2. Provide steps to reproduce (for bugs)
3. Include relevant screenshots or logs
4. Label appropriately (bug, enhancement, question)

Thank you for contributing!