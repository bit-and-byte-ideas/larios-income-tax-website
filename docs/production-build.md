# Production Build

## Overview

This guide covers building and deploying the Larios Income Tax website for production environments.

## Build Commands

### Standard Production Build

```bash
ng build --configuration production
```

### Alternative Using NPM

```bash
npm run build
```

## Build Configuration

**Location:** `angular.json`

**Production Settings:**

```json
{
  "configurations": {
    "production": {
      "budgets": [...],
      "outputHashing": "all"
    }
  }
}
```

### Optimizations Enabled

1. **AOT Compilation** - Ahead-of-Time compilation
1. **Tree Shaking** - Removes unused code
1. **Minification** - Reduces file sizes
1. **Bundling** - Combines modules
1. **Output Hashing** - Cache busting

## Build Output

**Location:** `/dist/lario-income-tax/browser/`

**Contents:**

```text
dist/lario-income-tax/browser/
├── index.html              # Main HTML file
├── main-[hash].js          # Application bundle (~57.68 kB gzipped)
├── polyfills-[hash].js     # Polyfills bundle
├── styles-[hash].css       # Styles bundle
├── runtime-[hash].js       # Webpack runtime
└── assets/                 # Static assets
    └── favicon.ico
```

### Bundle Sizes

**Current Build:**

- **Raw Size:** 211.10 kB
- **Gzipped:** 57.68 kB
- **Build Time:** ~3.2 seconds

**Bundle Budgets:**

- Initial bundle: 500kB warning, 1MB error
- Component styles: 4kB warning, 8kB error

## Environment Configuration

### Development Environment

**File:** `src/environments/environment.ts`

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  // ... other dev settings
};
```

### Production Environment

**File:** `src/environments/environment.prod.ts`

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.lariosincometax.com/api',
  // ... other prod settings
};
```

### Using Environment Variables

1. **Create `.env` file:**

   ```bash
   cp .env.example .env
   ```

1. **Edit with production values:**

   ```env
   GOOGLE_MAPS_API_KEY=your_key_here
   GOOGLE_ANALYTICS_ID=UA-XXXXXXXXX-X
   PROD_API_URL=https://api.lariosincometax.com/api
   ```

1. **Access in code:**

   ```typescript
   const apiKey = environment.googleMaps.apiKey;
   ```

## Build Verification

### Check Build Output

```bash
# List build files
ls -lh dist/lario-income-tax/browser/

# Check file sizes
du -sh dist/lario-income-tax/browser/*
```

### Test Locally

```bash
# Serve production build
npx http-server dist/lario-income-tax/browser -p 8080

# Open browser
open http://localhost:8080
```

### Verify Build Quality

```bash
# Check bundle sizes
ng build --configuration production --stats-json

# Analyze bundle
npx webpack-bundle-analyzer dist/lario-income-tax/browser/stats.json
```

## Deployment Methods

### 1. Docker Deployment

> Recommended for production

```bash
# Build Docker image
docker build -t lario-income-tax-website .

# Run container
docker-compose up -d
```

See [Docker Setup](docker-setup.md) for details.

### 2. Static File Hosting

> For cloud platforms (AWS S3, Azure, GCP)

```bash
# Build production bundle
npm run build

# Deploy to S3 (example)
aws s3 sync dist/lario-income-tax/browser/ s3://your-bucket --delete

# Configure CloudFront or CDN
```

### 3. Traditional Server

> For VPS or dedicated servers

```bash
# Build production bundle
npm run build

# Copy to web server
scp -r dist/lario-income-tax/browser/* user@server:/var/www/html/

# Configure Nginx (see nginx.conf)
```

## Pre-deployment Checklist

- [ ] All tests passing (`ng test`)
- [ ] Production build successful
- [ ] Bundle sizes within limits
- [ ] Environment variables configured
- [ ] API endpoints updated
- [ ] Google Maps API key added
- [ ] Google Analytics configured
- [ ] No console errors in build output
- [ ] Assets loading correctly
- [ ] Routing working properly

## Performance Optimization

### Bundle Size Reduction

1. **Lazy Loading:**

   ```typescript
   const routes: Routes = [
     {
       path: 'services',
       loadChildren: () =>
         import('./features/services/services.module').then(m => m.ServicesModule),
     },
   ];
   ```

1. **Tree Shaking:**

   - Remove unused imports
   - Use production build
   - Enable AOT compilation

1. **Code Splitting:**
   - Split large modules
   - Use dynamic imports
   - Implement lazy loading

### Runtime Performance

1. **OnPush Change Detection:**

   ```typescript
   @Component({
     changeDetection: ChangeDetectionStrategy.OnPush
   })
   ```

1. **Track By Functions:**

   ```typescript
   trackById(index: number, item: any): number {
     return item.id;
   }
   ```

1. **Async Pipe:**

   ```html
   {{ data$ | async }}
   ```

### Asset Optimization

1. **Image Optimization:**

   - Compress images
   - Use WebP format
   - Implement lazy loading

1. **Font Optimization:**
   - Subset fonts
   - Use font-display: swap
   - Preload critical fonts

## Security Hardening

### Content Security Policy

Add to `index.html`:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
/>
```

### HTTP Headers

Configure in Nginx:

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
```

### Remove Debug Code

Ensure no debug statements in production:

```typescript
// Remove or guard these:
console.log();
console.debug();
debugger;
```

## Monitoring

### Application Monitoring

1. **Google Analytics:**

   - Configured in `environment.prod.ts`
   - Track page views and events

1. **Error Tracking:**

   - Implement error interceptor
   - Log to monitoring service (Sentry, etc.)

1. **Performance Monitoring:**
   - Use Chrome Lighthouse
   - Monitor Core Web Vitals
   - Track bundle sizes

### Server Monitoring

1. **Docker Logs:**

   ```bash
   docker-compose logs -f
   ```

1. **Nginx Access Logs:**

   ```bash
   docker exec lario-income-tax-website tail -f /var/log/nginx/access.log
   ```

1. **Resource Usage:**

   ```bash
   docker stats lario-income-tax-website
   ```

## Rollback Strategy

### Docker Rollback

```bash
# Tag current version
docker tag lario-income-tax-website:latest lario-income-tax-website:v1.0.0

# Rollback to previous version
docker-compose down
docker-compose up -d lario-income-tax-website:v0.9.0
```

### Git Rollback

```bash
# Revert to previous commit
git revert HEAD

# Or reset to specific commit
git reset --hard <commit-hash>

# Rebuild and deploy
npm run build
```

## CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - run: npm test
      - name: Build Docker image
        run: docker build -t lario-income-tax-website .
      - name: Deploy
        run: docker-compose up -d
```

## Troubleshooting

### Build Fails

**Issue:** Production build fails

**Solutions:**

```bash
# Clear cache
rm -rf .angular dist node_modules
npm install
npm run build
```

### Bundle Too Large

**Issue:** Exceeds budget limits

**Solutions:**

1. Implement lazy loading
1. Remove unused dependencies
1. Optimize images and assets
1. Use dynamic imports

### Assets Not Loading

**Issue:** 404 errors for assets

**Solutions:**

1. Check `base href` in index.html
1. Verify Nginx configuration
1. Check asset paths in code
1. Ensure `outputPath` is correct

## Best Practices

1. **Always test production build locally first**
1. **Use environment-specific configurations**
1. **Enable all optimizations for production**
1. **Monitor bundle sizes**
1. **Implement proper error handling**
1. **Use CDN for static assets**
1. **Enable gzip/brotli compression**
1. **Set up proper caching headers**
1. **Monitor application performance**
1. **Have a rollback plan**

## Resources

- [Angular Production Guide](https://angular.dev/tools/cli/build)
- [Deployment Documentation](https://angular.dev/tools/cli/deployment)
- [Performance Optimization](https://web.dev/articles/vitals)
- [Docker Setup](docker-setup.md)
