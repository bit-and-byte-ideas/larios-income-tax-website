variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
}

variable "location" {
  description = "Azure region for resources"
  type        = string
  default     = "East US"
}

variable "app_service_plan_name" {
  description = "Name of the App Service Plan"
  type        = string
}

variable "app_service_name" {
  description = "Name of the App Service"
  type        = string
}

variable "app_insights_name" {
  description = "Name of the Application Insights instance"
  type        = string
}

variable "sku_name" {
  description = "SKU name for App Service Plan (e.g., B1, P1v2, P2v3)"
  type        = string
  default     = "B1"
}

variable "always_on" {
  description = "Should the app be always on"
  type        = bool
  default     = true
}

variable "docker_registry_url" {
  description = "Docker registry URL (e.g., index.docker.io)"
  type        = string
  default     = "index.docker.io"
}

variable "docker_image_tag" {
  description = "Docker image with tag (e.g., username/image:tag)"
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

variable "tags" {
  description = "Tags to apply to all resources"
  type        = map(string)
  default     = {}
}
