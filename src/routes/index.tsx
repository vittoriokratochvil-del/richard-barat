import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import siteMetadata from '../metadata.json'
import { canonicalUrl } from '../lib/canonical-url'

const house = 'https://assets.macaly-user-data.dev/dacbugrox12l5bbuzy32w192/jzm67ave0v9k1qx35vxao8gg/2tS9dVH7CISjE-A-RJpJK/generated-mjfW7G_H.png'
const apartment = 'https://assets.macaly-user-data.dev/dacbugrox12l5bbuzy32w192/jzm67ave0v9k1qx35vxao8gg/lKqs-4oBEpWzj1UzLENjQ/generated-Gjfd6Txd.png'
const garden = 'https://assets.macaly-user-data.dev/dacbugrox12l5bbuzy32w192/jzm67ave0v9k1qx35vxao8gg/oa7yBR6tKPcRKsgy4T-Tf/generated-jiL-cxzo.png'
const phone = 'tel:+420734237199'
const email = 'mailto:richard.barat@century21.cz'

const Arrow = ({ className = '' }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6"/></svg>

export const Route = createFileRoute('/')({
  head: () => {
    const meta = siteMetadata['/']
    const canonical = canonicalUrl('/')
    return { meta: [{ title: meta.title }, { name: 'description', content: meta.description }], links: canonical ? [{ rel: 'canonical', href: canonical }] : [] }
  },
  component: HomePage,
})

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const nav = [
    { href: '#sluzby', label: 'Služby' },
    { href: '#pristup', label: 'Můj přístup' },
    { href: '#nabidka', label: 'Nemovitosti' },
    { href: '#kontakt', label: 'Kontakt' },
  ]
  return <div className="richard-site">
    <header className="rb-header">
      <div className="rb-shell rb-header-row">
        <a className="rb-brand" href="/" aria-label="Richard Barát, úvodní stránka"><span className="rb-brand-name">Richard <strong>Barát</strong></span><span className="rb-brand-sub">REALITNÍ MAKLÉŘ <i/> CENTURY 21</span></a>
        <nav className={`rb-nav ${menuOpen ? 'rb-nav-open' : ''}`} aria-label="Hlavní navigace">
          {nav.map(item => <a key={item.href} onClick={() => setMenuOpen(false)} href={item.href}>{item.label}</a>)}
          <Link onClick={() => setMenuOpen(false)} to="/nacenit-nemovitost" className="rb-mobile-cta">Odhad zdarma</Link>
        </nav>
        <Link to="/nacenit-nemovitost" className="rb-header-cta">Odhad ceny zdarma <Arrow /></Link>
        <button type="button" className="rb-menu-button" aria-label={menuOpen ? 'Zavřít menu' : 'Otevřít menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}>{menuOpen ? '✕' : '☰'}</button>
      </div>
    </header>

    <main>
      <section className="rb-hero">
        <div className="rb-hero-glow" aria-hidden="true"/>
        <div className="rb-shell rb-hero-grid">
          <div className="rb-hero-copy">
            <div className="rb-eyebrow"><span className="rb-eyebrow-line"/> CENTURY 21 ALL INCLUSIVE <span className="rb-eyebrow-dot"/> BRNO A OKOLÍ</div>
            <h1>Váš domov.<br/><em>Moje starost.</em><br/>Dobrý výsledek.</h1>
            <p className="rb-hero-lead">Za každou nemovitostí je příběh. Pomohu vám otevřít jeho další kapitolu — s jasným plánem, osobním přístupem a důrazem na správnou cenu.</p>
            <div className="rb-actions"><Link className="rb-button rb-button-dark" to="/nacenit-nemovitost">Zjistit cenu nemovitosti <Arrow/></Link><a href="#pristup" className="rb-button rb-button-outline">Poznat můj přístup</a></div>
            <div className="rb-hero-line"><span className="rb-mini-mark">21</span><span>Osobně. Férově. S oporou silné značky.</span></div>
          </div>
          <div className="rb-hero-visual">
            <img src={house} alt="Moderní rodinný dům se zahradou – ilustrační fotografie" className="rb-hero-house" />
            <div className="rb-hero-panel"><span>REALITY S LIDSKÝM PŘÍSTUPEM</span><strong>Richard Barát</strong><span>realitní makléř · Brno</span></div>
            <span className="rb-orbit rb-orbit-one" aria-hidden="true"/>
            <span className="rb-orbit rb-orbit-two" aria-hidden="true"/>
          </div>
        </div>
        <div className="rb-shell rb-hero-bottom"><span>PRODEJ &nbsp; / &nbsp; PRONÁJEM &nbsp; / &nbsp; ODHAD CENY</span><span>01 / RICHARD BARÁT</span></div>
      </section>

      <section id="sluzby" className="rb-section rb-shell rb-services">
        <div className="rb-section-heading"><span className="rb-kicker">CO PRO VÁS MOHU UDĚLAT</span><h2>Každá nemovitost si<br/>zaslouží <em>správný přístup.</em></h2></div>
        <div className="rb-service-grid">
          {[
            { number:'01', title:'Prodej nemovitosti', text:'Od první konzultace po předání klíčů. Pomohu nastavit prodejní strategii a provést vás celým procesem.', href:'#kontakt' },
            { number:'02', title:'Odhad ceny zdarma', text:'Zjistěte orientační tržní hodnotu své nemovitosti. Bez poplatků a bez závazku.', href:'/nacenit-nemovitost' },
            { number:'03', title:'Pronájem nemovitosti', text:'Pomoc s prezentací, výběrem vhodných zájemců a bezpečným nastavením pronájmu.', href:'#kontakt' },
          ].map(s => <a className="rb-service-card" key={s.number} href={s.href}><span className="rb-service-index">{s.number} / SLUŽBA</span><span className="rb-service-icon" aria-hidden="true"><Arrow /></span><h3>{s.title}</h3><p>{s.text}</p><span className="rb-service-more">Zjistit více <Arrow /></span></a>)}
        </div>
      </section>

      <section id="pristup" className="rb-story">
        <div className="rb-shell rb-story-grid">
          <div className="rb-story-photo"><img src={apartment} loading="lazy" alt="Elegantní světlý interiér nemovitosti – ilustrační fotografie"/><div className="rb-story-photo-caption">Každý detail může rozhodnout.</div></div>
          <div className="rb-story-copy"><span className="rb-kicker">VÍCE NEŽ JEN INZERÁT</span><h2>Nemovitosti jsou o lidech. <em>A o důvěře.</em></h2><p>Věřím, že dobrý obchod začíná nasloucháním. Chci znát vaše představy, rozumět vaší situaci a najít cestu, která pro vás dává smysl.</p><p>Ve spolupráci se sítí CENTURY 21 All Inclusive mám za sebou zázemí pro profesionální realitní servis. Vy máte po celou dobu jednoho konkrétního člověka, na kterého se můžete obrátit.</p><div className="rb-signature">Richard Barát <span>REALITNÍ MAKLÉŘ</span></div><a className="rb-text-link" href="#kontakt">Pojďme se poznat <Arrow/></a></div>
        </div>
      </section>

      <section id="nabidka" className="rb-section rb-shell rb-offers">
        <div className="rb-heading-row"><div><span className="rb-kicker">NEMOVITOSTI & REALIZACE</span><h2>Prostory pro <em>nové příběhy.</em></h2></div><span className="rb-heading-note">Aktuální informace najdete v oficiální nabídce CENTURY 21.</span></div>
        <div className="rb-offer-grid">
          <a href="https://www.century21.cz/makleri" target="_blank" rel="noopener noreferrer" className="rb-offer-card"><img src={garden} alt="Rodinný dům – ilustrační fotografie nabídky" loading="lazy"/><span className="rb-offer-overlay"/><div><span>01 / AKTUÁLNÍ NABÍDKA</span><h3>Nemovitosti<br/>v nabídce</h3><b>Prohlédnout nabídku <Arrow/></b></div></a>
          <a href="https://www.century21.cz/makleri" target="_blank" rel="noopener noreferrer" className="rb-offer-card rb-offer-second"><img src={apartment} alt="Moderní byt – ilustrační fotografie" loading="lazy"/><span className="rb-offer-overlay"/><div><span>02 / REALIZOVANÉ OBCHODY</span><h3>Prodané a pronajaté<br/>nemovitosti</h3><b>Prohlédnout realizace <Arrow/></b></div></a>
        </div>
        <p className="rb-offer-note">Odkazy prozatím vedou do veřejného katalogu CENTURY 21. Přímé odkazy na Richardův profil a realizace doplníme po ověření.</p>
      </section>

      <section className="rb-valuation-band">
        <div className="rb-shell rb-valuation-grid"><div><span className="rb-kicker">PRVNÍ KROK JE NEZÁVAZNÝ</span><h2>Víte, kolik má vaše<br/><em>nemovitost hodnotu?</em></h2><p>Odhad ceny zdarma je ideální začátek. Vyplňte krátký dotazník a získáte podklad pro další rozhodování.</p></div><Link to="/nacenit-nemovitost" className="rb-button rb-button-gold">Chci odhad ceny zdarma <Arrow/></Link></div>
      </section>

      <section id="kontakt" className="rb-section rb-shell rb-contact">
        <div><span className="rb-kicker">POJĎME SPOLU MLUVIT</span><h2>Každý dobrý prodej<br/>začíná <em>rozhovorem.</em></h2><p>Napište mi nebo zavolejte. Rád si poslechnu, co právě řešíte.</p></div>
        <div className="rb-contact-box"><span>RICHARD BARÁT</span><a href={phone} className="rb-contact-phone">+420 734 237 199</a><a href={email} className="rb-contact-mail">richard.barat@century21.cz</a><a href={email} className="rb-button rb-button-dark">Napsat e-mail <Arrow/></a><p>CENTURY 21 All Inclusive<br/>náměstí 28. dubna 1069/2, Brno-Bystrc<br/>IČO: 19430850</p></div>
      </section>
    </main>
    <footer className="rb-footer"><div className="rb-shell rb-footer-row"><div><strong>Richard Barát</strong><span>CENTURY 21 ALL INCLUSIVE</span></div><div>© {new Date().getFullYear()} Richard Barát · Všechna práva vyhrazena.</div><a href={email}>Kontaktovat <Arrow/></a></div></footer>
  </div>
}
