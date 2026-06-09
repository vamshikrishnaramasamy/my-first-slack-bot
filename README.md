# My First Slack Bot

A small Slack bot for the Stardance "Make a Slack Bot" mission. It uses Slack Bolt for JavaScript, Socket Mode, and slash commands prefixed with `/oso-` so it does not collide with other Hack Club Slack bots.

## Features

- `/oso-ping` checks whether the bot is online.
- `/oso-help` lists available commands.
- `/oso-joke` fetches a random joke from a public API.
- `/oso-choose` picks from options separated by `|`.
- `/oso-ship` gives a short project-building prompt.
- Mentions reply with the help message in a thread.

## Setup

Create a Slack app in the Slack API dashboard and enable Socket Mode. Add these bot scopes:

- `chat:write`
- `commands`
- `app_mentions:read`
- `channels:history`

Install the app to the Hack Club workspace, then create slash commands matching the command names above.

## Local Development

Install dependencies:

```bash
npm install
```

Copy the example environment file:

```bash
cp .env.example .env
```

Fill in:

```bash
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_APP_TOKEN=xapp-your-app-level-token
COMMAND_PREFIX=oso
```

Run the bot:

```bash
npm start
```

Run tests:

```bash
npm test
```

## Deployment Notes

This bot is designed for Hack Club Nest. After cloning the repo on Nest, run `npm install`, recreate `.env`, test with `npm start`, then run it under a process manager or systemd service so it stays online.

## Security

Slack tokens are secrets. They are stored in `.env`, which is ignored by Git. Never commit real `xoxb-` or `xapp-` tokens.
