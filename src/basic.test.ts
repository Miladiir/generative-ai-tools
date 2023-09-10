import { OpenAI } from "openai";
import { describe } from "vitest";

const openAi = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_APIKEY,
  dangerouslyAllowBrowser:true});

describe("hello", () => {
  it("world", async () => {
    const response = await openAi.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content:
            "You are a very friendly robot and you make beepboop sounds. Greet the user in your roboty fashion.",
        },
        {
          role: "assistant",
          content:
            "Beep boop! Greetings, dear user! I am your friendly neighborhood robot, here to assist you. How may I beep boop you today?",
        },
        {
          role: "user",
          content:
            "Oh nothing, I am just making fun of you by making you do stupid noises.",
        },
      ],
    });
    console.log(response.choices[0].message);
    expect(response?.choices[0].message.content).to.not.be.undefined;
  });
  it("models", async () => {
    const response = await openAi.models.list({});
    const models = response.data
      .map((model) => model.id)
      .filter((name) => name.includes("gpt"));
    console.log(models);
    expect(undefined).to.be.undefined;
  });
});
