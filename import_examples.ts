// This file demonstrates different import options for Deno

// Option 1: Using lib.deno.dev (may fail with certificate issues)
// import { Bot as BotFromLib } from "https://lib.deno.dev/x/grammy@1/mod.ts";

// Option 2: Using direct deno.land URL (preferred)
// import { Bot as BotFromDeno } from "https://deno.land/x/grammy@v1.36.3/mod.ts";

// Option 3: Using npm package
// import { Bot as BotFromNpm } from "npm:grammy";

// Example usage (commented out to prevent import errors)
// function createBot(token: string) {
//   // Choose one of the import methods above
//   return new BotFromDeno(token);
// }

// Example showing how to handle certificate errors in code
async function testConnection() {
  try {
    console.log("Testing connection to lib.deno.dev...");
    const response = await fetch("https://lib.deno.dev/x/grammy@1/mod.ts", {
      // Note: This approach isn't ideal as it doesn't handle TLS at this level
      // Just shown as an example
    });
    console.log("Connection successful!");
    return true;
  } catch (error) {
    console.error("Connection failed:", error.message);
    
    // Recommend proper solution
    console.log("\nRecommended solution:");
    console.log("1. Use direct deno.land URL instead of lib.deno.dev");
    console.log("2. Ensure certificates are properly configured");
    console.log("3. For development only, consider using --unsafely-ignore-certificate-errors flag");
    
    return false;
  }
}

// This will demonstrate the connection issue when run
if (import.meta.main) {
  await testConnection();
}

// Export for module usage
export { testConnection };