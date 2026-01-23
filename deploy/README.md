# Terraform Infrastructure for Larios Income Tax Website

This directory contains Terraform configurations for deploying the Larios Income Tax website to Azure App Services.

## Architecture

- **Azure App Service**: Hosts the Docker containerized website
- **Azure App Service Plan**: Linux-based hosting plan
- **Application Insights**: Monitoring and diagnostics
- **System-Assigned Managed Identity**: For secure Azure resource access

## Directory Structure

```text
deploy/
├── modules/
│   └── app-service/          # Reusable App Service module
├── environments/
│   ├── dev/                  # Development environment
│   └── prod/                 # Production environment
└── README.md
```

## Environments

### Development (dev)

- **Branch**: main
- **Deployment**: Automatic on push to main (with approval)
- **SKU**: B1 (Basic)
- **Always On**: Disabled (to save costs)
- **Docker Tag**: latest

### Production (prod)

- **Trigger**: GitHub Release
- **Deployment**: Automatic on release creation (with approval)
- **SKU**: P1v2 (Premium)
- **Always On**: Enabled
- **Docker Tag**: Release version (e.g., v1.0.0)

## Prerequisites

### Azure Setup

1. **Azure Subscription**: Active Azure subscription
2. **Service Principal**: Create with necessary permissions

```bash
az ad sp create-for-rbac --name "larios-income-tax-terraform" \
  --role contributor \
  --scopes /subscriptions/YOUR_SUBSCRIPTION_ID
```

1. **Storage Account for State**: Create backend storage

```bash
# Create resource group
az group create --name rg-terraform-state --location eastus

# Create storage account
az storage account create \
  --name sttfstateXXXXX \
  --resource-group rg-terraform-state \
  --location eastus \
  --sku Standard_LRS

# Create container
az storage container create \
  --name tfstate \
  --account-name sttfstateXXXXX
```

### GitHub Secrets

Configure these secrets in your GitHub repository:

**Azure Credentials:**

- `AZURE_CLIENT_ID`: Service principal client ID
- `AZURE_CLIENT_SECRET`: Service principal secret
- `AZURE_SUBSCRIPTION_ID`: Azure subscription ID
- `AZURE_TENANT_ID`: Azure AD tenant ID

**Terraform Backend:**

- `TF_BACKEND_RESOURCE_GROUP`: Resource group for Terraform state
- `TF_BACKEND_STORAGE_ACCOUNT`: Storage account name
- `TF_BACKEND_CONTAINER`: Container name (usually "tfstate")

**Docker Hub:**

- `DOCKERHUB_USERNAME`: Your Docker Hub username
- `DOCKERHUB_TOKEN`: Docker Hub access token

## Local Development

### Initialize Terraform

```bash
cd deploy/environments/dev

# Copy example vars
cp terraform.tfvars.example terraform.tfvars

# Edit terraform.tfvars with your values
nano terraform.tfvars

# Initialize with backend configuration
terraform init \
  -backend-config="resource_group_name=rg-terraform-state" \
  -backend-config="storage_account_name=sttfstateXXXXX" \
  -backend-config="container_name=tfstate" \
  -backend-config="key=larios-income-tax-dev.tfstate"
```

### Plan and Apply

```bash
# Plan changes
terraform plan

# Apply changes
terraform apply
```

### Destroy Resources

```bash
terraform destroy
```

## CI/CD Pipeline

### Development Workflow

1. Push to `main` branch
2. Docker image built and pushed with `latest` tag
3. Terraform validates configuration
4. Manual approval required (via GitHub Environments)
5. Terraform applies changes to dev environment
6. App Service pulls new Docker image

### Production Workflow

1. Create GitHub Release (e.g., v1.0.0)
2. Docker image built and pushed with release tag
3. Terraform validates configuration
4. Manual approval required (via GitHub Environments)
5. Terraform applies changes to prod environment
6. App Service pulls versioned Docker image

## Environment Variables

### Required Variables

- `docker_image_tag`: Full Docker image name with tag

### Optional Variables

- `custom_domain`: Custom domain name for the app
- `app_settings`: Additional environment variables for the app
- `sku_name`: App Service Plan SKU (override defaults)

## Monitoring

### Application Insights

Application Insights is automatically configured for both environments. Access insights through:

- Azure Portal → Application Insights → appi-larios-income-tax-{env}
- Metrics: Performance, failures, dependencies
- Logs: Application logs, traces, exceptions

### App Service Logs

Enable logging in Azure Portal:

- Navigate to App Service
- Monitoring → App Service logs
- Enable Application Logging and Web Server Logging

## Custom Domain Setup

### Add Custom Domain

1. Update terraform.tfvars:

```hcl
custom_domain = "www.lariosincometax.com"
```

1. Apply Terraform changes
2. Add DNS records:

```text
CNAME: www.lariosincometax.com → app-larios-income-tax-prod.azurewebsites.net
```

1. Verify domain in Azure Portal
2. Add SSL certificate (App Service Managed Certificate recommended)

## Troubleshooting

### Terraform State Lock

If state is locked:

```bash
# Force unlock (use carefully)
terraform force-unlock LOCK_ID
```

### App Service Not Starting

1. Check App Service logs in Azure Portal
2. Verify Docker image tag is correct
3. Check Application Settings
4. Restart the App Service

### Docker Pull Failures

1. Verify Docker Hub credentials
2. Check image exists with specified tag
3. Verify DOCKER_REGISTRY_SERVER_URL setting

## Security Best Practices

1. **Secrets Management**: Never commit terraform.tfvars or secrets
2. **HTTPS Only**: Enforced by default
3. **Minimum TLS**: 1.2 or higher
4. **Managed Identity**: Used for Azure resource access
5. **FTPS**: Disabled for security

## Cost Optimization

### Development

- Use B1 SKU (lowest cost)
- Disable Always On
- Consider deallocating when not in use

### Production

- Use appropriate SKU based on traffic
- Enable Always On for performance
- Configure auto-scaling if needed

## Support

For infrastructure issues:

- Check Azure Portal for service health
- Review Application Insights for application errors
- Check GitHub Actions logs for deployment issues

## Additional Resources

### Documentation

For comprehensive documentation, see the [docs](../docs/) folder:

- [Azure Infrastructure Architecture](../docs/azure-infrastructure.md): Complete infrastructure documentation
- [Azure Deployment Setup Guide](../docs/azure-deployment-setup.md): Step-by-step setup instructions
- [Azure Deployment Checklist](../docs/azure-deployment-checklist.md): Pre and post-deployment checklists
- [CI/CD Pipeline](../docs/ci-cd.md): Complete CI/CD pipeline documentation
- [CI/CD Flow Diagram](../docs/cicd-flow-diagram.drawio.xml): Visual CI/CD flow (Draw.IO)
- [Azure Infrastructure Diagram](../docs/azure-infrastructure-diagram.drawio.xml): Visual infrastructure diagram (Draw.IO)

### Terraform Modules

- [App Service Module](modules/app-service/README.md): Reusable App Service module documentation

### External Resources

- [Azure App Service Documentation](https://docs.microsoft.com/azure/app-service/)
- [Terraform Azure Provider](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs)
- [Azure App Service Best Practices](https://docs.microsoft.com/azure/app-service/app-service-best-practices)
