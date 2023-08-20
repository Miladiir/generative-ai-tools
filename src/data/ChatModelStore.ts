import {
  types,
  toGenerator,
  flow,
  SnapshotIn,
} from "mobx-state-tree";
import { getModels } from "./openai";

export const ChatModelStore = types
  .model("ChatModelStore", {
    available: types.maybeNull(types.array(types.string)),
    selected: types.maybeNull(types.string),
    loading: types.optional(types.boolean, false),
    error: types.maybeNull(types.string),
  })
  .actions((self) => {
    function setProp<
      K extends keyof SnapshotIn<typeof self>,
      V extends SnapshotIn<typeof self>[K],
    >(field: K, newValue: V) {
      self[field] = newValue;
    }

    const fetchModels = flow(function* fetchModels() {
      const models = yield* toGenerator(getModels());
      if (self.available === null && models.length !== 0) {
        setProp("available", models);
        setProp("selected", models[0]);
      }
    });

    function afterAttach() {
      fetchModels().catch((e) => console.error(e));
    }

    return {
      fetchModels,
      setProp,
      afterAttach,
    };
  });
