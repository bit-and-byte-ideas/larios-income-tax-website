# Larios Income Tax Website

An Angular-based web application for Larios Income Tax services, migrated from the original Wix site at [lariosincometax.com](https://www.lariosincometax.com/).

**Business:** Larios Income Tax | **Location:** 3317 El Cajon Blvd, San Diego, CA 92104 | **Phone:** +1 (619) 283-2828

## Quick Start

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher

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

## Azure Deployment

This project includes complete Terraform infrastructure for deploying to Azure Static Web Apps:

- **Development**: Automatic deployment from `main` branch (with approval)
- **Production**: Automatic deployment from GitHub Releases (with approval)

### Quick Deploy

1. Configure [Azure and GitHub secrets](deploy/SETUP.md#step-3-github-secrets)
2. Push to main branch or create a release
3. Approve deployment in GitHub Actions

See [Infrastructure Setup Guide](deploy/SETUP.md) for complete instructions.

## Technology Stack

- **Framework:** Angular 21.0.4
- **Language:** TypeScript
- **Deployment:** Azure Static Web Apps
- **Node Version:** 20 LTS

## Documentation

Comprehensive technical documentation is available using [Backstage TechDocs](https://backstage.io/docs/features/techdocs/):

- [Features](docs/features.md) - Detailed feature documentation
- [Setup Guide](docs/setup-guide.md) - Installation and development workflow
- [Architecture](docs/architecture.md) - Project structure and design patterns
- [Code Quality](docs/code-quality.md) - Standards, linting, and pre-commit hooks
- [CI/CD Pipeline](docs/ci-cd.md) - GitHub Actions workflows
- [Production Build](docs/production-build.md) - Building for production
- [Azure Deployment](docs/azure-deployment-setup.md) - Azure Static Web Apps deployment guide
- [Environment Config](docs/environment-config.md) - Configuration guide

**View locally:**

```bash
pip install mkdocs-techdocs-core
mkdocs serve  # Open http://localhost:8000
```

## Features

- **Landing Page** - Parallax hero section, services overview, contact form
- **Services** - Four service offerings with detailed descriptions
- **Book Online** - Service booking interface with dynamic detail pages
- **Contact** - Bilingual contact pages (English/Spanish) with Google Maps integration
- **Responsive Design** - Mobile-first approach with warm, professional aesthetic
- **Internationalization** - Location-based English/Spanish content

## Project Structure

```text
src/
├── app/
│   ├── shared/         # Header, Footer, SafePipe, constants
│   ├── features/       # Home, Services, Book Online, Contact
│   │   ├── home/       # Hero, ServicesOverview, ContactSection
│   │   ├── services/   # ServicesPage
│   │   ├── book-online/# BookOnlinePage, ServiceDetailPage
│   │   └── contact/    # ContactPage (bilingual)
│   └── app.ts          # Root component
├── environments/       # Environment configurations
└── styles.css          # Global styles with CSS variables
```

See [Architecture](docs/architecture.md) for detailed organization and patterns.

## Code Quality & CI/CD

- **Pre-commit hooks** enforce formatting and linting on every commit
- **GitHub Actions** run on PRs: linting, tests, build verification
- **Automated deployment** to Azure Static Web Apps on main branch and releases

See [Code Quality](docs/code-quality.md) and [CI/CD Pipeline](docs/ci-cd.md) for details.

## Contributing

This project uses automated code quality tools:

- Pre-commit hooks (Prettier, markdownlint)
- See [Code Quality Guide](docs/code-quality.md)
- AI development guidelines: [CLAUDE.md](CLAUDE.md)

## License

See [LICENSE](LICENSE) file for details.
