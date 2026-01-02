# TechDocs Setup

## Overview

This project uses Backstage TechDocs for technical documentation. TechDocs is built on MkDocs and
integrates seamlessly with the Backstage developer portal.

## Files Structure

```text
.
├── mkdocs.yml              # TechDocs configuration
├── catalog-info.yaml       # Backstage catalog metadata
└── docs/                   # Documentation content
    ├── index.md            # Documentation home
    ├── setup-guide.md
    ├── architecture.md
    ├── code-quality.md
    ├── docker-setup.md
    ├── production-build.md
    ├── environment-config.md
    ├── project-info.md
    ├── project-structure.md
    ├── bootstrap-summary.md
    ├── markdown-style-guide.md
    └── pre-commit-setup.md
```

## Configuration Files

### mkdocs.yml

Main TechDocs configuration file defining:

- Site metadata
- Navigation structure
- Theme settings (Material theme)
- Markdown extensions
- Plugins (techdocs-core)

### catalog-info.yaml

Backstage catalog metadata defining:

- Component information
- Ownership
- Dependencies
- Links to related resources
- TechDocs reference (`backstage.io/techdocs-ref: dir:.`)

## Local Development

### Prerequisites

```bash
# Python 3.9 or higher
python3 --version

# pip package manager
pip3 --version
```

### Install MkDocs

```bash
# Install MkDocs with TechDocs core
pip install mkdocs-techdocs-core
```

### Serve Documentation Locally

```bash
# From project root
mkdocs serve

# Open browser
open http://localhost:8000
```

### Build Documentation

```bash
# Build static site
mkdocs build

# Output in site/ directory
ls site/
```

## Backstage Integration

### Register Component

1. **In Backstage UI:**
   - Navigate to "Create Component"
   - Choose "Register Existing Component"
   - Enter repository URL with `/catalog-info.yaml`

1. **Or via API:**

   ```bash
   curl -X POST https://backstage.example.com/api/catalog/locations \
     -H "Content-Type: application/json" \
     -d '{
       "type": "url",
       "target": "https://github.com/your-org/lario-income-tax-website/blob/main/catalog-info.yaml"
     }'
   ```

### View Documentation

Once registered, documentation is available at:

```text
https://backstage.example.com/docs/default/component/lario-income-tax-website
```

## TechDocs Features

### Navigation

Defined in `mkdocs.yml` under `nav:` section:

```yaml
nav:
  - Home: index.md
  - Getting Started:
      - Setup Guide: setup-guide.md
      - Environment Configuration: environment-config.md
```

### Search

Built-in search functionality powered by MkDocs search plugin.

### Code Highlighting

Syntax highlighting for code blocks:

````markdown
```typescript
const greeting = 'Hello TechDocs!';
```
````

### Admonitions

Info boxes and callouts:

```markdown
!!! note
This is a note admonition

!!! warning
This is a warning admonition

!!! tip
This is a tip admonition
```

### Tabs

Tabbed content blocks:

```markdown
=== "TypeScript"
`typescript
    const x: number = 42;
    `

=== "JavaScript"
`javascript
    const x = 42;
    `
```

### Tables

Markdown tables with alignment:

```markdown
| Column 1 | Column 2 | Column 3 |
| -------- | -------- | -------- |
| Value 1  | Value 2  | Value 3  |
```

## Customization

### Theme Configuration

Customize theme in `mkdocs.yml`:

```yaml
theme:
  name: material
  palette:
    primary: brown # Match business colors
    accent: amber
  features:
    - navigation.tabs # Top-level tabs
    - navigation.sections
    - navigation.top # Back to top button
    - search.suggest
    - search.highlight
    - content.code.copy # Copy code button
```

### Markdown Extensions

Enable additional markdown features:

```yaml
markdown_extensions:
  - admonition # Info boxes
  - codehilite # Syntax highlighting
  - pymdownx.highlight # Enhanced highlighting
  - pymdownx.superfences # Nested code blocks
  - pymdownx.tabbed # Tabbed content
  - pymdownx.details # Collapsible sections
  - toc: # Table of contents
      permalink: true
  - tables # Tables support
  - attr_list # Attribute lists
  - md_in_html # Markdown in HTML
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Publish TechDocs

on:
  push:
    branches: [main]
    paths:
      - 'docs/**'
      - 'mkdocs.yml'

jobs:
  publish-techdocs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.9'

      - name: Install dependencies
        run: pip install mkdocs-techdocs-core

      - name: Generate docs
        run: techdocs-cli generate --no-docker

      - name: Publish docs
        run: techdocs-cli publish --publisher-type awsS3 \
          --storage-name ${{ secrets.TECHDOCS_S3_BUCKET }}
```

### Manual Publish

```bash
# Install TechDocs CLI
npm install -g @techdocs/cli

# Generate documentation
techdocs-cli generate --no-docker

# Publish to configured storage
techdocs-cli publish --publisher-type local
```

## Best Practices

### Documentation Structure

1. **index.md** - Clear overview and navigation
1. **Topic-based organization** - Group related docs
1. **Progressive disclosure** - Start simple, add detail
1. **Consistent formatting** - Follow markdown style guide

### Writing Guidelines

1. **Clear headings** - Descriptive section titles
1. **Code examples** - Include working samples
1. **Screenshots** - Visual aids where helpful
1. **Links** - Cross-reference related docs
1. **Keep current** - Update with code changes

### Maintenance

1. **Regular reviews** - Quarterly documentation audit
1. **Version alignment** - Docs match code version
1. **Link checking** - Verify no broken links
1. **User feedback** - Incorporate suggestions

## Troubleshooting

### MkDocs Build Fails

**Issue:** Build errors

**Solutions:**

```bash
# Verify configuration
mkdocs build --verbose

# Check YAML syntax
python -c "import yaml; yaml.safe_load(open('mkdocs.yml'))"

# Validate markdown
npm run lint:md
```

### Documentation Not Showing in Backstage

**Issue:** Docs not appearing in portal

**Solutions:**

1. Verify `catalog-info.yaml` annotation:

   ```yaml
   annotations:
     backstage.io/techdocs-ref: dir:.
   ```

1. Check component is registered
1. Verify TechDocs builder is configured
1. Check Backstage logs for errors

### Navigation Not Working

**Issue:** Links or navigation broken

**Solutions:**

1. Check file paths in `mkdocs.yml`
1. Verify markdown files exist
1. Use relative links (not absolute)
1. Test locally with `mkdocs serve`

### Images Not Loading

**Issue:** Images not displaying

**Solutions:**

1. Place images in `docs/` directory
1. Use relative paths: `![Alt](./images/screenshot.png)`
1. Verify image files are committed
1. Check file extensions (case-sensitive)

## Migration from Existing Docs

### From README-based Docs

1. Copy existing markdown files to `docs/`
1. Create `index.md` as main page
1. Define navigation in `mkdocs.yml`
1. Update internal links
1. Test locally
1. Update main README with TechDocs links

### From Wiki

1. Export wiki pages as markdown
1. Organize in `docs/` directory
1. Convert wiki syntax to standard markdown
1. Update cross-references
1. Configure navigation

## Resources

- [TechDocs Documentation](https://backstage.io/docs/features/techdocs/)
- [MkDocs Documentation](https://www.mkdocs.org/)
- [Material Theme](https://squidfunk.github.io/mkdocs-material/)
- [Markdown Guide](https://www.markdownguide.org/)
- [Backstage Catalog](https://backstage.io/docs/features/software-catalog/)

## Support

For TechDocs issues:

1. Check Backstage documentation
1. Review MkDocs logs
1. Test locally first
1. Verify configuration files
1. Consult team documentation standards
