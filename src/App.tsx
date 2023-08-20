import { Instance } from "mobx-state-tree";
import { ChatStore } from "./data/ChatStore";
import { RootStore } from "./data/RootStore";
import { ChatDraftMessageView } from "./ChatDraftMessageView";
import { ChatMessagesView } from "./ChatMessagesView";
import { ChatModelSelectView } from "./ChatModelSelectView";

export function App() {
  const store = RootStore.create({});
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-explicit-any
  (window as any).store = store;
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
      <div className="flex flex-col overflow-scroll">
        <ChatModelSelectView store={props.store} />
        <ChatMessagesView store={props.store} />
      </div>
      <ChatDraftMessageView store={props.store} />
    </div>
  );
}
