import test from "node:test";
import assert from "node:assert/strict";
import { chooseOption, commandName, helpMessage } from "../src/messages.js";

test("commandName prefixes slash commands", () => {
  assert.equal(commandName("oso", "ping"), "/oso-ping");
});

test("helpMessage includes the expected commands", () => {
  const message = helpMessage("oso");
  assert.match(message, /\/oso-ping/);
  assert.match(message, /\/oso-joke/);
  assert.match(message, /\/oso-choose/);
});

test("chooseOption requires at least two options", () => {
  assert.equal(chooseOption("only one"), "Give me at least two options separated by `|`.");
});

test("chooseOption returns a deterministic option when random is injected", () => {
  assert.equal(chooseOption("red | green | blue", () => 0.5), "I pick: *green*");
});
