variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
}

variable "communication_service_name" {
  description = "Name of the Communication Service"
  type        = string

  validation {
    condition     = can(regex("^[a-zA-Z0-9-]{1,64}$", var.communication_service_name))
    error_message = "Communication Service name must be 1-64 characters and contain only alphanumeric characters and hyphens."
  }
}

variable "email_service_name" {
  description = "Name of the Email Communication Service"
  type        = string

  validation {
    condition     = can(regex("^[a-zA-Z0-9-]{1,64}$", var.email_service_name))
    error_message = "Email Service name must be 1-64 characters and contain only alphanumeric characters and hyphens."
  }
}

variable "tags" {
  description = "Tags to apply to all resources"
  type        = map(string)
  default     = {}
}
