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

module "app_service" {
  source = "../../modules/app-service"

  resource_group_name    = var.resource_group_name
  location               = var.location
  app_service_plan_name  = var.app_service_plan_name
  app_service_name       = var.app_service_name
  app_insights_name      = var.app_insights_name
  sku_name               = var.sku_name
  always_on              = var.always_on
  docker_registry_url    = var.docker_registry_url
  docker_image_tag       = var.docker_image_tag
  enable_application_insights = var.enable_application_insights
  custom_domain          = var.custom_domain
  app_settings           = var.app_settings

  tags = {
    Environment = "prod"
    Project     = "larios-income-tax"
    ManagedBy   = "terraform"
  }
}
