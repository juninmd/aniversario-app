# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it privately via GitHub Security Advisories or by emailing the maintainers directly.
Do not open a public issue for security vulnerabilities.

## Security Measures

### Secrets Management
- All environment variables are stored in `.env` files which are excluded from version control via `.gitignore`
- Never commit `.env`, `*.key`, `*.pem`, `*.p12`, or `secrets/` to the repository
- Use environment variables for all sensitive data (API keys, tokens, etc.)

### Input Validation
The application uses a centralized security utility module (`src/utils/security.js`) that provides:
- **XSS Prevention**: HTML entity encoding and XSS pattern detection
- **SQL Injection Prevention**: Detection of SQL injection patterns in user input
- **Sensitive Data Detection**: Identifies potential secret/key leakage in logs or output
- **Input Validation**: Email, URL, and custom pattern validation with length constraints
- **Object Sanitization**: Recursive sanitization of nested objects and arrays

### Dependency Management
- Automated dependency updates via Renovate (configured in `renovate.json`)
- Security vulnerability alerts are labeled `security` and `vulnerability`
- Patch updates and devDependencies are auto-merged

### CI/CD Security
- GitHub Actions workflows run security scans on every push and PR
- `gitleaks` scans for accidentally committed secrets
- `dependency-review` checks for vulnerable dependencies in PRs
- Least-privilege permissions for CI tokens

### OWASP Top 10 Compliance

1. **Broken Access Control** - Proper authentication checks for protected resources
2. **Cryptographic Failures** - HTTPS enforced; secure headers configured
3. **Injection** - Input sanitization prevents XSS and SQL injection vectors
4. **Insecure Design** - Security built into the validation layer from the start
5. **Security Misconfiguration** - Secure defaults; `.gitignore` prevents exposure
6. **Vulnerable and Outdated Components** - Renovate keeps dependencies updated
7. **Identification and Authentication Failures** - Secure credential handling
8. **Software and Data Integrity Failures** - CI/CD verifies dependency integrity
9. **Security Logging and Monitoring** - Security events logged for audit
10. **SSRF** - URL validation ensures only safe HTTP(S) URLs are used

### Best Practices
- Follow the principle of least privilege
- Regular security audits and dependency updates
- Code reviews for all significant changes
