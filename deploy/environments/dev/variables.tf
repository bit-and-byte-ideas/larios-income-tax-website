variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
  default     = "rg-larios-income-tax-dev"
}

variable "location" {
  description = "Azure region for resources"
  type        = string
  default     = "East US"
}

variable "app_service_plan_name" {
  description = "Name of the App Service Plan"
  type        = string
  default     = "asp-larios-income-tax-dev"
}

variable "app_service_name" {
  description = "Name of the App Service"
  type        = string
  default     = "app-larios-income-tax-dev"
}

variable "app_insights_name" {
  description = "Name of the Application Insights instance"
  type        = string
  default     = "appi-larios-income-tax-dev"
}

variable "sku_name" {
  description = "SKU name for App Service Plan"
  type        = string
  default     = "F1"
}

variable "always_on" {
  description = "Should the app be always on"
  type        = bool
  default     = false
}

variable "docker_registry_url" {
  description = "Docker registry URL"
  type        = string
  default     = "index.docker.io"
}

variable "docker_image_tag" {
  description = "Docker image with tag"
  type        = string
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
  description = "Additional app settings"
  type        = map(string)
  default     = {}
}
