# Contributing to Aniversario App

## Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request against `develop`

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment.

### Pipeline Stages

| Stage      | Description                                  | Trigger            |
| ---------- | -------------------------------------------- | ------------------ |
| **Lint**   | ESLint, Prettier formatting, Flow type check | All PRs and pushes |
| **Test**   | Jest with 80% coverage threshold             | After lint passes  |
| **Build**  | Bundle verification                          | After tests pass   |
| **Deploy** | Expo publish to staging                      | PR merge to `main` |

### Quality Gates

- **Linting**: Must pass ESLint with no errors
- **Formatting**: Must match Prettier formatting
- **Type Check**: Flow must pass
- **Coverage**: Minimum 80% code coverage required
- **Dependencies**: `yarn.lock` must be up-to-date

### Before Submitting a PR

```bash
yarn lint          # Check for lint errors
yarn format:check  # Check formatting
yarn flow          # Type check
yarn test:ci       # Run tests with coverage
```

### Environment Variables

See `.env.example` for required environment variables.
Copy it to `.env` for local development.

### Branch Strategy

- `main` - Production-ready code (protected)
- `develop` - Integration branch for features
- `feature/*` - New features
- `fix/*` - Bug fixes
- `chore/*` - Maintenance tasks

### Pull Request Process

1. Update the README.md with details of changes if needed
2. Ensure all CI checks pass
3. Get at least one code review approval
4. Squash and merge to `develop`
5. Release to `main` through PR from `develop`
