import { types } from "mobx-state-tree";
import { Role } from "./Role";

export const Message = types.model("Message", {
  role: types.enumeration(Object.values(Role)),
  content: types.string,
  id: types.optional(types.string, () => crypto.randomUUID()),
});


