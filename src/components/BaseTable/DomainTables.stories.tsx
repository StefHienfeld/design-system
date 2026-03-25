import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { BaseTable } from './BaseTable';
import { Table } from '../Table';
import type { TableColumn } from '../Table';
import { Tabs } from '../Tabs';
import { FilterBar } from '../FilterBar';
import { Pagination } from '../Pagination';
import { Badge } from '../Badge';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { Dropdown } from '../Dropdown';
import { Menu, MenuItem, MenuDivider } from '../Menu';
import { PageLayout } from '../PageLayout';
import { PageHeader } from '../PageHeader';
import { SidebarAdmin } from '../SidebarAdmin';
import type { SidebarAdminSection } from '../SidebarAdmin';
import { Logo } from '../Logo';

/* ================================================================
   Inline SVG Icons (20px)
   ================================================================ */

const EditIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M14.1667 2.49998C14.3856 2.28111 14.6454 2.10749 14.9314 1.98903C15.2173 1.87057 15.5238 1.80957 15.8334 1.80957C16.1429 1.80957 16.4494 1.87057 16.7353 1.98903C17.0213 2.10749 17.2812 2.28111 17.5 2.49998C17.7189 2.71886 17.8925 2.97869 18.011 3.26466C18.1294 3.55063 18.1904 3.85713 18.1904 4.16665C18.1904 4.47617 18.1294 4.78267 18.011 5.06864C17.8925 5.35461 17.7189 5.61445 17.5 5.83332L6.25 17.0833L1.66667 18.3333L2.91667 13.75L14.1667 2.49998Z"
      stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

const TrashIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M2.5 5H4.16667M4.16667 5H17.5M4.16667 5V16.6667C4.16667 17.1087 4.34226 17.5326 4.65482 17.8452C4.96738 18.1577 5.39131 18.3333 5.83333 18.3333H14.1667C14.6087 18.3333 15.0326 18.1577 15.3452 17.8452C15.6577 17.5326 15.8333 17.1087 15.8333 16.6667V5M6.66667 5V3.33333C6.66667 2.89131 6.84226 2.46738 7.15482 2.15482C7.46738 1.84226 7.89131 1.66667 8.33333 1.66667H11.6667C12.1087 1.66667 12.5326 1.84226 12.8452 2.15482C13.1577 2.46738 13.3333 2.89131 13.3333 3.33333V5"
      stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

const EyeIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M0.833328 10C0.833328 10 4.16666 3.33334 9.99999 3.33334C15.8333 3.33334 19.1667 10 19.1667 10C19.1667 10 15.8333 16.6667 9.99999 16.6667C4.16666 16.6667 0.833328 10 0.833328 10Z"
      stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"
    />
    <path
      d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
      stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

const PlusIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M10 4.16667V15.8333M4.16667 10H15.8333" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ClipboardCheckIcon = (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13.3333 3.33333H14.1667C14.6087 3.33333 15.0326 3.50893 15.3452 3.82149C15.6577 4.13405 15.8333 4.55797 15.8333 5V16.6667C15.8333 17.1087 15.6577 17.5326 15.3452 17.8452C15.0326 18.1577 14.6087 18.3333 14.1667 18.3333H5.83333C5.39131 18.3333 4.96738 18.1577 4.65482 17.8452C4.34226 17.5326 4.16667 17.1087 4.16667 16.6667V5C4.16667 4.55797 4.34226 4.13405 4.65482 3.82149C4.96738 3.50893 5.39131 3.33333 5.83333 3.33333H6.66667M7.5 10L9.16667 11.6667L12.5 8.33333M7.5 5.83333H12.5C12.9602 5.83333 13.3333 5.46024 13.3333 5V3.33333C13.3333 2.8731 12.9602 2.5 12.5 2.5H7.5C7.03976 2.5 6.66667 2.8731 6.66667 3.33333V5C6.66667 5.46024 7.03976 5.83333 7.5 5.83333Z"
      stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

const ClockIcon = (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 5V10L13.3333 11.6667M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z"
      stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

const BuildingIcon = (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.33333 17.5H16.6667M5 17.5V4.16667C5 3.72464 5.17559 3.30072 5.48816 2.98816C5.80072 2.67559 6.22464 2.5 6.66667 2.5H13.3333C13.7754 2.5 14.1993 2.67559 14.5118 2.98816C14.8244 3.30072 15 3.72464 15 4.16667V17.5M8.33333 6.66667H8.34167M11.6667 6.66667H11.675M8.33333 10H8.34167M11.6667 10H11.675M8.33333 13.3333H8.34167M11.6667 13.3333H11.675"
      stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

const ShieldIcon = (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 18.3333C10 18.3333 16.6667 15 16.6667 10V4.16667L10 1.66667L3.33333 4.16667V10C3.33333 15 10 18.3333 10 18.3333Z"
      stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

const FileIcon = (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.6667 2.5H5.83333C5.39131 2.5 4.96738 2.67559 4.65482 2.98816C4.34226 3.30072 4.16667 3.72464 4.16667 4.16667V15.8333C4.16667 16.2754 4.34226 16.6993 4.65482 17.0118C4.96738 17.3244 5.39131 17.5 5.83333 17.5H14.1667C14.6087 17.5 15.0326 17.3244 15.3452 17.0118C15.6577 16.6993 15.8333 16.2754 15.8333 15.8333V6.66667L11.6667 2.5Z"
      stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"
    />
    <path
      d="M11.6667 2.5V6.66667H15.8333"
      stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

/* ================================================================
   1. TASKS TABLE — Data & Columns
   ================================================================ */

interface Task {
  id: string;
  name: string;
  assignee: string;
  assigneeAvatar: string;
  status: 'In Progress' | 'Done' | 'Pending';
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
}

const tasksData: Task[] = [
  { id: '1', name: 'Review underwriting guidelines', assignee: 'Jan de Vries', assigneeAvatar: 'https://i.pravatar.cc/40?u=jan', status: 'In Progress', priority: 'High', dueDate: '2026-03-28' },
  { id: '2', name: 'Update policy template v2.1', assignee: 'Sophie Bakker', assigneeAvatar: 'https://i.pravatar.cc/40?u=sophie', status: 'Done', priority: 'Medium', dueDate: '2026-03-22' },
  { id: '3', name: 'Prepare quarterly risk report', assignee: 'Thomas Mulder', assigneeAvatar: 'https://i.pravatar.cc/40?u=thomas', status: 'Pending', priority: 'High', dueDate: '2026-04-01' },
  { id: '4', name: 'Client onboarding: BlueSky Marine', assignee: 'Lisa Jansen', assigneeAvatar: 'https://i.pravatar.cc/40?u=lisa', status: 'In Progress', priority: 'Medium', dueDate: '2026-03-30' },
  { id: '5', name: 'Claims processing for POL-892', assignee: 'Mark Visser', assigneeAvatar: 'https://i.pravatar.cc/40?u=mark', status: 'Pending', priority: 'Low', dueDate: '2026-04-05' },
  { id: '6', name: 'Compliance audit documentation', assignee: 'Anna Smit', assigneeAvatar: 'https://i.pravatar.cc/40?u=anna', status: 'In Progress', priority: 'High', dueDate: '2026-03-26' },
  { id: '7', name: 'Renew broker agreement', assignee: 'Peter de Groot', assigneeAvatar: 'https://i.pravatar.cc/40?u=peter', status: 'Done', priority: 'Low', dueDate: '2026-03-20' },
  { id: '8', name: 'Update premium calculations', assignee: 'Eva Hendriks', assigneeAvatar: 'https://i.pravatar.cc/40?u=eva', status: 'Pending', priority: 'Medium', dueDate: '2026-04-10' },
];

const statusBadgeColor = (status: Task['status']) => {
  switch (status) {
    case 'In Progress': return 'blue' as const;
    case 'Done': return 'success' as const;
    case 'Pending': return 'warning' as const;
  }
};

const priorityBadgeColor = (priority: Task['priority']) => {
  switch (priority) {
    case 'High': return 'error' as const;
    case 'Medium': return 'orange' as const;
    case 'Low': return 'gray' as const;
  }
};

const tasksTabs = [
  { key: 'all', label: 'All', count: 8 },
  { key: 'active', label: 'Active', count: 5 },
  { key: 'completed', label: 'Completed', count: 3 },
];

/* ================================================================
   2. POLICIES TABLE — Data & Columns
   ================================================================ */

interface Policy {
  id: string;
  policyNumber: string;
  companyName: string;
  product: string;
  status: 'Active' | 'Expired' | 'Draft';
  premium: string;
  startDate: string;
}

const policiesData: Policy[] = [
  { id: '1', policyNumber: 'POL-2026-001', companyName: 'TechNova Solutions B.V.', product: 'Cyber', status: 'Active', premium: '\u20AC22,500', startDate: '2026-01-15' },
  { id: '2', policyNumber: 'POL-2026-002', companyName: 'GreenLeaf Industries', product: 'AVB', status: 'Active', premium: '\u20AC15,800', startDate: '2026-02-01' },
  { id: '3', policyNumber: 'POL-2025-089', companyName: 'BlueSky Marine B.V.', product: 'Pleziervaartuig', status: 'Expired', premium: '\u20AC31,200', startDate: '2025-03-10' },
  { id: '4', policyNumber: 'POL-2026-003', companyName: 'Pinnacle Ventures', product: 'Kunst', status: 'Draft', premium: '\u20AC45,000', startDate: '2026-03-01' },
  { id: '5', policyNumber: 'POL-2026-004', companyName: 'Suydersee Logistics', product: 'Classic Car', status: 'Active', premium: '\u20AC8,750', startDate: '2026-01-20' },
  { id: '6', policyNumber: 'POL-2026-005', companyName: 'Starlight Tech', product: 'Drones', status: 'Active', premium: '\u20AC4,300', startDate: '2026-02-15' },
  { id: '7', policyNumber: 'POL-2025-092', companyName: 'Maritime Holdings', product: 'Reis', status: 'Expired', premium: '\u20AC2,100', startDate: '2025-06-01' },
  { id: '8', policyNumber: 'POL-2026-006', companyName: 'Horizon Finance Group', product: 'Fraude & Geld', status: 'Draft', premium: '\u20AC9,600', startDate: '2026-03-20' },
];

const productBadgeColor = (product: string) => {
  switch (product) {
    case 'Cyber': return 'purple' as const;
    case 'AVB': return 'blue' as const;
    case 'Pleziervaartuig': return 'blue-light' as const;
    case 'Kunst': return 'pink' as const;
    case 'Classic Car': return 'orange' as const;
    case 'Drones': return 'indigo' as const;
    case 'Reis': return 'brand' as const;
    case 'Fraude & Geld': return 'error' as const;
    default: return 'gray' as const;
  }
};

const policyStatusColor = (status: Policy['status']) => {
  switch (status) {
    case 'Active': return 'success' as const;
    case 'Expired': return 'error' as const;
    case 'Draft': return 'gray' as const;
  }
};

const policiesTabs = [
  { key: 'all', label: 'All', count: 24 },
  { key: 'stock', label: 'Stock', count: 16 },
  { key: 'rent', label: 'Rent', count: 8 },
];

/* ================================================================
   3. POLICY OBJECTS TABLE — Data & Columns
   ================================================================ */

interface PolicyObject {
  id: string;
  name: string;
  cinNumber: string;
  yearBuilt: string;
  brand: string;
  type: string;
  value: string;
}

const policyObjectsData: PolicyObject[] = [
  { id: '1', name: 'Zephyr II', cinNumber: 'NLD-2019-84521', yearBuilt: '2019', brand: 'Beneteau', type: 'Sailboat', value: '\u20AC185,000' },
  { id: '2', name: 'Windchaser', cinNumber: 'NLD-2021-33107', yearBuilt: '2021', brand: 'Bavaria', type: 'Motor yacht', value: '\u20AC320,000' },
  { id: '3', name: 'De Vrijheid', cinNumber: 'NLD-2015-67234', yearBuilt: '2015', brand: 'Linssen', type: 'Steel cruiser', value: '\u20AC245,000' },
  { id: '4', name: 'Noordster', cinNumber: 'NLD-2022-11890', yearBuilt: '2022', brand: 'Contest', type: 'Sailboat', value: '\u20AC410,000' },
  { id: '5', name: 'Stormvogel', cinNumber: 'NLD-2018-55642', yearBuilt: '2018', brand: 'Jeanneau', type: 'Sailboat', value: '\u20AC158,000' },
  { id: '6', name: 'Aqua Bella', cinNumber: 'NLD-2020-99201', yearBuilt: '2020', brand: 'Princess', type: 'Motor yacht', value: '\u20AC520,000' },
];

/* ================================================================
   4. POLICY USERS TABLE — Data & Columns
   ================================================================ */

interface PolicyUser {
  id: string;
  name: string;
  avatar: string;
  email: string;
  lastOnline: string;
  created: string;
  role: 'Admin' | 'Editor';
  status: 'Active' | 'Invited';
}

const policyUsersData: PolicyUser[] = [
  { id: '1', name: 'James Fletcher', avatar: 'https://i.pravatar.cc/40?u=james', email: 'j.fletcher@hienfeld.nl', lastOnline: '2 hours ago', created: 'Jan 12, 2026', role: 'Admin', status: 'Active' },
  { id: '2', name: 'Maria van Dijk', avatar: 'https://i.pravatar.cc/40?u=maria', email: 'm.vandijk@hienfeld.nl', lastOnline: '5 min ago', created: 'Feb 3, 2026', role: 'Editor', status: 'Active' },
  { id: '3', name: 'Bas Koenders', avatar: 'https://i.pravatar.cc/40?u=bas', email: 'b.koenders@hienfeld.nl', lastOnline: 'Yesterday', created: 'Nov 8, 2025', role: 'Editor', status: 'Active' },
  { id: '4', name: 'Sophie Bakker', avatar: 'https://i.pravatar.cc/40?u=sophie-b', email: 's.bakker@hienfeld.nl', lastOnline: 'Never', created: 'Mar 18, 2026', role: 'Editor', status: 'Invited' },
  { id: '5', name: 'Willem de Boer', avatar: 'https://i.pravatar.cc/40?u=willem', email: 'w.deboer@hienfeld.nl', lastOnline: '3 days ago', created: 'Dec 1, 2025', role: 'Admin', status: 'Active' },
  { id: '6', name: 'Anouk Vermeer', avatar: 'https://i.pravatar.cc/40?u=anouk', email: 'a.vermeer@hienfeld.nl', lastOnline: 'Never', created: 'Mar 22, 2026', role: 'Editor', status: 'Invited' },
];

/* ================================================================
   5. FULL PAGE COMPOSITION — Sidebar data
   ================================================================ */

const sidebarSections: SidebarAdminSection[] = [
  {
    items: [
      { key: 'tasks', label: 'Tasks', icon: ClipboardCheckIcon, count: 3, active: true },
      { key: 'changelog', label: 'Changelog', icon: ClockIcon },
      { key: 'companies', label: 'Companies', icon: BuildingIcon },
      { key: 'policies', label: 'Policies', icon: ShieldIcon },
      { key: 'rule-templates', label: 'Rule templates', icon: FileIcon },
    ],
  },
  {
    label: 'Recent Policies',
    items: [
      { key: 'technova', label: 'TechNova', badge: 'CL 520933', dot: true },
      { key: 'greenleaf', label: 'GreenLeaf', badge: 'CL 678123', dot: true },
      { key: 'bluesky', label: 'BlueSky', badge: 'CL 987456', dot: true },
    ],
  },
];

const sidebarUser = {
  name: 'James Fletcher',
  email: 'j.fletcher@hienfeld.nl',
  avatar: 'https://i.pravatar.cc/80?u=james-fletcher',
};

/* ================================================================
   Storybook Meta
   ================================================================ */

const meta: Meta<typeof BaseTable> = {
  title: 'Compositions/DomainTables',
  component: BaseTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof BaseTable>;

/* ================================================================
   Story 1: Tasks Table
   ================================================================ */

/** Tasks table with checkbox selection, avatar assignees, status/priority badges, and action buttons. Includes Tabs (All/Active/Completed) and FilterBar. */
export const TasksTable: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [checked, setChecked] = useState<Record<string, boolean>>({});

    const toggleCheck = (id: string) =>
      setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

    const tasksColumns: TableColumn<Task>[] = [
      {
        key: 'name',
        header: 'Task name',
        width: '280px',
        render: (row) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Checkbox
              size="sm"
              checked={!!checked[row.id]}
              onChange={() => toggleCheck(row.id)}
            />
            <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
              {row.name}
            </span>
          </div>
        ),
      },
      {
        key: 'assignee',
        header: 'Assignee',
        width: '180px',
        render: (row) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Avatar src={row.assigneeAvatar} name={row.assignee} size="xs" />
            <span>{row.assignee}</span>
          </div>
        ),
      },
      {
        key: 'status',
        header: 'Status',
        width: '130px',
        render: (row) => (
          <Badge size="sm" color={statusBadgeColor(row.status)} dot>
            {row.status}
          </Badge>
        ),
      },
      {
        key: 'priority',
        header: 'Priority',
        width: '110px',
        render: (row) => (
          <Badge size="sm" color={priorityBadgeColor(row.priority)} type="pill-outline">
            {row.priority}
          </Badge>
        ),
      },
      {
        key: 'dueDate',
        header: 'Due date',
        width: '120px',
        render: (row) => (
          <span style={{ color: 'var(--text-tertiary)' }}>{row.dueDate}</span>
        ),
      },
      {
        key: 'actions',
        header: '',
        width: '100px',
        align: 'right',
        render: () => (
          <div style={{ display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
            <Button size="sm" hierarchy="tertiary" iconOnly iconLeading={EyeIcon} aria-label="View" />
            <Button size="sm" hierarchy="tertiary" iconOnly iconLeading={EditIcon} aria-label="Edit" />
          </div>
        ),
      },
    ];

    return (
      <BaseTable
        tabs={
          <Tabs items={tasksTabs} activeKey={activeTab} onChange={setActiveTab} />
        }
        filters={<FilterBar searchPlaceholder="Search tasks..." />}
        pagination={
          <Pagination
            currentPage={currentPage}
            totalPages={5}
            onPageChange={setCurrentPage}
          />
        }
      >
        <Table columns={tasksColumns} data={tasksData} />
      </BaseTable>
    );
  },
};

/* ================================================================
   Story 2: Policies Table
   ================================================================ */

/** Insurance policies table with product color badges, status indicators, and premium amounts. Includes Tabs (All/Stock/Rent). */
export const PoliciesTable: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);

    const policiesColumns: TableColumn<Policy>[] = [
      {
        key: 'policyNumber',
        header: 'Policy #',
        width: '150px',
        render: (row) => (
          <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
            {row.policyNumber}
          </span>
        ),
      },
      {
        key: 'companyName',
        header: 'Company name',
        render: (row) => row.companyName,
      },
      {
        key: 'product',
        header: 'Product',
        width: '160px',
        render: (row) => (
          <Badge size="sm" color={productBadgeColor(row.product)}>
            {row.product}
          </Badge>
        ),
      },
      {
        key: 'status',
        header: 'Status',
        width: '110px',
        render: (row) => (
          <Badge size="sm" color={policyStatusColor(row.status)} dot>
            {row.status}
          </Badge>
        ),
      },
      {
        key: 'premium',
        header: 'Premium',
        width: '120px',
        align: 'right',
        render: (row) => (
          <span style={{ fontWeight: 500 }}>{row.premium}</span>
        ),
      },
      {
        key: 'startDate',
        header: 'Start date',
        width: '120px',
        render: (row) => (
          <span style={{ color: 'var(--text-tertiary)' }}>{row.startDate}</span>
        ),
      },
    ];

    return (
      <BaseTable
        tabs={
          <Tabs items={policiesTabs} activeKey={activeTab} onChange={setActiveTab} />
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
        <Table columns={policiesColumns} data={policiesData} />
      </BaseTable>
    );
  },
};

/* ================================================================
   Story 3: Policy Objects Table (Boats)
   ================================================================ */

/** Insured objects (boats) table with vessel details. No tabs — filter bar only. */
export const PolicyObjectsTable: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);

    const objectsColumns: TableColumn<PolicyObject>[] = [
      {
        key: 'name',
        header: 'Name',
        width: '150px',
        render: (row) => (
          <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
            {row.name}
          </span>
        ),
      },
      {
        key: 'cinNumber',
        header: 'CIN number',
        width: '180px',
        render: (row) => (
          <span style={{ fontFamily: 'var(--font-family-mono, monospace)', fontSize: 13 }}>
            {row.cinNumber}
          </span>
        ),
      },
      {
        key: 'yearBuilt',
        header: 'Year built',
        width: '100px',
        align: 'center',
      },
      {
        key: 'brand',
        header: 'Brand',
        width: '130px',
      },
      {
        key: 'type',
        header: 'Type',
        width: '140px',
        render: (row) => (
          <Badge size="sm" color="gray-blue" type="pill-outline">
            {row.type}
          </Badge>
        ),
      },
      {
        key: 'value',
        header: 'Value',
        width: '130px',
        align: 'right',
        render: (row) => (
          <span style={{ fontWeight: 500 }}>{row.value}</span>
        ),
      },
    ];

    return (
      <BaseTable
        filters={<FilterBar searchPlaceholder="Search objects..." />}
        pagination={
          <Pagination
            currentPage={currentPage}
            totalPages={3}
            onPageChange={setCurrentPage}
          />
        }
      >
        <Table columns={objectsColumns} data={policyObjectsData} />
      </BaseTable>
    );
  },
};

/* ================================================================
   Story 4: Policy Users Table
   ================================================================ */

/** Users table with avatars, role/status badges, and an action dropdown menu per row. */
export const PolicyUsersTable: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);

    const usersColumns: TableColumn<PolicyUser>[] = [
      {
        key: 'name',
        header: 'Name',
        width: '200px',
        render: (row) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Avatar src={row.avatar} name={row.name} size="sm" online={row.status === 'Active'} />
            <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
              {row.name}
            </span>
          </div>
        ),
      },
      {
        key: 'email',
        header: 'Email',
        render: (row) => (
          <span style={{ color: 'var(--text-tertiary)' }}>{row.email}</span>
        ),
      },
      {
        key: 'lastOnline',
        header: 'Last online',
        width: '130px',
        render: (row) => (
          <span style={{ color: 'var(--text-tertiary)' }}>{row.lastOnline}</span>
        ),
      },
      {
        key: 'created',
        header: 'Created',
        width: '130px',
        render: (row) => (
          <span style={{ color: 'var(--text-tertiary)' }}>{row.created}</span>
        ),
      },
      {
        key: 'role',
        header: 'Role',
        width: '100px',
        render: (row) => (
          <Badge
            size="sm"
            color={row.role === 'Admin' ? 'purple' : 'blue'}
            type="pill-outline"
          >
            {row.role}
          </Badge>
        ),
      },
      {
        key: 'status',
        header: 'Status',
        width: '100px',
        render: (row) => (
          <Badge
            size="sm"
            color={row.status === 'Active' ? 'success' : 'warning'}
            dot
          >
            {row.status}
          </Badge>
        ),
      },
      {
        key: 'actions',
        header: '',
        width: '60px',
        align: 'right',
        render: (row) => (
          <Dropdown trigger="icon">
            <Menu width={200}>
              <MenuItem icon={EyeIcon} label="View profile" onClick={() => {}} />
              <MenuItem icon={EditIcon} label="Edit user" onClick={() => {}} />
              <MenuDivider />
              <MenuItem icon={TrashIcon} label="Remove user" onClick={() => {}} />
            </Menu>
          </Dropdown>
        ),
      },
    ];

    return (
      <BaseTable
        filters={<FilterBar searchPlaceholder="Search users..." />}
        pagination={
          <Pagination
            currentPage={currentPage}
            totalPages={4}
            onPageChange={setCurrentPage}
          />
        }
      >
        <Table columns={usersColumns} data={policyUsersData} />
      </BaseTable>
    );
  },
};

/* ================================================================
   Story 5: Full Page Composition
   ================================================================ */

/** Complete page layout with SidebarAdmin, PageHeader, and the Tasks BaseTable, demonstrating a realistic admin application view. */
export const FullPageComposition: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => {
    const [activeTab, setActiveTab] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [checked, setChecked] = useState<Record<string, boolean>>({});

    const toggleCheck = (id: string) =>
      setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

    const tasksColumns: TableColumn<Task>[] = [
      {
        key: 'name',
        header: 'Task name',
        width: '280px',
        render: (row) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Checkbox
              size="sm"
              checked={!!checked[row.id]}
              onChange={() => toggleCheck(row.id)}
            />
            <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
              {row.name}
            </span>
          </div>
        ),
      },
      {
        key: 'assignee',
        header: 'Assignee',
        width: '180px',
        render: (row) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Avatar src={row.assigneeAvatar} name={row.assignee} size="xs" />
            <span>{row.assignee}</span>
          </div>
        ),
      },
      {
        key: 'status',
        header: 'Status',
        width: '130px',
        render: (row) => (
          <Badge size="sm" color={statusBadgeColor(row.status)} dot>
            {row.status}
          </Badge>
        ),
      },
      {
        key: 'priority',
        header: 'Priority',
        width: '110px',
        render: (row) => (
          <Badge size="sm" color={priorityBadgeColor(row.priority)} type="pill-outline">
            {row.priority}
          </Badge>
        ),
      },
      {
        key: 'dueDate',
        header: 'Due date',
        width: '120px',
        render: (row) => (
          <span style={{ color: 'var(--text-tertiary)' }}>{row.dueDate}</span>
        ),
      },
      {
        key: 'actions',
        header: '',
        width: '100px',
        align: 'right',
        render: () => (
          <div style={{ display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
            <Button size="sm" hierarchy="tertiary" iconOnly iconLeading={EyeIcon} aria-label="View" />
            <Button size="sm" hierarchy="tertiary" iconOnly iconLeading={EditIcon} aria-label="Edit" />
          </div>
        ),
      },
    ];

    return (
      <PageLayout
        sidebar={
          <SidebarAdmin
            logo={<Logo width={74} />}
            sections={sidebarSections}
            user={sidebarUser}
            onSearch={() => {}}
            onToggleCollapse={() => {}}
          />
        }
        header={
          <PageHeader
            title="Tasks"
            description="Manage and track all your team tasks in one place."
            actions={
              <Button size="md" hierarchy="primary" iconLeading={PlusIcon}>
                Add task
              </Button>
            }
          />
        }
      >
        <BaseTable
          tabs={
            <Tabs items={tasksTabs} activeKey={activeTab} onChange={setActiveTab} />
          }
          filters={<FilterBar searchPlaceholder="Search tasks..." />}
          pagination={
            <Pagination
              currentPage={currentPage}
              totalPages={5}
              onPageChange={setCurrentPage}
            />
          }
        >
          <Table columns={tasksColumns} data={tasksData} />
        </BaseTable>
      </PageLayout>
    );
  },
};
