# Migration to Azure Static Web Apps

## Overview

The Larios Income Tax website infrastructure was migrated from **Azure App Services (Docker containers)** to
**Azure Static Web Apps** in January 2024.

## Why the Migration?

### Previous Architecture (App Services + Docker)

- Docker containerized Angular application
- Deployed to Azure App Service (Linux)
- Development: B1 SKU (~$13/month)
- Production: P1v2 SKU (~$73/month)
- **Total Cost**: ~$86/month
- Requires Docker Hub registry
- Manual container management

### New Architecture (Static Web Apps)

- Direct static file deployment
- Global CDN distribution (built-in)
- Development: Free tier ($0/month)
- Production: Standard tier (~$9/month)
- **Total Cost**: ~$9/month
- **Cost Savings**: ~90% reduction ($77/month saved)

## Benefits

### Performance

- ✅ Global CDN distribution (faster worldwide)
- ✅ Edge caching for static assets
- ✅ Automatic optimization
- ✅ HTTP/2 and HTTP/3 support

### Features

- ✅ Automatic SSL certificates
- ✅ Custom domains (unlimited in Standard tier)
- ✅ Preview environments for PRs (automatic staging)
- ✅ Built-in authentication providers
- ✅ Azure Functions integration (for APIs if needed)
- ✅ SPA routing with fallback
- ✅ No server management

### Developer Experience

- ✅ Simpler deployment (no Docker builds)
- ✅ Faster deployments
- ✅ Native GitHub integration
- ✅ Automatic preview environments
- ✅ Built-in staging slots

### Cost

- ✅ Free tier for development
- ✅ ~90% cost reduction overall
- ✅ No infrastructure management overhead

## What Changed

### Infrastructure

**Removed:**

- Azure App Service Plan
- Azure App Service (Linux)
- Docker Hub registry
- Docker image builds
- Container management

**Added:**

- Azure Static Web App (Free/Standard)
- Global CDN (automatic)
- SPA routing configuration
- Deployment tokens

### Deployment Process

**Old Process:**

1. Build Docker image
1. Push to Docker Hub
1. Terraform deploys container to App Service
1. Manual approval gates

**New Process:**

1. Build Angular app
1. Terraform creates/updates Static Web App
1. Azure deploys directly from GitHub
1. Manual approval gates (maintained)

### File Changes

**Removed/Archived:**

- `Dockerfile`
- `.dockerignore`
- `README.dockerhub.md`
- `.github/workflows/docker-publish.yml`
- `.github/workflows/release-publish.yml`
- `deploy/modules/app-service/`

**Added:**

- `staticwebapp.config.json` - SPA routing and security headers
- `.github/workflows/deploy-dev.yml` - Development deployment
- `.github/workflows/deploy-prod.yml` - Production deployment
- `deploy/modules/static-web-app/` - Terraform module

**Updated:**

- `deploy/environments/dev/` - Static Web App configuration
- `deploy/environments/prod/` - Static Web App configuration
- `.gitignore` - Static Web Apps ignores

## Terraform Changes

### Module Structure

**Old:**

```text
deploy/modules/app-service/
├── main.tf           # App Service Plan + App Service + App Insights
├── variables.tf      # Docker image, SKU, etc.
└── outputs.tf        # App Service URL, etc.
```

**New:**

```text
deploy/modules/static-web-app/
├── main.tf           # Static Web App + App Insights
├── variables.tf      # SKU tier (Free/Standard)
└── outputs.tf        # Static Web App URL + deployment token
```

### Resource Naming

| Resource Type        | Old Name                     | New Name                     |
| -------------------- | ---------------------------- | ---------------------------- |
| Resource Group       | rg-larios-income-tax-{env}   | rg-larios-income-tax-{env}   |
| App Service Plan     | asp-larios-income-tax-{env}  | _(removed)_                  |
| App Service          | app-larios-income-tax-{env}  | _(removed)_                  |
| Static Web App       | _(none)_                     | swa-larios-income-tax-{env}  |
| Application Insights | appi-larios-income-tax-{env} | appi-larios-income-tax-{env} |

### SKU Changes

**Development:**

- Old: B1 (Basic) - $13/month
- New: Free tier - $0/month

**Production:**

- Old: P1v2 (Premium) - $73/month
- New: Standard tier - $9/month

## Deployment Token Management

Static Web Apps use deployment tokens instead of Docker Hub credentials.

### Getting the Token

After Terraform creates the Static Web App:

```bash
cd deploy/environments/dev
terraform output -raw static_web_app_api_key
```

### Adding to GitHub Secrets

Add these secrets to your repository:

- `AZURE_STATIC_WEB_APPS_API_TOKEN_DEV` - For development
- `AZURE_STATIC_WEB_APPS_API_TOKEN_PROD` - For production

## GitHub Secrets

### Removed Secrets (No Longer Needed)

- `DOCKERHUB_USERNAME` - No longer using Docker Hub
- `DOCKERHUB_TOKEN` - No longer using Docker Hub

### Kept Secrets

- `AZURE_CLIENT_ID` - Still needed for Terraform
- `AZURE_CLIENT_SECRET` - Still needed for Terraform
- `AZURE_SUBSCRIPTION_ID` - Still needed for Terraform
- `AZURE_TENANT_ID` - Still needed for Terraform
- `TF_BACKEND_RESOURCE_GROUP` - Still needed for Terraform state
- `TF_BACKEND_STORAGE_ACCOUNT` - Still needed for Terraform state
- `TF_BACKEND_CONTAINER` - Still needed for Terraform state

### New Secrets

- `AZURE_STATIC_WEB_APPS_API_TOKEN_DEV` - Deployment token for dev
- `AZURE_STATIC_WEB_APPS_API_TOKEN_PROD` - Deployment token for prod

## Configuration Files

### staticwebapp.config.json

New configuration file for Static Web Apps routing and security:

```json
{
  "navigationFallback": {
    "rewrite": "/index.html"
  },
  "responseOverrides": {
    "404": {
      "rewrite": "/index.html",
      "statusCode": 200
    }
  },
  "globalHeaders": {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY"
  }
}
```

## Migration Steps (For Reference)

If you need to recreate this migration:

1. **Create Static Web App Module**
   - Create `deploy/modules/static-web-app/`
   - Define resources in `main.tf`
   - Configure variables and outputs

1. **Update Environment Configurations**
   - Update `deploy/environments/dev/main.tf`
   - Update `deploy/environments/prod/main.tf`
   - Update variables to use Static Web App settings

1. **Update GitHub Actions**
   - Create `deploy-dev.yml` workflow
   - Create `deploy-prod.yml` workflow
   - Remove Docker build steps

1. **Create SPA Configuration**
   - Add `staticwebapp.config.json`
   - Configure routing fallback
   - Add security headers

1. **Clean Up**
   - Archive Docker files
   - Remove Docker Hub secrets
   - Update documentation

1. **Deploy**
   - Run Terraform to create Static Web Apps
   - Get deployment tokens
   - Add tokens to GitHub Secrets
   - Test deployment workflows

## Rollback Plan

If you need to rollback to App Services:

1. Restore `.old` files:
   - `Dockerfile.old` → `Dockerfile`
   - `.dockerignore.old` → `.dockerignore`
   - `docker-publish.yml.old` → `docker-publish.yml`

1. Restore Terraform:
   - Use `deploy/modules/app-service/` instead of `static-web-app`
   - Update environment configurations

1. Restore GitHub Secrets:
   - Add back Docker Hub credentials
   - Remove Static Web Apps tokens

## Support

For issues with Static Web Apps deployment:

- [Azure Static Web Apps Documentation](https://docs.microsoft.com/azure/static-web-apps/)
- [Terraform azurerm_static_web_app](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/static_web_app)
- [Static Web Apps Deploy Action](https://github.com/Azure/static-web-apps-deploy)

## References

- [Azure Infrastructure Documentation](../docs/azure-infrastructure.md) _(to be updated)_
- [CI/CD Pipeline Documentation](../docs/ci-cd.md) _(to be updated)_
- [Setup Guide](../docs/azure-deployment-setup.md) _(to be updated)_
