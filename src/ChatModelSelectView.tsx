import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChatStore } from "./data/ChatStore";
import { SelectMenu } from "./components/SelectMenu/SelectMenu";
import { ChangeEvent } from "react";

export const ChatModelSelectView = observer(
  function ChatModelSelectView(props: { store: Instance<typeof ChatStore> }) {
    const available = Array.from(props.store.models?.available ?? []);
    const selected = props.store.models?.selected ?? "";
    const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
      props.store.models.setProp("selected", event.target.value);
    };
    return (
      <SelectMenu
        id="chatmodel"
        name="chatmodel"
        defaultValue={selected}
        options={available}
        label="Model"
        onChange={onChange}
      />
    );
  }
);
