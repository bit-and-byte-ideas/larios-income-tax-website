output "app_service_url" {
  description = "URL of the App Service"
  value       = module.app_service.app_service_url
}

output "app_service_name" {
  description = "Name of the App Service"
  value       = module.app_service.app_service_name
}

output "resource_group_name" {
  description = "Name of the resource group"
  value       = module.app_service.resource_group_name
}
