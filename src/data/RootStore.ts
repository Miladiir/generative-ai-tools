import { types } from "mobx-state-tree";
import { ChatStore } from "./ChatStore";

export const RootStore = types.model("RootStore", {
  chatStore: types.optional(ChatStore, () => ChatStore.create()),
});
