import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { Message } from "./data/Message";
import { ChatStore } from "./data/ChatStore";
import { Role } from "./data/Role";
import ReactMarkdown from "react-markdown";

export const ChatMessagesView = observer(function ChatMessagesView(props: {
  store: Instance<typeof ChatStore>;
}) {
  return (
    <div className="flex justify-center overflow-scroll">
      <div className="flex flex-col">
        {props.store.history.map((message) => (
          <ChatMessageView key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
});
type ChatMessageProps = { message: Instance<typeof Message> };
const ChatMessageView = observer(function ChatMessageView(
  props: ChatMessageProps,
) {
  return (
    <div className="flex flex-col">
      <header className="font-bold">
        {props.message.role === Role.User ? "You" : "Assistant"}:
      </header>
      <ReactMarkdown className="prose pl-2">
        {props.message.content}
      </ReactMarkdown>
    </div>
  );
});
