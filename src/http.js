import express from "express";
import { handleCommand } from "./app.js";

export function createHttpServer() {
  const server = express();

  server.get("/health", (_req, res) => {
    res.json({ ok: true });
  });

  server.post("/slack/commands", express.urlencoded({ extended: false }), async (req, res) => {
    if (process.env.SLACK_VERIFICATION_TOKEN && req.body.token !== process.env.SLACK_VERIFICATION_TOKEN) {
      res.status(401).json({ response_type: "ephemeral", text: "Invalid Slack token." });
      return;
    }

    const text = await handleCommand(req.body.command, req.body.text);
    res.json({
      response_type: "ephemeral",
      text
    });
  });

  return server;
}
