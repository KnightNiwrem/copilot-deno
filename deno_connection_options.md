# Deno Connection Options

This document provides examples of different ways to handle connections in Deno when facing certificate or network issues.

## Standard Import (may fail with certificate issues)

```typescript
// This will fail if there are certificate trust issues
import { Bot } from "https://lib.deno.dev/x/grammy@1/mod.ts";
```

## Using Direct deno.land URL (preferred)

```typescript
// Using the direct URL to deno.land instead of lib.deno.dev
import { Bot } from "https://deno.land/x/grammy@v1.36.3/mod.ts";
```

## Using Semantic Versioning 

If you want to use semantic versioning (similar to lib.deno.dev), use the specific version:

```typescript
// Specifying exact version
import { Bot } from "https://deno.land/x/grammy@v1.36.3/mod.ts";

// Specifying major version (CAUTION: may break with major version updates)
import { Bot } from "https://deno.land/x/grammy@v1/mod.ts";
```

## Using NPM Packages (alternative for some libraries)

```typescript
// Using npm packages with the npm: prefix
import { Bot } from "npm:grammy";
```

## Using JSR Registry

```typescript
// Using the JSR registry (if the package is available there)
import { Bot } from "jsr:@grammy/grammy";
```

## Running with Certificate Verification Disabled (NOT RECOMMENDED FOR PRODUCTION)

```bash
# NOT RECOMMENDED FOR PRODUCTION - Use only for testing
deno run --allow-net --unsafely-ignore-certificate-errors your_script.ts
```

## Workarounds for Network-Restricted Environments

In environments with restricted network access:

1. Use a local cache:
   ```bash
   # Cache dependencies locally
   deno cache --reload your_script.ts
   ```

2. Use the vendor command to download and store dependencies:
   ```bash
   # Download dependencies to a vendor directory
   deno vendor your_script.ts
   ```

3. Create a local mirror of dependencies:
   ```typescript
   // Import from local vendor directory
   import { Bot } from "./vendor/deno.land/x/grammy@v1.36.3/mod.ts";
   ```

## Recommended Approach

Based on our investigation:

1. Prefer direct imports from deno.land when possible
2. Use npm: imports as a fallback if deno.land is unavailable
3. For development only, consider using `--unsafely-ignore-certificate-errors` if necessary
4. For production or secure environments, properly configure certificates and network access

## Network Troubleshooting

If you're experiencing connection issues:

1. Check DNS resolution:
   ```bash
   dig lib.deno.dev
   ```

2. Check TLS connection:
   ```bash
   echo | openssl s_client -showcerts -connect lib.deno.dev:443
   ```

3. Check certificate trust:
   ```bash
   curl -v https://lib.deno.dev/x/grammy@1/mod.ts
   ```