import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { BaseTable } from './BaseTable';
import { Table } from '../Table';
import type { TableColumn } from '../Table';
import { Tabs } from '../Tabs';
import { FilterBar } from '../FilterBar';
import { Pagination } from '../Pagination';
import { EmptyState } from '../EmptyState';
import { SelectionBar } from '../SelectionBar';

/* ----------------------------------------------------------------
   Sample data
   ---------------------------------------------------------------- */
interface Policy {
  policyNumber: string;
  holder: string;
  product: string;
  premium: string;
  status: string;
}

const policies: Policy[] = [
  { policyNumber: 'POL-001', holder: 'Jan de Vries', product: 'Pleziervaartuig', premium: '\u20AC12,500', status: 'Active' },
  { policyNumber: 'POL-002', holder: 'Sophie Bakker', product: 'Classic Car', premium: '\u20AC8,200', status: 'Active' },
  { policyNumber: 'POL-003', holder: 'Thomas Mulder', product: 'AVB', premium: '\u20AC15,000', status: 'Pending' },
  { policyNumber: 'POL-004', holder: 'Lisa Jansen', product: 'Cyber', premium: '\u20AC22,000', status: 'Active' },
  { policyNumber: 'POL-005', holder: 'Mark Visser', product: 'Drones', premium: '\u20AC3,100', status: 'Expired' },
  { policyNumber: 'POL-006', holder: 'Anna Smit', product: 'Kunst', premium: '\u20AC45,000', status: 'Active' },
  { policyNumber: 'POL-007', holder: 'Peter de Groot', product: 'Reis', premium: '\u20AC1,800', status: 'Active' },
  { policyNumber: 'POL-008', holder: 'Eva Hendriks', product: 'Fraude & Geld', premium: '\u20AC9,400', status: 'Pending' },
];

const columns: TableColumn<Policy>[] = [
  { key: 'policyNumber', header: 'Policy #', width: '120px' },
  { key: 'holder', header: 'Policyholder' },
  { key: 'product', header: 'Product' },
  { key: 'premium', header: 'Premium', align: 'right' },
  {
    key: 'status',
    header: 'Status',
    align: 'center',
    render: (row) => (
      <span
        style={{
          padding: '2px 10px',
          borderRadius: 9999,
          fontSize: 12,
          fontWeight: 500,
          background:
            row.status === 'Active'
              ? 'var(--color-success-50)'
              : row.status === 'Pending'
                ? 'var(--color-warning-50)'
                : 'var(--color-gray-50)',
          color:
            row.status === 'Active'
              ? 'var(--color-success-700)'
              : row.status === 'Pending'
                ? 'var(--color-warning-700)'
                : 'var(--color-gray-500)',
        }}
      >
        {row.status}
      </span>
    ),
  },
];

const tabItems = [
  { key: 'all', label: 'All policies', count: 24 },
  { key: 'active', label: 'Active', count: 18 },
  { key: 'pending', label: 'Pending', count: 6 },
];

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof BaseTable> = {
  title: 'Components/BaseTable',
  component: BaseTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof BaseTable>;

/* ----------------------------------------------------------------
   Stories
   ---------------------------------------------------------------- */

/** Default table with data, pagination, tabs, and filters. */
export const WithData: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState('all');

    return (
      <BaseTable
        tabs={
          <Tabs items={tabItems} activeKey={activeTab} onChange={setActiveTab} />
        }
        filters={<FilterBar searchPlaceholder="Search policies..." />}
        pagination={
          <Pagination
            currentPage={currentPage}
            totalPages={10}
            onPageChange={setCurrentPage}
          />
        }
      >
        <Table columns={columns} data={policies} />
      </BaseTable>
    );
  },
};

/** Empty state — displayed when there are no results. */
export const Empty: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);

    return (
      <BaseTable
        filters={<FilterBar searchPlaceholder="Search policies..." />}
        pagination={
          <Pagination
            currentPage={currentPage}
            totalPages={1}
            onPageChange={setCurrentPage}
          />
        }
      >
        <EmptyState
          title="No policies found"
          description="Try adjusting your search or filter criteria to find what you're looking for."
          size="lg"
        />
      </BaseTable>
    );
  },
};

/** With tabs and active filters shown. */
export const WithTabsAndFilters: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState([
      { key: 'product', label: 'Product: Yacht' },
      { key: 'status', label: 'Status: Active' },
      { key: 'region', label: 'Region: Noord-Holland' },
    ]);

    return (
      <BaseTable
        tabs={
          <Tabs items={tabItems} activeKey={activeTab} onChange={setActiveTab} />
        }
        filters={
          <FilterBar
            searchPlaceholder="Search policies..."
            filters={filters}
            onRemoveFilter={(key) =>
              setFilters((prev) => prev.filter((f) => f.key !== key))
            }
            onClearAll={() => setFilters([])}
          />
        }
        pagination={
          <Pagination
            currentPage={currentPage}
            totalPages={10}
            onPageChange={setCurrentPage}
          />
        }
      >
        <Table columns={columns} data={policies} />
      </BaseTable>
    );
  },
};

/** With a selection bar overlay — shown when rows are selected. */
export const WithSelectionBar: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCount, setSelectedCount] = useState(3);

    return (
      <BaseTable
        tabs={
          <Tabs items={tabItems} activeKey={activeTab} onChange={setActiveTab} />
        }
        filters={<FilterBar searchPlaceholder="Search policies..." />}
        selection={
          selectedCount > 0 ? (
            <SelectionBar
              count={selectedCount}
              onClose={() => setSelectedCount(0)}
              actions={[
                {
                  key: 'export',
                  label: 'Export',
                  onClick: () => alert('Export clicked'),
                },
                {
                  key: 'renew',
                  label: 'Renew policies',
                  onClick: () => alert('Renew clicked'),
                },
              ]}
            />
          ) : undefined
        }
        pagination={
          <Pagination
            currentPage={currentPage}
            totalPages={10}
            onPageChange={setCurrentPage}
          />
        }
      >
        <Table columns={columns} data={policies} />
      </BaseTable>
    );
  },
};

/** Minimal configuration — just content, no extras. */
export const MinimalContentOnly: Story = {
  render: () => (
    <BaseTable>
      <Table columns={columns} data={policies.slice(0, 3)} />
    </BaseTable>
  ),
};
