# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Frontend website for lariosincometax.com - an Angular-based web application for income tax services.

## Technology Stack

- **Framework**: Angular
- **Language**: TypeScript

## Common Commands

### Development

```bash
npm install          # Install dependencies
ng serve            # Start development server
ng build            # Build for production
ng test             # Run unit tests
ng test --include='**/path/to/component.spec.ts'  # Run single test file
ng e2e              # Run end-to-end tests
ng lint             # Run linter
```

### Angular CLI

```bash
ng generate component <name>   # Generate new component
ng generate service <name>     # Generate new service
ng generate module <name>      # Generate new module
```

## Architecture Notes

This is a new project with minimal code. When implementing features:

- Follow Angular best practices and style guide
- Use Angular CLI for generating components, services, and modules
- Organize features into modules for scalability
- Place shared components, services, and utilities in a `shared/` directory
- Place core services (singleton services) in a `core/` module
- Use lazy loading for feature modules to optimize bundle size

## Environment Configuration

Environment-specific configurations should be placed in `.env` files (excluded from version control per .gitignore).
