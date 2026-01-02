# Larios Income Tax Website

An Angular-based web application for Larios Income Tax services, migrated from the original Wix site at [lariosincometax.com](https://www.lariosincometax.com/).

## Business Information

- **Business Name:** Larios Income Tax
- **Address:** 3317 El Cajon Blvd, San Diego, CA 92104
- **Phone:** +1 (619) 283-2828
- **Services:** Income Tax and Immigration Services

## Technology Stack

- **Framework:** Angular 21.0.4
- **Language:** TypeScript
- **Styling:** CSS
- **Container:** Docker with Nginx
- **Node Version:** 20 LTS

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

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher
- Docker (for containerized deployment)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd lario-income-tax-website
   ```

1. Install dependencies:

   ```bash
   npm install
   ```

1. Set up environment variables:

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

## Development

### Development Server

Start the development server:

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload when you modify source files.

### Code Scaffolding

Generate a new component:

```bash
ng generate component component-name
```

Generate a new service:

```bash
ng generate service service-name
```

For more options:

```bash
ng generate --help
```

## Building

### Development Build

```bash
ng build
```

### Production Build

```bash
ng build --configuration production
```

Build artifacts will be stored in the `dist/lario-income-tax/` directory.

## Testing

### Unit Tests

```bash
ng test
```

Run a specific test file:

```bash
ng test --include='**/path/to/component.spec.ts'
```

### End-to-End Tests

```bash
ng e2e
```

### Linting and Formatting

```bash
ng lint                  # Run Angular linter
npm run format           # Format all files with Prettier
npm run format:check     # Check formatting without changes
npm run lint:md          # Lint markdown files
npm run lint:md:fix      # Fix markdown issues
```

### Pre-commit Hooks

This project uses pre-commit hooks to automatically format and lint code on every commit. Hooks run:

- Prettier (code formatting)
- markdownlint (markdown linting)
- Additional checks (trailing whitespace, EOF, etc.)

See [Pre-commit Setup](docs/pre-commit-setup.md) for detailed information.

## Docker Deployment

### Build Docker Image

```bash
docker build -t lario-income-tax-website .
```

### Run with Docker Compose

```bash
docker-compose up -d
```

The application will be available at `http://localhost:80`.

### Stop Docker Container

```bash
docker-compose down
```

## Environment Configuration

Environment-specific settings are configured in:

- `src/environments/environment.ts` - Development
- `src/environments/environment.prod.ts` - Production

Key configuration includes:

- API endpoints
- Business contact information
- Google Maps API key
- Analytics tracking ID

## Architecture Guidelines

- **Core Module:** Import only once in AppModule. Contains singleton services.
- **Shared Module:** Import in feature modules that need shared functionality.
- **Feature Modules:** Use lazy loading for optimal performance.
- **Styling:** Follow the warm, professional aesthetic of the original site.
- **Responsive Design:** Mobile-first approach with accessibility in mind.

## Code Quality & CI/CD

This project enforces code quality through automated checks and continuous integration:

### Code Quality Tools

- **Pre-commit hooks** - Automatic formatting and linting on every commit
- **Prettier** - Consistent code formatting (TypeScript, CSS, HTML, JSON, Markdown)
- **markdownlint** - Markdown documentation standards
- **TypeScript strict mode** - Enhanced type safety

### GitHub Actions Workflows

- **PR Validation** - Runs on every pull request
  - Code linting (Prettier, markdownlint)
  - Production build verification
  - Unit tests execution
  - Docker image build test

- **Docker Publish** - Runs on main branch and version tags
  - Multi-platform Docker build (amd64, arm64)
  - Publish to Docker Hub as `<DOCKERHUB_USERNAME>/lariosincometax-website`
  - Automated tagging (latest, version, sha)

- **TechDocs Validation** - Runs on documentation changes
  - MkDocs build verification
  - Broken link detection
  - Markdown linting

See [CI/CD Pipeline](docs/ci-cd.md) for detailed information.

## Documentation

This project uses [Backstage TechDocs](https://backstage.io/docs/features/techdocs/) for comprehensive
technical documentation.

### Viewing Documentation

**In Backstage:**

Documentation is available in your Backstage developer portal at `/docs/default/component/lario-income-tax-website`

**Locally:**

```bash
# Install MkDocs
pip install mkdocs-techdocs-core

# Serve documentation locally
mkdocs serve

# Open http://localhost:8000
```

### Documentation Index

- [Home](docs/index.md) - Documentation overview
- [Setup Guide](docs/setup-guide.md) - Installation and getting started
- [Architecture](docs/architecture.md) - Project structure and patterns
- [Code Quality](docs/code-quality.md) - Standards and tooling
- [Docker Setup](docs/docker-setup.md) - Container deployment
- [Production Build](docs/production-build.md) - Building for production
- [Environment Config](docs/environment-config.md) - Configuration guide
- [Project Info](docs/project-info.md) - Migration details
- [Markdown Style Guide](docs/markdown-style-guide.md) - Markdown standards

### Additional Resources

- [CLAUDE.md](CLAUDE.md) - Guidelines for AI-assisted development
- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [Backstage Integration](catalog-info.yaml) - Service catalog metadata

## License

See [LICENSE](LICENSE) file for details.
