import { Meta, StoryObj } from "@storybook/react";
import { SelectMenu } from "./SelectMenu";

const meta = {
  title: "SelectMenu",
  component: SelectMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SelectMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "test",
    id: "test",
    defaultValue: "Default Value",
    options: ["Test Value", "Default Value", "123"],
    label: "Test"
  },
};
