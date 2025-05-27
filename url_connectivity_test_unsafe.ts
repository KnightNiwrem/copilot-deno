/**
 * Script to test connectivity to the lib.deno.dev URL with certificate validation disabled
 * 
 * This script attempts to fetch the Grammy module from lib.deno.dev
 * and reports whether the connection was successful, ignoring certificate errors.
 * 
 * NOTE: This script disables certificate validation, which is a security risk.
 * It should only be used for testing purposes.
 */

// URL to test
const url = "https://lib.deno.dev/x/grammy@1/mod.ts";

console.log(`Testing connectivity to: ${url} (ignoring certificate errors)`);

try {
  // Attempt to fetch the URL
  const response = await fetch(url);
  
  if (response.ok) {
    console.log(`✅ Connection successful! Status code: ${response.status}`);
    
    // Get the first 100 characters of content to verify it's the expected file
    const text = await response.text();
    console.log(`Content preview: ${text.substring(0, 100)}...`);
  } else {
    console.error(`❌ Connection failed! Status code: ${response.status}`);
    console.error(`Status text: ${response.statusText}`);
  }
} catch (error) {
  console.error(`❌ Connection failed with error:`);
  console.error(error);
}