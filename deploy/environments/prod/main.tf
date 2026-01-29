terraform {
  required_version = ">= 1.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

module "communication_service" {
  source = "../../modules/communication-service"

  resource_group_name        = var.resource_group_name
  communication_service_name = var.communication_service_name
  email_service_name         = var.email_service_name

  tags = {
    Environment = "prod"
    Project     = "larios-income-tax"
    ManagedBy   = "terraform"
  }
}

module "static_web_app" {
  source = "../../modules/static-web-app"

  resource_group_name         = var.resource_group_name
  location                    = var.location
  static_web_app_name         = var.static_web_app_name
  app_insights_name           = var.app_insights_name
  sku_tier                    = var.sku_tier
  sku_size                    = var.sku_size
  enable_application_insights = var.enable_application_insights
  enable_managed_identity     = true
  custom_domain               = var.custom_domain
  communication_service_id    = module.communication_service.communication_service_id
  app_settings = merge(var.app_settings, {
    "AZURE_COMMUNICATION_CONNECTION_STRING" = module.communication_service.communication_service_endpoint
    "EMAIL_FROM_ADDRESS"                    = module.communication_service.email_domain_from_address
    "EMAIL_TO_ADDRESS"                      = var.business_email_address
  })

  tags = {
    Environment = "prod"
    Project     = "larios-income-tax"
    ManagedBy   = "terraform"
  }
}
