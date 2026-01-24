# Infrastructure Architecture

## Overview

This document describes the complete infrastructure architecture for deploying the Larios Income Tax website to
Azure App Services using Terraform and GitHub Actions.

## Architecture Diagram

```text
┌─────────────────────────────────────────────────────────────────┐
│                         GitHub Repository                        │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐                      ┌──────────────┐        │
│  │ Push to Main │                      │Create Release│        │
│  └──────┬───────┘                      └──────┬───────┘        │
│         │                                     │                 │
│         v                                     v                 │
│  ┌──────────────────────┐          ┌──────────────────────┐   │
│  │ docker-publish.yml   │          │ release-publish.yml  │   │
│  └──────────────────────┘          └──────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
         │                                     │
         v                                     v
┌─────────────────────────────────────────────────────────────────┐
│                         Docker Hub                               │
├─────────────────────────────────────────────────────────────────┤
│  USERNAME/lariosincometax-website:latest  (dev)                 │
│  USERNAME/lariosincometax-website:v1.0.0  (prod)                │
└─────────────────────────────────────────────────────────────────┘
         │                                     │
         v                                     v
┌─────────────────────────────────────────────────────────────────┐
│                         Terraform                                │
├─────────────────────────────────────────────────────────────────┤
│  Validate → Plan → Apply (with approval)                        │
└─────────────────────────────────────────────────────────────────┘
         │                                     │
         v                                     v
    ┌─────────┐                          ┌─────────┐
    │   Dev   │                          │  Prod   │
    └─────────┘                          └─────────┘
         │                                     │
         v                                     v
┌─────────────────────┐              ┌─────────────────────┐
│  Azure Dev Env      │              │  Azure Prod Env     │
├─────────────────────┤              ├─────────────────────┤
│ Resource Group      │              │ Resource Group      │
│ App Service Plan    │              │ App Service Plan    │
│ (B1 SKU)            │              │ (P1v2 SKU)          │
│ App Service         │              │ App Service         │
│ App Insights        │              │ App Insights        │
│ Managed Identity    │              │ Managed Identity    │
└─────────────────────┘              └─────────────────────┘
```

## Components

### Source Control

- **GitHub Repository**: Version control and CI/CD orchestration
- **Branches**:
  - `main`: Development branch, triggers dev deployments
  - Feature branches: For development work
- **Tags**: Semantic versioning (v1.0.0) triggers production deployments

### CI/CD Pipeline

#### Docker Build Pipeline

**Trigger**: Push to main or release creation

**Steps**:

1. Build Docker image with multi-stage build
2. Push to Docker Hub with appropriate tags
3. Test image by pulling and running
4. Update Docker Hub repository description

#### Terraform Pipeline

**Trigger**: After successful Docker build

**Steps**:

1. Validate Terraform configuration
2. Initialize with Azure backend (state storage)
3. Plan infrastructure changes
4. Wait for manual approval
5. Apply changes to target environment

### Infrastructure as Code

#### Terraform Structure

```text
deploy/
├── modules/
│   └── app-service/           # Reusable module
│       ├── main.tf            # Resource definitions
│       ├── variables.tf       # Input variables
│       └── outputs.tf         # Output values
├── environments/
│   ├── dev/                   # Development environment
│   │   ├── main.tf           # Environment configuration
│   │   ├── variables.tf      # Environment variables
│   │   ├── backend.tf        # State configuration
│   │   └── outputs.tf        # Environment outputs
│   └── prod/                  # Production environment
│       └── (same structure)
└── README.md
```

#### State Management

- **Backend**: Azure Storage Account
- **State Files**:
  - Dev: `larios-income-tax-dev.tfstate`
  - Prod: `larios-income-tax-prod.tfstate`
- **State Locking**: Blob lease mechanism (automatic)
- **Encryption**: Server-side encryption (automatic)

### Azure Resources

#### Development Environment

**Resource Group**: `rg-larios-income-tax-dev`

**App Service Plan**:

- Name: `asp-larios-income-tax-dev`
- SKU: B1 (Basic)
- OS: Linux
- Cost: ~$13/month

**App Service**:

- Name: `app-larios-income-tax-dev`
- Runtime: Docker Container
- HTTPS Only: Yes
- Minimum TLS: 1.2
- Always On: No (cost savings)
- URL: `https://app-larios-income-tax-dev.azurewebsites.net`

**Application Insights**:

- Name: `appi-larios-income-tax-dev`
- Type: Web Application
- Retention: 90 days

**Managed Identity**:

- Type: System-assigned
- Used for secure Azure resource access

#### Production Environment

**Resource Group**: `rg-larios-income-tax-prod`

**App Service Plan**:

- Name: `asp-larios-income-tax-prod`
- SKU: P1v2 (Premium)
- OS: Linux
- Cost: ~$73/month

**App Service**:

- Name: `app-larios-income-tax-prod`
- Runtime: Docker Container
- HTTPS Only: Yes
- Minimum TLS: 1.2
- Always On: Yes
- URL: `https://app-larios-income-tax-prod.azurewebsites.net`

**Application Insights**:

- Name: `appi-larios-income-tax-prod`
- Type: Web Application
- Retention: 90 days

**Managed Identity**:

- Type: System-assigned
- Used for secure Azure resource access

### Container Registry

**Docker Hub**:

- Repository: `USERNAME/lariosincometax-website`
- Public repository
- Platforms: linux/amd64, linux/arm64

**Image Tags**:

- Development: `latest`
- Production: Semantic version (e.g., `v1.0.0`)

### Security

#### Authentication & Authorization

**Service Principal**:

- Role: Contributor (scoped to subscription)
- Used by: GitHub Actions and Terraform
- Permissions: Create/modify Azure resources

**Managed Identity**:

- Type: System-assigned
- Scope: App Service resources
- Purpose: Secure access to Azure services

#### Secrets Management

**GitHub Secrets** (encrypted at rest):

- Azure credentials
- Terraform backend configuration
- Docker Hub credentials

**App Service Configuration** (encrypted at rest):

- Application settings
- Connection strings
- Secrets from Key Vault (future enhancement)

#### Network Security

- HTTPS enforcement
- Minimum TLS 1.2
- FTPS disabled
- Public network access (can be restricted)

### Monitoring & Logging

#### Application Insights

**Telemetry**:

- Request rates and response times
- Failed requests
- Exceptions and traces
- Dependencies (outgoing requests)
- Custom events and metrics

**Availability**:

- Health check monitoring
- Endpoint availability tests
- Alert on downtime

#### App Service Logs

**Application Logging**:

- File system (retention: 7 days)
- Size limit: 35 MB

**Web Server Logging**:

- File system (retention: 7 days)

**Diagnostic Logs**:

- Detailed error messages
- Failed request tracing

### Deployment Strategy

#### Development Workflow

1. **Continuous Deployment**:
   - Triggered by push to main
   - Automatic with approval gate
   - Latest code and features

2. **Approval Required**:
   - Prevents accidental deployments
   - Single reviewer sufficient
   - Fast iteration cycle

#### Production Workflow

1. **Release-Based Deployment**:
   - Triggered by GitHub release
   - Specific version tags
   - Controlled releases

2. **Approval Required**:
   - Multiple reviewers recommended
   - Change management process
   - Rollback capability

### Disaster Recovery

#### Backup Strategy

**Terraform State**:

- Stored in Azure Storage
- Versioned (soft delete enabled recommended)
- Replicated (LRS minimum, GRS recommended)

**Application Data**:

- No persistent data in containers
- Stateless application design

**Configuration**:

- Infrastructure as Code (Terraform)
- Version controlled in Git
- Can recreate from scratch

#### Recovery Procedures

**State Corruption**:

1. Check state backup versions
2. Restore from previous version
3. Re-apply if needed

**Infrastructure Loss**:

1. Verify Terraform state intact
2. Run `terraform apply`
3. Resources recreated automatically

**Application Issues**:

1. Rollback to previous Docker image
2. Redeploy through CI/CD
3. Or manual deployment through Azure Portal

### Scalability

#### Horizontal Scaling

**App Service Plan**:

- Manual scaling: Increase instance count
- Auto-scaling: Configure rules based on metrics
- Maximum instances: Depends on SKU

**Azure Front Door** (future):

- Global load balancing
- CDN capabilities
- DDoS protection

#### Vertical Scaling

**SKU Upgrade**:

- Dev: B1 → B2/B3
- Prod: P1v2 → P2v2/P3v2
- Zero downtime upgrade

### Cost Optimization

#### Development

**Current**: ~$13/month

**Optimization**:

- Deallocate when not in use
- Use B1 SKU
- Disable Always On
- Single instance

#### Production

**Current**: ~$73/month

**Optimization**:

- Right-size based on traffic
- Enable auto-scaling
- Reserved instances (40% savings)
- Monitor and adjust

### Future Enhancements

#### Short Term

- [ ] Custom domains and SSL certificates
- [ ] Azure Key Vault for secrets
- [ ] Automated backup configuration
- [ ] Enhanced monitoring alerts

#### Medium Term

- [ ] Blue-green deployment
- [ ] Canary releases
- [ ] Integration tests in pipeline
- [ ] Performance testing

#### Long Term

- [ ] Multi-region deployment
- [ ] Azure Front Door
- [ ] CDN integration
- [ ] Container registry migration

## References

- [Setup Guide](SETUP.md): Complete setup instructions
- [CI/CD Reference](CICD.md): Pipeline documentation
- [Terraform README](README.md): Infrastructure details
- [Azure App Service Docs](https://docs.microsoft.com/azure/app-service/)
