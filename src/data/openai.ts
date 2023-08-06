import { Instance, SnapshotIn } from "mobx-state-tree";
import OpenAI from "openai";
import { Role } from "./Role";
import { Message } from "./Message";
import { History } from "./History";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_APIKEY,
});
export async function getCompletion(
  messages: Instance<typeof History>
): Promise<SnapshotIn<typeof Message>> {
  const messagesOut = messages.map((message) => ({
    role: message.role,
    content: message.content,
  }));
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messagesOut,
  });
  const responseMessage = response.choices[0].message;
  return {
    role: responseMessage.role as Role,
    content: responseMessage.content ?? "",
  };
}
