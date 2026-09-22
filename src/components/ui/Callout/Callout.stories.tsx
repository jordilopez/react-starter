import type { Meta, StoryObj } from '@storybook/react-vite';
import { Callout } from './Callout';

const meta = {
  title: 'Components/Callout',
  component: Callout,
  tags: ['autodocs'],
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    tone: 'info',
    title: 'Heads up',
    children: 'A neutral informational callout.',
  },
};

export const Success: Story = {
  args: {
    tone: 'success',
    title: 'Saved',
    children: 'Your changes have been saved.',
  },
};

export const Warning: Story = {
  args: {
    tone: 'warning',
    title: 'Safari only',
    children: (
      <>
        This demo uses an experimental feature. Open in Safari to see the real
        thing.
      </>
    ),
  },
};

export const Error: Story = {
  args: {
    tone: 'error',
    role: 'alert',
    title: 'Something went wrong',
    children: 'The request failed. Please try again.',
  },
};

export const BodyOnly: Story = {
  args: {
    tone: 'info',
    children: 'A callout with no title, just a body message.',
  },
};
