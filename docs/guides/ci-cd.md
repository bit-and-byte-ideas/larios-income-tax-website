# CI/CD Pipeline

## Overview

This project uses GitHub Actions for continuous integration and deployment to Azure Static Web Apps.
CI checks run on every PR and separate workflows deploy the application to dev and prod. Azure
infrastructure is not managed here — it lives in the `platform-foundation` repository.

## Workflows

### 1. CI

**File:** `.github/workflows/ci.yaml`

**Trigger:** Pull requests to `main`

**Jobs:**

1. **Format** - Prettier formatting check
1. **Lint** - Markdown linting (`npm run lint:md`)
1. **Test** - Unit tests (`npm test`)
1. **Build** - Bilingual production build (`npm run build:i18n`), artifact uploaded

**Status:** All jobs must pass before merge

### 2. Deploy App (dev)

**File:** `.github/workflows/deploy-app-dev.yaml`

**Trigger:** Push to `main`

**Jobs:**

1. Build bilingual Angular app (`npm run build:i18n`)
1. Copy `staticwebapp.config.json` into `dist/larios-income-tax/browser/`
1. Deploy to Azure Static Web Apps (`Azure/static-web-apps-deploy@v1`)

**Environment:** `dev` — reads `AZURE_STATIC_WEB_APPS_API_TOKEN` from environment secret

### 3. Deploy App (prod)

**File:** `.github/workflows/deploy-app-prod.yaml`

**Trigger:** GitHub Release published

**Jobs:** Same as dev but targeting `prod` environment

### 4. TechDocs Validation

**File:** `.github/workflows/techdocs.yml`

**Trigger:**

- Pull requests affecting `docs/`, `mkdocs.yml`, `catalog-info.yaml`
- Push to main (docs changes)

**Jobs:**

1. Validate YAML syntax
1. Build documentation with MkDocs (`--strict`)
1. Check for broken links (Python resolver)
1. Lint markdown files
1. Upload site artifact

## Secrets

Workflows authenticate to Static Web Apps with a deployment token stored as an **environment secret**
(Settings → Environments → `dev` / `prod` → Secrets):

| Secret                            | Description              | Required By              |
| --------------------------------- | ------------------------ | ------------------------ |
| `AZURE_STATIC_WEB_APPS_API_TOKEN` | SWA deployment API token | deploy-app-dev/prod.yaml |

The token comes from the Static Web App provisioned by `platform-foundation`. No Azure OIDC
credentials or repository variables are used by this repo. See
[Azure Deployment Guide](azure-deployment.md) for setup.

## Workflow Details

### CI Workflow

```yaml
on:
  pull_request:
    branches: [main]

jobs:
  format: # npm run format:check
  lint: # npm run lint:md
  test: # npm test
  build: # npm run build:i18n
```

**Checks performed:**

- ✅ Code formatting (Prettier)
- ✅ Markdown linting
- ✅ Unit tests pass
- ✅ Bilingual production build succeeds (en-US + es-MX)

### App Deployment Workflows

```yaml
# deploy-app-dev.yaml
jobs:
  deploy:
    environment: dev
    steps:
      - npm run build:i18n
      - cp staticwebapp.config.json dist/larios-income-tax/browser/
      - Azure/static-web-apps-deploy@v1
        app_location: dist/larios-income-tax/browser
```

## Deployment Process

### Automatic Deployment to Development

**On merge to main:**

1. `ci.yaml` must have passed on the PR
1. Code merged to main
1. `deploy-app-dev.yaml` builds and deploys the Angular app (requires `dev` environment approval)
1. Automatic global CDN distribution

### Automatic Deployment to Production

**On GitHub Release:**

1. Create GitHub Release with version tag (e.g., `v1.0.0`)
1. `deploy-app-prod.yaml` triggers: build + deploy (requires `prod` environment approval)

### Creating Releases

```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

Then create a GitHub Release from the tag — the prod deploy workflow triggers automatically.

## Accessing Deployments

### Development Environment

**URL:** `https://swa-larios-income-tax-dev-*.azurestaticapps.net`

- Automatically deployed on push to main
- Free tier Static Web App
- Global CDN distribution

### Production Environment

**URL:** `https://swa-larios-income-tax-prod-*.azurestaticapps.net`

- Deployed via GitHub Releases
- Standard tier Static Web App with SLA
- Custom domain: `www.lariosincometax.com`
- Global CDN distribution

## Cache Management

Workflows use GitHub Actions cache for NPM dependencies (`cache: 'npm'`).

If builds fail due to cache issues, navigate to **Actions → Caches** and delete the affected entry.

## Build Artifacts

| Workflow       | Artifact      | Retention |
| -------------- | ------------- | --------- |
| `ci.yaml`      | dist          | 7 days    |
| `techdocs.yml` | techdocs-site | 7 days    |

## Troubleshooting

### CI Fails on PR

Run checks locally:

```bash
npm run format:check
npm run lint:md
npm test
npm run build:i18n
```

### Deployment to Azure Fails

1. Verify `AZURE_STATIC_WEB_APPS_API_TOKEN` secret is set in the GitHub environment (`dev` or `prod`)
1. Confirm the Static Web App exists and the token belongs to it (provisioned in `platform-foundation`)
1. Check build output path — should be `dist/larios-income-tax/browser`
1. Verify `staticwebapp.config.json` exists in the repo root

### Tests Failing in CI

1. Check Node.js version (should be 20)
1. Verify all dependencies are in `package.json`
1. Run `npm test` locally with the same Node version
1. Review test logs in the workflow run

## Maintenance

### Regular Tasks

1. **Update dependencies** — Review Dependabot PRs, update Node.js and GitHub Actions versions
1. **Monitor Azure resources** — Review Static Web Apps usage, bandwidth, deployment history
1. **Review workflows** — Check execution times, optimize slow jobs
1. **Security** — Rotate `AZURE_STATIC_WEB_APPS_API_TOKEN` when the Static Web App key changes

## Deployment Architecture

### Azure Static Web Apps Resources

#### Development Environment

- Resource Group: `rg-larios-income-tax-dev`
- Static Web App: `swa-larios-income-tax-dev` (Free tier)
- Managed by: `platform-foundation` repository

#### Production Environment

- Resource Group: `rg-larios-income-tax-prod`
- Static Web App: `swa-larios-income-tax-prod` (Standard tier)
- Custom domain: `www.lariosincometax.com`
- Managed by: `platform-foundation` repository

### GitHub Environments

**Development (`dev`):**

- Required reviewers on the deploy job
- Deployment branch: `main`

**Production (`prod`):**

- Required reviewers (recommend 2+ for production)
- Deployment branch: `main` (triggered by release publish)

### Rollback Strategy

1. **Redeploy a previous release** — Go to repository → Releases → find last working release →
   re-publish it (triggers `deploy-app-prod.yaml`)
1. **Via GitHub Actions** — Go to Actions → Deploy App (prod) → find last successful run →
   Re-run all jobs

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Azure Static Web Apps Documentation](https://docs.microsoft.com/azure/static-web-apps/)
- [Azure Deployment Guide](azure-deployment.md)
- [Azure Deployment Checklist](azure-checklist.md)
- Workflow Files: See `.github/workflows/` directory in repository root
