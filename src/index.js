import { createSlackApp, registerCommands } from "./app.js";
import { createHttpServer } from "./http.js";

const requiredEnv = ["SLACK_BOT_TOKEN", "SLACK_APP_TOKEN"];
const missing = requiredEnv.filter(name => !process.env[name]);

if (missing.length > 0) {
  console.error(`Missing required environment variables: ${missing.join(", ")}`);
  console.error("Copy .env.example to .env and fill in your Slack tokens.");
  process.exit(1);
}

const app = createSlackApp();
registerCommands(app);

if (process.env.SLACK_SOCKET_MODE !== "false") {
  await app.start();
  console.log("OSO Slack bot is running in Socket Mode.");
}

const port = Number(process.env.PORT || 3000);
createHttpServer().listen(port, "::", () => {
  console.log(`OSO Slack bot HTTP endpoint is listening on [::]:${port}.`);
});
