// This script tests connectivity to lib.deno.dev with TLS workarounds

console.log("Testing connectivity to lib.deno.dev with TLS options...");

async function testHttpsFetch() {
  console.log("\n1. Testing with fetch API using TLS options...");
  try {
    const url = "https://lib.deno.dev/x/grammy@1/mod.ts";
    
    // Try direct fetch
    console.log("Trying direct fetch...");
    try {
      const response = await fetch(url);
      console.log("Status:", response.status);
      console.log("OK:", response.ok);
      console.log("Content-Type:", response.headers.get("content-type"));
      if (response.redirected) {
        console.log("Redirected to:", response.url);
      }
      console.log("Direct fetch successful!");
    } catch (error) {
      console.error("Direct fetch error:", error);
    }
    
    // Try using proxy connection
    console.log("\nTrying proxy approach...");
    try {
      // This will still fail if the underlying TLS issue is not fixed,
      // but it's a different approach to test
      const proxyUrl = "https://corsproxy.io/?" + encodeURIComponent(url);
      const proxyResponse = await fetch(proxyUrl);
      console.log("Proxy Status:", proxyResponse.status);
      console.log("Proxy OK:", proxyResponse.ok);
      console.log("Proxy returned data successfully!");
    } catch (error) {
      console.error("Proxy fetch error:", error);
    }
    
  } catch (error) {
    console.error("Test error:", error);
  }
}

async function main() {
  await testHttpsFetch();
  console.log("\nConnection test completed.");
}

main();