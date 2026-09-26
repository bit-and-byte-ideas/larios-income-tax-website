# Azure Deployment Guide

This guide covers how the Larios Income Tax website is deployed to Azure Static Web Apps (SWA).

## Ownership

| Concern                                                                               | Owned by                                     |
| ------------------------------------------------------------------------------------- | -------------------------------------------- |
| Azure infrastructure (SWA resources, resource groups, custom domain, monitoring, IAM) | `platform-foundation` repository             |
| Building and deploying the application                                                | This repository (GitHub Actions workflows)   |
| SWA routing and security headers                                                      | This repository (`staticwebapp.config.json`) |

This repository no longer contains any infrastructure code. To change or recreate the Static Web Apps,
custom domain, or Azure permissions, make the change in `platform-foundation`.

## Prerequisites

- The dev and prod Static Web Apps exist (provisioned by `platform-foundation`)
- Admin access to this GitHub repository
- Node.js 20+ for local builds

## Step 1: GitHub Environments

Create protected environments for the deployment approval gate (Settings → Environments):

- `dev` — add required reviewers; optionally restrict deployment branch to `main`
- `prod` — add required reviewers (recommend 2+); optionally restrict deployment branch to `main`

## Step 2: Add the Deployment Token

Each environment needs the deployment token of its Static Web App as an **environment secret**:

- Settings → Environments → `dev` / `prod` → Secrets
- Secret name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
- Value: the API key of the matching Static Web App, provided by `platform-foundation`, or from the
  Azure Portal (Static Web App → Overview → Manage deployment token)

Use an environment secret, not a repository secret, so dev and prod tokens stay separate. Rotate the
token by updating this secret whenever the Static Web App's API key changes.

No Azure service principals, OIDC credentials, or repository variables are needed by this repo —
the deploy workflows authenticate to Static Web Apps with the deployment token only.

## Step 3: Deploy

### Development

Merging to `main` triggers `deploy-app-dev.yaml`, which builds both locales and deploys to the dev
Static Web App after `dev` environment approval.

### Production

1. Ensure dev is working properly
1. Create a git tag:

   ```bash
   git tag -a v1.0.0 -m "First production release"
   git push origin v1.0.0
   ```

1. Create a GitHub Release from the tag (Repository → Releases → "Create a new release" → Publish)
1. Approve the `prod` environment gate when `deploy-app-prod.yaml` prompts

## Step 4: Verify

1. Open the Static Web App URL (shown in the Azure Portal or the `platform-foundation` outputs)
1. Confirm both locales load (`/` and `/es/`) and deep links resolve (SPA fallback)
1. Check deployment history in GitHub Actions and the Azure Portal

## Custom Domain

The custom domain (`www.lariosincometax.com`), DNS records, and SSL are managed in
`platform-foundation`. Nothing needs to change in this repository.

## Troubleshooting

### Deployment Fails

1. Check the Actions logs for the specific error
1. Verify `AZURE_STATIC_WEB_APPS_API_TOKEN` is set under Settings → Environments (`dev` / `prod`)
1. Verify the token matches the target Static Web App (a recreated SWA has a new token)
1. Confirm the Static Web App exists in Azure

### Application Routing Issues

Verify `staticwebapp.config.json` exists in the repository root and is copied into the build output
by the deploy workflow.

### Custom Domain Not Working

```bash
# Check DNS propagation
dig www.lariosincometax.com
```

Domain configuration is managed in `platform-foundation`; check validation and SSL status in the
Azure Portal (can take up to 10 minutes).

## Security Checklist

- [ ] `AZURE_STATIC_WEB_APPS_API_TOKEN` stored as an environment secret under each environment
- [ ] Production environment requires multiple approvers
- [ ] HTTPS enforced (automatic with Static Web Apps)
- [ ] Security headers configured in `staticwebapp.config.json`

## Additional Resources

- [Azure Static Web Apps Documentation](https://docs.microsoft.com/azure/static-web-apps/)
- [CI/CD Pipeline](ci-cd.md)
- [Azure Deployment Checklist](azure-checklist.md)
