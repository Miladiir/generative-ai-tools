import { types } from "mobx-state-tree";

enum Role {
  System = "system",
  User = "user",
  Assistant = "assistant",
  Function = "function",
}

export const Message = types.model("Message", {
    role: types.enumeration(Object.values(Role)),
    content: types.string,
});

export const History = types.array(Message);