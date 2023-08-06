import { Instance } from "mobx-state-tree";
import { ChatStore } from "./data/ChatStore";
import { RootStore } from "./data/RootStore";
import { ChatDraftMessageView } from "./ChatDraftMessageView";
import { ChatMessagesView } from "./ChatMessagesView";

export function App() {
  const store = RootStore.create();
  return (
    <>
      <main className="p-1 h-screen">
        <ChatApp store={store.chatStore} />
      </main>
    </>
  );
}

function ChatApp(props: { store: Instance<typeof ChatStore> }) {
  return (
    <div className="h-full flex flex-col justify-between">
      <ChatMessagesView store={props.store} />
      <ChatDraftMessageView store={props.store} />
    </div>
  );
}
