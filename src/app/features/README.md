# Features Module

This directory contains feature modules for the application. Each feature should be organized as a separate module with its own routing, components, and services.

## Planned Features

Based on the Larios Income Tax website migration:

- **home/** - Home page with hero section and overview
- **services/** - Income tax and immigration services information
- **contact/** - Contact information, form, and location
- **about/** - Business information and credentials

## Structure Example

Each feature module should follow this structure:

```
feature-name/
├── components/
│   ├── feature-component-1/
│   └── feature-component-2/
├── services/
│   └── feature.service.ts
├── feature-name-routing.module.ts
└── feature-name.module.ts
```

## Lazy Loading

Feature modules should be lazy loaded for optimal performance. Configure routes in app.routes.ts using loadChildren.
