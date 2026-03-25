import { useState } from 'react';
import {
  Alert,
  Notification,
  LoadingIndicator,
  EmptyState,
  ContentDivider,
  PaginationDotGroup,
  Pagination,
  SelectionBar,
  Badge,
  Button,
  Avatar,
  Logo,
  Tabs,
  VerticalTabs,
  Breadcrumb,
  NavItemBase,
  CommandBar,
  FilterBar,
  DatePicker,
  FileUpload,
  ProgressSteps,
  MetricItem,
  FeedItem,
  InlineCTA,
  ActivityGauge,
  Chart,
  ViolationItem,
  ObjectItemCard,
  CardHeader,
  SectionHeader,
  SectionFooter,
  PageHeader,
  FlowHeader,
  Header,
  SlideoutMenu,
  Modal,
  Table,
  BaseTable,
  InputField,
  ItemsSidebar,
  SidebarAdmin,
} from './components';
import type { TableColumn } from './components';
import './ShowcasePart2.css';

/* ── SVG Icons ── */
const IconSearch = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
const IconPlus = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>;
const IconShield = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const IconClipboard = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>;
const IconClock = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IconBuilding = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>;
const IconAnchor = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="3"/><line x1="12" x2="12" y1="22" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></svg>;
const IconDollar = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;

/* ── Helpers ── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="s2-section">
      <h2 className="s2-section__title">{title}</h2>
      <div className="s2-section__content">{children}</div>
    </section>
  );
}

function Sub({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="s2-sub">
      <div className="s2-sub__label">{label}</div>
      {children}
    </div>
  );
}

/* ── Sample table data ── */
const tableData = [
  { id: '1', name: 'TechNova B.V.', policy: 'CL 520933', product: 'Pleziervaartuig', status: 'Active', premium: '€ 2.450' },
  { id: '2', name: 'GreenLeaf Corp', policy: 'CL 678123', product: 'Cyber', status: 'Active', premium: '€ 5.120' },
  { id: '3', name: 'BlueSky Holdings', policy: 'CL 987456', product: 'Classic Car', status: 'Expired', premium: '€ 1.890' },
  { id: '4', name: 'Suydersee Int.', policy: 'CL 123789', product: 'AVB', status: 'Draft', premium: '€ 3.200' },
];

const tableCols: TableColumn<typeof tableData[0]>[] = [
  { key: 'name', header: 'Company' },
  { key: 'policy', header: 'Policy Nr.' },
  { key: 'product', header: 'Product', render: (r) => <Badge size="sm" color="brand">{r.product}</Badge> },
  { key: 'status', header: 'Status', render: (r) => <Badge size="sm" color={r.status === 'Active' ? 'success' : r.status === 'Expired' ? 'error' : 'gray'} dot>{r.status}</Badge> },
  { key: 'premium', header: 'Premium', align: 'right' },
];

/* ── MAIN ── */
export function ShowcasePart2() {
  const [tab, setTab] = useState('details');
  const [vTab, setVTab] = useState('details');
  const [page, setPage] = useState(3);
  const [dot, setDot] = useState(1);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [slideOpen, setSlideOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState(1);

  const tabs = [
    { key: 'details', label: 'My details' },
    { key: 'profile', label: 'Profile' },
    { key: 'password', label: 'Password' },
    { key: 'team', label: 'Team' },
    { key: 'notif', label: 'Notifications', count: 2 },
  ];

  return (
    <div className="s2">
      {/* ═══ HERO ═══ */}
      <div className="s2-hero">
        <div className="s2-hero__content">
          <Logo variant="on-dark" width={140} />
          <h1 className="s2-hero__title">Design System — Part 2</h1>
          <p className="s2-hero__subtitle">Composed components built with Part 1 primitives</p>
          <div className="s2-hero__stats">
            <div className="s2-hero__stat"><strong>35</strong>new</div>
            <div className="s2-hero__stat"><strong>3</strong>enhanced</div>
            <div className="s2-hero__stat"><strong>5</strong>compositions</div>
          </div>
        </div>
      </div>

      <div className="s2-body">

        {/* ═══════ 1. ALERTS ═══════ */}
        <Section title="Alerts">
          <Sub label="Floating">
            <div className="s2-card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Alert color="brand" size="floating" title="Update available" description="A new version of the platform is available." />
              <Alert color="success" size="floating" title="Policy approved" description="CL 520933 has been approved successfully." />
              <Alert color="error" size="floating" title="Validation failed" description="3 required fields are missing." />
              <Alert color="warning" size="floating" title="Expiring soon" description="This policy expires in 7 days." />
            </div>
          </Sub>
          <Sub label="Full Width">
            <Alert color="brand" size="full-width" title="Scheduled maintenance" description="The platform will be briefly unavailable on March 28." />
          </Sub>
        </Section>

        {/* ═══════ 2. NOTIFICATIONS ═══════ */}
        <Section title="Notifications">
          <div className="s2-grid-2">
            <Notification type="success" title="Policy published" description="CL 520933 is now active." onClose={() => {}} />
            <Notification type="error" title="Upload failed" description="File exceeds the 10MB limit." onClose={() => {}} />
            <Notification type="progress" title="Uploading documents..." description="3 of 5 files" progress={60} onClose={() => {}} />
            <Notification type="warning" title="Incomplete data" description="Some fields need attention." onClose={() => {}} />
          </div>
        </Section>

        {/* ═══════ 3. LOADING & EMPTY ═══════ */}
        <Section title="Loading & Empty States">
          <Sub label="Loading Indicator">
            <div className="s2-card s2-row s2-row--center" style={{ gap: 32 }}>
              <LoadingIndicator size="sm" />
              <LoadingIndicator size="md" label="Loading..." />
              <LoadingIndicator size="lg" label="Loading data..." />
              <LoadingIndicator size="xl" label="Please wait..." />
            </div>
          </Sub>
          <Sub label="Empty State">
            <div className="s2-card" style={{ display: 'flex', justifyContent: 'center' }}>
              <EmptyState
                size="md"
                icon={IconSearch}
                title="No policies found"
                description="Your search did not match any policies. Try adjusting your filters."
                actions={<><Button hierarchy="secondary">Clear search</Button><Button>New policy</Button></>}
              />
            </div>
          </Sub>
        </Section>

        {/* ═══════ 4. TABS ═══════ */}
        <Section title="Horizontal Tabs">
          <div className="s2-card" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div><div className="s2-tiny-label">Underline</div><Tabs items={tabs} activeKey={tab} onChange={setTab} type="underline" /></div>
            <div><div className="s2-tiny-label">Button Brand</div><Tabs items={tabs} activeKey={tab} onChange={setTab} type="button-brand" /></div>
            <div><div className="s2-tiny-label">Button Gray</div><Tabs items={tabs} activeKey={tab} onChange={setTab} type="button-gray" /></div>
            <div><div className="s2-tiny-label">Button Border</div><Tabs items={tabs} activeKey={tab} onChange={setTab} type="button-border" /></div>
            <div><div className="s2-tiny-label">Button Minimal</div><Tabs items={tabs} activeKey={tab} onChange={setTab} type="button-minimal" /></div>
          </div>
        </Section>

        {/* ═══════ 5. VERTICAL TABS ═══════ */}
        <Section title="Vertical Tabs">
          <div className="s2-card s2-grid-3">
            <div><div className="s2-tiny-label">Button Primary</div><VerticalTabs items={tabs} activeKey={vTab} onChange={setVTab} type="button-primary" /></div>
            <div><div className="s2-tiny-label">Line</div><VerticalTabs items={tabs} activeKey={vTab} onChange={setVTab} type="line" /></div>
            <div><div className="s2-tiny-label">Button Border</div><VerticalTabs items={tabs} activeKey={vTab} onChange={setVTab} type="button-border" /></div>
          </div>
        </Section>

        {/* ═══════ 6. BREADCRUMBS ═══════ */}
        <Section title="Breadcrumbs">
          <div className="s2-card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div><div className="s2-tiny-label">Chevron / Text</div><Breadcrumb items={[{ label: 'Settings', href: '#' }, { label: 'Team', href: '#' }, { label: 'Members' }]} divider="chevron" type="text" /></div>
            <div><div className="s2-tiny-label">Slash / Button</div><Breadcrumb items={[{ label: 'Settings', href: '#' }, { label: 'Team', href: '#' }, { label: 'Members' }]} divider="slash" type="button" /></div>
            <div><div className="s2-tiny-label">Chevron / Text with line</div><Breadcrumb items={[{ label: 'Settings', href: '#' }, { label: 'Team', href: '#' }, { label: 'Members' }]} divider="chevron" type="text-with-line" /></div>
          </div>
        </Section>

        {/* ═══════ 7. NAV ITEMS ═══════ */}
        <Section title="Nav Item Base">
          <div className="s2-card" style={{ maxWidth: 300 }}>
            <NavItemBase label="Tasks" icon={IconClipboard} count={3} />
            <NavItemBase label="Policies" icon={IconShield} active />
            <NavItemBase label="Companies" icon={IconBuilding} />
            <NavItemBase label="Changelog" icon={IconClock} />
          </div>
        </Section>

        {/* ═══════ 8. PAGINATION ═══════ */}
        <Section title="Pagination">
          <div className="s2-card">
            <Pagination currentPage={page} totalPages={12} onPageChange={setPage} />
          </div>
          <Sub label="Dot / Line Pagination">
            <div className="s2-card s2-row s2-row--center" style={{ gap: 32 }}>
              <PaginationDotGroup total={5} current={dot} style="dot" size="md" onChange={setDot} />
              <PaginationDotGroup total={5} current={dot} style="line" size="md" onChange={setDot} />
              <PaginationDotGroup total={5} current={dot} style="dot" size="lg" framed onChange={setDot} />
            </div>
          </Sub>
        </Section>

        {/* ═══════ 9. COMMAND BAR ═══════ */}
        <Section title="Command Bar">
          <div className="s2-card">
            <Button onClick={() => setCmdOpen(true)} iconLeading={IconSearch}>Open Command Bar (Cmd+K)</Button>
          </div>
          <CommandBar
            open={cmdOpen}
            onClose={() => setCmdOpen(false)}
            results={[
              { key: '1', label: 'TechNova B.V.', description: 'CL 520933' },
              { key: '2', label: 'GreenLeaf Corp', description: 'CL 678123' },
              { key: '3', label: 'BlueSky Holdings', description: 'CL 987456' },
            ]}
            onSelect={() => setCmdOpen(false)}
          />
        </Section>

        {/* ═══════ 10. FILTER & SELECTION ═══════ */}
        <Section title="Filter & Selection Bars">
          <Sub label="Filter Bar">
            <div className="s2-card">
              <FilterBar
                searchPlaceholder="Search policies..."
                filters={[{ key: 's', label: 'Active' }, { key: 'p', label: 'Pleziervaartuig' }]}
              />
            </div>
          </Sub>
          <Sub label="Selection Bar">
            <div className="s2-card">
              <SelectionBar count={3} onClose={() => {}} actions={[{ key: 'e', label: 'Export', onClick: () => {} }, { key: 'd', label: 'Delete', onClick: () => {} }]} />
            </div>
          </Sub>
        </Section>

        {/* ═══════ 11. TABLE ═══════ */}
        <Section title="Base Table">
          <div className="s2-card s2-card--no-pad">
            <BaseTable
              tabs={<Tabs items={[{ key: 'all', label: 'All' }, { key: 'active', label: 'Active' }, { key: 'exp', label: 'Expired' }]} activeKey="all" onChange={() => {}} type="button-brand" size="sm" />}
              filters={<FilterBar searchPlaceholder="Search..." />}
              pagination={<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />}
            >
              <Table columns={tableCols} data={tableData} />
            </BaseTable>
          </div>
        </Section>

        {/* ═══════ 12. DATE PICKER ═══════ */}
        <Section title="Date Picker">
          <div className="s2-card s2-row" style={{ gap: 24 }}>
            <div><div className="s2-tiny-label">Single Date</div><DatePicker type="single" placeholder="Select date" /></div>
            <div><div className="s2-tiny-label">Date Range</div><DatePicker type="range" placeholder="Select range" /></div>
          </div>
        </Section>

        {/* ═══════ 13. FILE UPLOAD ═══════ */}
        <Section title="File Upload">
          <div className="s2-card" style={{ maxWidth: 520 }}>
            <FileUpload
              files={[
                { name: 'policy-document.pdf', size: 2450000, progress: 100, status: 'complete' },
                { name: 'boat-photos.zip', size: 8700000, progress: 65, status: 'uploading' },
                { name: 'assessment.docx', size: 340000, progress: 30, status: 'error' },
              ]}
            />
          </div>
        </Section>

        {/* ═══════ 14. VIOLATION ITEMS ═══════ */}
        <Section title="Violation Items">
          <div className="s2-card" style={{ maxWidth: 600, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <ViolationItem variant="GTE" field="Boat value" value="€ 50.000" status="pass" />
            <ViolationItem variant="EQ" field="Year built" value="2020" status="fail" />
            <ViolationItem variant="LT" field="Engine HP" value="150" status="neutral" />
          </div>
        </Section>

        {/* ═══════ 15. PROGRESS STEPS ═══════ */}
        <Section title="Progress Steps">
          <Sub label="Horizontal — Number">
            <div className="s2-card">
              <ProgressSteps
                steps={[{ label: 'Account' }, { label: 'Details' }, { label: 'Review' }, { label: 'Complete' }]}
                currentStep={step}
                layout="horizontal"
                type="number"
                size="md"
              />
              <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                <Button hierarchy="secondary" size="sm" onClick={() => setStep(Math.max(0, step - 1))}>Previous</Button>
                <Button size="sm" onClick={() => setStep(Math.min(3, step + 1))}>Next</Button>
              </div>
            </div>
          </Sub>
          <Sub label="Centered — Check">
            <div className="s2-card">
              <ProgressSteps
                steps={[{ label: 'Step 1', description: 'Your details' }, { label: 'Step 2', description: 'Company info' }, { label: 'Step 3', description: 'Invite team' }]}
                currentStep={1}
                layout="horizontal-centered"
                type="check"
                size="sm"
              />
            </div>
          </Sub>
        </Section>

        {/* ═══════ 16. FLOW HEADER ═══════ */}
        <Section title="Flow Header">
          <div className="s2-card s2-card--no-pad" style={{ overflow: 'hidden' }}>
            <FlowHeader
              logo={<Logo width={64} />}
              stepper={
                <ProgressSteps steps={[{ label: 'Details' }, { label: 'Items' }, { label: 'Review' }]} currentStep={1} layout="horizontal" type="number" size="sm" />
              }
              onClose={() => {}}
            />
          </div>
        </Section>

        {/* ═══════ 17. METRICS ═══════ */}
        <Section title="Metric Items">
          <div className="s2-grid-3">
            <MetricItem label="Total policies" value="1,234" trend={{ value: '+12%', positive: true }} />
            <MetricItem label="Active claims" value="56" trend={{ value: '-3%', positive: false }} />
            <MetricItem label="Premium volume" value="€ 2.4M" icon={IconDollar} />
          </div>
        </Section>

        {/* ═══════ 18. GAUGES ═══════ */}
        <Section title="Activity Gauge">
          <div className="s2-card s2-row" style={{ gap: 48, justifyContent: 'center' }}>
            <ActivityGauge
              size="md"
              centerLabel="Active"
              centerValue="847"
              legend="right"
              segments={[
                { label: 'Pleziervaartuig', value: 45, color: 'var(--product-yacht-pleziervaartuig)' },
                { label: 'Cyber', value: 30, color: 'var(--product-financial-cyber)' },
                { label: 'AVB', value: 25, color: 'var(--product-financial-avb)' },
              ]}
            />
            <ActivityGauge
              size="sm"
              centerLabel="Claims"
              centerValue="56"
              legend="bottom"
              segments={[
                { label: 'Open', value: 60, color: 'var(--color-warning-500)' },
                { label: 'Resolved', value: 35, color: 'var(--color-success-500)' },
                { label: 'Rejected', value: 5, color: 'var(--color-error-500)' },
              ]}
            />
          </div>
        </Section>

        {/* ═══════ 19. CHART ═══════ */}
        <Section title="Chart Wrapper">
          <div className="s2-card">
            <Chart title="Premium over time" legend={[{ label: 'Yacht', color: 'var(--product-yacht-main)' }, { label: 'Financial', color: 'var(--product-financial-main)' }]} legendPosition="top" height={200}>
              <svg viewBox="0 0 400 200" width="100%" height="100%">
                <polyline fill="none" stroke="var(--product-yacht-main)" strokeWidth="2" points="0,180 50,160 100,140 150,100 200,120 250,80 300,60 350,50 400,30" />
                <polyline fill="none" stroke="var(--product-financial-main)" strokeWidth="2" points="0,190 50,180 100,170 150,160 200,140 250,130 300,110 350,100 400,90" />
              </svg>
            </Chart>
          </div>
        </Section>

        {/* ═══════ 20. CONTENT DIVIDERS ═══════ */}
        <Section title="Content Dividers">
          <div className="s2-card" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div><div className="s2-tiny-label">Single Line</div><ContentDivider style="single-line" label="Section title" /></div>
            <div><div className="s2-tiny-label">Dual Line</div><ContentDivider style="dual-line" label="Highlighted section" supportingText="With supporting text" /></div>
            <div><div className="s2-tiny-label">Background Fill</div><ContentDivider style="background-fill" label="Background section" actions={<Button size="sm" hierarchy="secondary">Action</Button>} /></div>
          </div>
        </Section>

        {/* ═══════ 21. INLINE CTA ═══════ */}
        <Section title="Inline CTA">
          <InlineCTA
            title="Upgrade your plan"
            description="Get access to advanced features and priority support."
            actions={<><Button hierarchy="secondary" size="sm">Learn more</Button><Button size="sm">Upgrade now</Button></>}
          />
        </Section>

        {/* ═══════ 22. CARD / SECTION / PAGE HEADERS ═══════ */}
        <Section title="Headers & Footers">
          <Sub label="Card Header">
            <div className="s2-card s2-card--no-pad">
              <CardHeader
                title="Team members"
                badge={<Badge size="sm" color="brand">10/20 seats</Badge>}
                supportingText="Manage your team members and their permissions."
                actions={<><Button hierarchy="secondary" size="sm">Import</Button><Button size="sm" iconLeading={IconPlus}>Add member</Button></>}
                divider
              />
            </div>
          </Sub>
          <Sub label="Section Header">
            <div className="s2-card s2-card--no-pad">
              <SectionHeader
                title="Policies"
                supportingText="View and manage all insurance policies."
                actions={<><Button hierarchy="tertiary" size="sm">Export</Button><Button hierarchy="secondary" size="sm">Filter</Button><Button size="sm" iconLeading={IconPlus}>New policy</Button></>}
                divider
              />
            </div>
          </Sub>
          <Sub label="Section Footer">
            <div className="s2-card s2-card--no-pad">
              <SectionFooter
                type="section"
                divider
                secondaryAction={{ label: 'Learn more', onClick: () => {} }}
                actions={<><Button hierarchy="secondary" size="sm">Cancel</Button><Button size="sm">Save changes</Button></>}
              />
            </div>
          </Sub>
          <Sub label="Page Header">
            <div className="s2-card s2-card--no-pad">
              <div style={{ padding: '20px 24px 0' }}>
                <PageHeader
                  title="Team members"
                  description="Manage your team members and their account permissions here."
                  breadcrumbs={<Breadcrumb items={[{ label: 'Settings', href: '#' }, { label: 'Team' }]} />}
                  actions={<><Button hierarchy="secondary">Export</Button><Button iconLeading={IconPlus}>Add member</Button></>}
                  divider
                />
              </div>
            </div>
          </Sub>
        </Section>

        {/* ═══════ 23. HEADER BAR ═══════ */}
        <Section title="Header Bar">
          <div className="s2-card s2-card--no-pad" style={{ overflow: 'hidden' }}>
            <Header
              title="Add insured items"
              onBack={() => {}}
              logo={<Logo width={64} />}
              actions={<Button>Add 1 item to policy</Button>}
            />
          </div>
        </Section>

        {/* ═══════ 24. ACTIVITY FEED ═══════ */}
        <Section title="Activity Feed">
          <div className="s2-card" style={{ maxWidth: 600 }}>
            <FeedItem
              type="brand"
              user={{ name: 'Olivia Rhye' }}
              description="changed 2 item values"
              timestamp="2 hours ago"
              changes={[
                { label: 'Boat value', oldValue: '€ 45.000', newValue: '€ 52.000' },
                { label: 'Engine HP', oldValue: '120', newValue: '150' },
              ]}
              showConnector
            />
            <FeedItem
              type="success"
              user={{ name: 'James Fletcher' }}
              description="approved policy CL 520933"
              timestamp="4 hours ago"
              showConnector
            />
            <FeedItem
              type="warning"
              user={{ name: 'Sophie Klein' }}
              description="flagged violation on Rule GTE"
              timestamp="Yesterday"
            />
          </div>
        </Section>

        {/* ═══════ 25. OBJECT ITEM CARDS ═══════ */}
        <Section title="Object Item Cards">
          <div className="s2-card s2-row">
            <ObjectItemCard icon={IconAnchor} label="Boat" count={3} active onClick={() => {}} onCopy={() => {}} onDelete={() => {}} />
            <ObjectItemCard icon={IconAnchor} label="Engine" count={1} onClick={() => {}} onCopy={() => {}} onDelete={() => {}} />
            <ObjectItemCard icon={IconAnchor} label="Trailer" onClick={() => {}} onCopy={() => {}} onDelete={() => {}} />
          </div>
        </Section>

        {/* ═══════ 26. ITEMS SIDEBAR ═══════ */}
        <Section title="Items Sidebar">
          <div className="s2-sidebar-frame" style={{ width: 310, height: 360 }}>
            <ItemsSidebar
              title="ITEMS"
              items={[
                { key: 'b1', icon: IconAnchor, label: 'Boat', count: 2, active: true },
                { key: 'b2', icon: IconAnchor, label: 'Engine', count: 1 },
                { key: 'b3', icon: IconAnchor, label: 'Trailer' },
              ]}
            />
          </div>
        </Section>

        {/* ═══════ 27. OVERLAYS ═══════ */}
        <Section title="Overlays & Modals">
          <div className="s2-card s2-row">
            <Button onClick={() => setModalOpen(true)}>Open Enhanced Modal</Button>
            <Button hierarchy="secondary" onClick={() => setSlideOpen(true)}>Open Slideout Menu</Button>
          </div>

          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Confirm deletion"
            description="Are you sure? This action cannot be undone."
            size="md"
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>}
            iconColor="error"
            footer={<><Button hierarchy="secondary" onClick={() => setModalOpen(false)}>Cancel</Button><Button onClick={() => setModalOpen(false)}>Delete policy</Button></>}
          >
            <p style={{ color: 'var(--text-tertiary)', fontSize: 14, lineHeight: '20px' }}>
              Policy CL 520933 for TechNova B.V. will be permanently removed.
            </p>
          </Modal>

          <SlideoutMenu
            open={slideOpen}
            onClose={() => setSlideOpen(false)}
            title="Policy Details"
            footer={<div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}><Button hierarchy="secondary">Cancel</Button><Button>Save</Button></div>}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <InputField label="Company name" defaultValue="TechNova B.V." />
              <InputField label="Policy number" defaultValue="CL 520933" />
              <InputField label="Product" defaultValue="Pleziervaartuig" />
            </div>
          </SlideoutMenu>
        </Section>

        {/* ═══════ 28. SIDEBAR ADMIN ═══════ */}
        <Section title="Sidebar Navigation">
          <div className="s2-row" style={{ gap: 24 }}>
            <div>
              <div className="s2-tiny-label" style={{ marginBottom: 8 }}>Expanded</div>
              <div className="s2-sidebar-frame" style={{ width: 310 }}>
                <SidebarAdmin
                  logo={<Logo width={74} />}
                  sections={[
                    { items: [
                      { key: 'tasks', label: 'Tasks', icon: IconClipboard, count: 3 },
                      { key: 'log', label: 'Changelog', icon: IconClock },
                      { key: 'comp', label: 'Companies', icon: IconBuilding },
                      { key: 'pol', label: 'Policies', icon: IconShield, active: true },
                    ]},
                    { label: 'RECENT POLICIES', items: [
                      { key: 'p1', label: 'TechNova', badge: 'CL 520933', dot: true },
                      { key: 'p2', label: 'GreenLeaf', badge: 'CL 678123', dot: true },
                    ]},
                  ]}
                  user={{ name: 'James Fletcher', email: 'j.fletcher@hienfeld.nl' }}
                />
              </div>
            </div>
            <div>
              <div className="s2-tiny-label" style={{ marginBottom: 8 }}>Collapsed</div>
              <div className="s2-sidebar-frame" style={{ width: 80 }}>
                <SidebarAdmin
                  collapsed
                  logo={<Logo width={74} />}
                  sections={[
                    { items: [
                      { key: 'tasks', label: 'Tasks', icon: IconClipboard, count: 3 },
                      { key: 'log', label: 'Changelog', icon: IconClock },
                      { key: 'comp', label: 'Companies', icon: IconBuilding },
                      { key: 'pol', label: 'Policies', icon: IconShield, active: true },
                    ]},
                  ]}
                  user={{ name: 'James Fletcher', email: 'j.fletcher@hienfeld.nl' }}
                />
              </div>
            </div>
          </div>
        </Section>

      </div>
    </div>
  );
}
