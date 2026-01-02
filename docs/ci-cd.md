# CI/CD Pipeline

## Overview

This project uses GitHub Actions for continuous integration and deployment. Automated workflows ensure
code quality, run tests, build Docker images, and publish to Docker Hub.

## Workflows

### 1. PR Validation

**File:** `.github/workflows/pr-validation.yml`

**Trigger:** Pull requests to `main` or `develop` branches

**Jobs:**

1. **Lint** - Code quality checks

   - Prettier formatting validation
   - Markdown linting

1. **Build** - Application build

   - Production bundle creation
   - Bundle size check
   - Artifact upload

1. **Test** - Unit tests

   - Vitest test execution
   - Coverage reporting

1. **Docker Build** - Container validation
   - Docker image build test
   - Container smoke test

**Status:** All jobs must pass before merge

### 2. Docker Build and Publish

**File:** `.github/workflows/docker-publish.yml`

**Trigger:**

- Push to `main` branch
- Version tags (`v*`)
- Manual workflow dispatch

**Jobs:**

1. **Build and Publish**

   - Multi-platform build (linux/amd64, linux/arm64)
   - Push to Docker Hub
   - Tag management (latest, version, sha)
   - Docker Hub description update

1. **Test Image**
   - Pull published image
   - Run smoke tests
   - Verify functionality

**Docker Image:** `<DOCKERHUB_USERNAME>/lariosincometax-website`

**Tags:**

- `latest` - Latest main branch build
- `main-<sha>` - Specific commit
- `v1.0.0` - Semantic version (on tags)
- `v1.0`, `v1` - Version aliases

### 3. TechDocs Validation

**File:** `.github/workflows/techdocs.yml`

**Trigger:**

- Pull requests affecting docs
- Push to main (docs changes)

**Jobs:**

1. **Validate TechDocs**
   - YAML configuration validation
   - MkDocs build test
   - Broken link detection
   - Markdown linting
   - Site artifact upload

## Required Secrets

Configure these as organization or repository secrets:

| Secret               | Description             | Required By        |
| -------------------- | ----------------------- | ------------------ |
| `DOCKERHUB_USERNAME` | Docker Hub username     | docker-publish.yml |
| `DOCKERHUB_TOKEN`    | Docker Hub access token | docker-publish.yml |

### Setting Up Secrets

1. **Navigate to Repository Settings**

   - Go to Settings > Secrets and variables > Actions

1. **Add Organization Secrets** (if not already configured)

   - `DOCKERHUB_USERNAME`
   - `DOCKERHUB_TOKEN`

1. **Or Add Repository Secrets**
   - Click "New repository secret"
   - Add each secret individually

## Workflow Details

### PR Validation Workflow

```yaml
on:
  pull_request:
    branches:
      - main
      - develop

jobs:
  lint:
    # Code quality checks
  build:
    # Build application
  test:
    # Run unit tests
  docker-build:
    # Test Docker build
```

**Checks Performed:**

- ✅ Code formatting (Prettier)
- ✅ Markdown linting
- ✅ TypeScript compilation
- ✅ Production build succeeds
- ✅ Bundle size within limits
- ✅ Unit tests pass
- ✅ Docker image builds
- ✅ Container runs successfully

### Docker Publish Workflow

```yaml
on:
  push:
    branches:
      - main
    tags:
      - 'v*'

env:
  DOCKER_IMAGE: ${{ secrets.DOCKERHUB_USERNAME }}/lariosincometax-website
```

**Build Process:**

1. Checkout code
1. Set up Docker Buildx
1. Login to Docker Hub
1. Extract metadata and tags
1. Build multi-platform image
1. Push to Docker Hub
1. Update repository description
1. Test published image

**Platforms:**

- `linux/amd64` - Standard x86_64
- `linux/arm64` - ARM64 (Apple Silicon, ARM servers)

### TechDocs Workflow

**Validation Steps:**

1. Validate YAML syntax
1. Build documentation with MkDocs
1. Check for broken links
1. Lint markdown files
1. Upload build artifacts

## Workflow Status

### Viewing Workflow Runs

1. Navigate to repository
1. Click "Actions" tab
1. View workflow runs and results

### Status Badges

Add to README.md:

```markdown
![PR Validation](https://github.com/your-org/lario-income-tax-website/actions/workflows/pr-validation.yml/badge.svg)
![Docker Publish](https://github.com/your-org/lario-income-tax-website/actions/workflows/docker-publish.yml/badge.svg)
```

## Deployment Process

### Automatic Deployment

**On merge to main:**

1. PR validation runs (all checks must pass)
1. Code merged to main branch
1. Docker publish workflow triggers
1. New image built and published
1. Image tagged as `latest`
1. Available on Docker Hub

### Manual Deployment

**Trigger workflow manually:**

1. Go to Actions tab
1. Select "Docker Build and Publish"
1. Click "Run workflow"
1. Select branch
1. Click "Run workflow"

### Version Releases

**Create a new version:**

1. Create and push a version tag:

   ```bash
   git tag -a v1.0.0 -m "Release version 1.0.0"
   git push origin v1.0.0
   ```

1. Workflow builds and tags image:
   - `lariosincometax-website:v1.0.0`
   - `lariosincometax-website:v1.0`
   - `lariosincometax-website:v1`
   - `lariosincometax-website:latest`

## Docker Hub

### Pulling Images

```bash
# Pull latest version
docker pull <DOCKERHUB_USERNAME>/lariosincometax-website:latest

# Pull specific version
docker pull <DOCKERHUB_USERNAME>/lariosincometax-website:v1.0.0

# Pull specific commit
docker pull <DOCKERHUB_USERNAME>/lariosincometax-website:main-abc1234
```

### Running Published Images

```bash
# Run latest version
docker run -d -p 80:80 <DOCKERHUB_USERNAME>/lariosincometax-website:latest

# Run specific version
docker run -d -p 80:80 <DOCKERHUB_USERNAME>/lariosincometax-website:v1.0.0
```

### Image Information

View on Docker Hub:

```text
https://hub.docker.com/r/<DOCKERHUB_USERNAME>/lariosincometax-website
```

## Cache Management

### GitHub Actions Cache

Workflows use GitHub Actions cache for:

- NPM dependencies
- Docker layers
- Build artifacts

**Benefits:**

- Faster builds
- Reduced bandwidth
- Improved reliability

**Cache Keys:**

- NPM: `node-modules-${{ hashFiles('package-lock.json') }}`
- Docker: `type=gha` (GitHub Actions cache)

### Clearing Cache

If builds fail due to cache issues:

1. Navigate to Actions > Caches
1. Delete problematic cache
1. Re-run workflow

## Build Artifacts

### Available Artifacts

Workflows upload artifacts for debugging:

| Workflow      | Artifact        | Retention |
| ------------- | --------------- | --------- |
| PR Validation | build-artifacts | 7 days    |
| TechDocs      | techdocs-site   | 7 days    |

### Downloading Artifacts

1. Go to workflow run
1. Scroll to "Artifacts" section
1. Click to download

## Monitoring

### Workflow Notifications

Configure notifications:

1. Repository Settings > Notifications
1. Choose notification preferences
1. Enable email or Slack notifications

### Failure Alerts

When workflows fail:

1. Check workflow run logs
1. Review failed step
1. Fix issue
1. Re-run workflow or push fix

## Best Practices

### Pull Requests

1. **Create PR** with descriptive title
1. **Wait for checks** to complete
1. **Review results** in Actions tab
1. **Fix failures** before requesting review
1. **Merge only** when all checks pass

### Version Tagging

1. Use semantic versioning (v1.0.0)
1. Create annotated tags with messages
1. Push tags to trigger release builds
1. Document changes in release notes

### Docker Images

1. Always tag with versions
1. Use `latest` for development only
1. Pin versions in production
1. Monitor image sizes
1. Clean up old images periodically

## Troubleshooting

### Workflow Fails on PR

**Issue:** PR validation fails

**Solutions:**

1. Check workflow logs
1. Run checks locally:

   ```bash
   npm run format:check
   npm run lint:md
   npm run build
   npm test
   docker build .
   ```

1. Fix issues and push
1. Workflow re-runs automatically

### Docker Build Fails

**Issue:** Docker build fails in workflow

**Solutions:**

1. Test locally:

   ```bash
   docker build -t test .
   ```

1. Check Dockerfile syntax
1. Verify dependencies install
1. Check build context size
1. Review Docker logs

### Image Not Pushing to Docker Hub

**Issue:** Image builds but doesn't push

**Solutions:**

1. Verify secrets are configured
1. Check Docker Hub credentials
1. Ensure organization secrets are accessible
1. Review Docker Hub rate limits
1. Check repository permissions

### Tests Failing in CI

**Issue:** Tests pass locally but fail in CI

**Solutions:**

1. Check Node.js version match
1. Verify all dependencies in package.json
1. Check for environment-specific issues
1. Review test logs in workflow
1. Add debug output to tests

## Maintenance

### Regular Tasks

1. **Update dependencies**

   - Review Dependabot PRs
   - Update Node.js version
   - Update GitHub Actions versions

1. **Clean up Docker Hub**

   - Remove old tags
   - Archive unused images
   - Monitor storage usage

1. **Review workflows**
   - Check execution times
   - Optimize slow jobs
   - Update caching strategies

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Build and Push Action](https://github.com/docker/build-push-action)
- [Docker Hub](https://hub.docker.com/)
- [Workflow Files](.github/workflows/)
