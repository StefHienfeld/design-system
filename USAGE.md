# Hienfeld Design System — Gebruikshandleiding

## Setup (eenmalig per machine)

### 1. GitHub Packages authenticatie

Maak een GitHub Personal Access Token (classic) met `read:packages` scope:
https://github.com/settings/tokens/new

Login bij de registry:

```bash
npm login --registry=https://npm.pkg.github.com --scope=@hienfeld
```

### 2. Project .npmrc

Kopieer `.npmrc.consumer-template` naar je project root als `.npmrc`:

```
@hienfeld:registry=https://npm.pkg.github.com
```

Of maak het handmatig aan. Dit vertelt npm: "haal @hienfeld packages op bij GitHub."

---

## Installatie

```bash
npm install @hienfeld/design-system
```

---

## Gebruik

### React project (volledige componenten + styling)

```tsx
// In je root/layout bestand (bijv. App.tsx of layout.tsx)
import '@hienfeld/design-system/styles.css';

// Gebruik componenten overal
import { Button, CTALink, Accordion } from '@hienfeld/design-system';

function MijnPagina() {
  return (
    <div>
      <Button hierarchy="primary" size="md">Opslaan</Button>
      <CTALink href="/meer">Lees verder</CTALink>
    </div>
  );
}
```

### Non-React project (alleen tokens + fonts)

```css
/* In je globale CSS */
@import '@hienfeld/design-system/tokens.css';

/* Nu kun je alle Hienfeld tokens gebruiken */
.mijn-element {
  font-family: var(--font-family-body);
  color: var(--text-primary);
  background: var(--bg-primary);
  border: 1px solid var(--color-gray-300);
}
```

---

## Aanpassen per project

### Tokens overschrijven

Maak een eigen CSS bestand en laad het NA de design system CSS:

```css
/* project-theme.css */
:root {
  --color-brand-600: #118884;     /* andere accentkleur */
  --layout-max-width: 960px;      /* smaller container */
  --radius-xxs: 8px;              /* ronde hoeken */
}
```

```tsx
import '@hienfeld/design-system/styles.css';
import './project-theme.css';  // MOET na design system CSS
```

Alle componenten passen zich automatisch aan.

### Componenten wrappen

```tsx
import { Button } from '@hienfeld/design-system';

// Project-specifieke variant
function SubmitButton({ label }: { label: string }) {
  return <Button hierarchy="primary" size="lg">{label}</Button>;
}
```

### Project-specifieke componenten

Bouw eigen componenten die de tokens gebruiken:

```css
.claim-tracker {
  font-family: var(--font-family-body);
  color: var(--text-primary);
  border: 1px solid var(--color-gray-300);
  padding: var(--spacing-xl);
}
```

Ze zien er automatisch Hienfeld uit.

---

## Beschikbare tokens

Zie `node_modules/@hienfeld/design-system/dist/tokens.css` voor de volledige lijst. De belangrijkste:

| Categorie | Voorbeelden |
|-----------|------------|
| Kleuren | `--color-brand-600`, `--color-gray-*`, `--color-error-*` |
| Tekst | `--text-primary`, `--text-secondary`, `--text-link` |
| Achtergrond | `--bg-primary`, `--bg-brand-solid` |
| Typografie | `--font-family-body`, `--font-size-text-*`, `--font-weight-*` |
| Spacing | `--spacing-xs` t/m `--spacing-10xl` |
| Radius | `--radius-xxs` t/m `--radius-full` |
| Layout | `--layout-max-width`, `--layout-gutter`, `--layout-column-gap` |
| Animaties | `--transition-button`, `--transition-default` |

---

## Beschikbare componenten

### Part 1 — Primitives
Button, ButtonGroup, ButtonSplit, Badge, Tag, Menu, Dropdown, Select, InputField, VerificationCode, Toggle, Checkbox, RadioButton, Tooltip, HelpIcon, Slider, Table, Modal, Tabs, Breadcrumb, Avatar, Sidebar, Logo

### Part 2 — Composed
Alert, Notification, LoadingIndicator, EmptyState, ContentDivider, PaginationDotGroup, VerticalTabs, NavItemBase, Pagination, CommandBar, FilterBar, SelectionBar, BaseTable, DatePicker, DatePickerModal, FileUpload, ViolationItem, ProgressSteps, FlowHeader, MetricItem, ActivityGauge, Chart, FeedItem, ObjectItemCard, InlineCTA, CardHeader, SectionHeader, SectionFooter, PageHeader, Header, SlideoutMenu, ItemsSidebar, SidebarAdmin, SidebarClient, PageLayout

### Part 3 — Website Patterns
CTALink, Accordion, ProductCard, WebsiteFooter, WebsiteNav, HeroSection, SectionContainer, DownloadLink, USPList, SpecialistCard, CookieBanner

---

## Versies updaten

```bash
npm update @hienfeld/design-system
```

Wij volgen semantic versioning:
- **Patch** (0.1.0 → 0.1.1): bugfix, veilig om te updaten
- **Minor** (0.1.1 → 0.2.0): nieuwe features, veilig om te updaten
- **Major** (0.2.0 → 1.0.0): breaking changes, even checken wat er veranderd is
