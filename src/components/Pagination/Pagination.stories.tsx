import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination } from './Pagination';

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    currentPage: { control: { type: 'number', min: 1 } },
    totalPages: { control: { type: 'number', min: 1 } },
  },
  args: {
    currentPage: 1,
    totalPages: 10,
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

/* ----------------------------------------------------------------
   Interactive wrapper — keeps page state within the story
   ---------------------------------------------------------------- */
const InteractivePagination = ({
  totalPages,
  initialPage = 1,
}: {
  totalPages: number;
  initialPage?: number;
}) => {
  const [page, setPage] = useState(initialPage);
  return (
    <Pagination
      currentPage={page}
      totalPages={totalPages}
      onPageChange={setPage}
    />
  );
};

/* ----------------------------------------------------------------
   Default (controlled via Storybook controls)
   ---------------------------------------------------------------- */
export const Default: Story = {};

/* ----------------------------------------------------------------
   Interactive — 10 pages, starting at page 1
   ---------------------------------------------------------------- */
export const Interactive: Story = {
  render: () => <InteractivePagination totalPages={10} />,
};

/* ----------------------------------------------------------------
   First page active
   ---------------------------------------------------------------- */
export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
  },
};

/* ----------------------------------------------------------------
   Last page active
   ---------------------------------------------------------------- */
export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
  },
};

/* ----------------------------------------------------------------
   Middle page — shows ellipsis on both sides
   ---------------------------------------------------------------- */
export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
  },
};

/* ----------------------------------------------------------------
   Few pages — no ellipsis needed
   ---------------------------------------------------------------- */
export const FewPages: Story = {
  args: {
    currentPage: 2,
    totalPages: 5,
  },
};

/* ----------------------------------------------------------------
   Single page — both nav buttons disabled
   ---------------------------------------------------------------- */
export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
  },
};

/* ----------------------------------------------------------------
   Many pages — stress test
   ---------------------------------------------------------------- */
export const ManyPages: Story = {
  render: () => <InteractivePagination totalPages={100} initialPage={50} />,
};

/* ----------------------------------------------------------------
   All key states side-by-side
   ---------------------------------------------------------------- */
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: '#717680' }}>
          First page (prev disabled)
        </div>
        <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
      </div>
      <div>
        <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: '#717680' }}>
          Middle page (both ellipses)
        </div>
        <Pagination currentPage={5} totalPages={10} onPageChange={() => {}} />
      </div>
      <div>
        <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: '#717680' }}>
          Last page (next disabled)
        </div>
        <Pagination currentPage={10} totalPages={10} onPageChange={() => {}} />
      </div>
      <div>
        <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: '#717680' }}>
          Few pages (no ellipsis)
        </div>
        <Pagination currentPage={3} totalPages={5} onPageChange={() => {}} />
      </div>
    </div>
  ),
};
