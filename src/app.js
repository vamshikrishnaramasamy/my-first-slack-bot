import "dotenv/config";
import axios from "axios";
import { App } from "@slack/bolt";
import { chooseOption, commandName, helpMessage, shipMessage } from "./messages.js";

export const commandPrefix = (process.env.COMMAND_PREFIX || "oso").replace(/^\//, "");

export function createSlackApp() {
  return new App({
    token: process.env.SLACK_BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true
  });
}

export function registerCommands(app) {
  app.command(commandName(commandPrefix, "ping"), async ({ ack, respond }) => {
    const start = Date.now();
    await ack();
    await respond(`Pong. Latency: ${Date.now() - start}ms`);
  });

  app.command(commandName(commandPrefix, "help"), async ({ ack, respond }) => {
    await ack();
    await respond(helpMessage(commandPrefix));
  });

  app.command(commandName(commandPrefix, "choose"), async ({ command, ack, respond }) => {
    await ack();
    await respond(chooseOption(command.text));
  });

  app.command(commandName(commandPrefix, "ship"), async ({ ack, respond }) => {
    await ack();
    await respond(shipMessage());
  });

  app.command(commandName(commandPrefix, "joke"), async ({ ack, respond }) => {
    await ack();

    try {
      const response = await axios.get("https://official-joke-api.appspot.com/random_joke", {
        timeout: 5000
      });
      await respond(`${response.data.setup}\n\n${response.data.punchline}`);
    } catch {
      await respond("I could not fetch a joke right now. Try again in a bit.");
    }
  });

  app.event("app_mention", async ({ event, say }) => {
    await say({
      thread_ts: event.ts,
      text: helpMessage(commandPrefix)
    });
  });
}

export async function handleCommand(command, text = "") {
  if (command === commandName(commandPrefix, "ping")) {
    return "Pong from Nest.";
  }

  if (command === commandName(commandPrefix, "help")) {
    return helpMessage(commandPrefix);
  }

  if (command === commandName(commandPrefix, "choose")) {
    return chooseOption(text);
  }

  if (command === commandName(commandPrefix, "ship")) {
    return shipMessage();
  }

  if (command === commandName(commandPrefix, "joke")) {
    try {
      const response = await axios.get("https://official-joke-api.appspot.com/random_joke", {
        timeout: 5000
      });
      return `${response.data.setup}\n\n${response.data.punchline}`;
    } catch {
      return "I could not fetch a joke right now. Try again in a bit.";
    }
  }

  return helpMessage(commandPrefix);
}
