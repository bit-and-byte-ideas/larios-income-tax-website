# Static Web App Terraform Module

Reusable Terraform module for deploying Azure Static Web Apps with Application Insights monitoring.

## Overview

This module creates a complete Azure Static Web App environment for hosting static websites and SPAs
(Single Page Applications) with:

- Resource Group
- Static Web App (Free or Standard tier)
- Application Insights (optional)
- Custom Domain Binding (optional)
- System-Assigned Managed Identity
- Global CDN distribution
- Automatic SSL certificates

## Features

- **Global CDN**: Built-in content delivery network for worldwide performance
- **Free SSL**: Automatic SSL certificates for custom domains
- **Serverless APIs**: Built-in support for Azure Functions (API integration)
- **Preview Environments**: Automatic staging environments for pull requests
- **Authentication**: Built-in auth providers (GitHub, Azure AD, Twitter, Google, etc.)
- **SPA Routing**: Fallback routes for single-page application routing
- **Managed Identity**: System-assigned identity for secure Azure service access
- **Application Insights**: Optional monitoring and telemetry
- **Custom Domains**: Support for multiple custom domains
- **Cost Effective**: Free tier for development, ~$9/month for production

## Requirements

| Name      | Version |
| --------- | ------- |
| terraform | >= 1.0  |
| azurerm   | ~> 3.0  |

## Usage

### Basic Example

```hcl
module "static_web_app" {
  source = "../../modules/static-web-app"

  resource_group_name  = "rg-myapp-dev"
  location             = "East US 2"
  static_web_app_name  = "swa-myapp-dev"
  app_insights_name    = "appi-myapp-dev"

  tags = {
    Environment = "dev"
    Project     = "myapp"
  }
}
```

### Development Environment Example (Free Tier)

```hcl
module "static_web_app_dev" {
  source = "../../modules/static-web-app"

  resource_group_name  = "rg-myapp-dev"
  location             = "East US 2"
  static_web_app_name  = "swa-myapp-dev"
  app_insights_name    = "appi-myapp-dev"

  # Free tier settings
  sku_tier = "Free"
  sku_size = "Free"

  app_settings = {
    "ENVIRONMENT" = "development"
  }

  tags = {
    Environment = "dev"
    Project     = "myapp"
    ManagedBy   = "terraform"
  }
}
```

### Production Environment Example (Standard Tier)

```hcl
module "static_web_app_prod" {
  source = "../../modules/static-web-app"

  resource_group_name  = "rg-myapp-prod"
  location             = "East US 2"
  static_web_app_name  = "swa-myapp-prod"
  app_insights_name    = "appi-myapp-prod"

  # Standard tier for production
  sku_tier       = "Standard"
  sku_size       = "Standard"
  custom_domain  = "www.myapp.com"

  app_settings = {
    "ENVIRONMENT" = "production"
  }

  tags = {
    Environment = "prod"
    Project     = "myapp"
    ManagedBy   = "terraform"
  }
}
```

### Using Deployment Token in GitHub Actions

After creating the Static Web App with Terraform, use the deployment token in your GitHub Actions workflow:

```yaml
- name: Deploy to Azure Static Web Apps
  uses: Azure/static-web-apps-deploy@v1
  with:
    azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
    repo_token: ${{ secrets.GITHUB_TOKEN }}
    action: 'upload'
    app_location: '/'
    api_location: ''
    output_location: 'dist/browser'
```

Get the deployment token from Terraform output:

```bash
terraform output -raw static_web_app_api_key
```

## Inputs

| Name                        | Description                                 | Type          | Default       | Required |
| --------------------------- | ------------------------------------------- | ------------- | ------------- | -------- |
| resource_group_name         | Name of the resource group                  | `string`      | n/a           | yes      |
| location                    | Azure region for resources                  | `string`      | `"East US 2"` | no       |
| static_web_app_name         | Name of the Static Web App                  | `string`      | n/a           | yes      |
| app_insights_name           | Name of the Application Insights instance   | `string`      | n/a           | yes      |
| sku_tier                    | SKU tier (Free or Standard)                 | `string`      | `"Free"`      | no       |
| sku_size                    | SKU size (Free or Standard)                 | `string`      | `"Free"`      | no       |
| enable_application_insights | Enable Application Insights monitoring      | `bool`        | `true`        | no       |
| custom_domain               | Custom domain name (optional)               | `string`      | `""`          | no       |
| app_settings                | Application settings for the Static Web App | `map(string)` | `{}`          | no       |
| tags                        | Tags to apply to all resources              | `map(string)` | `{}`          | no       |

### SKU Tier Options

Azure Static Web Apps offers two SKU tiers:

**Free Tier:**

- **Cost**: $0/month
- **Bandwidth**: 100 GB/month
- **Storage**: 0.5 GB
- **Custom domains**: 2
- **API (Azure Functions)**: 10,000 requests/month
- **Staging environments**: 3 per app
- **Best for**: Development, testing, low-traffic sites

**Standard Tier:**

- **Cost**: ~$9/month
- **Bandwidth**: Unlimited
- **Storage**: Unlimited
- **Custom domains**: Unlimited
- **API (Azure Functions)**: Unlimited requests
- **Staging environments**: Unlimited
- **SLA**: 99.95% uptime
- **Best for**: Production workloads

## Outputs

| Name                                     | Description                                   | Sensitive |
| ---------------------------------------- | --------------------------------------------- | --------- |
| resource_group_name                      | Name of the resource group                    | no        |
| resource_group_id                        | ID of the resource group                      | no        |
| static_web_app_id                        | ID of the Static Web App                      | no        |
| static_web_app_name                      | Name of the Static Web App                    | no        |
| static_web_app_url                       | Default URL of the Static Web App             | no        |
| static_web_app_default_hostname          | Default hostname of the Static Web App        | no        |
| static_web_app_api_key                   | API key (deployment token) for GitHub Actions | yes       |
| static_web_app_principal_id              | Principal ID of the managed identity          | no        |
| application_insights_instrumentation_key | Instrumentation key for Application Insights  | yes       |
| application_insights_connection_string   | Connection string for Application Insights    | yes       |

## Resources Created

This module creates the following Azure resources:

1. **Resource Group** (`azurerm_resource_group`)
   - Container for all module resources
   - Tagged with provided tags

1. **Static Web App** (`azurerm_static_web_app`)
   - Managed static hosting with global CDN
   - Automatic SSL certificates
   - Built-in preview environments
   - System-assigned managed identity
   - Tagged with provided tags

1. **Application Insights** (`azurerm_application_insights`) - Optional
   - Web application monitoring
   - Created when `enable_application_insights = true`
   - Tagged with provided tags

1. **Custom Domain Binding** (`azurerm_static_web_app_custom_domain`) - Optional
   - Created when `custom_domain` is provided
   - Uses CNAME delegation for validation
   - Automatic SSL certificate provisioning

## Configuration Details

### Security

- **HTTPS Only**: Enforced automatically
- **Automatic SSL**: Free SSL certificates for all domains
- **Managed Identity**: System-assigned identity created automatically
- **Built-in Authentication**: Support for multiple identity providers

### Features

- **Global CDN**: Content distributed worldwide automatically
- **Preview Environments**: Automatic staging environments for pull requests
- **SPA Fallback Routes**: Configurable via `staticwebapp.config.json`
- **API Integration**: Built-in Azure Functions support
- **Authentication**: Built-in auth with GitHub, Azure AD, Twitter, Google, Facebook

### Deployment

Static Web Apps integrates directly with GitHub:

1. Terraform creates the Static Web App resource
1. Deployment token is used in GitHub Actions
1. On push/PR, GitHub Actions builds the app
1. Static Web Apps deploys automatically
1. Preview environments created for PRs

## Best Practices

### Development Environments

- Use **Free tier** for cost savings ($0/month)
- Enable Application Insights for debugging
- Use preview environments for testing PRs
- Configure staging environment protection rules

### Production Environments

- Use **Standard tier** for SLA and unlimited resources (~$9/month)
- Enable Application Insights for monitoring
- Configure custom domains with SSL
- Set up multiple deployment environments
- Configure authentication if needed
- Use deployment slots for zero-downtime updates

### Security

- Never commit deployment tokens to version control
- Store deployment token in GitHub Secrets
- Use managed identity for Azure service authentication
- Configure authentication providers for protected content
- Regularly rotate deployment tokens
- Monitor Application Insights for security events

### Cost Optimization

- Start with Free tier for dev
- Use Standard tier only for production
- Monitor bandwidth usage
- Optimize asset sizes (images, bundles)
- Enable CDN caching
- Consider geographic distribution needs

### Deployment Configuration

Create `staticwebapp.config.json` in your repository root:

```json
{
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": ["/assets/*", "/*.{css,scss,js,png,jpg,svg,ico,woff,woff2}"]
  },
  "routes": [
    {
      "route": "/api/*",
      "allowedRoles": ["authenticated"]
    }
  ],
  "responseOverrides": {
    "404": {
      "rewrite": "/index.html",
      "statusCode": 200
    }
  }
}
```

## Integration with GitHub Actions

### Step 1: Get Deployment Token

After Terraform creates the Static Web App:

```bash
cd deploy/environments/dev
terraform output -raw static_web_app_api_key
```

### Step 2: Add to GitHub Secrets

Add the deployment token as a GitHub secret:

- Secret name: `AZURE_STATIC_WEB_APPS_API_TOKEN_DEV`
- Secret value: [output from step 1]

### Step 3: Use in Workflow

```yaml
- name: Build Angular App
  run: npm run build

- name: Deploy to Azure Static Web Apps
  uses: Azure/static-web-apps-deploy@v1
  with:
    azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN_DEV }}
    repo_token: ${{ secrets.GITHUB_TOKEN }}
    action: 'upload'
    app_location: '/'
    output_location: 'dist/browser'
```

## Examples

See the [environments](../../environments/) directory for complete working examples:

- [Development Environment](../../environments/dev/)
- [Production Environment](../../environments/prod/)

## Troubleshooting

### Deployment Token Not Working

- Verify token is correctly copied from Terraform output
- Ensure token is stored in GitHub Secrets
- Check token hasn't been rotated or expired

### Custom Domain Validation Failing

- Verify CNAME record points to Static Web App hostname
- Allow up to 48 hours for DNS propagation
- Check domain registrar settings

### Preview Environments Not Created

- Ensure GitHub Actions workflow has correct permissions
- Verify repo_token is provided in workflow
- Check branch protection rules

## Support

For issues or questions:

- Review [Terraform Azure Provider Documentation](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs)
- Check [Azure Static Web Apps Documentation](https://docs.microsoft.com/azure/static-web-apps/)
- See [Azure Infrastructure Documentation](../../../docs/azure-infrastructure.md)

## License

This module is part of the Larios Income Tax Website infrastructure.
