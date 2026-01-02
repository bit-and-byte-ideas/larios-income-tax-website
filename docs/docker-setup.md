# Docker Setup

## Overview

The Larios Income Tax website uses a multi-stage Docker build with Nginx for production deployment.

## Docker Configuration

### Dockerfile

**Location:** `/Dockerfile`

**Strategy:** Multi-stage build

**Stages:**

1. **Build Stage** - Compiles Angular application
   - Base: `node:20-alpine`
   - Installs dependencies
   - Builds production bundle

1. **Production Stage** - Serves static files
   - Base: `nginx:alpine`
   - Copies built files
   - Configures Nginx server

### Benefits

- **Small image size** - Alpine Linux base
- **Fast builds** - Cached layers
- **Production ready** - Optimized Nginx config
- **Security** - Minimal attack surface

## Quick Start

### Build Image

```bash
docker build -t lario-income-tax-website .
```

### Run Container

```bash
docker run -d -p 80:80 lario-income-tax-website
```

### Using Docker Compose

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Docker Compose

**Location:** `/docker-compose.yml`

**Configuration:**

```yaml
version: '3.8'

services:
  lario-income-tax-web:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: lario-income-tax-website
    ports:
      - '80:80'
    restart: unless-stopped
    environment:
      - NODE_ENV=production
    networks:
      - lario-network

networks:
  lario-network:
    driver: bridge
```

**Features:**

- Automatic restarts
- Isolated network
- Port mapping (80:80)
- Production environment

## Nginx Configuration

**Location:** `/nginx.conf`

**Features:**

### Performance

- **Gzip compression** - Reduces bandwidth
- **Browser caching** - Faster load times
- **Sendfile** - Efficient file serving

**Configuration:**

```nginx
gzip on;
gzip_vary on;
gzip_comp_level 6;
gzip_types text/plain text/css application/javascript;
```

### Security

- **X-Frame-Options** - Prevents clickjacking
- **X-Content-Type-Options** - Prevents MIME sniffing
- **X-XSS-Protection** - XSS filter
- **Hidden files blocked** - Denies access to dotfiles

**Headers:**

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
```

### SPA Routing

- **try_files directive** - Handles Angular routing
- All routes redirect to index.html

**Configuration:**

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### Static Asset Caching

```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

## Build Process

### Step-by-Step

1. **Install Dependencies**

   ```dockerfile
   COPY package*.json ./
   RUN npm ci
   ```

1. **Copy Source Code**

   ```dockerfile
   COPY . .
   ```

1. **Build Application**

   ```dockerfile
   RUN npm run build
   ```

1. **Copy to Nginx**

   ```dockerfile
   COPY --from=build /app/dist/lario-income-tax/browser /usr/share/nginx/html
   ```

### Build Output

**Location:** `/dist/lario-income-tax/browser/`

**Contents:**

- `index.html` - Main HTML file
- `main-[hash].js` - Application bundle
- `styles-[hash].css` - Styles bundle
- `assets/` - Static assets

## .dockerignore

**Location:** `/.dockerignore`

**Purpose:** Exclude files from Docker build context

**Excluded:**

- `node_modules/` - Will be installed fresh
- `dist/` - Build output
- `.git/` - Version control
- `*.md` - Documentation
- `.env` - Sensitive data

**Benefits:**

- Faster builds
- Smaller context
- Better security

## Environment Variables

### Build-time Variables

Set during image build:

```dockerfile
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
```

### Runtime Variables

Set when running container:

```bash
docker run -e NODE_ENV=production lario-income-tax-website
```

### Docker Compose Variables

```yaml
environment:
  - NODE_ENV=production
  - API_URL=https://api.example.com
```

## Commands Reference

### Docker Commands

```bash
# Build image
docker build -t lario-income-tax-website .

# Build with no cache
docker build --no-cache -t lario-income-tax-website .

# Run container
docker run -d -p 80:80 lario-income-tax-website

# Run with custom port
docker run -d -p 8080:80 lario-income-tax-website

# View logs
docker logs lario-income-tax-website

# Follow logs
docker logs -f lario-income-tax-website

# Stop container
docker stop lario-income-tax-website

# Remove container
docker rm lario-income-tax-website

# Remove image
docker rmi lario-income-tax-website

# Inspect container
docker inspect lario-income-tax-website

# Execute command in container
docker exec -it lario-income-tax-website sh
```

### Docker Compose Commands

```bash
# Start services
docker-compose up -d

# Start with build
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Restart services
docker-compose restart

# View status
docker-compose ps

# Scale services
docker-compose up -d --scale lario-income-tax-web=3
```

## Production Deployment

### Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+
- Domain name configured
- SSL certificate (Let's Encrypt recommended)

### Steps

1. **Clone Repository**

   ```bash
   git clone <repository-url>
   cd lario-income-tax-website
   ```

1. **Configure Environment**

   ```bash
   cp .env.example .env
   # Edit .env with production values
   ```

1. **Build and Start**

   ```bash
   docker-compose up -d --build
   ```

1. **Verify Deployment**

   ```bash
   curl http://localhost
   docker-compose logs -f
   ```

### SSL/HTTPS Setup

Add reverse proxy (Nginx or Traefik) with SSL:

```yaml
services:
  reverse-proxy:
    image: nginx:alpine
    ports:
      - '443:443'
      - '80:80'
    volumes:
      - ./nginx-ssl.conf:/etc/nginx/nginx.conf
      - /etc/letsencrypt:/etc/letsencrypt
```

## Troubleshooting

### Build Fails

**Issue:** Docker build fails

**Solutions:**

```bash
# Clear Docker cache
docker system prune -a

# Build with no cache
docker-compose build --no-cache

# Check Docker disk space
docker system df
```

### Container Won't Start

**Issue:** Container exits immediately

**Solutions:**

```bash
# View logs
docker-compose logs lario-income-tax-web

# Check Nginx config
docker-compose exec lario-income-tax-web nginx -t

# Inspect container
docker inspect lario-income-tax-website
```

### Port Already in Use

**Issue:** Port 80 already bound

**Solutions:**

```bash
# Use different port
docker run -d -p 8080:80 lario-income-tax-website

# Or stop conflicting service
sudo lsof -i :80
sudo systemctl stop apache2
```

### Application Not Loading

**Issue:** Blank page or 404 errors

**Solutions:**

1. Check Nginx configuration
1. Verify build output exists
1. Check Angular routing setup
1. Inspect browser console

## Best Practices

1. **Use multi-stage builds** - Smaller images
1. **Pin base image versions** - Reproducible builds
1. **Minimize layers** - Combine RUN commands
1. **Use .dockerignore** - Faster builds
1. **Don't run as root** - Add USER directive
1. **Health checks** - Monitor container health
1. **Resource limits** - Set memory/CPU limits

## Resources

- [Dockerfile Reference](https://docs.docker.com/engine/reference/builder/)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
