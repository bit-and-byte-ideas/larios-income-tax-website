# Azure Deployment Checklist

Use this checklist to ensure all prerequisites are met before deploying.

## Pre-Deployment Checklist

### Azure Setup

- [ ] Azure subscription is active and accessible
- [ ] Azure CLI installed locally (`az --version`)
- [ ] Logged into Azure (`az login`)
- [ ] Correct subscription selected (`az account show`)

### Service Principal

- [ ] Service principal created with Contributor role
- [ ] Client ID saved
- [ ] Client secret saved
- [ ] Subscription ID saved
- [ ] Tenant ID saved

### Terraform State Backend

- [ ] Resource group created for Terraform state
- [ ] Storage account created
- [ ] Storage account name is unique
- [ ] Blob container created named "tfstate"
- [ ] Storage account name saved
- [ ] Resource group name saved

### GitHub Repository Setup

- [ ] Repository settings accessible
- [ ] Admin permissions on repository

### GitHub Secrets Configuration

Azure Credentials:

- [ ] `AZURE_CLIENT_ID` configured
- [ ] `AZURE_CLIENT_SECRET` configured
- [ ] `AZURE_SUBSCRIPTION_ID` configured
- [ ] `AZURE_TENANT_ID` configured

Terraform Backend:

- [ ] `TF_BACKEND_RESOURCE_GROUP` configured
- [ ] `TF_BACKEND_STORAGE_ACCOUNT` configured
- [ ] `TF_BACKEND_CONTAINER` configured

Docker Hub:

- [ ] `DOCKERHUB_USERNAME` configured
- [ ] `DOCKERHUB_TOKEN` configured (not password, use access token)

### GitHub Environments

Development:

- [ ] Environment named "dev" created
- [ ] Required reviewers configured
- [ ] Deployment branch set to "main" (optional)

Production:

- [ ] Environment named "prod" created
- [ ] Required reviewers configured (recommend 2+)
- [ ] Deployment branch set to tags (optional)

### Local Development (Optional)

- [ ] Terraform installed (`terraform version`)
- [ ] Terraform version 1.6.0 or higher
- [ ] Docker installed (`docker --version`)
- [ ] Git configured properly

## First Deployment Checklist

### Development Deployment

- [ ] Code pushed to main branch
- [ ] Docker build workflow started
- [ ] Docker image successfully built
- [ ] Docker image pushed to Docker Hub
- [ ] Terraform validation passed
- [ ] Deployment approval requested
- [ ] Deployment approved
- [ ] Terraform apply completed successfully
- [ ] Development URL accessible
- [ ] Application loads correctly

### Production Deployment

- [ ] Development environment tested and working
- [ ] Release version decided (e.g., v1.0.0)
- [ ] Git tag created and pushed
- [ ] GitHub release created
- [ ] Docker image built with version tag
- [ ] Terraform validation passed
- [ ] Deployment approval requested
- [ ] Deployment approved by required reviewers
- [ ] Terraform apply completed successfully
- [ ] Production URL accessible
- [ ] Application loads correctly
- [ ] DNS configured (if using custom domain)
- [ ] SSL certificate configured (if using custom domain)

## Post-Deployment Checklist

### Verification

- [ ] Application Insights showing data
- [ ] App Service logs accessible
- [ ] Health checks passing
- [ ] No errors in Application Insights
- [ ] Performance metrics acceptable

### Monitoring Setup

- [ ] Application Insights alerts configured
- [ ] Cost alerts configured
- [ ] Availability tests configured
- [ ] Email notifications working

### Documentation

- [ ] Deployment notes documented
- [ ] Custom domain configuration documented (if applicable)
- [ ] Known issues documented
- [ ] Runbook updated

### Security

- [ ] HTTPS enforced
- [ ] TLS 1.2 minimum configured
- [ ] Secrets rotated after initial setup
- [ ] Access reviews completed
- [ ] Audit logs reviewed

## Ongoing Maintenance Checklist

### Monthly

- [ ] Review Azure costs
- [ ] Check Application Insights for errors
- [ ] Review deployment history
- [ ] Update dependencies if needed

### Quarterly

- [ ] Rotate service principal credentials
- [ ] Review and update monitoring alerts
- [ ] Performance optimization review
- [ ] Security audit

### As Needed

- [ ] Test disaster recovery procedures
- [ ] Update Terraform to latest version
- [ ] Review and update SKU sizes
- [ ] Scale based on traffic patterns

## Troubleshooting Checklist

### Deployment Fails

- [ ] Check GitHub Actions logs
- [ ] Verify all secrets are configured
- [ ] Check Azure service health
- [ ] Verify service principal permissions
- [ ] Check Terraform state is not locked

### Application Not Loading

- [ ] Check App Service status in Azure Portal
- [ ] Review application logs
- [ ] Verify Docker image pulled successfully
- [ ] Check environment variables
- [ ] Restart App Service

### Performance Issues

- [ ] Check Application Insights metrics
- [ ] Review App Service Plan SKU
- [ ] Check resource utilization
- [ ] Review slow requests
- [ ] Consider scaling up or out

## Emergency Procedures Checklist

### Production Down

1. [ ] Check Azure service health
2. [ ] Review Application Insights for errors
3. [ ] Check recent deployments
4. [ ] Consider rollback to previous version
5. [ ] Notify stakeholders
6. [ ] Restart App Service if needed
7. [ ] Document incident

### Security Incident

1. [ ] Rotate all credentials immediately
2. [ ] Review access logs
3. [ ] Check for unauthorized changes
4. [ ] Notify security team
5. [ ] Document incident
6. [ ] Update security procedures

### Data Loss (if applicable)

1. [ ] Check Terraform state backups
2. [ ] Review Azure backup options
3. [ ] Assess impact
4. [ ] Restore from backups if needed
5. [ ] Document incident
6. [ ] Review backup procedures

## Notes

- Keep this checklist updated as your deployment evolves
- Document any deviations or custom configurations
- Share learnings with the team
- Regular reviews improve reliability
