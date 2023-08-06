import { Instance } from "mobx-state-tree";
import { ChatStore } from "./data/ChatStore";
import { useCallback, useMemo } from "react";
import { TextArea } from "./components/TextArea/TextArea";

export function ChatDraftMessageView(props: {
  store: Instance<typeof ChatStore>;
}) {
  const postMessage = useCallback(
    (message: string) => {
      props.store.postUserMessage(message).catch(() => undefined);
    },
    [props]
  );
  const placeHolder = useMemo(
    () =>
      props.store.history.length === 0
        ? "Write your first message here"
        : "Continue your conversation",
    [props]
  );
  return (
    <>
      <TextArea onChange={postMessage} placeHolder={placeHolder} />
    </>
  );
}
