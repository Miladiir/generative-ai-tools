import { getSnapshot, types } from "mobx-state-tree";
import { ChatStore } from "./ChatStore";
import { chatStoreMock } from "./ChatStore.mock";

export const RootStore = types.model("RootStore", {
  chatStore: types.optional(ChatStore, () => getSnapshot(chatStoreMock),//ChatStore.create()),
  )});