# Investigation: Connecting to lib.deno.dev

This document contains findings from an investigation into connecting to `https://lib.deno.dev/x/grammy@1/mod.ts` and related certificate issues.

## The Issue

When attempting to connect to `https://lib.deno.dev/x/grammy@1/mod.ts`, we encounter an SSL certificate error:

```
error: Import 'https://lib.deno.dev/x/grammy@1/mod.ts' failed.
    0: error sending request for url (https://lib.deno.dev/x/grammy@1/mod.ts): client error (Connect): invalid peer certificate: UnknownIssuer
```

## Test Results

### Certificate Information

Using OpenSSL to check the certificate reveals that there appears to be a MITM (Man-In-The-Middle) proxy:

```
Certificate chain
 0 s:O = GoProxy untrusted MITM proxy Inc, CN = lib.deno.dev
   i:O = mkcert development CA, OU = runner@fv-az1306-945, CN = mkcert runner@fv-az1306-945
```

The certificate is from "GoProxy untrusted MITM proxy Inc" which is not a trusted certificate authority.

### Connection Attempts

We attempted the following approaches:

1. Direct connection using `curl`:
   - Successfully connects but shows that the connection is redirected to `https://deno.land/x/grammy@v1.36.3/mod.ts`

2. Deno imports using lib.deno.dev:
   - Failed with "invalid peer certificate: UnknownIssuer"
   - Error occurs even with `--allow-import` and `--allow-net` flags

3. Testing with fetch API against lib.deno.dev:
   - Failed with "invalid peer certificate: UnknownIssuer"

4. Proxy approaches:
   - Attempted but also failed with connection errors

5. Direct connection to deno.land:
   - Connecting directly to deno.land also results in certificate issues
   - This suggests the issue is related to the environment's certificate trust store

### Network Connectivity

We observed significant network connectivity issues in the test environment:

1. Unable to resolve DNS for external domains (example.com)
2. Unable to ping external IP addresses (8.8.8.8)
3. Network requests timeout after extended periods

These issues indicate that the test environment has significant network restrictions, which may be contributing to the certificate issues we're observing.

### Certificate Updates

We checked and updated system certificates:

1. Current ca-certificates package version: 20240203
2. Updating ca-certificates with `apt-get install -y ca-certificates` showed it was already at the newest version
3. Ran `sudo update-ca-certificates` to refresh certificates
4. Still encountered certificate errors after these steps

## Root Cause Analysis

After testing, we identified two potential contributing factors:

1. **Certificate Trust Issues**: There appears to be a TLS-intercepting proxy generating untrusted certificates:
   - Both domains show "GoProxy untrusted MITM proxy Inc" certificates
   - The certificate issuer appears to be a local mkcert development CA
   - The certificate is only valid for the current environment (OU = runner@fv-az1306-945)

2. **Network Connectivity Restrictions**: The environment has significant network limitations:
   - DNS resolution failures for external domains
   - Failed ping requests to public IP addresses
   - Network timeouts on connection attempts

These issues together suggest the environment has strict network security measures that are affecting our ability to connect to external domains.

## Conclusions

The issue is multifaceted:
- Certificate trust issues due to a TLS-intercepting proxy
- Network connectivity restrictions in the environment
- These issues affect both `lib.deno.dev` and `deno.land` connections

## Recommendations

Based on our investigation, here are potential solutions:

1. **Not Recommended for Production**: Use Deno's `--unsafely-ignore-certificate-errors` flag
   - This would bypass certificate verification, but is explicitly discouraged in the issue description and is not secure

2. **Environment Configuration**: Review network security policies
   - The current environment has restricted outbound connectivity
   - Work with infrastructure/network administrators to allow necessary connections
   - Add the local MITM certificates to the trust store if needed

3. **For CI/CD Environments**: Use container images with pre-configured network access
   - Create a custom Docker image with the appropriate network and certificate configurations
   - Use this as the base for CI/CD operations

4. **Alternative Development Setup**: Consider using a different development environment
   - Local development where network restrictions can be configured as needed
   - Cloud-based development environments with appropriate network access

## Next Steps

Given the issues encountered, we recommend:

1. Contact the environment/infrastructure administrator to understand network security restrictions
2. Request necessary network access and/or proxy configurations for development needs
3. If the environment is intended to be air-gapped or restricted, consider alternative development workflows that accommodate these restrictions
4. For development purposes only (and only if allowed by security policies), the `--unsafely-ignore-certificate-errors` flag could be used, but this is not recommended for production