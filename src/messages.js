export function commandName(prefix, name) {
  return `/${prefix}-${name}`;
}

export function helpMessage(prefix) {
  return [
    "*OSO Bot commands*",
    `${commandName(prefix, "ping")} - check whether the bot is online`,
    `${commandName(prefix, "help")} - show this command list`,
    `${commandName(prefix, "joke")} - fetch a random programming-adjacent joke`,
    `${commandName(prefix, "choose")} option one | option two | option three - pick one option`,
    `${commandName(prefix, "ship")} - get a tiny push to keep building`
  ].join("\n");
}

export function chooseOption(text, random = Math.random) {
  const options = text
    .split("|")
    .map(option => option.trim())
    .filter(Boolean);

  if (options.length < 2) {
    return "Give me at least two options separated by `|`.";
  }

  const selected = options[Math.floor(random() * options.length)];
  return `I pick: *${selected}*`;
}

export function shipMessage() {
  const prompts = [
    "Post one devlog with what changed, what broke, and what you are trying next.",
    "Make the README clearer than the code feels right now.",
    "Ship the smallest honest version first, then improve it.",
    "Turn one confusing bug into a note someone else could learn from."
  ];
  return prompts[Math.floor(Math.random() * prompts.length)];
}
