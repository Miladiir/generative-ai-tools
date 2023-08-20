import { Instance, SnapshotIn } from "mobx-state-tree";
import OpenAI from "openai";
import { Role } from "./Role";
import { Message } from "./Message";
import { History } from "./History";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_APIKEY,
});
export async function getCompletion(
  model: string,
  messages: Instance<typeof History>
): Promise<SnapshotIn<typeof Message>> {
  const messagesOut = messages.map((message) => ({
    role: message.role,
    content: message.content,
  }));
  const response = await openai.chat.completions.create({
    model,
    messages: messagesOut,
  });
  const responseMessage = response.choices[0].message;
  return {
    role: responseMessage.role as Role,
    content: responseMessage.content ?? "",
  };
}
export async function getModels(): Promise<string[]> {
  const response = await openai.models.list();
  const allModels = response.data.map((model) => model.id);
  const gptModels = allModels.filter((name) => name.includes("gpt"));
  return gptModels;
}
