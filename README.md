# Larios Income Tax Website

An Angular-based web application for Larios Income Tax services, migrated from the original Wix site at [lariosincometax.com](https://www.lariosincometax.com/).

**Business:** Larios Income Tax | **Location:** 3317 El Cajon Blvd, San Diego, CA 92104 | **Phone:** +1 (619) 283-2828

## Quick Start

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher
- Docker (optional, for containerized deployment)

### Installation & Development

```bash
# Clone and install
git clone <repository-url>
cd lario-income-tax-website
npm install

# Start development server
npm start
# Navigate to http://localhost:4200
```

### Common Commands

```bash
npm start              # Start development server
npm run build          # Build for production
npm test               # Run unit tests
npm run format         # Format code with Prettier
npm run lint:md        # Lint markdown files
```

For Angular CLI commands (generate components, services, etc.), see [Setup Guide](docs/setup-guide.md).

## Docker Deployment

```bash
# Build and run
docker build -t lario-income-tax-website .
docker-compose up -d

# Available at http://localhost:80
```

See [Docker Setup](docs/docker-setup.md) for detailed deployment options.

## Technology Stack

- **Framework:** Angular 21.0.4
- **Language:** TypeScript
- **Container:** Docker with Nginx
- **Node Version:** 20 LTS

## Documentation

Comprehensive technical documentation is available using [Backstage TechDocs](https://backstage.io/docs/features/techdocs/):

- [Setup Guide](docs/setup-guide.md) - Installation and development workflow
- [Architecture](docs/architecture.md) - Project structure and design patterns
- [Code Quality](docs/code-quality.md) - Standards, linting, and pre-commit hooks
- [CI/CD Pipeline](docs/ci-cd.md) - GitHub Actions workflows
- [Docker Setup](docs/docker-setup.md) - Container deployment guide
- [Production Build](docs/production-build.md) - Building for production
- [Environment Config](docs/environment-config.md) - Configuration guide

**View locally:**

```bash
pip install mkdocs-techdocs-core
mkdocs serve  # Open http://localhost:8000
```

## Project Structure

```text
src/
├── app/
│   ├── core/           # Singleton services, guards, interceptors
│   ├── shared/         # Shared components, directives, pipes
│   ├── features/       # Feature modules (home, services, contact, about)
│   └── app.ts          # Root component
├── environments/       # Environment configurations
└── styles.css          # Global styles
```

See [Project Structure](docs/project-structure.md) for detailed organization.

## Code Quality & CI/CD

- **Pre-commit hooks** enforce formatting and linting on every commit
- **GitHub Actions** run on PRs: linting, tests, build verification
- **Docker publishing** to Docker Hub on main branch and version tags

See [Code Quality](docs/code-quality.md) and [CI/CD Pipeline](docs/ci-cd.md) for details.

## Contributing

This project uses automated code quality tools:

- Pre-commit hooks (Prettier, markdownlint)
- See [Code Quality Guide](docs/code-quality.md)
- AI development guidelines: [CLAUDE.md](CLAUDE.md)

## License

See [LICENSE](LICENSE) file for details.
