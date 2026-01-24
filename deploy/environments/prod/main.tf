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

module "static_web_app" {
  source = "../../modules/static-web-app"

  resource_group_name = var.resource_group_name
  location            = var.location
  static_web_app_name = var.static_web_app_name
  app_insights_name   = var.app_insights_name
  sku_tier            = var.sku_tier
  sku_size            = var.sku_size
  enable_application_insights = var.enable_application_insights
  custom_domain       = var.custom_domain
  app_settings        = var.app_settings

  tags = {
    Environment = "prod"
    Project     = "larios-income-tax"
    ManagedBy   = "terraform"
  }
}
