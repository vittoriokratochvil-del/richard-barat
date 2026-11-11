import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import siteMetadata from '../metadata.json'
import { canonicalUrl } from '../lib/canonical-url'

export const Route = createFileRoute('/nacenit-nemovitost')({
  head: () => {
    const meta = siteMetadata['/nacenit-nemovitost']
    const canonical = canonicalUrl('/nacenit-nemovitost')
    return { meta: [{ title: meta.title }, { name: 'description', content: meta.description }], links: canonical ? [{ rel: 'canonical', href: canonical }] : [] }
  },
  component: ValuationPage,
})

const types = ['Byt','Rodinný dům','Pozemek','Chata / rekreační objekt','Komerční nemovitost','Jiné']

function ValuationPage() {
  const [step,setStep] = useState(0)
  const [data,setData] = useState({type:'',location:'',area:'',condition:'',name:'',email:'',phone:'',notes:'',consent:false})
  const update = (key: keyof typeof data, val: string | boolean) => setData(s => ({...s,[key]:val}))
  const valid = step===0 ? !!data.type : step===1 ? data.location.trim().length > 1 && Number(data.area)>0 : step===2 ? !!data.condition : data.name.trim().length>1 && /.+@.+\..+/.test(data.email) && data.phone.trim().length>=9 && data.consent
  const inputClass='w-full border border-rb-line bg-rb-paper px-4 py-3.5 text-rb-ink outline-none focus:border-rb-gold'
  return <div className="richard-site min-h-screen bg-rb-cream">
    <header className="rb-header"><div className="rb-shell rb-header-row"><Link to="/" className="rb-brand"><span className="rb-brand-name">Richard <strong>Barát</strong></span><span className="rb-brand-sub">REALITNÍ MAKLÉŘ <i/> CENTURY 21</span></Link><Link to="/" className="ml-auto text-sm font-semibold text-rb-ink">← Zpět na web</Link></div></header>
    <main className="rb-shell py-14 md:py-22">
      <div className="mx-auto max-w-3xl">
        <span className="rb-kicker">ODHAD NEMOVITOSTI ZDARMA</span>
        <h1 className="mt-3 font-['Playfair_Display'] text-4xl font-semibold tracking-tight text-rb-ink md:text-6xl">Zjistěte hodnotu <em>své nemovitosti.</em></h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-rb-soft">Pár jednoduchých informací mi pomůže připravit podklad pro orientační nacenění. Nezávazně a bez poplatků.</p>
        <div className="mt-10 flex gap-2" aria-label={`Krok ${step+1} ze 4`}>{[0,1,2,3].map(i=><div key={i} className={`h-1.5 flex-1 ${i<=step?'bg-rb-gold':'bg-rb-line'}`}/>)}</div>
        <div className="mt-8 border border-rb-line bg-rb-paper p-6 sm:p-10">
          <span className="text-xs font-bold uppercase tracking-wider text-rb-gold">Krok {step+1} / 4</span>
          {step===0&&<><h2 className="mt-3 font-['Playfair_Display'] text-3xl font-semibold">O jakou nemovitost jde?</h2><div className="mt-7 grid gap-3 sm:grid-cols-2">{types.map(t=><button key={t} type="button" onClick={()=>update('type',t)} className={`min-h-14 border px-4 py-3 text-left font-semibold transition-colors ${data.type===t?'border-rb-gold bg-rb-cream text-rb-ink':'border-rb-line bg-rb-paper text-rb-soft hover:border-rb-gold'}`}>{t}</button>)}</div></>}
          {step===1&&<><h2 className="mt-3 font-['Playfair_Display'] text-3xl font-semibold">Lokalita a výměra</h2><div className="mt-7 grid gap-6"><label className="block text-sm font-semibold">Adresa nebo obec<input className={`mt-2 ${inputClass}`} value={data.location} onChange={e=>update('location',e.target.value)} placeholder="Například Brno-Bystrc, ulice a číslo" autoComplete="street-address"/></label><label className="block text-sm font-semibold">Užitná plocha / plocha pozemku (m²)<input className={`mt-2 ${inputClass}`} type="number" min="1" value={data.area} onChange={e=>update('area',e.target.value)} placeholder="Například 85"/></label><p className="text-xs text-rb-soft">Adresu lze zadat ručně. Našeptávání doplníme až po řádném nastavení mapové služby.</p></div></>}
          {step===2&&<><h2 className="mt-3 font-['Playfair_Display'] text-3xl font-semibold">V jakém je nemovitost stavu?</h2><div className="mt-7 grid gap-3 sm:grid-cols-2">{['Novostavba','Po rekonstrukci','Velmi dobrý','Před rekonstrukcí','Původní stav','Nevím / jiné'].map(t=><button key={t} type="button" onClick={()=>update('condition',t)} className={`min-h-14 border px-4 py-3 text-left font-semibold ${data.condition===t?'border-rb-gold bg-rb-cream':'border-rb-line bg-rb-paper hover:border-rb-gold'}`}>{t}</button>)}</div></>}
          {step===3&&<><h2 className="mt-3 font-['Playfair_Display'] text-3xl font-semibold">Kam vám mohu odpovědět?</h2><div className="mt-7 grid gap-4"><label className="block text-sm font-semibold">Jméno<input className={`mt-2 ${inputClass}`} value={data.name} onChange={e=>update('name',e.target.value)} autoComplete="name"/></label><label className="block text-sm font-semibold">E-mail<input className={`mt-2 ${inputClass}`} type="email" value={data.email} onChange={e=>update('email',e.target.value)} autoComplete="email"/></label><label className="block text-sm font-semibold">Telefon<input className={`mt-2 ${inputClass}`} type="tel" value={data.phone} onChange={e=>update('phone',e.target.value)} autoComplete="tel"/></label><label className="block text-sm font-semibold">Poznámka (volitelné)<textarea className={`mt-2 ${inputClass}`} rows={3} value={data.notes} onChange={e=>update('notes',e.target.value)}/></label><label className="flex items-start gap-3 text-xs leading-relaxed text-rb-soft"><input type="checkbox" checked={data.consent} onChange={e=>update('consent',e.target.checked)} className="mt-1"/>Souhlasím, aby mě Richard Barát kontaktoval ohledně této poptávky. Odeslání bude aktivováno po dokončení zabezpečeného formuláře.</label></div></>}
          <div className="mt-9 flex items-center justify-between gap-4 border-t border-rb-line pt-6"><button type="button" onClick={()=>setStep(s=>Math.max(0,s-1))} disabled={step===0} className="px-4 py-3 text-sm font-semibold text-rb-soft disabled:opacity-40">← Zpět</button>{step<3?<button type="button" disabled={!valid} onClick={()=>setStep(s=>s+1)} className="rb-button rb-button-dark disabled:cursor-not-allowed disabled:opacity-40">Pokračovat →</button>:<div className="max-w-xs text-right text-xs leading-relaxed text-rb-soft">Odesílání poptávek zatím není aktivováno. Pro individuální odhad můžete zavolat na <a className="font-semibold underline" href="tel:+420734237199">734 237 199</a>.</div>}</div>
        </div>
        <p className="mt-5 text-center text-xs text-rb-soft">Odhad je orientační a nezávazný. Nejde o znalecký posudek.</p>
      </div>
    </main>
  </div>
}
