terraform {
  required_version = ">= 1.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

# Communication Service for Email
resource "azurerm_communication_service" "main" {
  name                = var.communication_service_name
  resource_group_name = var.resource_group_name
  data_location       = "United States"
  tags                = var.tags
}

# Email Service Domain (Free tier uses default Azure domain)
resource "azurerm_email_communication_service" "main" {
  name                = var.email_service_name
  resource_group_name = var.resource_group_name
  data_location       = "United States"
  tags                = var.tags
}

# Azure Managed Domain (Free tier)
resource "azurerm_email_communication_service_domain" "main" {
  name             = "AzureManagedDomain"
  email_service_id = azurerm_email_communication_service.main.id
  domain_management = "AzureManaged"
}

# Link Communication Service to Email Domain
resource "azurerm_communication_service_email_domain_association" "main" {
  communication_service_id = azurerm_communication_service.main.id
  email_service_domain_id  = azurerm_email_communication_service_domain.main.id
}
