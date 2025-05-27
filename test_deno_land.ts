// This script demonstrates connecting to deno.land directly instead of lib.deno.dev

console.log("Testing connectivity to deno.land directly...");

async function testHttpsFetch() {
  console.log("\n1. Testing with fetch API using deno.land...");
  try {
    const response = await fetch("https://deno.land/x/grammy@v1.36.3/mod.ts");
    console.log("Status:", response.status);
    console.log("OK:", response.ok);
    console.log("Content-Type:", response.headers.get("content-type"));
    if (response.redirected) {
      console.log("Redirected to:", response.url);
    }
    console.log("Fetch successful!");
    const text = await response.text();
    console.log(`Response Length: ${text.length} characters`);
    console.log("First 200 characters of response:");
    console.log(text.slice(0, 200));
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

async function testImport() {
  console.log("\n2. Testing with dynamic import from deno.land...");
  try {
    console.log("Attempting to import from deno.land...");
    // This will successfully connect to deno.land but may fail to import 
    // since we're just testing raw HTTP access
    try {
      // @ts-ignore - Dynamic import
      const module = await import("https://deno.land/x/grammy@v1.36.3/mod.ts");
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