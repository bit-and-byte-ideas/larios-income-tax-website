variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
  default     = "rg-larios-income-tax-prod"
}

variable "location" {
  description = "Azure region for resources"
  type        = string
  default     = "East US 2"
}

variable "static_web_app_name" {
  description = "Name of the Static Web App"
  type        = string
  default     = "swa-larios-income-tax-prod"
}

variable "app_insights_name" {
  description = "Name of the Application Insights instance"
  type        = string
  default     = "appi-larios-income-tax-prod"
}

variable "sku_tier" {
  description = "SKU tier for Static Web App (Free or Standard)"
  type        = string
  default     = "Standard"
}

variable "sku_size" {
  description = "SKU size for Static Web App (Free or Standard)"
  type        = string
  default     = "Standard"
}

variable "enable_application_insights" {
  description = "Enable Application Insights monitoring"
  type        = bool
  default     = true
}

variable "custom_domain" {
  description = "Custom domain name (optional)"
  type        = string
  default     = ""
}

variable "app_settings" {
  description = "Application settings for the Static Web App"
  type        = map(string)
  default     = {}
}
