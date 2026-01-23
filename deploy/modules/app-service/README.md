# App Service Terraform Module

Reusable Terraform module for deploying Azure App Service (Web App for Containers) with Application Insights
monitoring.

## Overview

This module creates a complete Azure App Service environment for hosting Docker containers, including:

- Resource Group
- App Service Plan (Linux)
- App Service (Linux Web App for Containers)
- Application Insights (optional)
- Custom Domain Binding (optional)
- System-Assigned Managed Identity
- Comprehensive logging configuration

## Features

- **Docker Container Support**: Deploys Docker images from any registry (default: Docker Hub)
- **HTTPS Enforcement**: HTTPS-only with minimum TLS 1.2
- **Application Insights**: Built-in monitoring and telemetry
- **Health Checks**: Automatic health monitoring with configurable eviction time
- **Managed Identity**: System-assigned identity for secure Azure service access
- **Comprehensive Logging**: Detailed error messages, failed request tracing, and HTTP logs
- **Custom Domains**: Optional custom domain binding support
- **Flexible Configuration**: Extensive customization options via variables

## Requirements

| Name      | Version |
| --------- | ------- |
| terraform | >= 1.0  |
| azurerm   | ~> 3.0  |

## Usage

### Basic Example

```hcl
module "app_service" {
  source = "../../modules/app-service"

  resource_group_name    = "rg-myapp-dev"
  location               = "East US"
  app_service_plan_name  = "asp-myapp-dev"
  app_service_name       = "app-myapp-dev"
  app_insights_name      = "appi-myapp-dev"
  docker_image_tag       = "username/myapp:latest"

  tags = {
    Environment = "dev"
    Project     = "myapp"
  }
}
```

### Development Environment Example

```hcl
module "app_service_dev" {
  source = "../../modules/app-service"

  resource_group_name    = "rg-myapp-dev"
  location               = "East US"
  app_service_plan_name  = "asp-myapp-dev"
  app_service_name       = "app-myapp-dev"
  app_insights_name      = "appi-myapp-dev"

  # Development-specific settings
  sku_name               = "B1"         # Basic tier
  always_on              = false        # Cost savings
  docker_image_tag       = "username/myapp:latest"

  app_settings = {
    "ENV" = "development"
    "DEBUG" = "true"
  }

  tags = {
    Environment = "dev"
    Project     = "myapp"
    ManagedBy   = "terraform"
  }
}
```

### Production Environment Example

```hcl
module "app_service_prod" {
  source = "../../modules/app-service"

  resource_group_name    = "rg-myapp-prod"
  location               = "East US"
  app_service_plan_name  = "asp-myapp-prod"
  app_service_name       = "app-myapp-prod"
  app_insights_name      = "appi-myapp-prod"

  # Production-specific settings
  sku_name               = "P1v2"       # Premium tier
  always_on              = true         # Required for production
  docker_image_tag       = "username/myapp:v1.0.0"
  custom_domain          = "www.myapp.com"

  app_settings = {
    "ENV" = "production"
    "DEBUG" = "false"
  }

  tags = {
    Environment = "prod"
    Project     = "myapp"
    ManagedBy   = "terraform"
  }
}
```

### With Custom Docker Registry

```hcl
module "app_service" {
  source = "../../modules/app-service"

  resource_group_name    = "rg-myapp-prod"
  location               = "East US"
  app_service_plan_name  = "asp-myapp-prod"
  app_service_name       = "app-myapp-prod"
  app_insights_name      = "appi-myapp-prod"

  # Custom registry configuration
  docker_registry_url    = "myregistry.azurecr.io"
  docker_image_tag       = "myapp:v1.0.0"

  app_settings = {
    "DOCKER_REGISTRY_SERVER_USERNAME" = var.registry_username
    "DOCKER_REGISTRY_SERVER_PASSWORD" = var.registry_password
  }

  tags = {
    Environment = "prod"
    Project     = "myapp"
  }
}
```

## Inputs

| Name                        | Description                               | Type          | Default             | Required |
| --------------------------- | ----------------------------------------- | ------------- | ------------------- | -------- |
| resource_group_name         | Name of the resource group                | `string`      | n/a                 | yes      |
| location                    | Azure region for resources                | `string`      | `"East US"`         | no       |
| app_service_plan_name       | Name of the App Service Plan              | `string`      | n/a                 | yes      |
| app_service_name            | Name of the App Service                   | `string`      | n/a                 | yes      |
| app_insights_name           | Name of the Application Insights instance | `string`      | n/a                 | yes      |
| sku_name                    | SKU name for App Service Plan             | `string`      | `"B1"`              | no       |
| always_on                   | Should the app be always on               | `bool`        | `true`              | no       |
| docker_registry_url         | Docker registry URL                       | `string`      | `"index.docker.io"` | no       |
| docker_image_tag            | Docker image with tag                     | `string`      | n/a                 | yes      |
| enable_application_insights | Enable Application Insights monitoring    | `bool`        | `true`              | no       |
| custom_domain               | Custom domain name (optional)             | `string`      | `""`                | no       |
| app_settings                | Additional app settings                   | `map(string)` | `{}`                | no       |
| tags                        | Tags to apply to all resources            | `map(string)` | `{}`                | no       |

### SKU Name Options

Common App Service Plan SKUs:

**Basic Tier:**

- `B1`: 1 core, 1.75 GB RAM (~$13/month)
- `B2`: 2 cores, 3.5 GB RAM (~$26/month)
- `B3`: 4 cores, 7 GB RAM (~$52/month)

**Standard Tier:**

- `S1`: 1 core, 1.75 GB RAM (~$70/month)
- `S2`: 2 cores, 3.5 GB RAM (~$140/month)
- `S3`: 4 cores, 7 GB RAM (~$280/month)

**Premium Tier (v2):**

- `P1v2`: 1 core, 3.5 GB RAM (~$73/month)
- `P2v2`: 2 cores, 7 GB RAM (~$146/month)
- `P3v2`: 4 cores, 14 GB RAM (~$292/month)

**Premium Tier (v3):**

- `P1v3`: 2 cores, 8 GB RAM (~$117/month)
- `P2v3`: 4 cores, 16 GB RAM (~$234/month)
- `P3v3`: 8 cores, 32 GB RAM (~$468/month)

## Outputs

| Name                                     | Description                                  | Sensitive |
| ---------------------------------------- | -------------------------------------------- | --------- |
| resource_group_name                      | Name of the resource group                   | no        |
| resource_group_id                        | ID of the resource group                     | no        |
| app_service_plan_id                      | ID of the App Service Plan                   | no        |
| app_service_id                           | ID of the App Service                        | no        |
| app_service_name                         | Name of the App Service                      | no        |
| app_service_url                          | Default URL of the App Service               | no        |
| app_service_default_hostname             | Default hostname of the App Service          | no        |
| app_service_principal_id                 | Principal ID of the managed identity         | no        |
| application_insights_instrumentation_key | Instrumentation key for Application Insights | yes       |
| application_insights_connection_string   | Connection string for Application Insights   | yes       |

## Resources Created

This module creates the following Azure resources:

1. **Resource Group** (`azurerm_resource_group`)
   - Container for all module resources
   - Tagged with provided tags

1. **App Service Plan** (`azurerm_service_plan`)
   - Linux-based hosting plan
   - Configurable SKU (B1, P1v2, etc.)
   - Tagged with provided tags

1. **Linux Web App** (`azurerm_linux_web_app`)
   - Docker container hosting
   - HTTPS-only with TLS 1.2 minimum
   - HTTP/2 enabled
   - FTPS disabled for security
   - Health check monitoring
   - System-assigned managed identity
   - Comprehensive logging enabled
   - Tagged with provided tags

1. **Application Insights** (`azurerm_application_insights`) - Optional
   - Web application monitoring
   - Created when `enable_application_insights = true`
   - Tagged with provided tags

1. **Custom Hostname Binding** (`azurerm_app_service_custom_hostname_binding`) - Optional
   - Created when `custom_domain` is provided
   - Binds custom domain to App Service

## Configuration Details

### Security

- **HTTPS Only**: Enforced by default
- **Minimum TLS**: 1.2
- **FTPS**: Disabled
- **Managed Identity**: System-assigned identity created automatically

### Logging

The module configures comprehensive logging:

- **Detailed Error Messages**: Enabled
- **Failed Request Tracing**: Enabled
- **HTTP Logs**: File system logging with 7-day retention (35 MB limit)

### Health Checks

- **Health Check Path**: `/` (root path)
- **Eviction Time**: 5 minutes (unhealthy apps removed from load balancer)

### Default App Settings

The module automatically configures:

- `WEBSITES_ENABLE_APP_SERVICE_STORAGE = "false"` (for containers)
- `DOCKER_REGISTRY_SERVER_URL = "https://index.docker.io"` (or custom registry)
- `DOCKER_ENABLE_CI = "true"` (enables continuous deployment)
- `WEBSITES_PORT = "80"` (container port)

Additional settings can be provided via the `app_settings` variable.

## Best Practices

### Development Environments

- Use **B1 SKU** for cost savings (~$13/month)
- Set `always_on = false` to reduce costs
- Use `latest` Docker tag for continuous updates
- Enable Application Insights for debugging

### Production Environments

- Use **P1v2 or higher** for performance and SLA
- Set `always_on = true` for reliability
- Use specific version tags (e.g., `v1.0.0`) for Docker images
- Enable Application Insights for monitoring
- Configure custom domains with SSL
- Consider multiple reviewers for deployment approvals

### Security

- Never commit sensitive data (credentials, keys) to version control
- Use Azure Key Vault for secrets (future enhancement)
- Leverage managed identity for Azure service authentication
- Regularly rotate credentials
- Monitor Application Insights for security events

### Cost Optimization

- Start with B1 for dev, scale up as needed
- Disable Always On for non-production environments
- Use auto-scaling only when necessary
- Consider reserved instances for 40% savings
- Monitor and adjust based on actual usage

## Examples

See the [environments](../../environments/) directory for complete working examples:

- [Development Environment](../../environments/dev/)
- [Production Environment](../../environments/prod/)

## Support

For issues or questions:

- Review [Terraform Azure Provider Documentation](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs)
- Check [Azure App Service Documentation](https://docs.microsoft.com/azure/app-service/)
- See [Azure Infrastructure Documentation](../../../docs/azure-infrastructure.md)

## License

This module is part of the Larios Income Tax Website infrastructure.
