import { Instance, SnapshotIn, flow, types, toGenerator } from "mobx-state-tree";
import OpenAI from "openai";

export enum Role {
  System = "system",
  User = "user",
  Assistant = "assistant",
  Function = "function",
}

export const Message = types.model("Message", {
  role: types.enumeration(Object.values(Role)),
  content: types.string,
  id: types.optional(types.string, () => crypto.randomUUID()),
});

export const History = types.array(Message);

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_APIKEY,
});
async function getCompletion(
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

export const ChatStore = types
  .model("ChatStore", {
    history: types.optional(History, []),
    loading: types.optional(types.boolean, false),
    error: types.optional(types.union(types.string, types.null), null),
  })
  .actions((self) => ({
    postMessage: flow(function* postMessage(
      message: Instance<typeof Message> | SnapshotIn<typeof Message>
    ) {
      self.error = null;
      self.loading = true;
      self.history.push(message);
      if (message.role === "user") {
        try {
          const response = yield* toGenerator(getCompletion(self.history));
          self.history.push(response);
          self.error = null;
          self.loading = false;
        } catch (e) {
          self.error = String(e);
          self.loading = false;
        }
      }
    }),
  }));
