# Azure Deployment Checklist

Use this checklist to ensure all prerequisites are met before deploying the application to Azure
Static Web Apps. Azure infrastructure is managed in the `platform-foundation` repository.

## Pre-Deployment Checklist

### Infrastructure (platform-foundation)

- [ ] Dev Static Web App exists
- [ ] Prod Static Web App exists
- [ ] Deployment token available for each Static Web App

### GitHub Environments

Development:

- [ ] Environment named `dev` created
- [ ] Required reviewers configured
- [ ] Deployment branch set to `main` (optional)
- [ ] `AZURE_STATIC_WEB_APPS_API_TOKEN` environment secret set

Production:

- [ ] Environment named `prod` created
- [ ] Required reviewers configured (recommend 2+)
- [ ] Deployment branch set to `main` (optional)
- [ ] `AZURE_STATIC_WEB_APPS_API_TOKEN` environment secret set

### Local

- [ ] Node.js 20+ installed
- [ ] Angular build working locally (`npm run build:i18n`)

## Deployment Checklist

### Dev

- [ ] Push/merge to `main`
- [ ] `deploy-app-dev.yaml` triggered
- [ ] `dev` environment approved
- [ ] Application deployed to dev Static Web App
- [ ] Application loads correctly (English and Spanish locales)

### Production Release

- [ ] Development environment tested and working
- [ ] Release version decided (e.g., v1.0.0)
- [ ] Git tag created and pushed
- [ ] GitHub release published
- [ ] `deploy-app-prod.yaml` build completed successfully
- [ ] `prod` environment approved by required reviewers
- [ ] Production URL accessible
- [ ] Application loads correctly (English and Spanish locales)

## Post-Deployment Checklist

### Verification

- [ ] Application loads on Static Web App URL
- [ ] SPA routing working (navigate to different routes)
- [ ] Deployment history visible in Azure Portal
- [ ] No errors in Application Insights
- [ ] Global CDN distribution confirmed

### Static Web App Configuration

- [ ] `staticwebapp.config.json` deployed correctly
- [ ] Navigation fallback configured for SPA routing
- [ ] Security headers applied (check via browser dev tools)
- [ ] 404 handling working (returns index.html)

### Security

- [ ] HTTPS enforced (automatic)
- [ ] `AZURE_STATIC_WEB_APPS_API_TOKEN` confirmed as environment secret (not repository secret)
- [ ] No tokens committed to the repository

## Ongoing Maintenance Checklist

### Monthly

- [ ] Review deployment history
- [ ] Update npm dependencies if needed (Dependabot PRs)
- [ ] Check bandwidth usage

### As Needed

- [ ] Update `AZURE_STATIC_WEB_APPS_API_TOKEN` when a Static Web App is recreated or its token is rotated
- [ ] Review Angular version and update if needed
- [ ] Review `staticwebapp.config.json` for optimizations

## Troubleshooting Checklist

### Deployment Fails

- [ ] Check GitHub Actions logs
- [ ] Verify `AZURE_STATIC_WEB_APPS_API_TOKEN` environment secret is set and current
- [ ] Verify the token belongs to the target Static Web App
- [ ] Check Azure service health

### Build Fails

- [ ] Check Node.js version (should be 20+)
- [ ] Verify npm dependencies install correctly
- [ ] Run tests locally
- [ ] Verify Angular build succeeds locally

### Application Not Loading

- [ ] Check Static Web App status in Azure Portal
- [ ] Review deployment history
- [ ] Check for errors in browser console
- [ ] Verify `staticwebapp.config.json` is correct
- [ ] Check if CDN cached old version (may take a few minutes)

### Routing Issues

- [ ] Verify `staticwebapp.config.json` exists
- [ ] Check navigation fallback configuration
- [ ] Test direct navigation to routes

### Custom Domain Issues

Domain configuration lives in `platform-foundation`.

- [ ] Verify DNS CNAME record
- [ ] Check DNS propagation (`dig` or `nslookup`)
- [ ] Check custom domain status in Azure Portal

## Emergency Procedures Checklist

### Production Down

1. [ ] Check Azure service health status
2. [ ] Review Application Insights for errors
3. [ ] Check recent deployments in Azure Portal
4. [ ] Review GitHub Actions workflow logs
5. [ ] Consider redeploying previous release
6. [ ] Notify stakeholders
7. [ ] Document incident

### Failed Deployment

1. [ ] Check GitHub Actions logs for error details
2. [ ] Verify deployment token is valid
3. [ ] Check Azure Static Web App status
4. [ ] Retry deployment if transient error
5. [ ] Rollback to previous release if needed
6. [ ] Document issue and resolution

### Security Incident

1. [ ] Rotate the Static Web App deployment token (in Azure or via `platform-foundation`)
2. [ ] Update the `AZURE_STATIC_WEB_APPS_API_TOKEN` environment secrets in GitHub
3. [ ] Review Azure access logs
4. [ ] Review GitHub audit log
5. [ ] Notify security team
6. [ ] Document incident

## Notes

- Static Web Apps deployment is simpler than App Services — no Docker management required
- Deployment tokens should be treated as sensitive credentials (environment secrets, not repo secrets)
- Cost and infrastructure configuration are managed in `platform-foundation`
