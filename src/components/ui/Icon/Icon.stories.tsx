import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heart, Plus, Search } from 'lucide-react';
import { Button } from '../Button/Button';
import { Icon } from './Icon';

const meta = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Decorative icon inherits text color and font size from the parent. */
export const DecorativeNextToText: Story = {
  args: {
    icon: Heart,
  },
  render: (args) => (
    <p style={{ margin: 0 }}>
      <Icon {...args} /> Favorited
    </p>
  ),
};

/** Sizing scales with the surrounding font size (default `1em`). */
export const InheritedFontSize: Story = {
  args: {
    icon: Search,
  },
  render: (args) => (
    <div style={{ fontSize: '2rem', lineHeight: 1 }}>
      <Icon {...args} />
    </div>
  ),
};

/** Color inherits text color — apply a `--c-*` token on the parent to re-theme. */
export const TokenColor: Story = {
  args: {
    icon: Plus,
  },
  render: (args) => (
    <div style={{ color: 'var(--c-primary)', fontSize: '1.5rem', lineHeight: 1 }}>
      <Icon {...args} />
    </div>
  ),
};

/** Standalone informative icon: label it via `aria-label` (exposed as `role="img"`). */
export const Labeled: Story = {
  args: {
    icon: Search,
    'aria-label': 'Search',
  },
};

/** Icon-only button: the control owns the accessible label, the icon stays decorative. */
export const IconOnlyButton: Story = {
  args: {
    icon: Plus,
  },
  render: (args) => (
    <Button type="button" aria-label="Add item">
      <Icon {...args} />
    </Button>
  ),
};
