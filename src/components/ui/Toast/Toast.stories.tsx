import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast } from './Toast';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    role: 'status',
    children: 'Default toast',
    autoCloseSeconds: 0,
  },
};

export const AutoClose: Story = {
  args: {
    role: 'status',
    children: 'This toast closes itself after 1 second',
    autoCloseSeconds: 1,
  },
};
