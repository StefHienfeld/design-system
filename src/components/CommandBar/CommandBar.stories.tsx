import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CommandBar, CommandBarResult } from './CommandBar';
import { Button } from '../Button/Button';

/* ----------------------------------------------------------------
   Sample data
   ---------------------------------------------------------------- */
const sampleResults: CommandBarResult[] = [
  { key: '1', label: 'TechNova', description: 'CL 520933' },
  { key: '2', label: 'GreenLeaf', description: 'CL 520933' },
  { key: '3', label: 'BlueSky', description: 'CL 520933' },
  { key: '4', label: 'Suydersee', description: 'CL 520933' },
  { key: '5', label: 'Pinnacle Ventures', description: 'CL 520933' },
  { key: '6', label: 'Starlight Tech', description: 'CL 520933' },
  { key: '7', label: 'Acme INC', description: 'CL 520933' },
];

/* ----------------------------------------------------------------
   Helper wrapper for interactive stories
   ---------------------------------------------------------------- */
const CommandBarDemo: React.FC<{
  results?: CommandBarResult[];
  placeholder?: string;
  emptyMessage?: string;
  buttonLabel?: string;
}> = ({
  results = sampleResults,
  placeholder,
  emptyMessage,
  buttonLabel = 'Open Command Bar',
}) => {
  const [open, setOpen] = React.useState(false);
  const [filteredResults, setFilteredResults] =
    React.useState<CommandBarResult[]>(results);

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredResults(results);
      return;
    }
    const lower = query.toLowerCase();
    setFilteredResults(
      results.filter(
        (r) =>
          r.label.toLowerCase().includes(lower) ||
          r.description?.toLowerCase().includes(lower),
      ),
    );
  };

  const handleSelect = (result: CommandBarResult) => {
    console.log('Selected:', result);
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>{buttonLabel}</Button>
      <CommandBar
        open={open}
        onClose={() => setOpen(false)}
        onSearch={handleSearch}
        results={filteredResults}
        onSelect={handleSelect}
        placeholder={placeholder}
        emptyMessage={emptyMessage}
      />
    </>
  );
};

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof CommandBar> = {
  title: 'Components/CommandBar',
  component: CommandBar,
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    placeholder: { control: 'text' },
    emptyMessage: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof CommandBar>;

/* ----------------------------------------------------------------
   Stories
   ---------------------------------------------------------------- */
export const Default: Story = {
  render: () => <CommandBarDemo />,
};

export const WithResults: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open with results</Button>
        <CommandBar
          open={open}
          onClose={() => setOpen(false)}
          results={sampleResults}
          onSelect={(r) => {
            console.log('Selected:', r);
            setOpen(false);
          }}
        />
      </>
    );
  },
};

export const EmptyState: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open empty state</Button>
        <CommandBar
          open={open}
          onClose={() => setOpen(false)}
          results={[]}
          onSearch={() => {}}
          emptyMessage="No policies found"
        />
      </>
    );
  },
};

export const CustomPlaceholder: Story = {
  render: () => (
    <CommandBarDemo
      placeholder="Search policies, clients, or claims..."
      buttonLabel="Custom placeholder"
    />
  ),
};

export const FewResults: Story = {
  render: () => (
    <CommandBarDemo
      results={sampleResults.slice(0, 3)}
      buttonLabel="Open (3 results)"
    />
  ),
};

export const WithIcons: Story = {
  render: () => {
    const customIcon = (
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="1" y="1" width="8" height="8" rx="2" fill="currentColor" />
      </svg>
    );

    const resultsWithIcons: CommandBarResult[] = sampleResults.map((r) => ({
      ...r,
      icon: customIcon,
    }));

    return (
      <CommandBarDemo
        results={resultsWithIcons}
        buttonLabel="Open with custom icons"
      />
    );
  },
};

export const KitchenSink: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <CommandBarDemo buttonLabel="Default" />
      <CommandBarDemo
        results={sampleResults.slice(0, 2)}
        buttonLabel="Few results"
      />
      <CommandBarDemo
        placeholder="Find anything..."
        emptyMessage="Nothing here"
        buttonLabel="Custom text"
      />
    </div>
  ),
};
