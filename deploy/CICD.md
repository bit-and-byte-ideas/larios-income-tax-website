# CI/CD Pipeline Reference

## Workflow Overview

### Development Pipeline (docker-publish.yml)

Triggered on: Push to `main` branch

**Pipeline Steps:**

1. **Build and Push Docker Image**
   - Builds Docker image
   - Pushes to Docker Hub with `latest` tag
   - Tests the published image

2. **Update Docker Hub Description**
   - Updates Docker Hub repository description
   - Uses sanitized README for Docker Hub

3. **Validate Terraform**
   - Formats check
   - Validates dev environment configuration
   - Runs without backend (validation only)

4. **Deploy to Development** (Requires Approval)
   - Initializes Terraform with Azure backend
   - Plans infrastructure changes
   - Applies changes to dev environment
   - Deploys Docker image with `latest` tag

### Production Pipeline (release-publish.yml)

Triggered on: GitHub Release published

**Pipeline Steps:**

1. **Build and Push Release Image**
   - Builds Docker image
   - Pushes to Docker Hub with version tags
   - Creates semantic versioning tags (v1.0.0, v1.0, v1)

2. **Validate Terraform**
   - Formats check
   - Validates prod environment configuration

3. **Deploy to Production** (Requires Approval)
   - Initializes Terraform with Azure backend
   - Plans infrastructure changes
   - Applies changes to prod environment
   - Deploys Docker image with release version tag
   - Creates deployment record

## Approval Process

### Development Deployment

1. Workflow reaches "Deploy to Azure Dev" job
2. GitHub sends notification to configured reviewers
3. Reviewer can:
   - **Approve**: Deployment proceeds
   - **Reject**: Deployment is cancelled
4. After approval, Terraform applies changes

### Production Deployment

1. Create GitHub Release (e.g., v1.0.0)
2. Workflow reaches "Deploy to Azure Production" job
3. Requires approval from production reviewers
4. Recommended: Multiple reviewers for production
5. After approval, Terraform applies changes

## Environment Configuration

### Required Secrets

**Azure Authentication:**

```text
AZURE_CLIENT_ID          - Service principal client ID
AZURE_CLIENT_SECRET      - Service principal secret
AZURE_SUBSCRIPTION_ID    - Azure subscription ID
AZURE_TENANT_ID          - Azure AD tenant ID
```

**Terraform Backend:**

```text
TF_BACKEND_RESOURCE_GROUP    - Resource group for Terraform state
TF_BACKEND_STORAGE_ACCOUNT   - Storage account name
TF_BACKEND_CONTAINER         - Container name (usually "tfstate")
```

**Docker Hub:**

```text
DOCKERHUB_USERNAME    - Docker Hub username
DOCKERHUB_TOKEN       - Docker Hub access token
```

## Deployment Targets

### Development Environment

- **Azure Resources**:
  - Resource Group: `rg-larios-income-tax-dev`
  - App Service Plan: `asp-larios-income-tax-dev` (B1 SKU)
  - App Service: `app-larios-income-tax-dev`
  - Application Insights: `appi-larios-income-tax-dev`

- **Docker Image**: `USERNAME/lariosincometax-website:latest`
- **Always On**: Disabled (cost savings)
- **URL**: `https://app-larios-income-tax-dev.azurewebsites.net`

### Production Environment

- **Azure Resources**:
  - Resource Group: `rg-larios-income-tax-prod`
  - App Service Plan: `asp-larios-income-tax-prod` (P1v2 SKU)
  - App Service: `app-larios-income-tax-prod`
  - Application Insights: `appi-larios-income-tax-prod`

- **Docker Image**: `USERNAME/lariosincometax-website:v1.0.0` (version tag)
- **Always On**: Enabled
- **URL**: `https://app-larios-income-tax-prod.azurewebsites.net`

## Release Process

### Creating a Release

1. **Prepare Release**:

```bash
# Ensure main branch is stable
git checkout main
git pull origin main

# Create and push tag
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

1. **Create GitHub Release**:
   - Go to repository → Releases
   - Click "Create a new release"
   - Choose tag: v1.0.0
   - Add release title: "v1.0.0"
   - Add release notes
   - Click "Publish release"

2. **Monitor Deployment**:
   - Go to Actions tab
   - Select "Release Build and Deploy" workflow
   - Monitor build and deployment progress
   - Approve when prompted

### Version Numbering

Follow semantic versioning (semver):

- **Major version** (v2.0.0): Breaking changes
- **Minor version** (v1.1.0): New features, backwards compatible
- **Patch version** (v1.0.1): Bug fixes, backwards compatible

### Rollback Process

If deployment fails or issues are found:

1. **Quick Rollback** (GitHub UI):

```bash
# Create new release with previous version
git tag -a v1.0.1 -m "Rollback to working version"
git push origin v1.0.1
```

1. **Manual Rollback** (Azure Portal):
   - Go to App Service
   - Settings → Deployment Center
   - Find previous successful deployment
   - Click "Redeploy"

2. **Terraform Rollback**:

```bash
cd deploy/environments/prod
terraform plan -var="docker_image_tag=USERNAME/lariosincometax-website:v1.0.0"
terraform apply
```

## Monitoring Deployments

### GitHub Actions

- **View workflows**: Repository → Actions tab
- **Check logs**: Click on workflow run → Select job
- **Download artifacts**: Available in workflow summary

### Azure Portal

- **Deployment logs**: App Service → Deployment Center → Logs
- **Application logs**: App Service → Monitoring → Log stream
- **Metrics**: App Service → Monitoring → Metrics
- **Alerts**: App Service → Monitoring → Alerts

### Application Insights

- **Performance**: Application Insights → Performance
- **Failures**: Application Insights → Failures
- **Availability**: Application Insights → Availability
- **Live Metrics**: Application Insights → Live Metrics

## Troubleshooting

### Deployment Fails at Terraform Init

**Issue**: Backend initialization fails

**Solution**:

- Verify Azure credentials are correct
- Check backend storage account exists
- Ensure service principal has access to storage account

### Deployment Fails at Terraform Apply

**Issue**: Resource creation fails

**Solution**:

- Check Terraform plan output for errors
- Verify resource names are unique
- Check Azure service limits
- Review Terraform state for conflicts

### Docker Image Not Pulling

**Issue**: App Service can't pull Docker image

**Solution**:

- Verify Docker Hub credentials in secrets
- Check image exists with specified tag
- Review App Service logs for pull errors
- Ensure image is public or credentials are configured

### App Service Not Responding

**Issue**: Deployment succeeds but app not accessible

**Solution**:

- Check App Service status in Azure Portal
- Review application logs
- Verify container is running
- Check health check endpoint
- Restart App Service

## Best Practices

### Development Workflow

1. **Feature branches**: Create branch from main
2. **Test locally**: Ensure changes work before pushing
3. **Create PR**: Push to feature branch, create pull request
4. **Review**: Get code review before merging
5. **Merge to main**: Triggers dev deployment
6. **Verify dev**: Check dev environment works correctly

### Production Releases

1. **Test in dev first**: Ensure changes work in dev environment
2. **Version bump**: Update version appropriately
3. **Release notes**: Document changes clearly
4. **Tag release**: Use proper semantic versioning
5. **Monitor closely**: Watch deployment and initial metrics
6. **Quick rollback**: Be prepared to rollback if issues arise

### Security

1. **Rotate secrets**: Regularly rotate service principal credentials
2. **Review permissions**: Ensure least privilege access
3. **Monitor deployments**: Set up alerts for deployment failures
4. **Audit logs**: Regularly review deployment history
5. **Secure state**: Ensure Terraform state is encrypted

## Automation Opportunities

### Future Enhancements

1. **Automated testing**: Add integration tests to pipeline
2. **Performance testing**: Load test before prod deployment
3. **Blue-green deployment**: Zero-downtime deployments
4. **Canary releases**: Gradual rollout to production
5. **Auto-rollback**: Automatic rollback on health check failures

## Support

For pipeline issues:

- Check GitHub Actions logs
- Review Azure deployment logs
- Verify secrets and permissions
- Check Azure service health
- Review Terraform state

For urgent issues:

- Use Azure Portal for immediate actions
- Check Application Insights for errors
- Review runbooks for common issues
