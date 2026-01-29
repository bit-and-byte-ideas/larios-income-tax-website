output "communication_service_id" {
  description = "ID of the Communication Service"
  value       = azurerm_communication_service.main.id
}

output "communication_service_endpoint" {
  description = "Connection string for the Communication Service"
  value       = azurerm_communication_service.main.primary_connection_string
  sensitive   = true
}

output "communication_service_primary_key" {
  description = "Primary key for Communication Service"
  value       = azurerm_communication_service.main.primary_key
  sensitive   = true
}

output "email_domain_from_address" {
  description = "From email address for the Azure Managed Domain"
  value       = "DoNotReply@${azurerm_email_communication_service_domain.main.from_sender_domain}"
}
