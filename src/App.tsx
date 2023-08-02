import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChatStore, Message, History } from "./Message";
import { useCallback } from "react";
import { Role } from "./Message";
import { TextArea } from "./components/TextArea/TextArea";

function App() {
  return (
    <>
      <main>
        <ChatApp />
      </main>
    </>
  );
}

export default App;

function ChatApp() {
  const store = ChatStore.create({});
  const postMessage = useCallback(
    (message: string) => {
      store
        .postMessage({
          role: Role.User,
          content: message,
        })
        .catch(() => undefined);
    },
    [store]
  );
  return (
    <div className="flex flex-col">
      <ChatMessagesView messages={store.history} />
      <ChatDraftMessageView postMessage={postMessage} />
    </div>
  );
}

type ChatMessagesProps = {
  messages: Instance<typeof History>;
};
const ChatMessagesView = observer(function ChatMessages(
  props: ChatMessagesProps
) {
  return (
    <>
      {props.messages.map((message) => (
        <ChatMessageView key={message.id} message={message} />
      ))}
    </>
  );
});

type ChatMessageProps = { message: Instance<typeof Message> };
const ChatMessageView = observer(function ChatMessageView(
  props: ChatMessageProps
) {
  return (
    <>
      <div>
        <header>{props.message.role}</header>
        <article>{props.message.content}</article>
      </div>
    </>
  );
});

type ChatDraftMessageProps = {
  postMessage: (message: string) => void;
};
function ChatDraftMessageView(props: ChatDraftMessageProps) {
  return (
    <>
      <TextArea onChange={props.postMessage} />
    </>
  );
}
