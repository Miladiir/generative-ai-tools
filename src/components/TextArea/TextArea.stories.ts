import { Meta, StoryObj } from "@storybook/react";
import { TextArea } from "./TextArea";

const meta = {
    title: 'TextArea',
    component: TextArea,
    parameters: {
      layout: 'centered',
    },
    tags: ['autodocs'],
  } satisfies Meta<typeof TextArea>;
  
  export default meta;
  type Story = StoryObj<typeof meta>;
  
  export const Default: Story = {
    args: {
      placeHolder: "Write something here"
    },
  };