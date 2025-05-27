/**
 * Script that just fetches the content of the URL and displays it
 */

// URL to test
const url = "https://lib.deno.dev/x/grammy@1/mod.ts";

console.log(`Fetching content from: ${url}`);

try {
  // Attempt to fetch the URL
  const response = await fetch(url);
  
  if (response.ok) {
    console.log(`✅ Fetch successful! Status code: ${response.status}`);
    
    // Get the content and print the first 100 characters
    const text = await response.text();
    console.log(`Content length: ${text.length} characters`);
    console.log(`First 100 characters:\n${text.substring(0, 100)}...`);
  } else {
    console.error(`❌ Fetch failed! Status code: ${response.status}`);
    console.error(`Status text: ${response.statusText}`);
  }
} catch (error) {
  console.error(`❌ Fetch failed with error:`);
  console.error(error);
}