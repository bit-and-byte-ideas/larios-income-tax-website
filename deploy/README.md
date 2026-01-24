# Terraform Infrastructure for Larios Income Tax Website

This directory contains Terraform configurations for deploying the Larios Income Tax website to Azure Static Web Apps.

## Architecture

- **Azure Static Web App**: Hosts the static Angular website with global CDN
- **Application Insights**: Monitoring and diagnostics
- **System-Assigned Managed Identity**: For secure Azure resource access
- **Global CDN**: Automatic worldwide content distribution (built-in)

## Directory Structure

```text
deploy/
├── modules/
│   └── static-web-app/       # Reusable Static Web App module
├── environments/
│   ├── dev/                  # Development environment
│   └── prod/                 # Production environment
├── MIGRATION.md              # Migration guide from App Services
└── README.md
```

## Environments

### Development (dev)

- **Branch**: main
- **Deployment**: Automatic on push to main (with approval)
- **SKU**: Free
- **Cost**: $0/month
- **Bandwidth**: 100 GB/month included
- **Location**: East US 2

### Production (prod)

- **Trigger**: GitHub Release
- **Deployment**: Automatic on release creation (with approval)
- **SKU**: Standard
- **Cost**: ~$9/month
- **Bandwidth**: 100 GB/month included (additional: $0.15/GB)
- **SLA**: 99.95% uptime
- **Location**: East US 2

## Prerequisites

### Azure Setup

1. **Azure Subscription**: Active Azure subscription
1. **Service Principal**: Create with Contributor permissions

```bash
az ad sp create-for-rbac --name "larios-income-tax-terraform" \
  --role contributor \
  --scopes /subscriptions/YOUR_SUBSCRIPTION_ID \
  --sdk-auth
```

1. **Storage Account for State**: Create backend storage

```bash
# Create resource group
az group create --name rg-terraform-state --location eastus

# Create storage account (use unique name)
az storage account create \
  --name sttfstate$(date +%s) \
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

**Static Web Apps Deployment Tokens:**

These are obtained after first Terraform deployment:

- `AZURE_STATIC_WEB_APPS_API_TOKEN_DEV`: Dev deployment token
- `AZURE_STATIC_WEB_APPS_API_TOKEN_PROD`: Prod deployment token

## Local Development

### Initialize Terraform

```bash
cd deploy/environments/dev

# Set environment variables
export ARM_CLIENT_ID="your-client-id"
export ARM_CLIENT_SECRET="your-client-secret"
export ARM_SUBSCRIPTION_ID="your-subscription-id"
export ARM_TENANT_ID="your-tenant-id"

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

# Get outputs
terraform output static_web_app_url
terraform output -raw static_web_app_api_key
```

### Get Deployment Token

After first deployment, retrieve the deployment token:

```bash
# Get deployment token (sensitive)
terraform output -raw static_web_app_api_key

# Add this token to GitHub Secrets as AZURE_STATIC_WEB_APPS_API_TOKEN_DEV
```

### Destroy Resources

```bash
terraform destroy
```

## CI/CD Pipeline

### Development Workflow

1. Push to `main` branch
2. GitHub Actions builds Angular application
3. Runs tests and linters
4. Terraform validates configuration
5. Manual approval required (via GitHub Environments)
6. Terraform applies infrastructure changes
7. Application deployed to Static Web App using native deployment
8. Automatically distributed via global CDN

**Workflow file**: `.github/workflows/deploy-dev.yml`

### Production Workflow

1. Create GitHub Release (e.g., v1.0.0)
2. GitHub Actions builds Angular application with version
3. Runs tests and linters
4. Terraform validates configuration
5. Manual approval required (via GitHub Environments)
6. Terraform applies infrastructure changes
7. Application deployed to Static Web App using native deployment
8. Deployment record created
9. Automatically distributed via global CDN

**Workflow file**: `.github/workflows/deploy-prod.yml`

## Infrastructure Variables

### Terraform Outputs

After deployment, Terraform provides these outputs:

- `static_web_app_url`: The URL of the Static Web App
- `static_web_app_name`: The name of the Static Web App resource
- `static_web_app_default_hostname`: The default hostname
- `static_web_app_api_key`: Deployment token (sensitive)
- `resource_group_name`: The resource group name

### Optional Variables

- `custom_domain`: Custom domain name for the app
- `app_settings`: Additional application settings
- `sku_tier`: Override SKU tier (Free or Standard)
- `sku_size`: Override SKU size (Free or Standard)

## Static Web App Configuration

### Configuration File

The `staticwebapp.config.json` file in the repository root configures:

- **Navigation Fallback**: Routes all non-asset requests to index.html for SPA routing
- **404 Override**: Returns index.html with 200 status for client-side routing
- **Security Headers**: X-Frame-Options, X-Content-Type-Options, etc.
- **MIME Types**: Proper content type for all assets
- **Asset Exclusions**: Prevents routing of static assets

## Monitoring

### Application Insights

Application Insights is automatically configured for both environments:

- **Access**: Azure Portal → Application Insights → appi-larios-income-tax-{env}
- **Metrics**: Performance, failures, dependencies, client-side performance
- **Logs**: Application logs, traces, exceptions, user analytics
- **Telemetry**: Automatic integration with Static Web Apps

### Static Web App Logs

View deployment history and logs:

- **Azure Portal**: Static Web App → Deployment history
- **GitHub Actions**: Check workflow logs for deployment details
- **Application Insights**: Real-time application telemetry

### Query Telemetry

```bash
# Get Application Insights details
az monitor app-insights component show \
  --app appi-larios-income-tax-dev \
  --resource-group rg-larios-income-tax-dev

# Query request data
az monitor app-insights query \
  --app appi-larios-income-tax-dev \
  --resource-group rg-larios-income-tax-dev \
  --analytics-query "requests | where timestamp > ago(1h)"
```

## Custom Domain Setup

### DNS Configuration

Add a CNAME record:

```text
Type: CNAME
Name: www (or @ for apex domain with ALIAS support)
Value: swa-larios-income-tax-{env}-RANDOM.azurestaticapps.net
TTL: 3600
```

Get the exact hostname from Terraform output:

```bash
terraform output static_web_app_default_hostname
```

### Add Custom Domain

**Via Azure Portal:**

1. Navigate to Static Web App
2. Settings → Custom domains
3. Click "+ Add"
4. Enter domain name
5. Choose validation method (CNAME or TXT)
6. Wait for validation and SSL provisioning (automatic)

**Via Terraform:**

Update `terraform.tfvars`:

```hcl
custom_domain = "www.lariosincometax.com"
```

Apply changes:

```bash
terraform apply
```

### SSL Certificates

SSL certificates are:

- **Automatically provisioned** by Azure
- **Free** (no additional cost)
- **Auto-renewed** before expiration
- **Managed** by Azure

## Troubleshooting

### Terraform State Lock

If state is locked:

```bash
# Check for locks
az lock list --resource-group rg-terraform-state

# Break blob lease if stuck
az storage blob lease break \
  --container-name tfstate \
  --blob-name larios-income-tax-dev.tfstate \
  --account-name sttfstateXXXXX
```

### Static Web App Not Loading

1. Check deployment history in Azure Portal
2. Verify deployment completed in GitHub Actions
3. Check staticwebapp.config.json is correct
4. Review Application Insights for errors
5. Wait a few minutes for CDN cache updates

### Deployment Failures

1. Verify deployment token is correct
2. Check GitHub Actions logs
3. Ensure all secrets are configured
4. Verify service principal permissions
5. Check Azure service health

### Routing Issues

1. Verify `staticwebapp.config.json` exists in repo root
2. Check navigation fallback configuration
3. Test direct navigation to routes
4. Review browser console for errors

## Security Best Practices

1. **Secrets Management**: Never commit sensitive values
2. **HTTPS Only**: Automatically enforced (cannot be disabled)
3. **TLS Version**: 1.2+ enforced by default
4. **Security Headers**: Configured in staticwebapp.config.json
5. **Deployment Tokens**: Stored securely in GitHub Secrets
6. **Managed Identity**: Used for Azure resource access

## Cost Optimization

### Development

**Current**: $0/month (Free tier)

**Features**:

- 100 GB bandwidth/month
- 0.5 GB storage
- Free SSL certificates
- Global CDN
- 2 custom domains

**Optimization**:

- Already at minimum cost (free)
- No need to deallocate or manage instances

### Production

**Current**: ~$9/month (Standard tier)

**Features**:

- 100 GB bandwidth/month (additional: $0.15/GB)
- 0.5 GB storage
- Free SSL certificates
- Global CDN
- Unlimited custom domains
- SLA: 99.95%

**Optimization**:

- Monitor bandwidth usage
- Use CDN caching effectively (automatic)
- Consider Free tier if traffic is very low
- No reserved instances needed

### Cost Comparison

**Previous (App Services)**:

- Dev: ~$13/month
- Prod: ~$73/month
- Total: ~$86/month

**Current (Static Web Apps)**:

- Dev: $0/month
- Prod: ~$9/month
- Total: ~$9/month

**Savings**: 90% (~$77/month or ~$924/year)

## Migration from App Services

See [MIGRATION.md](MIGRATION.md) for complete migration documentation including:

- Why we migrated
- What changed
- Terraform changes comparison
- GitHub Actions workflow changes
- Deployment token management
- Migration steps and rollback plan

## Support

For infrastructure issues:

- **Azure Portal**: Check Static Web App status and deployment history
- **Application Insights**: Review application errors and performance
- **GitHub Actions**: Check workflow logs for deployment issues
- **Terraform**: Review state and plan outputs

## Additional Resources

### Documentation

For comprehensive documentation, see the [docs](../docs/) folder:

- [Azure Infrastructure Architecture](../docs/azure-infrastructure.md): Complete infrastructure documentation
- [Azure Deployment Setup Guide](../docs/azure-deployment-setup.md): Step-by-step setup instructions
- [Azure Deployment Checklist](../docs/azure-deployment-checklist.md): Pre and post-deployment checklists
- [CI/CD Pipeline](../docs/ci-cd.md): Complete CI/CD pipeline documentation
- [CI/CD Flow Diagram](../docs/cicd-flow-diagram.drawio.xml): Visual CI/CD flow (Draw.IO)
- [Azure Infrastructure Diagram](../docs/azure-infrastructure-diagram.drawio.xml): Visual infrastructure (Draw.IO)

### Terraform Modules

- [Static Web App Module](modules/static-web-app/README.md): Reusable Static Web App module documentation

### External Resources

- [Azure Static Web Apps Documentation](https://docs.microsoft.com/azure/static-web-apps/)
- [Terraform Azure Provider](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs)
- [Static Web Apps Configuration](https://docs.microsoft.com/azure/static-web-apps/configuration)
- [Azure Static Web Apps Best Practices](https://docs.microsoft.com/azure/static-web-apps/best-practices)
