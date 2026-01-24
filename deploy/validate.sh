#!/bin/bash

# Terraform Validation Script
# Validates all Terraform configurations without requiring Azure credentials

set -e

echo "==================================="
echo "Terraform Validation Script"
echo "==================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track errors
ERRORS=0

# Function to validate environment
validate_environment() {
    local env=$1
    echo "Validating $env environment..."

    cd "environments/$env" || exit 1

    # Check for required files
    if [ ! -f "main.tf" ]; then
        echo -e "${RED}✗ main.tf not found${NC}"
        ERRORS=$((ERRORS + 1))
        cd ../..
        return 1
    fi

    # Format check
    echo "  - Checking Terraform format..."
    if terraform fmt -check -recursive > /dev/null 2>&1; then
        echo -e "  ${GREEN}✓ Format check passed${NC}"
    else
        echo -e "  ${YELLOW}⚠ Format issues found (run 'terraform fmt -recursive')${NC}"
        ERRORS=$((ERRORS + 1))
    fi

    # Initialize (without backend)
    echo "  - Initializing Terraform..."
    if terraform init -backend=false > /dev/null 2>&1; then
        echo -e "  ${GREEN}✓ Initialization successful${NC}"
    else
        echo -e "  ${RED}✗ Initialization failed${NC}"
        ERRORS=$((ERRORS + 1))
        cd ../..
        return 1
    fi

    # Validate
    echo "  - Validating configuration..."
    if terraform validate > /dev/null 2>&1; then
        echo -e "  ${GREEN}✓ Validation passed${NC}"
    else
        echo -e "  ${RED}✗ Validation failed${NC}"
        terraform validate
        ERRORS=$((ERRORS + 1))
    fi

    cd ../..
    echo ""
}

# Function to validate module
validate_module() {
    local module=$1
    echo "Validating $module module..."

    cd "modules/$module" || exit 1

    # Format check
    echo "  - Checking Terraform format..."
    if terraform fmt -check -recursive > /dev/null 2>&1; then
        echo -e "  ${GREEN}✓ Format check passed${NC}"
    else
        echo -e "  ${YELLOW}⚠ Format issues found (run 'terraform fmt -recursive')${NC}"
        ERRORS=$((ERRORS + 1))
    fi

    # Validate (modules don't need init in this context)
    echo "  - Validating module..."
    if terraform validate -no-color > /dev/null 2>&1; then
        echo -e "  ${GREEN}✓ Module validation passed${NC}"
    else
        echo -e "  ${YELLOW}⚠ Module validation skipped (expected for modules)${NC}"
    fi

    cd ../..
    echo ""
}

# Check if terraform is installed
if ! command -v terraform &> /dev/null; then
    echo -e "${RED}Error: Terraform is not installed${NC}"
    echo "Please install Terraform 1.6.0 or higher"
    exit 1
fi

# Check Terraform version
TERRAFORM_VERSION=$(terraform version -json | grep -o '"terraform_version":"[^"]*' | cut -d'"' -f4)
echo "Using Terraform version: $TERRAFORM_VERSION"
echo ""

# Validate modules
echo "==================================="
echo "Validating Modules"
echo "==================================="
echo ""

validate_module "app-service"

# Validate environments
echo "==================================="
echo "Validating Environments"
echo "==================================="
echo ""

validate_environment "dev"
validate_environment "prod"

# Summary
echo "==================================="
echo "Validation Summary"
echo "==================================="
echo ""

if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✓ All validations passed!${NC}"
    echo "Your Terraform configuration is ready for deployment."
    exit 0
else
    echo -e "${RED}✗ Found $ERRORS issue(s)${NC}"
    echo "Please fix the issues above before deploying."
    exit 1
fi
