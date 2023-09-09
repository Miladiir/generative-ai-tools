import { StoryObj } from "@storybook/react";
import { ChatMessagesView } from "./ChatMessagesView";
import { chatStoreMock } from "./data/ChatStore.mock";

const meta = {
  title: "ChatMessagesView",
  component: ChatMessagesView,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}; /*satisfies Meta<typeof ChatMessagesView>*/

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    store: chatStoreMock,
  },
};
