import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FilterBar } from './FilterBar';
import type { FilterItem } from './FilterBar';

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof FilterBar> = {
  title: 'Components/FilterBar',
  component: FilterBar,
  tags: ['autodocs'],
  argTypes: {
    searchValue: { control: 'text' },
    searchPlaceholder: { control: 'text' },
    onSearchChange: { action: 'searchChange' },
    onRemoveFilter: { action: 'removeFilter' },
    onClearAll: { action: 'clearAll' },
    onFilterClick: { action: 'filterClick' },
  },
  args: {
    searchPlaceholder: 'Search',
  },
};

export default meta;
type Story = StoryObj<typeof FilterBar>;

/* ----------------------------------------------------------------
   Sample filter data
   ---------------------------------------------------------------- */
const SAMPLE_FILTERS: FilterItem[] = [
  { key: 'status', label: 'Status: Active' },
  { key: 'type', label: 'Type: Premium' },
  { key: 'region', label: 'Region: EU' },
];

const MANY_FILTERS: FilterItem[] = [
  { key: 'status', label: 'Filter 1' },
  { key: 'type', label: 'Filter 2' },
  { key: 'region', label: 'Filter 3' },
  { key: 'category', label: 'Filter 4' },
  { key: 'priority', label: 'Filter 5' },
  { key: 'assignee', label: 'Filter 6' },
];

/* ----------------------------------------------------------------
   Default — no active filters
   ---------------------------------------------------------------- */
export const Default: Story = {
  args: {
    searchValue: '',
    filters: [],
  },
};

/* ----------------------------------------------------------------
   With active filters
   ---------------------------------------------------------------- */
export const WithFilters: Story = {
  args: {
    searchValue: '',
    filters: SAMPLE_FILTERS,
  },
};

/* ----------------------------------------------------------------
   With search value and filters
   ---------------------------------------------------------------- */
export const WithSearchAndFilters: Story = {
  args: {
    searchValue: 'marine policy',
    filters: SAMPLE_FILTERS,
  },
};

/* ----------------------------------------------------------------
   Many filters
   ---------------------------------------------------------------- */
export const ManyFilters: Story = {
  args: {
    searchValue: '',
    filters: MANY_FILTERS,
  },
};

/* ----------------------------------------------------------------
   Interactive — stateful example
   ---------------------------------------------------------------- */
const InteractiveTemplate: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const [filters, setFilters] = React.useState<FilterItem[]>(SAMPLE_FILTERS);

  const handleRemoveFilter = (key: string) => {
    setFilters((prev) => prev.filter((f) => f.key !== key));
  };

  const handleClearAll = () => {
    setFilters([]);
  };

  return (
    <FilterBar
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      searchPlaceholder="Search policies..."
      filters={filters}
      onRemoveFilter={handleRemoveFilter}
      onClearAll={handleClearAll}
      onFilterClick={() => alert('Open filter panel')}
    />
  );
};

export const Interactive: Story = {
  render: () => <InteractiveTemplate />,
};

/* ----------------------------------------------------------------
   Single filter
   ---------------------------------------------------------------- */
export const SingleFilter: Story = {
  args: {
    searchValue: '',
    filters: [{ key: 'status', label: 'Status: Active' }],
  },
};

/* ----------------------------------------------------------------
   Custom placeholder
   ---------------------------------------------------------------- */
export const CustomPlaceholder: Story = {
  args: {
    searchValue: '',
    searchPlaceholder: 'Search policies, clients, or claims...',
    filters: [],
  },
};
