import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table } from './Table';
import type { TableColumn } from './Table';

/* ----------------------------------------------------------------
   Sample data types
   ---------------------------------------------------------------- */
interface Employee {
  name: string;
  role: string;
  department: string;
  email: string;
  status: string;
}

interface Product {
  product: string;
  category: string;
  premium: string;
  claims: number;
}

/* ----------------------------------------------------------------
   Sample data
   ---------------------------------------------------------------- */
const employees: Employee[] = [
  { name: 'Jan de Vries', role: 'Underwriter', department: 'Yacht & Specialty', email: 'j.devries@hienfeld.nl', status: 'Active' },
  { name: 'Sophie Bakker', role: 'Claims Handler', department: 'Financial Lines', email: 's.bakker@hienfeld.nl', status: 'Active' },
  { name: 'Thomas Mulder', role: 'Account Manager', department: 'Accident & Travel', email: 't.mulder@hienfeld.nl', status: 'On Leave' },
  { name: 'Lisa Jansen', role: 'Underwriter', department: 'Fine Art & Private', email: 'l.jansen@hienfeld.nl', status: 'Active' },
  { name: 'Mark Visser', role: 'Senior Analyst', department: 'Yacht & Specialty', email: 'm.visser@hienfeld.nl', status: 'Inactive' },
];

const employeeColumns: TableColumn<Employee>[] = [
  { key: 'name', header: 'Name', width: '180px' },
  { key: 'role', header: 'Role' },
  { key: 'department', header: 'Department' },
  { key: 'email', header: 'Email' },
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
              ? '#ecfdf3'
              : row.status === 'On Leave'
                ? '#fffaeb'
                : '#f5f5f5',
          color:
            row.status === 'Active'
              ? '#067647'
              : row.status === 'On Leave'
                ? '#b54708'
                : '#717680',
        }}
      >
        {row.status}
      </span>
    ),
  },
];

const products: Product[] = [
  { product: 'Pleziervaartuig', category: 'Yacht', premium: '€12,500', claims: 3 },
  { product: 'Classic Car', category: 'Yacht', premium: '€8,200', claims: 1 },
  { product: 'Drones', category: 'Yacht', premium: '€3,100', claims: 0 },
];

const productColumns: TableColumn<Product>[] = [
  { key: 'product', header: 'Product' },
  { key: 'category', header: 'Category' },
  { key: 'premium', header: 'Annual Premium', align: 'right' },
  { key: 'claims', header: 'Open Claims', align: 'center' },
];

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof Table<Employee>> = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  args: {
    columns: employeeColumns,
    data: employees,
  },
};

export default meta;
type Story = StoryObj<typeof Table<Employee>>;

/* ----------------------------------------------------------------
   Stories
   ---------------------------------------------------------------- */
export const Default: Story = {};

export const WithCategoryHeader: Story = {
  args: {
    categoryHeader: 'Yacht & Specialty Lines',
  },
};

export const CustomCategoryColor: Story = {
  args: {
    categoryHeader: 'Financial Lines',
    categoryColor: '#32a850',
  },
};

export const Striped: Story = {
  args: {
    striped: true,
  },
};

export const ClickableRows: Story = {
  args: {
    onRowClick: (row: Employee) => alert(`Clicked: ${row.name}`),
  },
};

export const Empty: Story = {
  args: {
    data: [],
    emptyMessage: 'No employees found matching your criteria.',
  },
};

export const ProductTable: StoryObj<typeof Table<Product>> = {
  args: {
    columns: productColumns,
    data: products,
    categoryHeader: 'Yacht & Specialty Lines',
    categoryColor: 'var(--product-yacht-main)',
  },
};

export const KitchenSink: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <Table
        columns={productColumns}
        data={products}
        categoryHeader="Yacht & Specialty Lines"
        categoryColor="var(--product-yacht-main)"
      />
      <Table
        columns={productColumns}
        data={[
          { product: 'AVB', category: 'Financial', premium: '€15,000', claims: 2 },
          { product: 'Cyber', category: 'Financial', premium: '€22,000', claims: 5 },
        ]}
        categoryHeader="Financial Lines"
        categoryColor="var(--product-financial-main)"
        striped
      />
      <Table columns={employeeColumns} data={[]} emptyMessage="No data to display." />
    </div>
  ),
};
