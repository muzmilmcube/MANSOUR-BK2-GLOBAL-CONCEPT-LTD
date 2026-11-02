import { useMemo, useState, type FormEvent } from 'react'
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, BatteryCharging, Check, ChevronDown,
  CircleHelp, Clock3, Headphones, MapPin, Menu, MessageCircle, PackageCheck,
  Search, ShieldCheck, Smartphone, Sparkles, Wrench, X, Zap,
} from 'lucide-react'
import { businessAddress, businessContact } from './config'

type ProductCategory = 'All' | 'Phones' | 'Accessories' | 'Spare parts'
type Product = { name: string; category: Exclude<ProductCategory, 'All'>; description: string; image: string; imageAlt: string; icon: typeof Smartphone }

const products: Product[] = [
  { name: 'Smartphones', category: 'Phones', description: 'New and quality-checked mobile phones. Ask us what is available today.', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=85', imageAlt: 'Modern smartphone viewed from the back', icon: Smartphone },
  { name: 'Everyday essentials', category: 'Accessories', description: 'Chargers, cables, audio, cases and screen protection for your device.', image: 'https://images.unsplash.com/photo-1593259037198-c720f4420d7f?auto=format&fit=crop&w=900&q=85', imageAlt: 'Mobile phone, charger and wireless earbuds arranged on a desk', icon: Headphones },
  { name: 'Power & charging', category: 'Accessories', description: 'Portable power and charging accessories. Contact us to check compatibility.', image: 'https://images.unsplash.com/photo-1566554738544-d962991c3fee?auto=format&fit=crop&w=900&q=85', imageAlt: 'Smartphone and portable power bank', icon: BatteryCharging },
  { name: 'Replacement components', category: 'Spare parts', description: 'Common replacement components for repairs, subject to device and availability.', image: 'https://images.unsplash.com/photo-1746005514014-2637647a26ee?auto=format&fit=crop&w=900&q=85', imageAlt: 'Phone parts and repair tools laid out on a work mat', icon: PackageCheck },
]

const services = [
  { icon: Smartphone, title: 'Phones & devices', text: 'Explore available smartphones and other mobile devices in store.' },
  { icon: Sparkles, title: 'Accessories', text: 'Find the everyday essentials that help protect and power your device.' },
  { icon: Wrench, title: 'Phone repairs', text: 'Get a diagnosis and repair quotation from our technical team.' },
  { icon: PackageCheck, title: 'Spare parts', text: 'Ask about replacement components for your phone model.' },
]

const benefits = [
  { icon: ShieldCheck, title: 'Quality you can ask about', text: 'We help you understand the available options before you decide.' },
  { icon: Wrench, title: 'Technical support', text: 'Bring in your device for inspection and a clear repair quotation.' },
  { icon: MapPin, title: 'Easy to find', text: 'Visit us at YAYO PLAZA GSM MARKET, Farm Center, Kano.' },
  { icon: MessageCircle, title: 'Helpful service', text: 'Talk with our team about a product, accessory or repair.' },
]

const process = ['Tell us what your phone is doing.', 'Bring your device to our Farm Center location.', 'Our technician inspects and diagnoses the issue.', 'Review the repair quote and estimated completion time.', 'Approve the work, then collect your device when ready.']

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<ProductCategory>('All')
  const [notice, setNotice] = useState('')
  const [selectedProduct, setSelectedProduct] = useState('')
  const filteredProducts = useMemo(() => products.filter((item) => {
    const matchesCategory = category === 'All' || item.category === category
    const matchesSearch = `${item.name} ${item.description} ${item.category}`.toLowerCase().includes(query.toLowerCase())
    return matchesCategory && matchesSearch
  }), [category, query])

  const closeMenu = () => setMenuOpen(false)
  const showContactNote = (message = 'Add the verified WhatsApp number in src/config.ts to enable direct WhatsApp enquiries.') => {
    setNotice(message)
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }
  const sendWhatsApp = (message: string) => {
    if (!businessContact.whatsappNumber) {
      showContactNote()
      return
    }
    window.open(`https://wa.me/${businessContact.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }
  const handleEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') ?? '').trim()
    const phone = String(form.get('phone') ?? '').trim()
    const service = String(form.get('service') ?? '').trim()
    const message = String(form.get('message') ?? '').trim()
    if (!name || !phone || !service || !message) {
      setNotice('Please complete each field so we can prepare your enquiry.')
      return
    }
    sendWhatsApp(`Hello, my name is ${name}. My phone number is ${phone}. I need help with: ${service}. ${message}`)
  }
  const handleRepair = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('repairName') ?? '').trim()
    const phone = String(form.get('repairPhone') ?? '').trim()
    const device = String(form.get('device') ?? '').trim()
    const issue = String(form.get('issue') ?? '').trim()
    if (!name || !phone || !device || !issue) {
      setNotice('Please complete each field so we can prepare your repair request.')
      return
    }
    sendWhatsApp(`Repair request from ${name} (${phone}). Device: ${device}. Issue: ${issue}.`)
  }

  return (
    <>
      <div className="announcement"><span className="announcement-dot" /> Your local destination for mobile technology <a href="#services">Discover our services <ArrowRight size={14} /></a></div>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="MANSOUR BK2 GLOBAL CONCEPT LTD home" onClick={closeMenu}>
          <span className="brand-mark"><Smartphone size={21} strokeWidth={1.8} /></span>
          <span className="brand-copy"><strong>MANSOUR BK2</strong><small>GLOBAL CONCEPT LTD</small></span>
        </a>
        <button className="mobile-menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          <a href="#products" onClick={closeMenu}>Products</a><a href="#services" onClick={closeMenu}>Services</a><a href="#about" onClick={closeMenu}>Our story</a><a href="#contact" onClick={closeMenu}>Contact</a>
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Talk to our team <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy">
            <div className="eyebrow light"><span className="eyebrow-line" /> MOBILE. CONNECTED. CARED FOR.</div>
            <h1>Your next phone.<br /><em>Your go-to repair.</em></h1>
            <p className="hero-lede">Quality mobile phones, useful accessories and dependable repair support — all close to home in Farm Center, Kano.</p>
            <div className="hero-actions"><a className="button button-mint" href="#products">Explore products <ArrowRight size={17} /></a><a className="button button-outline-light" href="#repair">Book a repair <ArrowDownRight size={17} /></a></div>
            <div className="hero-proof"><div className="proof-icon"><MapPin size={17} /></div><div><b>Right here in Kano</b><span>YAYO PLAZA GSM MARKET, Farm Center</span></div><span className="proof-divider" /><div className="proof-meta"><b>RC 9316003</b><span>Registered in Nigeria</span></div></div>
          </div>
          <div className="hero-visual">
            <div className="hero-photo-wrap"><img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1400&q=90" alt="Premium smartphone displayed in a clean studio setting" fetchPriority="high" /><div className="hero-photo-wash" /></div>
            <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
            <div className="floating-card stock-card"><span className="floating-icon mint-bg"><ShieldCheck size={18} /></span><span><b>Quality-minded</b><small>Here to help you choose</small></span><Check className="stock-check" size={16} /></div>
            <div className="floating-card repair-card"><span className="floating-icon blue-bg"><Wrench size={18} /></span><span><b>Device acting up?</b><small>Start with a proper diagnosis</small></span><ArrowUpRight size={16} /></div>
            <div className="hero-caption">TECHNOLOGY, MADE PERSONAL <span>01 / 04</span></div>
          </div>
          <a className="hero-scroll" href="#intro"><span>SCROLL TO EXPLORE</span><span className="scroll-track" /></a>
        </section>

        <section className="intro section-pad" id="intro">
          <div className="intro-label"><span className="section-number">01</span><span>THE RIGHT PLACE<br />FOR YOUR DEVICE</span></div>
          <div className="intro-content"><p className="eyebrow"><span className="eyebrow-line" /> YOUR MOBILE, SORTED</p><h2>Good tech should feel<br className="desktop-break" /> <em>simple to find.</em></h2><p className="intro-text">Whether you're shopping for a phone, looking for the right accessory or need a repair, our team is ready to help you find the next step.</p><a className="text-link" href="#about">Get to know us <ArrowUpRight size={16} /></a></div>
          <div className="intro-aside"><div className="aside-rule" /><span>01 — MOBILE PHONES</span><span>02 — ACCESSORIES</span><span>03 — REPAIRS & SUPPORT</span><small>One neighborhood destination.<br />Many ways to stay connected.</small></div>
        </section>

        <section className="services section-pad" id="services">
          <div className="section-heading"><div><p className="eyebrow"><span className="eyebrow-line" /> WHAT WE DO</p><h2>Everything mobile.<br /><em>All in one place.</em></h2></div><p className="heading-aside">From a new device to a helping hand when something goes wrong, we're here for the everyday moments that keep you connected.</p></div>
          <div className="service-grid">{services.map((item, index) => <a className={`service-card service-card-${index + 1}`} href={index === 2 ? '#repair' : '#products'} key={item.title}><span className="service-index">0{index + 1}</span><span className="service-icon"><item.icon size={21} strokeWidth={1.7} /></span><h3>{item.title}</h3><p>{item.text}</p><span className="service-link">Explore <ArrowUpRight size={16} /></span></a>)}</div>
        </section>

        <section className="products section-pad" id="products">
          <div className="section-heading products-heading"><div><p className="eyebrow light"><span className="eyebrow-line" /> FIND YOUR NEXT ESSENTIAL</p><h2>Explore the <em>collection.</em></h2></div><p className="heading-aside">Browse our main product categories. Availability and pricing change — contact us to confirm what's in store.</p></div>
          <div className="catalog-tools"><div className="filter-tabs" role="group" aria-label="Filter products by category">{(['All', 'Phones', 'Accessories', 'Spare parts'] as ProductCategory[]).map((item) => <button key={item} type="button" className={category === item ? 'filter-tab active' : 'filter-tab'} onClick={() => setCategory(item)}>{item}</button>)}</div><label className="search-box"><Search size={17} /><input type="search" placeholder="Search categories" aria-label="Search product categories" value={query} onChange={(event) => setQuery(event.target.value)} /><kbd>⌕</kbd></label></div>
          <div className="product-grid">{filteredProducts.map((item, index) => <article className="product-card" key={item.name}><div className="product-image"><img src={item.image} alt={item.imageAlt} loading="lazy" /><span className="product-number">0{index + 1}</span><span className="product-badge">{item.category}</span><button className="product-arrow" aria-label={`Enquire about ${item.name}`} onClick={() => sendWhatsApp(`Hello, I would like to enquire about ${item.name}. Please let me know current availability and pricing.`)}><ArrowUpRight size={18} /></button></div><div className="product-info"><div className="product-title"><span className="product-icon"><item.icon size={17} /></span><h3>{item.name}</h3></div><p>{item.description}</p><div className="product-bottom"><span>Price on enquiry</span><button type="button" onClick={() => { setSelectedProduct(item.name); showContactNote() }}>Ask about availability <ArrowRight size={14} /></button></div></div></article>)}</div>
          {filteredProducts.length === 0 && <div className="empty-results"><CircleHelp size={20} /><p>No categories match “{query}”. Try another search.</p></div>}
          <p className="catalog-note"><span className="note-dot" /> Products shown represent categories only. Ask our team to confirm current models, brands, compatibility and availability.</p>
        </section>

        <section className="repair-section section-pad" id="repair">
          <div className="repair-image"><img src="https://images.unsplash.com/photo-1735875530804-d661ca2001da?auto=format&fit=crop&w=1200&q=88" alt="A technician inspecting a smartphone motherboard with repair tools" loading="lazy" /><div className="repair-image-shade" /><div className="repair-image-note"><span className="repair-note-icon"><Zap size={17} /></span><span><b>Start with a diagnosis</b><small>Quote before repair begins</small></span></div><span className="image-vertical-label">CARE FOR YOUR DEVICE — EVERY STEP</span></div>
          <div className="repair-copy"><p className="eyebrow"><span className="eyebrow-line" /> EXPERT HANDS, CLEAR ANSWERS</p><h2>Professional phone<br /><em>repairs you can trust.</em></h2><p className="repair-lede">Let's get to the root of the problem. Our repair process starts with an inspection, so you can understand the issue and the next step before work begins.</p><ol className="repair-steps">{process.map((step, index) => <li key={step}><span className="step-number">0{index + 1}</span><span>{step}</span></li>)}</ol><a className="button button-dark" href="#repair-form">Request a repair <ArrowRight size={16} /></a></div>
        </section>

        <section className="why section-pad"><div className="why-heading"><div><p className="eyebrow light"><span className="eyebrow-line" /> THE MANSOUR BK2 DIFFERENCE</p><h2>Care that keeps<br /><em>you connected.</em></h2></div><p>We believe shopping for technology and caring for the device you own should feel straightforward, personal and dependable.</p></div><div className="benefit-grid">{benefits.map((item, index) => <div className="benefit-card" key={item.title}><span className="benefit-index">0{index + 1}</span><span className="benefit-icon"><item.icon size={20} /></span><h3>{item.title}</h3><p>{item.text}</p></div>)}</div><div className="why-bottom"><span>LOCALLY ROOTED <b>·</b> CUSTOMER FOCUSED <b>·</b> HERE TO HELP</span><a href="#contact">Come say hello <ArrowUpRight size={15} /></a></div></section>

        <section className="about section-pad" id="about"><div className="about-stamp"><span>MB</span><small>ESTABLISHED<br />IN NIGERIA</small></div><div className="about-copy"><p className="eyebrow"><span className="eyebrow-line" /> A LITTLE ABOUT US</p><h2>Meet the team<br />behind <em>your next fix.</em></h2><p>MANSOUR BK2 GLOBAL CONCEPT LTD is a Nigerian registered business operating in the mobile phone and electronics industry. We focus on mobile phones, accessories, spare parts and professional repair services.</p><p>Based at YAYO PLAZA GSM MARKET in Farm Center, Kano, our goal is to be a trusted destination for mobile technology, dependable technical support and a convenient shopping experience.</p><a className="text-link" href="#contact">Find us in Kano <MapPin size={15} /></a></div><div className="about-photo"><img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1100&q=85" alt="A welcoming modern technology workspace" loading="lazy" /><div className="about-photo-caption"><span>KANO, NIGERIA</span><ArrowUpRight size={17} /></div></div></section>

        <section className="contact section-pad" id="contact"><div className="contact-heading"><p className="eyebrow light"><span className="eyebrow-line" /> LET'S GET YOU CONNECTED</p><h2>Questions? We're<br /><em>just around the corner.</em></h2><p>Reach out about a product, accessory or repair, or stop by our location in Farm Center.</p></div><div className="contact-layout"><div className="contact-details"><div className="contact-detail"><span className="detail-icon"><MapPin size={19} /></span><div><small>VISIT OUR STORE</small><p>{businessAddress}</p><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(businessAddress)}`} target="_blank" rel="noreferrer">Open in Google Maps <ArrowUpRight size={14} /></a></div></div><div className="contact-detail"><span className="detail-icon"><ShieldCheck size={19} /></span><div><small>COMPANY DETAILS</small><p>MANSOUR BK2 GLOBAL CONCEPT LTD</p><span>CAC Registration Number: RC 9316003</span><span>TIN: 2621937037720</span></div></div><div className="contact-detail"><span className="detail-icon"><Clock3 size={19} /></span><div><small>PHONE OR EMAIL</small><p>{businessContact.telephone || 'Telephone details to be added'}</p><span>{businessContact.email || 'Email address to be added'}</span></div></div><button className="button button-mint contact-whatsapp" onClick={() => sendWhatsApp('Hello, I would like to learn more about MANSOUR BK2 GLOBAL CONCEPT LTD.')}> <MessageCircle size={17} /> Chat with us on WhatsApp <ArrowUpRight size={15} /></button></div>
          <div className="forms-column"><form className="contact-form" onSubmit={handleEnquiry}><div className="form-top"><span>GENERAL ENQUIRY</span><ArrowUpRight size={16} /></div><h3>How can we help?</h3><div className="form-row"><label>Your name<input name="name" required placeholder="e.g. Amina Yusuf" autoComplete="name" /></label><label>Phone number<input name="phone" required type="tel" placeholder="Your contact number" autoComplete="tel" /></label></div><label>What do you need help with?<select name="service" defaultValue={selectedProduct ? 'Mobile phone' : ''} required><option value="" disabled>Select a topic</option><option>Mobile phone</option><option>Phone accessories</option><option>Spare parts</option><option>Repair service</option><option>Other enquiry</option></select></label><label>Your message<textarea name="message" rows={3} required placeholder={selectedProduct ? `Ask us about ${selectedProduct}...` : 'Tell us a little more...'} /></label><button className="button button-dark form-submit" type="submit">Prepare WhatsApp enquiry <ArrowRight size={15} /></button></form>
            <form className="repair-form" id="repair-form" onSubmit={handleRepair}><div className="form-top"><span>REPAIR REQUEST</span><Wrench size={16} /></div><h3>Tell us about your device.</h3><div className="form-row"><label>Your name<input name="repairName" required placeholder="Your name" autoComplete="name" /></label><label>Phone number<input name="repairPhone" required type="tel" placeholder="Your contact number" autoComplete="tel" /></label></div><label>Device and model<input name="device" required placeholder="e.g. phone make and model" /></label><label>What is the issue?<textarea name="issue" rows={2} required placeholder="Describe the problem" /></label><button className="button button-outline-dark form-submit" type="submit">Prepare repair request <ArrowRight size={15} /></button></form>
          </div></div>
          {notice && <div className="setup-notice" role="status"><span className="notice-icon"><CircleHelp size={18} /></span><div><b>Contact setup needed</b><p>{notice}{selectedProduct ? ` Selected category: ${selectedProduct}.` : ''}</p><small>Forms prepare a message only; requests are not sent until WhatsApp is configured.</small></div><button type="button" aria-label="Dismiss notice" onClick={() => setNotice('')}><X size={17} /></button></div>}
        </section>
      </main>

      <footer className="site-footer"><div className="footer-main"><div className="footer-brand-col"><a className="brand footer-brand" href="#home"><span className="brand-mark"><Smartphone size={21} /></span><span className="brand-copy"><strong>MANSOUR BK2</strong><small>GLOBAL CONCEPT LTD</small></span></a><p>Mobile phones, accessories, repairs<br />& technical services in Kano.</p><div className="footer-location"><MapPin size={15} /><span>{businessAddress}</span></div></div><div className="footer-nav-col"><span className="footer-label">EXPLORE</span><a href="#products">Products</a><a href="#services">Services</a><a href="#about">About us</a><a href="#contact">Contact</a></div><div className="footer-nav-col"><span className="footer-label">GET IN TOUCH</span><a href="#contact">Phone details to be added</a><a href="#contact">Email address to be added</a><button onClick={() => sendWhatsApp('Hello, I would like to contact MANSOUR BK2 GLOBAL CONCEPT LTD.')}>WhatsApp enquiry <ArrowUpRight size={13} /></button></div><div className="footer-legal"><span className="footer-label">REGISTERED BUSINESS</span><p>MANSOUR BK2 GLOBAL CONCEPT LTD</p><span>CAC Registration Number: RC 9316003</span><span>TIN: 2621937037720</span></div></div><div className="footer-bottom"><span>© 2026 MANSOUR BK2 GLOBAL CONCEPT LTD. All rights reserved.</span><a href="#home">Back to top <ChevronDown size={14} className="back-to-top-icon" /></a><span>MADE FOR YOUR EVERYDAY</span></div></footer>
      <button className="floating-contact" aria-label="Contact MANSOUR BK2 GLOBAL CONCEPT LTD" onClick={() => showContactNote()}><MessageCircle size={19} /><span>Let's talk</span></button>
    </>
  )
}

export default App
