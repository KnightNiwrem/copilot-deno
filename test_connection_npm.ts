// This script tests connectivity to lib.deno.dev using npm:node-fetch
// to see if the Node.js approach handles certificates differently

import fetch from "npm:node-fetch";
import https from "npm:https";

console.log("Testing connectivity to lib.deno.dev using npm:node-fetch...");

const agent = new https.Agent({
  rejectUnauthorized: false // WARNING: This is insecure and should not be used in production
});

async function testHttpsFetch() {
  console.log("\n1. Testing with node-fetch...");
  try {
    const response = await fetch("https://lib.deno.dev/x/grammy@1/mod.ts", {
      agent
    });
    console.log("Status:", response.status);
    console.log("OK:", response.ok);
    console.log("Content-Type:", response.headers.get("content-type"));
    if (response.url !== "https://lib.deno.dev/x/grammy@1/mod.ts") {
      console.log("Redirected to:", response.url);
    }
    const text = await response.text();
    console.log(`Response Length: ${text.length} characters`);
    console.log("Fetch successful!");
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

async function main() {
  await testHttpsFetch();
  console.log("\nConnection test completed.");
}

main();