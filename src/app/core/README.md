# Core Module

This directory contains singleton services, guards, interceptors, and other core functionality that
should be loaded only once in the application.

## Structure

- **services/** - Singleton services (e.g., authentication, API, logging)
- **guards/** - Route guards (e.g., auth guard, role guard)
- **interceptors/** - HTTP interceptors (e.g., token interceptor, error interceptor)

## Usage

The CoreModule is imported only once in the root AppModule and should never be imported in feature
modules.
