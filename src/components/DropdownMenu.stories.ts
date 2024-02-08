import type { Meta, StoryObj } from '@storybook/react';

import DropdownMenu from './DropdownMenu';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  viewport: {  defaultViewport: 'mobile2', }
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Open: Story = {
  args: {
    open: true,
    label: 'DropdownMenu',
  },
};
export const Normal: Story = {
  args: {
    label: 'DropdownMenu',
  },
};
