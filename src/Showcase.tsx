import { useState } from 'react';
import {
  Button,
  ButtonGroup,
  ButtonSplit,
  Badge,
  Tag,
  Menu,
  MenuItem,
  MenuDivider,
  MenuHeader,
  Dropdown,
  Select,
  InputField,
  Checkbox,
  RadioButton,
  Toggle,
  Tooltip,
  HelpIcon,
  Slider,
  VerificationCode,
  Logo,
  HienfeldIcon,
  Table,
  Modal,
  Tabs,
  Breadcrumb,
  Avatar,
  Sidebar,
} from './components';
import type { TableColumn } from './components';
import './Showcase.css';

/* ── tiny SVG icons used across the showcase ── */
const IconSearch = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);
const IconMail = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const IconPlus = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
);
const IconStar = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);
const IconSettings = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
);
const IconUser = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const IconCheck = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);
const IconDownload = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
);
const IconTrash = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
);
const IconUpload = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
);
const IconEdit = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
);
const IconCopy = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
);
const IconArrowLeft = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
);
const IconArrowRight = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);
const IconFile = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
);
const IconBuilding = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
);
const IconClock = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

/* ── table data ── */
interface PolicyRow extends Record<string, unknown> {
  id: string;
  holder: string;
  type: string;
  line: string;
  lineColor: string;
  premium: string;
  status: 'active' | 'pending' | 'expired';
  expiry: string;
}

const policyData: PolicyRow[] = [
  { id: 'POL-2026-001', holder: 'Van Dijk Transport B.V.', type: 'Casco', line: 'Yacht & Speciality', lineColor: 'var(--product-yacht-main)', premium: '€ 12.450', status: 'active', expiry: '15-03-2027' },
  { id: 'POL-2026-002', holder: 'Bakker & Zn. Logistics', type: 'AVB', line: 'Financial Lines', lineColor: 'var(--product-financial-main)', premium: '€ 8.200', status: 'active', expiry: '01-06-2027' },
  { id: 'POL-2026-003', holder: 'De Vries Scheepvaart', type: 'Pleziervaartuig', line: 'Yacht & Speciality', lineColor: 'var(--product-yacht-pleziervaartuig)', premium: '€ 3.750', status: 'pending', expiry: '22-09-2026' },
  { id: 'POL-2026-004', holder: 'TechStart B.V.', type: 'Cyber', line: 'Financial Lines', lineColor: 'var(--product-financial-cyber)', premium: '€ 15.800', status: 'active', expiry: '30-12-2026' },
  { id: 'POL-2025-089', holder: 'Galerie Amsterdam', type: 'Kunst', line: 'Fine Art & Private', lineColor: 'var(--product-fineart-kunst)', premium: '€ 22.100', status: 'expired', expiry: '01-01-2026' },
  { id: 'POL-2026-005', holder: 'Jansen Reizen', type: 'Reis', line: 'Accident & Travel', lineColor: 'var(--product-accident-reis)', premium: '€ 1.950', status: 'active', expiry: '15-08-2027' },
];

const policyColumns: TableColumn<PolicyRow>[] = [
  { key: 'id', header: 'Polisnummer', width: '140px' },
  { key: 'holder', header: 'Verzekeringnemer' },
  { key: 'type', header: 'Product', render: (row) => (
    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: row.lineColor, flexShrink: 0 }} />
      {row.type}
    </span>
  )},
  { key: 'line', header: 'Productlijn' },
  { key: 'premium', header: 'Premie', align: 'right' },
  { key: 'status', header: 'Status', render: (row) => (
    <Badge
      color={row.status === 'active' ? 'success' : row.status === 'pending' ? 'warning' : 'error'}
      size="sm"
      dot
    >
      {row.status === 'active' ? 'Actief' : row.status === 'pending' ? 'In behandeling' : 'Verlopen'}
    </Badge>
  )},
  { key: 'expiry', header: 'Vervaldatum', align: 'right' },
];

/* ── sidebar nav items ── */
const sidebarSections = [
  {
    items: [
      { key: 'tasks', label: 'Taken', icon: IconClock, count: 3, active: false },
      { key: 'policies', label: 'Alle polissen', icon: IconFile, active: true },
      { key: 'recent', label: 'Recente polissen', icon: IconClock },
      { key: 'companies', label: 'Bedrijven', icon: IconBuilding },
    ],
  },
  {
    label: 'Beheer',
    items: [
      { key: 'users', label: 'Gebruikers', icon: IconUser },
      { key: 'settings', label: 'Instellingen', icon: IconSettings },
    ],
  },
];

/* ── product lines ── */
const productLines = [
  { name: 'Yacht & Speciality', token: 'yacht-main', color: '#3186E7', products: [
    { name: 'Pleziervaartuig', color: '#0035A9' }, { name: 'Instrumenten', color: '#4169E1' },
    { name: 'Classic Car', color: '#08A2DE' }, { name: 'Drones', color: '#9BBAFD' }, { name: 'HAV', color: '#1E5A92' },
  ]},
  { name: 'Financial Lines', token: 'financial-main', color: '#32A850', products: [
    { name: 'AVB', color: '#B4D8C2' }, { name: 'WEGAS', color: '#62D367' },
    { name: 'Cyber', color: '#36D1B5' }, { name: 'Fraude Geld', color: '#118884' }, { name: 'AVP', color: '#43C782' },
  ]},
  { name: 'Accident & Travel', token: 'accident-main', color: '#FA9B00', products: [
    { name: 'WIA', color: '#FFA91F' }, { name: 'Reis', color: '#FFD500' },
    { name: 'Carriere Stop', color: '#F57C00' }, { name: 'Ongevallen', color: '#FFF500' },
  ]},
  { name: 'Fine Art & Private', token: 'fineart-main', color: '#C755DA', products: [
    { name: 'Buitenland', color: '#6B00BF' }, { name: 'Kunst', color: '#A11C9B' },
    { name: 'K&R', color: '#A807B7' }, { name: 'Renaissance', color: '#9C0271' }, { name: 'Garantie', color: '#D964D9' },
  ]},
];

export function Showcase() {
  const [sliderValue, setSliderValue] = useState<[number, number]>([25, 75]);
  const [activeTab, setActiveTab] = useState('overview');
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="showcase">
      {/* ━━━ HERO ━━━ */}
      <header className="showcase-hero">
        <div className="showcase-hero__grain" />
        <div className="showcase-hero__content">
          <Logo variant="on-dark" width={240} />
          <p className="showcase-hero__subtitle" style={{ marginTop: 24 }}>
            Design System &middot; 22 componenten &middot; Graphik font &middot; 43 iconen
          </p>
          <div className="showcase-hero__actions">
            <Button size="lg" hierarchy="primary" iconLeading={IconDownload}>
              Installeren
            </Button>
            <Button size="lg" hierarchy="secondary" iconLeading={IconStar}>
              Storybook
            </Button>
          </div>
        </div>
        <div className="showcase-hero__colors">
          {['50','100','200','400','500','600','700'].map((shade) => (
            <div key={shade} className="showcase-hero__swatch" style={{ background: `var(--color-brand-${shade})` }}>
              <span>{shade}</span>
            </div>
          ))}
        </div>
      </header>

      {/* ━━━ BRANDING ━━━ */}
      <section className="showcase-section">
        <div className="showcase-section__header">
          <span className="showcase-section__number">01</span>
          <h2 className="showcase-section__title">Merk &amp; Identiteit</h2>
        </div>
        <div className="showcase-logo-row">
          <div className="showcase-card">
            <Logo variant="default" width={180} />
          </div>
          <div className="showcase-card" style={{ background: 'var(--color-brand-600)' }}>
            <Logo variant="on-dark" width={180} />
          </div>
          <div className="showcase-card">
            <Logo variant="bw" width={180} />
          </div>
        </div>

        <h3 className="showcase-card__label" style={{ marginTop: 32 }}>Productlijn kleuren</h3>
        <div className="showcase-grid-2" style={{ marginTop: 12 }}>
          {productLines.map((line) => (
            <div key={line.name} className="showcase-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span style={{ width: 16, height: 16, borderRadius: 4, background: line.color, flexShrink: 0 }} />
                <span style={{ fontWeight: 500, fontSize: 'var(--font-size-text-sm)' }}>{line.name}</span>
              </div>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {line.products.map((p) => (
                  <Tooltip key={p.name} content={p.name} position="top">
                    <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-sm)', background: p.color, cursor: 'default' }} />
                  </Tooltip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━ HIENFELD ICONS ━━━ */}
      <section className="showcase-section">
        <div className="showcase-section__header">
          <span className="showcase-section__number">02</span>
          <h2 className="showcase-section__title">Hienfeld Iconen</h2>
        </div>
        <div className="showcase-card">
          <p style={{ fontSize: 'var(--font-size-text-sm)', color: 'var(--text-tertiary)', marginBottom: 20 }}>
            43 verzekeringsspecifieke iconen — gebruik <code>&lt;HienfeldIcon name="..." /&gt;</code>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: 12 }}>
            {[
              'polis-nl','casco','allrisk','calculator','certificaat','check','clock',
              'customerservice','data-lock','document-search','europe','fire','geld',
              'gratis','house-locked','huisplus','locatie','maatwerk','molest','network',
              'niches','onderverzekering','onderzoek','plane','plus','proces',
              'response-team','schadeafwikkeling-nl','startup','sublimiet','tap',
              'telefoon','verhuur','vestigingen','waterschade','wereld','academy',
              'aanvraagformulier','bedrijfsonderbreking','bedrijfsuitje','DGA','inloop','invisible'
            ].map((name) => (
              <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: 8 }}>
                <HienfeldIcon name={name} size={32} />
                <span style={{ fontSize: 10, color: 'var(--text-quaternary)', textAlign: 'center', wordBreak: 'break-all' }}>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ NAVIGATION ━━━ */}
      <section className="showcase-section">
        <div className="showcase-section__header">
          <span className="showcase-section__number">03</span>
          <h2 className="showcase-section__title">Navigatie &amp; Layout</h2>
        </div>
        <div className="showcase-grid-2">
          <div className="showcase-sidebar-demo">
            <Sidebar
              logo={<Logo variant="default" width={120} />}
              sections={sidebarSections}
              user={{ name: 'Stef van Hienfeld', email: 'stef@hienfeld.nl' }}
            />
          </div>

          <div className="showcase-card">
            <h3 className="showcase-card__label">Breadcrumb</h3>
            <div className="showcase-stack" style={{ gap: 16 }}>
              <Breadcrumb items={[
                { label: 'Dashboard', href: '#' },
                { label: 'Polissen', href: '#' },
                { label: 'POL-2026-001' },
              ]} />
              <Breadcrumb items={[
                { label: 'Beheer', href: '#' },
                { label: 'Gebruikers', href: '#' },
                { label: 'Jan de Vries' },
              ]} />
            </div>

            <h3 className="showcase-card__label" style={{ marginTop: 28 }}>Tabs</h3>
            <Tabs
              items={[
                { key: 'overview', label: 'Overzicht' },
                { key: 'policies', label: 'Polissen', count: 12 },
                { key: 'claims', label: 'Claims', count: 3 },
                { key: 'documents', label: 'Documenten' },
                { key: 'history', label: 'Geschiedenis', disabled: true },
              ]}
              activeKey={activeTab}
              onChange={setActiveTab}
            />

            <h3 className="showcase-card__label" style={{ marginTop: 28 }}>Avatar</h3>
            <div className="showcase-row">
              <Avatar name="Stef Hienfeld" size="xs" />
              <Avatar name="Jan de Vries" size="sm" online />
              <Avatar name="Maria Bakker" size="md" online />
              <Avatar name="Tristan" size="lg" />
              <Avatar name="Aad" size="xl" online />
            </div>

            <h3 className="showcase-card__label" style={{ marginTop: 28 }}>Modal</h3>
            <Button hierarchy="secondary" onClick={() => setModalOpen(true)}>
              Open modal
            </Button>
            <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Polis verwijderen?" description="Deze actie kan niet ongedaan worden gemaakt.">
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 24 }}>
                <Button hierarchy="tertiary" onClick={() => setModalOpen(false)}>Annuleren</Button>
                <Button hierarchy="primary" onClick={() => setModalOpen(false)} iconLeading={IconTrash}>Verwijderen</Button>
              </div>
            </Modal>
          </div>
        </div>
      </section>

      {/* ━━━ TABLE ━━━ */}
      <section className="showcase-section">
        <div className="showcase-section__header">
          <span className="showcase-section__number">04</span>
          <h2 className="showcase-section__title">Tabel</h2>
        </div>
        <div className="showcase-card" style={{ padding: 0, overflow: 'hidden' }}>
          <Table
            columns={policyColumns}
            data={policyData}
            onRowClick={(row) => alert(`Polis ${row.id} geselecteerd`)}
          />
        </div>
      </section>

      {/* ━━━ BUTTONS ━━━ */}
      <section className="showcase-section">
        <div className="showcase-section__header">
          <span className="showcase-section__number">05</span>
          <h2 className="showcase-section__title">Button</h2>
        </div>
        <div className="showcase-card">
          <h3 className="showcase-card__label">Hierarchie</h3>
          <div className="showcase-row">
            <Button hierarchy="primary" iconLeading={IconPlus}>Primary</Button>
            <Button hierarchy="secondary" iconLeading={IconUpload}>Secondary</Button>
            <Button hierarchy="tertiary" iconLeading={IconSettings}>Tertiary</Button>
            <Button hierarchy="link-color">Link color</Button>
            <Button hierarchy="link-gray">Link gray</Button>
          </div>

          <h3 className="showcase-card__label">Afmetingen</h3>
          <div className="showcase-row showcase-row--align-end">
            <Button size="sm" hierarchy="primary">Small</Button>
            <Button size="md" hierarchy="primary">Medium</Button>
            <Button size="lg" hierarchy="primary">Large</Button>
            <Button size="xl" hierarchy="primary">Extra large</Button>
          </div>

          <h3 className="showcase-card__label">Staten</h3>
          <div className="showcase-row">
            <Button hierarchy="primary" iconLeading={IconCheck}>Enabled</Button>
            <Button hierarchy="primary" loading>Loading</Button>
            <Button hierarchy="primary" disabled>Disabled</Button>
            <Button hierarchy="secondary" iconOnly aria-label="Instellingen">{IconSettings}</Button>
          </div>

          <h3 className="showcase-card__label">Button Group &amp; Split</h3>
          <div className="showcase-row" style={{ gap: 20 }}>
            <ButtonGroup items={[
              { label: 'Dag' }, { label: 'Week' }, { label: 'Maand' },
            ]} />
            <ButtonSplit
              hierarchy="primary"
              menuItems={<>
                <MenuItem icon={IconEdit} label="Bewerken" />
                <MenuItem icon={IconCopy} label="Dupliceren" />
                <MenuDivider />
                <MenuItem icon={IconTrash} label="Verwijderen" />
              </>}
            >
              Opslaan
            </ButtonSplit>
            <ButtonSplit
              hierarchy="secondary"
              menuItems={<>
                <MenuItem label="CSV" />
                <MenuItem label="PDF" />
              </>}
            >
              Exporteren
            </ButtonSplit>
          </div>
        </div>
      </section>

      {/* ━━━ FORM FIELDS ━━━ */}
      <section className="showcase-section">
        <div className="showcase-section__header">
          <span className="showcase-section__number">06</span>
          <h2 className="showcase-section__title">Formulier componenten</h2>
        </div>
        <div className="showcase-grid-2">
          <div className="showcase-card">
            <h3 className="showcase-card__label">InputField</h3>
            <div className="showcase-stack">
              <InputField label="E-mailadres" placeholder="naam@hienfeld.nl" iconLeading={IconMail} hint="We delen je e-mail nooit met derden." required />
              <InputField label="Zoeken" placeholder="Zoek polissen..." iconLeading={IconSearch} />
              <InputField label="Wachtwoord" type="password" error="Wachtwoord moet minimaal 8 tekens bevatten." defaultValue="kort" destructive />
              <InputField label="Website" leadingText="https://" placeholder="www.hienfeld.nl" />
              <InputField label="Zoek in polissen" placeholder="Typ om te zoeken..." trailingButton={{ label: 'Zoeken' }} />
              <InputField label="Telefoonnummer" placeholder="6 12345678" leadingDropdown={{ value: '+31', options: [{ value: '+31', label: '+31' }, { value: '+32', label: '+32' }, { value: '+49', label: '+49' }] }} />
              <InputField label="Bedrag" placeholder="0,00" trailingDropdown={{ value: 'EUR', options: [{ value: 'EUR', label: 'EUR' }, { value: 'USD', label: 'USD' }, { value: 'GBP', label: 'GBP' }] }} />
            </div>
          </div>

          <div className="showcase-card">
            <h3 className="showcase-card__label">Select</h3>
            <div className="showcase-stack">
              <Select label="Afdeling" placeholder="Selecteer..." hint="De afdeling waar de polis onder valt." options={[
                { value: 'sales', label: 'Sales', icon: IconStar },
                { value: 'claims', label: 'Claims', icon: IconMail },
                { value: 'it', label: 'IT & Development', icon: IconSettings },
              ]} required />
              <Select label="Status" placeholder="Kies status..." options={[
                { value: 'active', label: 'Actief', dotColor: 'var(--color-success-500)' },
                { value: 'pending', label: 'In behandeling', dotColor: 'var(--color-warning-500)' },
                { value: 'closed', label: 'Gesloten', dotColor: 'var(--color-error-500)' },
              ]} />
              <Select label="Land (doorzoekbaar)" placeholder="Zoek een land..." searchable searchPlaceholder="Typ om te filteren..." options={[
                { value: 'nl', label: 'Nederland' }, { value: 'be', label: 'België' },
                { value: 'de', label: 'Duitsland' }, { value: 'fr', label: 'Frankrijk' },
                { value: 'uk', label: 'Verenigd Koninkrijk' }, { value: 'es', label: 'Spanje' },
              ]} />
              <Select label="Medewerker" placeholder="Kies medewerker..." error="Dit veld is verplicht." options={[
                { value: 'jan', label: 'Jan de Vries' },
                { value: 'maria', label: 'Maria Bakker' },
              ]} />
              <Select label="Polis type (disabled)" placeholder="Selecteer..." disabled options={[
                { value: 'auto', label: 'Auto' },
              ]} />
            </div>
          </div>

          <div className="showcase-card">
            <h3 className="showcase-card__label">Checkbox &amp; Radio</h3>
            <div className="showcase-stack">
              <Checkbox label="Ik ga akkoord met de voorwaarden" description="Je kunt dit later altijd wijzigen." />
              <Checkbox label="Automatisch verlengen" defaultChecked />
              <Checkbox label="Alle selecteren" indeterminate />
              <Checkbox label="Uitgeschakeld" disabled />
              <div className="showcase-divider" />
              <h3 className="showcase-card__label" style={{ marginBottom: 0 }}>Radio</h3>
              <RadioButton label="Particulier" name="type-demo" value="particulier" checked />
              <RadioButton label="Zakelijk" name="type-demo" value="zakelijk" description="Voor bedrijven en organisaties." />
              <RadioButton label="Overig" name="type-demo" value="overig" disabled />
            </div>
          </div>

          <div className="showcase-card">
            <h3 className="showcase-card__label">Toggle</h3>
            <div className="showcase-stack">
              <Toggle label="E-mailnotificaties" description="Ontvang meldingen bij nieuwe polissen." defaultChecked />
              <Toggle label="Donkere modus" />
              <div className="showcase-divider" />
              <h3 className="showcase-card__label" style={{ marginBottom: 0 }}>Slim variant</h3>
              <Toggle type="slim" label="Compact modus" defaultChecked />
              <Toggle type="slim" label="Snelle weergave" />
              <Toggle type="slim" label="Uitgeschakeld slim" disabled />
            </div>
          </div>

        </div>
        <div className="showcase-grid-2" style={{ marginTop: 24 }}>
          <div className="showcase-card">
            <h3 className="showcase-card__label">Slider</h3>
            <div className="showcase-stack" style={{ gap: 40 }}>
              <div>
                <label className="showcase-field-label">Premie bereik (bottom labels)</label>
                <Slider min={0} max={500} step={10} value={sliderValue} onChange={setSliderValue} label="bottom" formatLabel={(v) => `€${v}`} />
              </div>
              <div>
                <label className="showcase-field-label">Leeftijd (floating labels)</label>
                <Slider min={18} max={99} defaultValue={[30, 65]} label="top-floating" />
              </div>
              <div>
                <label className="showcase-field-label">Zonder labels</label>
                <Slider min={0} max={100} defaultValue={[20, 80]} />
              </div>
            </div>
          </div>
          <div className="showcase-card">
            <h3 className="showcase-card__label">Verificatiecode</h3>
            <div className="showcase-stack">
              <VerificationCode digits={6} label="Verificatiecode" hint="Voer de code in die we naar je telefoon hebben gestuurd." />
              <VerificationCode digits={4} label="PIN code" size="sm" />
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ BADGES, TAGS, OVERLAY ━━━ */}
      <section className="showcase-section">
        <div className="showcase-section__header">
          <span className="showcase-section__number">07</span>
          <h2 className="showcase-section__title">Badge, Tag, Dropdown &amp; Tooltip</h2>
        </div>
        <div className="showcase-grid-2">
          <div className="showcase-card">
            <h3 className="showcase-card__label">Badge</h3>
            <div className="showcase-row showcase-row--wrap">
              <Badge color="brand" dot>Nieuw</Badge>
              <Badge color="success" icon={IconCheck}>Actief</Badge>
              <Badge color="error">Verlopen</Badge>
              <Badge color="warning">In behandeling</Badge>
              <Badge color="gray">Concept</Badge>
              <Badge color="blue">Info</Badge>
              <Badge color="purple" icon={IconStar}>Premium</Badge>
              <Badge color="orange">Gewijzigd</Badge>
            </div>
            <h3 className="showcase-card__label">Tag</h3>
            <div className="showcase-row showcase-row--wrap">
              <Tag>Default</Tag>
              <Tag icon="dot">Met dot</Tag>
              <Tag action="x-close" onClose={() => {}}>Sluitbaar</Tag>
              <Tag action="count" count={12}>Met count</Tag>
              <Tag checkbox checked>Aangevinkt</Tag>
            </div>
          </div>

          <div className="showcase-card">
            <h3 className="showcase-card__label">Dropdown &amp; Tooltip</h3>
            <div className="showcase-stack" style={{ gap: 16 }}>
              <div className="showcase-row">
                <Dropdown trigger="button" label="Opties">
                  <Menu>
                    <MenuItem icon={IconUser} label="Profiel" shortcut="⌘P" />
                    <MenuItem icon={IconSettings} label="Instellingen" shortcut="⌘," />
                    <MenuDivider />
                    <MenuItem icon={IconTrash} label="Verwijderen" />
                  </Menu>
                </Dropdown>
                <Dropdown trigger="icon">
                  <Menu>
                    <MenuItem label="Bewerken" />
                    <MenuItem label="Dupliceren" />
                  </Menu>
                </Dropdown>
              </div>
              <div className="showcase-row">
                <Tooltip content="Dit is een tooltip" position="top">
                  <Button hierarchy="secondary" size="sm">Hover me</Button>
                </Tooltip>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--font-size-text-sm)', color: 'var(--text-secondary)' }}>
                  Premie <HelpIcon tooltip="De premie wordt berekend op basis van het risicoprofiel." supportingText="Neem contact op met je adviseur." />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ REALISTIC CONTEXT ━━━ */}
      <section className="showcase-section">
        <div className="showcase-section__header">
          <span className="showcase-section__number">08</span>
          <h2 className="showcase-section__title">In context — Polisbeheer</h2>
        </div>
        <div className="showcase-card showcase-context">
          <Breadcrumb items={[
            { label: 'Dashboard', href: '#' },
            { label: 'Polissen', href: '#' },
            { label: 'Nieuwe polis' },
          ]} />
          <div className="showcase-context__header" style={{ marginTop: 16 }}>
            <div>
              <h3 className="showcase-context__title">Nieuwe polis aanmaken</h3>
              <p className="showcase-context__subtitle">Vul de gegevens in om een nieuwe verzekeringspolis te registreren.</p>
            </div>
            <Badge color="warning" dot>Concept</Badge>
          </div>
          <div className="showcase-divider" />
          <div className="showcase-grid-2" style={{ gap: 20 }}>
            <InputField label="Polisnummer" placeholder="POL-2026-" iconLeading={IconSearch} required />
            <Select label="Type verzekering" placeholder="Selecteer..." searchable options={[
              { value: 'casco', label: 'Casco' }, { value: 'avb', label: 'AVB' },
              { value: 'cyber', label: 'Cyber' }, { value: 'reis', label: 'Reisverzekering' },
              { value: 'kunst', label: 'Kunstverzekering' },
            ]} required />
            <InputField label="Verzekeringnemer" placeholder="Volledige naam" iconLeading={IconUser} required />
            <InputField label="Premie" placeholder="0,00" trailingDropdown={{ value: 'EUR', options: [{ value: 'EUR', label: 'EUR' }, { value: 'USD', label: 'USD' }] }} />
          </div>
          <div style={{ marginTop: 20 }}>
            <label className="showcase-field-label">
              Dekking bereik
              <HelpIcon tooltip="Stel het minimum en maximum dekkingsbedrag in." tooltipPosition="right" />
            </label>
            <Slider min={0} max={100000} step={5000} defaultValue={[10000, 50000]} label="bottom" formatLabel={(v) => `€${v.toLocaleString('nl-NL')}`} />
          </div>
          <div className="showcase-divider" />
          <div className="showcase-row showcase-row--wrap" style={{ gap: 12 }}>
            <Tag icon="dot" action="x-close" onClose={() => {}}>Particulier</Tag>
            <Tag icon="dot" action="x-close" onClose={() => {}}>All-risk</Tag>
            <Tag icon="dot" action="count" count={3}>Bijlagen</Tag>
          </div>
          <div className="showcase-divider" />
          <Checkbox label="Ik bevestig dat alle gegevens correct zijn" description="Deze polis wordt na bevestiging direct verwerkt in het systeem." />
          <Toggle label="Automatisch verlengen" description="De polis wordt jaarlijks automatisch verlengd." defaultChecked />
          <div className="showcase-divider" />
          <div className="showcase-row" style={{ justifyContent: 'flex-end' }}>
            <Button hierarchy="tertiary">Annuleren</Button>
            <ButtonSplit hierarchy="secondary" menuItems={<>
              <MenuItem icon={IconDownload} label="Opslaan als PDF" />
              <MenuItem icon={IconCopy} label="Dupliceren" />
            </>}>
              Opslaan als concept
            </ButtonSplit>
            <Button hierarchy="primary" iconLeading={IconCheck}>Polis registreren</Button>
          </div>
        </div>
      </section>

      {/* ━━━ FOOTER ━━━ */}
      <footer className="showcase-footer">
        <Logo variant="bw" width={100} />
        <p style={{ marginTop: 12 }}>
          Hienfeld Design System &middot; {new Date().getFullYear()} &middot;
          <code>npm install hienfeld-design-system</code>
        </p>
      </footer>
    </div>
  );
}
