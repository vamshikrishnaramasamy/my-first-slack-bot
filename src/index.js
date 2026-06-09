import { createSlackApp, registerCommands } from "./app.js";

const requiredEnv = ["SLACK_BOT_TOKEN", "SLACK_APP_TOKEN"];
const missing = requiredEnv.filter(name => !process.env[name]);

if (missing.length > 0) {
  console.error(`Missing required environment variables: ${missing.join(", ")}`);
  console.error("Copy .env.example to .env and fill in your Slack tokens.");
  process.exit(1);
}

const app = createSlackApp();
registerCommands(app);

await app.start();
console.log("OSO Slack bot is running in Socket Mode.");
