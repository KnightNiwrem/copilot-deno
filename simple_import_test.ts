/**
 * Simple test script that just attempts to import from lib.deno.dev
 * without actually using the module
 */

console.log("Starting import test...");

// Dynamically import the module
async function testImport() {
  try {
    // We're using dynamic import to catch any errors
    const module = await import("https://lib.deno.dev/x/grammy@1/mod.ts");
    console.log("✅ Module imported successfully!");
    console.log("Module keys:", Object.keys(module));
  } catch (error) {
    console.error("❌ Import failed with error:");
    console.error(error);
  }
}

// Run the test
await testImport();