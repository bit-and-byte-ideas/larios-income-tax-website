# Azure Deployment Setup Guide

This guide walks you through setting up the complete Azure infrastructure and CI/CD pipeline for the Larios Income
Tax website.

## Prerequisites

- Azure subscription
- Azure CLI installed locally
- GitHub repository with admin access
- Docker Hub account
- Terraform 1.0+ installed locally (optional for local testing)

## Step 1: Azure Service Principal

Create a service principal for Terraform and GitHub Actions:

```bash
# Login to Azure
az login

# Set your subscription
az account set --subscription "YOUR_SUBSCRIPTION_ID"

# Create service principal with Contributor role
az ad sp create-for-rbac \
  --name "larios-income-tax-terraform" \
  --role contributor \
  --scopes /subscriptions/YOUR_SUBSCRIPTION_ID \
  --sdk-auth
```

Save the JSON output - you'll need it for GitHub secrets.

## Step 2: Terraform State Storage

Create Azure Storage for Terraform state:

```bash
# Variables
RESOURCE_GROUP="rg-terraform-state"
STORAGE_ACCOUNT="sttfstate$(date +%s)"  # Creates unique name
CONTAINER="tfstate"
LOCATION="eastus"

# Create resource group
az group create --name $RESOURCE_GROUP --location $LOCATION

# Create storage account
az storage account create \
  --name $STORAGE_ACCOUNT \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --sku Standard_LRS \
  --encryption-services blob

# Get storage account key
ACCOUNT_KEY=$(az storage account keys list \
  --resource-group $RESOURCE_GROUP \
  --account-name $STORAGE_ACCOUNT \
  --query '[0].value' -o tsv)

# Create blob container
az storage container create \
  --name $CONTAINER \
  --account-name $STORAGE_ACCOUNT \
  --account-key $ACCOUNT_KEY

echo "Storage Account: $STORAGE_ACCOUNT"
echo "Resource Group: $RESOURCE_GROUP"
echo "Container: $CONTAINER"
```

Save these values for GitHub secrets.

## Step 3: GitHub Secrets

Configure the following secrets in your GitHub repository (Settings → Secrets and variables → Actions):

### Azure Credentials

From the service principal JSON output:

- `AZURE_CLIENT_ID`: Value of `clientId`
- `AZURE_CLIENT_SECRET`: Value of `clientSecret`
- `AZURE_SUBSCRIPTION_ID`: Value of `subscriptionId`
- `AZURE_TENANT_ID`: Value of `tenantId`

### Terraform Backend

From Step 2:

- `TF_BACKEND_RESOURCE_GROUP`: Resource group name (e.g., "rg-terraform-state")
- `TF_BACKEND_STORAGE_ACCOUNT`: Storage account name (from `$STORAGE_ACCOUNT`)
- `TF_BACKEND_CONTAINER`: Container name (usually "tfstate")

### Docker Hub

- `DOCKERHUB_USERNAME`: Your Docker Hub username
- `DOCKERHUB_TOKEN`: Docker Hub access token (create at hub.docker.com/settings/security)

## Step 4: GitHub Environments

Create protected environments for approval workflow:

### Development Environment

1. Go to repository Settings → Environments
2. Click "New environment"
3. Name: `dev`
4. Configure protection rules:
   - Check "Required reviewers"
   - Add yourself or team members as reviewers
   - Optional: Set deployment branch to `main`

### Production Environment

1. Click "New environment"
2. Name: `prod`
3. Configure protection rules:
   - Check "Required reviewers"
   - Add yourself or team members as reviewers (recommend 2+ for production)
   - Optional: Set deployment branch to `tags/*` (release tags only)

## Step 5: Initial Terraform Deployment

### Option A: Deploy via GitHub Actions (Recommended)

1. Push code to main branch:

```bash
git add .
git commit -m "Add Azure infrastructure"
git push origin main
```

1. Go to Actions tab in GitHub
2. Watch the "Docker Build and Publish" workflow
3. When it reaches "Deploy to Azure Dev", review and approve
4. Terraform will create all Azure resources

### Option B: Deploy Locally (Testing)

```bash
cd deploy/environments/dev

# Copy example vars
cp terraform.tfvars.example terraform.tfvars

# Edit with your values
nano terraform.tfvars

# Set environment variables
export ARM_CLIENT_ID="your-client-id"
export ARM_CLIENT_SECRET="your-client-secret"
export ARM_SUBSCRIPTION_ID="your-subscription-id"
export ARM_TENANT_ID="your-tenant-id"

# Initialize Terraform
terraform init \
  -backend-config="resource_group_name=rg-terraform-state" \
  -backend-config="storage_account_name=$STORAGE_ACCOUNT" \
  -backend-config="container_name=tfstate" \
  -backend-config="key=larios-income-tax-dev.tfstate"

# Plan
terraform plan -var="docker_image_tag=USERNAME/lariosincometax-website:latest"

# Apply
terraform apply -var="docker_image_tag=USERNAME/lariosincometax-website:latest"
```

## Step 6: Verify Deployment

After successful deployment:

1. Get the App Service URL from Terraform outputs:

```bash
terraform output app_service_url
```

1. Visit the URL in your browser
2. Check Azure Portal:
   - Resource Groups → rg-larios-income-tax-dev
   - Verify all resources are created
   - Check App Service logs

## Step 7: Production Deployment

### Create First Release

1. Ensure dev is working properly
2. Create a git tag:

```bash
git tag -a v1.0.0 -m "First production release"
git push origin v1.0.0
```

1. Create GitHub Release:
   - Go to repository → Releases → "Create a new release"
   - Choose tag: v1.0.0
   - Title: "v1.0.0"
   - Description: Release notes
   - Click "Publish release"

2. Monitor workflow:
   - Go to Actions → "Release Build and Deploy"
   - Approve production deployment when prompted

## Step 8: Custom Domain (Optional)

### For Development

```bash
cd deploy/environments/dev
nano terraform.tfvars
```

Add:

```hcl
custom_domain = "dev.lariosincometax.com"
```

### For Production

```bash
cd deploy/environments/prod
nano terraform.tfvars
```

Add:

```hcl
custom_domain = "lariosincometax.com"
```

### DNS Configuration

Add CNAME record:

```text
Type: CNAME
Name: www (or dev for dev environment)
Value: app-larios-income-tax-{env}.azurewebsites.net
TTL: 3600
```

### SSL Certificate

Azure App Service provides free managed certificates:

1. Go to Azure Portal → App Service
2. Settings → Custom domains
3. Add custom domain
4. Settings → TLS/SSL settings
5. Private Key Certificates → Create App Service Managed Certificate
6. Bind to your custom domain

## Troubleshooting

### Terraform State Lock

If deployment fails with state lock error:

```bash
# List locks
az lock list --resource-group rg-terraform-state

# Delete lock (if safe)
az lock delete --name LOCK_NAME --resource-group rg-terraform-state
```

### App Service Not Starting

Check logs:

```bash
az webapp log tail --name app-larios-income-tax-dev --resource-group rg-larios-income-tax-dev
```

### Docker Pull Failures

Verify Docker Hub credentials in App Service:

```bash
az webapp config appsettings list \
  --name app-larios-income-tax-dev \
  --resource-group rg-larios-income-tax-dev
```

### GitHub Actions Failures

1. Check Actions logs for specific error
2. Verify all secrets are configured
3. Ensure service principal has correct permissions
4. Check Azure service health

## Monitoring

### Application Insights

Access monitoring:

```bash
# Get instrumentation key
az monitor app-insights component show \
  --app appi-larios-income-tax-dev \
  --resource-group rg-larios-income-tax-dev \
  --query instrumentationKey
```

### Enable Advanced Logging

```bash
az webapp log config \
  --name app-larios-income-tax-dev \
  --resource-group rg-larios-income-tax-dev \
  --application-logging filesystem \
  --detailed-error-messages true \
  --failed-request-tracing true \
  --web-server-logging filesystem
```

## Cost Management

### Development Environment

Estimated monthly cost: $13-15 USD (B1 SKU)

### Production Environment

Estimated monthly cost: $73-75 USD (P1v2 SKU)

### Cost Optimization

1. **Auto-shutdown dev**: Consider deallocating when not in use
2. **Right-size production**: Start with P1v2, scale if needed
3. **Monitor usage**: Use Azure Cost Management
4. **Reserved instances**: Save up to 40% with 1-year commitment

## Security Checklist

- [ ] Service principal has minimum required permissions
- [ ] GitHub secrets are properly configured
- [ ] HTTPS only is enabled (default)
- [ ] Minimum TLS version is 1.2 (default)
- [ ] Application Insights is enabled
- [ ] FTPS is disabled (default)
- [ ] Managed identity is being used
- [ ] Production requires multiple approvers
- [ ] Custom domains have SSL certificates

## Next Steps

1. Set up monitoring alerts in Application Insights
2. Configure auto-scaling rules if needed
3. Set up Azure Front Door or CDN for better performance
4. Configure backup and disaster recovery
5. Implement blue-green deployment strategy

## Support

For issues:

- **Azure issues**: Check Azure Portal service health
- **Terraform issues**: Review state and plan outputs
- **GitHub Actions**: Check workflow logs
- **Application issues**: Check Application Insights

## Additional Resources

- [Azure App Service Documentation](https://docs.microsoft.com/azure/app-service/)
- [Terraform Azure Provider](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs)
- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Docker Hub Documentation](https://docs.docker.com/docker-hub/)
