import { WebsiteNav } from './components/WebsiteNav/WebsiteNav';
import { HeroSection } from './components/HeroSection/HeroSection';
import { Button } from './components/Button/Button';
import { CTALink } from './components/CTALink/CTALink';
import { ProductCard } from './components/ProductCard/ProductCard';
import { USPList } from './components/USPList/USPList';
import { Accordion } from './components/Accordion/Accordion';
import { DownloadLink } from './components/DownloadLink/DownloadLink';
import { SpecialistCard } from './components/SpecialistCard/SpecialistCard';
import { SectionContainer } from './components/SectionContainer/SectionContainer';
import { CookieBanner } from './components/CookieBanner/CookieBanner';
import { WebsiteFooter } from './components/WebsiteFooter/WebsiteFooter';
import { Logo } from './components/Logo/Logo';
import './ShowcasePart3.css';

/* ── SVG Icons ── */
const IconArrowRight = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
  </svg>
);

const IconPhone = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const IconUser = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

export function ShowcasePart3() {
  return (
    <div className="showcase-part3">

      {/* ── WebsiteNav ── */}
      <WebsiteNav
        logo={<Logo variant="on-dark" width={120} />}
        links={[
          { label: 'Producten', href: '#producten', active: true },
          { label: 'Over Hienfeld', href: '#over' },
          { label: 'Schade melden', href: '#schade' },
          { label: 'Kennisbank', href: '#kennis' },
          { label: 'Contact', href: '#contact' },
        ]}
        actions={[
          { label: 'Bel ons', href: 'tel:+31201234567', icon: IconPhone },
          { label: 'Mijn Hienfeld', href: '#login', icon: IconUser },
        ]}
      />

      {/* ── HeroSection ── */}
      <HeroSection
        title="The Best in Niches"
        subtitle="Hienfeld is de nicheverzekeraar van Nederland. Wij bieden specialistische verzekeringsoplossingen voor markten die anderen links laten liggen."
        actions={
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Button hierarchy="primary" size="lg">Bekijk onze producten</Button>
            <Button hierarchy="secondary" size="lg">Neem contact op</Button>
          </div>
        }
      />

      {/* ── Buttons Section ── */}
      <div className="showcase-part3__section">
        <div className="showcase-part3__container">
          <h2 className="showcase-part3__title">Buttons</h2>
          <p className="showcase-part3__subtitle">
            Primaire en secundaire knoppen met gradient hover-effect. Beschikbaar in meerdere formaten.
          </p>

          <div className="showcase-part3__label">Primary</div>
          <div className="showcase-part3__row" style={{ marginBottom: '32px' }}>
            <Button hierarchy="primary" size="sm">Klein</Button>
            <Button hierarchy="primary" size="md">Medium</Button>
            <Button hierarchy="primary" size="lg">Groot</Button>
            <Button hierarchy="primary" size="xl">Extra groot</Button>
          </div>

          <div className="showcase-part3__label">Secondary</div>
          <div className="showcase-part3__row" style={{ marginBottom: '32px' }}>
            <Button hierarchy="secondary" size="sm">Klein</Button>
            <Button hierarchy="secondary" size="md">Medium</Button>
            <Button hierarchy="secondary" size="lg">Groot</Button>
            <Button hierarchy="secondary" size="xl">Extra groot</Button>
          </div>

          <div className="showcase-part3__label">With icons</div>
          <div className="showcase-part3__row">
            <Button hierarchy="primary" size="md" iconTrailing={IconArrowRight}>Offerte aanvragen</Button>
            <Button hierarchy="secondary" size="md" iconLeading={IconPhone}>Bel ons direct</Button>
            <Button hierarchy="tertiary" size="md">Meer informatie</Button>
            <Button hierarchy="link-color" size="md">Lees meer</Button>
          </div>
        </div>
      </div>

      {/* ── CTALink Section ── */}
      <div className="showcase-part3__section">
        <div className="showcase-part3__container">
          <h2 className="showcase-part3__title">CTA Links</h2>
          <p className="showcase-part3__subtitle">
            Call-to-action links met pijl-animatie, ideaal voor navigatie binnen content-secties.
          </p>

          <div className="showcase-part3__row">
            <CTALink href="#producten" icon={IconArrowRight}>Bekijk alle producten</CTALink>
            <CTALink href="#offerte" icon={IconArrowRight}>Vraag een offerte aan</CTALink>
            <CTALink href="#schade">Schade melden</CTALink>
            <CTALink href="#kennis">Naar de kennisbank</CTALink>
          </div>
        </div>
      </div>

      {/* ── ProductCard Grid ── */}
      <div className="showcase-part3__section">
        <div className="showcase-part3__container">
          <h2 className="showcase-part3__title">Producten</h2>
          <p className="showcase-part3__subtitle">
            Productkaarten met kleurcodering per productlijn. Hover voor het zoom-effect.
          </p>

          <div className="showcase-part3__label">Yacht &amp; Transport</div>
          <div className="showcase-part3__grid-3" style={{ marginBottom: '48px' }}>
            <ProductCard
              label="Pleziervaartuigen"
              imageSrc="https://placehold.co/400x500/0035a9/FFFFFF?text=Yacht"
              href="#pleziervaartuigen"
              colorDot="#0035a9"
            />
            <ProductCard
              label="Classic Cars"
              imageSrc="https://placehold.co/400x500/08a2de/FFFFFF?text=Classic+Car"
              href="#classic-cars"
              colorDot="#08a2de"
            />
            <ProductCard
              label="Drones"
              imageSrc="https://placehold.co/400x500/9bbafd/000000?text=Drones"
              href="#drones"
              colorDot="#9bbafd"
            />
          </div>

          <div className="showcase-part3__label">Financial Lines</div>
          <div className="showcase-part3__grid-3" style={{ marginBottom: '48px' }}>
            <ProductCard
              label="Cyber Verzekering"
              imageSrc="https://placehold.co/400x500/36d1b5/000000?text=Cyber"
              href="#cyber"
              colorDot="#36d1b5"
            />
            <ProductCard
              label="Beroepsaansprakelijkheid"
              imageSrc="https://placehold.co/400x500/9fe2bf/000000?text=Beroeps"
              href="#beroepsaansprakelijkheid"
              colorDot="#9fe2bf"
            />
            <ProductCard
              label="Bestuurdersaansprakelijkheid"
              imageSrc="https://placehold.co/400x500/b5ead7/000000?text=Bestuurders"
              href="#bestuurdersaansprakelijkheid"
              colorDot="#b5ead7"
            />
          </div>

          <div className="showcase-part3__label">Fine Art &amp; Specialty</div>
          <div className="showcase-part3__grid-3">
            <ProductCard
              label="Kunst &amp; Verzamelingen"
              imageSrc="https://placehold.co/400x500/a11c9b/FFFFFF?text=Kunst"
              href="#kunst"
              colorDot="#a11c9b"
            />
            <ProductCard
              label="Kidnap &amp; Ransom"
              imageSrc="https://placehold.co/400x500/a807b7/FFFFFF?text=K%26R"
              href="#kidnap-ransom"
              colorDot="#a807b7"
            />
            <ProductCard
              label="Ongevallenverzekering"
              imageSrc="https://placehold.co/400x500/fa9b00/000000?text=Ongevallen"
              href="#ongevallen"
              colorDot="#fa9b00"
            />
          </div>
        </div>
      </div>

      {/* ── USPList ── */}
      <div className="showcase-part3__section">
        <div className="showcase-part3__container">
          <h2 className="showcase-part3__title">Waarom Hienfeld?</h2>
          <p className="showcase-part3__subtitle">
            Unique selling points als overzichtelijke lijst met vinkjes.
          </p>
          <USPList
            items={[
              'Meer dan 25 jaar ervaring in nicheverzekeringen',
              'Directe toegang tot Lloyd\'s of London en internationale markten',
              'Flexibele polisvoorwaarden afgestemd op uw specifieke risico',
              'Persoonlijke begeleiding door gespecialiseerde underwriters',
              'Snelle afhandeling van schademeldingen binnen 48 uur',
            ]}
          />
        </div>
      </div>

      {/* ── Accordion ── */}
      <div className="showcase-part3__section">
        <div className="showcase-part3__container">
          <h2 className="showcase-part3__title">Veelgestelde vragen</h2>
          <p className="showcase-part3__subtitle">
            Accordion-component voor FAQ-secties en uitklapbare content.
          </p>
          <Accordion
            items={[
              {
                id: 'faq-1',
                title: 'Wat is een nicheverzekering?',
                content: 'Een nicheverzekering is een specialistische verzekering voor risico\'s die niet door standaard polissen worden gedekt. Denk aan pleziervaartuigen, fine art, cyber liability of beroepsaansprakelijkheid voor specifieke sectoren.',
              },
              {
                id: 'faq-2',
                title: 'Hoe vraag ik een offerte aan?',
                content: 'U kunt direct contact opnemen met een van onze specialisten via het contactformulier of telefonisch. Wij stellen binnen 48 uur een maatwerkofferte op die past bij uw specifieke situatie.',
              },
              {
                id: 'faq-3',
                title: 'Kan ik mijn bestaande polis overzetten naar Hienfeld?',
                content: 'Ja, dat is in de meeste gevallen mogelijk. Onze underwriters beoordelen uw huidige polis en stellen een verbeterd aanbod op. Het overzetten verloopt naadloos zodat u geen dag onverzekerd bent.',
              },
              {
                id: 'faq-4',
                title: 'Hoe meld ik een schade?',
                content: 'Schade kunt u 24/7 melden via ons online portaal of telefonisch bij onze schadeafdeling. Na uw melding wijzen wij direct een schade-expert toe die u begeleidt door het hele proces.',
              },
            ]}
          />
        </div>
      </div>

      {/* ── DownloadLink ── */}
      <div className="showcase-part3__section">
        <div className="showcase-part3__container">
          <h2 className="showcase-part3__title">Downloads</h2>
          <p className="showcase-part3__subtitle">
            Download links voor documenten, brochures en formulieren.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxWidth: '480px' }}>
            <DownloadLink label="Productbrochure Pleziervaartuigen 2026" href="#brochure-yacht.pdf" />
            <DownloadLink label="Polisvoorwaarden Cyber Verzekering" href="#polis-cyber.pdf" />
            <DownloadLink label="Schademeldingsformulier" href="#schademelding.pdf" />
            <DownloadLink label="Algemene voorwaarden Hienfeld" href="#algemene-voorwaarden.pdf" />
          </div>
        </div>
      </div>

      {/* ── SpecialistCard Row ── */}
      <div className="showcase-part3__section">
        <div className="showcase-part3__container">
          <h2 className="showcase-part3__title">Onze specialisten</h2>
          <p className="showcase-part3__subtitle">
            Neem direct contact op met een van onze ervaren underwriters.
          </p>
          <div className="showcase-part3__grid-3">
            <SpecialistCard
              name="Jan de Vries"
              role="Senior Underwriter — Yacht & Transport"
              photoSrc="https://placehold.co/200x200/e2e8f0/475569?text=JdV"
              phone="+31 20 123 4567"
              email="j.devries@hienfeld.nl"
            />
            <SpecialistCard
              name="Maria van den Berg"
              role="Underwriter — Financial Lines"
              photoSrc="https://placehold.co/200x200/e2e8f0/475569?text=MvdB"
              phone="+31 20 123 4568"
              email="m.vandenberg@hienfeld.nl"
            />
            <SpecialistCard
              name="Peter Bakker"
              role="Underwriter — Fine Art & Specialty"
              photoSrc="https://placehold.co/200x200/e2e8f0/475569?text=PB"
              phone="+31 20 123 4569"
              email="p.bakker@hienfeld.nl"
            />
          </div>
        </div>
      </div>

      {/* ── SectionContainer ── */}
      <div className="showcase-part3__section">
        <div className="showcase-part3__container">
          <h2 className="showcase-part3__title">SectionContainer</h2>
          <p className="showcase-part3__subtitle">
            Layout-component die content centreert binnen de maximale breedte en standaard padding toepast.
          </p>
        </div>
        <SectionContainer>
          <div style={{
            background: 'var(--color-gray-100)',
            border: '1px dashed var(--color-gray-300)',
            borderRadius: '8px',
            padding: '32px',
            textAlign: 'center',
            color: 'var(--text-tertiary)',
            fontFamily: 'var(--font-family-body)',
            fontSize: 'var(--font-size-text-md)',
          }}>
            Content binnen een SectionContainer — automatisch gecentreerd met max-width en gutter padding.
          </div>
        </SectionContainer>
      </div>

      {/* ── CookieBanner (demo, not fixed) ── */}
      <div className="showcase-part3__section">
        <div className="showcase-part3__container">
          <h2 className="showcase-part3__title">Cookie Banner</h2>
          <p className="showcase-part3__subtitle">
            GDPR-compliant cookie consent banner. Hieronder getoond in een relatieve container voor demo-doeleinden.
          </p>
          <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px', border: '1px solid var(--color-gray-200)' }}>
            <CookieBanner
              text={
                <>
                  Wij gebruiken cookies om uw ervaring op onze website te verbeteren en om onze diensten te optimaliseren.
                  Door verder te gaan gaat u akkoord met ons{' '}
                  <a href="#cookiebeleid" style={{ color: 'inherit', textDecoration: 'underline' }}>cookiebeleid</a>.
                </>
              }
              onAccept={() => alert('Cookies geaccepteerd')}
              onDecline={() => alert('Cookies geweigerd')}
              className="showcase-part3__cookie-demo"
            />
            <style>{`
              .showcase-part3__cookie-demo.cookie-banner {
                position: relative !important;
                bottom: auto !important;
                left: auto !important;
                right: auto !important;
              }
            `}</style>
          </div>
        </div>
      </div>

      {/* ── WebsiteFooter ── */}
      <WebsiteFooter
        columns={[
          {
            title: 'Producten',
            links: [
              { label: 'Pleziervaartuigen', href: '#pleziervaartuigen' },
              { label: 'Cyber Verzekering', href: '#cyber' },
              { label: 'Beroepsaansprakelijkheid', href: '#beroeps' },
              { label: 'Classic Cars', href: '#classic-cars' },
              { label: 'Fine Art', href: '#kunst' },
            ],
          },
          {
            title: 'Over Hienfeld',
            links: [
              { label: 'Ons verhaal', href: '#verhaal' },
              { label: 'Team', href: '#team' },
              { label: 'Werken bij', href: '#carriere' },
              { label: 'Nieuws', href: '#nieuws' },
            ],
          },
          {
            title: 'Service',
            links: [
              { label: 'Schade melden', href: '#schade' },
              { label: 'Contact', href: '#contact' },
              { label: 'Kennisbank', href: '#kennis' },
              { label: 'Veelgestelde vragen', href: '#faq' },
            ],
          },
          {
            title: 'Juridisch',
            links: [
              { label: 'Privacybeleid', href: '#privacy' },
              { label: 'Cookiebeleid', href: '#cookies' },
              { label: 'Algemene voorwaarden', href: '#voorwaarden' },
              { label: 'Klachtenprocedure', href: '#klachten' },
            ],
          },
        ]}
        logo={<Logo variant="on-dark" width={100} />}
        copyrightText={`\u00A9 ${new Date().getFullYear()} Hienfeld B.V. Alle rechten voorbehouden.`}
        barLinks={[
          { label: 'Privacybeleid', href: '#privacy' },
          { label: 'Cookiebeleid', href: '#cookies' },
          { label: 'Sitemap', href: '#sitemap' },
        ]}
      />
    </div>
  );
}
