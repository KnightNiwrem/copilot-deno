// This script tests connectivity to lib.deno.dev

console.log("Testing connectivity to lib.deno.dev...");

async function testHttpsFetch() {
  console.log("\n1. Testing with fetch API...");
  try {
    const response = await fetch("https://lib.deno.dev/x/grammy@1/mod.ts");
    console.log("Status:", response.status);
    console.log("OK:", response.ok);
    console.log("Content-Type:", response.headers.get("content-type"));
    if (response.redirected) {
      console.log("Redirected to:", response.url);
    }
    console.log("Fetch successful!");
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

async function testImport() {
  console.log("\n2. Testing with dynamic import...");
  try {
    console.log("Attempting to dynamically import from lib.deno.dev...");
    // This will likely fail due to module type, but we're testing connectivity
    const url = "https://lib.deno.dev/x/grammy@1/mod.ts";
    try {
      // @ts-ignore - Dynamic import will fail but we want to check connection
      const module = await import(url);
      console.log("Import successful!");
    } catch (error) {
      if (String(error).includes("certificate") || 
          String(error).includes("TLS") ||
          String(error).includes("SSL")) {
        console.error("Certificate/TLS error:", error);
      } else {
        console.log("Import failed, but not due to certificate issues:", error);
      }
    }
  } catch (error) {
    console.error("Import test error:", error);
  }
}

async function main() {
  await testHttpsFetch();
  await testImport();
  
  console.log("\nConnection test completed.");
}

main();