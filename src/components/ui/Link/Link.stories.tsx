import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from './Link';

const meta = {
  title: 'Components/Link',
  component: Link,
  tags: ['autodocs'],
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: 'https://example.com',
    children: 'Default Link',
  },
};

export const Disabled: Story = {
  args: {
    href: 'https://example.com',
    children: 'Disabled',
    disabled: true,
  },
};

export const NewTab: Story = {
  args: {
    href: 'https://example.com',
    children: 'Open in new tab',
    openInNewTab: true,
  },
};
