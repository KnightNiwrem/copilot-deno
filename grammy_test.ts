/**
 * Simple test script to import Grammy from lib.deno.dev
 * 
 * This script attempts to import the Bot class from Grammy library
 * and creates a simple bot instance.
 */

// Import Bot class from Grammy library using lib.deno.dev
import { Bot } from "https://lib.deno.dev/x/grammy@1/mod.ts";

// Create a simple bot instance (token is fake for demonstration purposes)
const bot = new Bot("fake-bot-token");

// Log a message to verify the code runs
console.log("Successfully imported Grammy and created a bot instance!");
console.log(`Bot instance: ${bot}`);

// Add a simple command handler to demonstrate Grammy API usage
bot.command("start", (ctx) => {
  console.log("Added a command handler for /start");
  return ctx.reply("Hello, world!");
});

// This is just a test, so we won't actually start the bot