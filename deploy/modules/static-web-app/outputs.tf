output "resource_group_name" {
  description = "Name of the resource group"
  value       = azurerm_resource_group.main.name
}

output "resource_group_id" {
  description = "ID of the resource group"
  value       = azurerm_resource_group.main.id
}

output "static_web_app_id" {
  description = "ID of the Static Web App"
  value       = azurerm_static_web_app.main.id
}

output "static_web_app_name" {
  description = "Name of the Static Web App"
  value       = azurerm_static_web_app.main.name
}

output "static_web_app_url" {
  description = "Default URL of the Static Web App"
  value       = "https://${azurerm_static_web_app.main.default_host_name}"
}

output "static_web_app_default_hostname" {
  description = "Default hostname of the Static Web App"
  value       = azurerm_static_web_app.main.default_host_name
}

output "static_web_app_api_key" {
  description = "API key (deployment token) for the Static Web App"
  value       = azurerm_static_web_app.main.api_key
  sensitive   = true
}

output "static_web_app_principal_id" {
  description = "Principal ID of the Static Web App managed identity"
  value       = azurerm_static_web_app.main.identity[0].principal_id
}

output "application_insights_instrumentation_key" {
  description = "Instrumentation key for Application Insights"
  value       = var.enable_application_insights ? azurerm_application_insights.main[0].instrumentation_key : null
  sensitive   = true
}

output "application_insights_connection_string" {
  description = "Connection string for Application Insights"
  value       = var.enable_application_insights ? azurerm_application_insights.main[0].connection_string : null
  sensitive   = true
}
