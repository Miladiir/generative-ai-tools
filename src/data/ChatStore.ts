import {
  Instance,
  SnapshotIn,
  flow,
  types,
  toGenerator,
} from "mobx-state-tree";
import { Message } from "./Message";
import { History } from "./History";
import { getCompletion } from "./openai";
import { Role } from "./Role";
import { ChatModelStore } from "./ChatModelStore";

export const ChatStore = types
  .model("ChatStore", {
    history: types.optional(History, []),
    loading: types.optional(types.boolean, false),
    error: types.maybeNull(types.string),
    models: types.optional(ChatModelStore, () => ChatModelStore.create({})),
  })
  .actions((self) => {
    const postUserMessage = flow(function* postUserMessage(message: string) {
      yield* toGenerator(
        postMessage({
          role: Role.User,
          content: message,
        })
      );
    });
    const postMessage = flow(function* postMessage(
      message: Instance<typeof Message> | SnapshotIn<typeof Message>
    ) {
      self.error = null;
      self.loading = true;
      self.history.push(message);
      if (message.role === "user") {
        try {
          const response = yield* toGenerator(
            getCompletion(self.models.selected??"", self.history)
          );
          self.history.push(response);
          self.error = null;
          self.loading = false;
        } catch (e) {
          self.error = String(e);
          self.loading = false;
        }
      }
    });
    return {
      postMessage,
      postUserMessage,
    };
  });
