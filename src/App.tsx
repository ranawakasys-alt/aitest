import React, { useState } from 'react';
import {
  Coffee,
  Clock,
  MapPin,
  Phone,
  Mail,
  Menu as MenuIcon,
  X as CloseIcon,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Send,
  Heart,
  Instagram,
  Facebook,
  Twitter,
  ChevronDown,
} from 'lucide-react';

interface CoffeeItem {
  id: string;
  name: string;
  category: 'Hot' | 'Iced' | 'Specialty';
  price: string;
  description: string;
  notes: string[];
  image: string;
}

const COFFEE_MENU: CoffeeItem[] = [
  {
    id: 'espresso-romano',
    name: 'Espresso Romano',
    category: 'Hot',
    price: '$3.75',
    description: 'A concentrated double shot of single-origin beans brightened with a fresh curl of organic lemon zest.',
    notes: ['Single Origin', 'Citrus Crema', 'Bold Body'],
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'velvet-flat-white',
    name: 'Velvet Flat White',
    category: 'Hot',
    price: '$4.75',
    description: 'Silky micro-textured steamed whole milk poured patiently over an espresso double ristretto.',
    notes: ['House Blend', 'Velvety Foam', 'Sweet Caramel'],
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'salted-caramel-macchiato',
    name: 'Salted Caramel Macchiato',
    category: 'Specialty',
    price: '$5.50',
    description: 'Steamed milk stained with bold espresso, pure Madagascar vanilla, and house-made salted caramel drizzle.',
    notes: ['Madagascar Vanilla', 'Sea Salt Drizzle', 'Decadent'],
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'honey-almond-latte',
    name: 'Honey Almond Latte',
    category: 'Specialty',
    price: '$5.25',
    description: 'Golden espresso folded into gently warmed almond milk, infused with raw wildflower honey and ground cinnamon.',
    notes: ['Wildflower Honey', 'Warm Cinnamon', 'Dairy-Free Base'],
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cold-brew-reserve',
    name: 'Cold Brew Reserve',
    category: 'Iced',
    price: '$4.50',
    description: 'Ethiopian Yirgacheffe grounds slow-steeped in chilled filtered water for 18 hours for a sweet, low-acid nectar.',
    notes: ['18-Hour Steep', 'Low Acidity', 'Dark Chocolate'],
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'classic-cappuccino',
    name: 'Classic Cappuccino',
    category: 'Hot',
    price: '$4.50',
    description: 'The timeless Italian ratio of rich espresso, velvety steamed milk, and a pillowy dome of microfoam dusted with cocoa.',
    notes: ['Equal Ratios', 'Airy Microfoam', 'Dusted Cocoa'],
    image: 'https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?auto=format&fit=crop&w=800&q=80',
  },
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Hot' | 'Iced' | 'Specialty'>('All');
  
  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Question',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: 'General Question',
        message: '',
      });
    }, 600);
  };

  const filteredMenu = activeCategory === 'All'
    ? COFFEE_MENU
    : COFFEE_MENU.filter((item) => item.category === activeCategory);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Menu', href: '#menu' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EE] text-[#2B1810]">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#FAF6EE]/90 backdrop-blur-md border-b border-[#EADFCE] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              id="nav-logo"
              href="#home"
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="w-11 h-11 rounded-2xl bg-[#2B1810] flex items-center justify-center text-[#FAF6EE] shadow-sm group-hover:scale-105 transition-transform duration-300">
                <Coffee className="w-5 h-5 text-[#E4D7C3]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif-heading text-2xl font-bold tracking-tight text-[#2B1810] leading-none">
                  Bean &amp; Brew
                </span>
                <span className="text-[11px] font-medium tracking-wider uppercase text-[#8C6239] mt-1">
                  Artisanal Coffee House
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  id={`nav-link-${link.label.toLowerCase()}`}
                  href={link.href}
                  className="text-base font-medium text-[#543725] hover:text-[#2B1810] transition-colors py-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#8C6239] hover:after:w-full after:transition-all after:duration-200"
                >
                  {link.label}
                </a>
              ))}
              <a
                id="nav-cta-btn"
                href="#menu"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#2B1810] text-[#FAF6EE] text-sm font-semibold hover:bg-[#3D2419] transition-all duration-200 shadow-sm hover:shadow active:scale-95"
              >
                Order At Counter
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                id="mobile-menu-toggle-btn"
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                className="p-2.5 rounded-xl text-[#2B1810] hover:bg-[#F0E8DC] transition-colors focus:outline-none"
              >
                {mobileMenuOpen ? (
                  <CloseIcon className="w-6 h-6" />
                ) : (
                  <MenuIcon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu-container"
            className="md:hidden border-b border-[#EADFCE] bg-[#FAF6EE] px-4 pt-2 pb-6 space-y-3 shadow-lg"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                id={`mobile-nav-${link.label.toLowerCase()}`}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-base font-medium text-[#2B1810] hover:bg-[#F0E8DC] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <a
                id="mobile-menu-cta-btn"
                href="#menu"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center px-5 py-3 rounded-full bg-[#2B1810] text-[#FAF6EE] text-base font-semibold hover:bg-[#3D2419] transition-colors"
              >
                View Menu
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section
          id="home"
          className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-[#EADFCE]/60"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Hero Left Content */}
              <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F0E8DC] border border-[#E4D7C3] text-[#8C6239] text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-[#8C6239]" />
                  <span>Historic Downtown • Specialty Coffee Roasters</span>
                </div>

                <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2B1810] leading-[1.12]">
                  Slow roasted beans. Handcrafted with heart.
                </h1>

                <p className="text-lg sm:text-xl text-[#543725] max-w-xl font-normal leading-relaxed">
                  Welcome to <span className="font-semibold text-[#2B1810]">Bean &amp; Brew</span>.
                  We celebrate single-origin coffees, gentle mornings, and warm neighborhood conversations in every handcrafted cup.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 w-full sm:w-auto">
                  <a
                    id="hero-view-menu-btn"
                    href="#menu"
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#2B1810] text-[#FAF6EE] text-base font-semibold hover:bg-[#3D2419] hover:shadow-md transition-all duration-200 active:scale-98 group"
                  >
                    <span>View Menu</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a
                    id="hero-about-btn"
                    href="#about"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#F0E8DC] text-[#2B1810] text-base font-semibold hover:bg-[#E4D7C3] border border-[#E4D7C3] transition-all duration-200"
                  >
                    Our Story
                  </a>
                </div>

                {/* Hero Feature Badges */}
                <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#EADFCE] w-full max-w-lg">
                  <div>
                    <span className="block text-xl sm:text-2xl font-bold font-serif-heading text-[#2B1810]">100%</span>
                    <span className="text-xs sm:text-sm text-[#8C6239] font-medium">Arabica Origin</span>
                  </div>
                  <div>
                    <span className="block text-xl sm:text-2xl font-bold font-serif-heading text-[#2B1810]">Daily</span>
                    <span className="text-xs sm:text-sm text-[#8C6239] font-medium">Small-Batch Roast</span>
                  </div>
                  <div>
                    <span className="block text-xl sm:text-2xl font-bold font-serif-heading text-[#2B1810]">Fair</span>
                    <span className="text-xs sm:text-sm text-[#8C6239] font-medium">Direct Trade</span>
                  </div>
                </div>
              </div>

              {/* Hero Right Visual */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  {/* Decorative background shape */}
                  <div className="absolute -inset-2 rounded-3xl bg-[#F0E8DC] rotate-2 transform -z-10" />
                  
                  {/* Image Card */}
                  <div className="overflow-hidden rounded-2xl shadow-xl border border-[#E4D7C3] bg-white">
                    <img
                      src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80"
                      alt="Barista brewing artisan pour-over coffee at Bean and Brew"
                      className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="p-5 bg-[#FAF6EE] border-t border-[#EADFCE]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#2B1810] flex items-center justify-center text-[#FAF6EE]">
                            <Coffee className="w-5 h-5 text-[#E4D7C3]" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#2B1810]">Fresh Brewed Daily</p>
                            <p className="text-xs text-[#8C6239]">Door opens 6:30 AM every weekday</p>
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#EADFCE] text-[#543725]">
                          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                          Open Today
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Menu Section */}
        <section id="menu" className="py-20 md:py-28 bg-[#FAF6EE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#8C6239] uppercase">
                Artisan Selections
              </span>
              <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B1810] mt-2 tracking-tight">
                Our Coffee Menu
              </h2>
              <p className="text-base sm:text-lg text-[#543725] mt-3 font-normal">
                Six signature handcrafted coffees, roasted with care and prepared by our dedicated baristas.
              </p>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
                {(['All', 'Hot', 'Iced', 'Specialty'] as const).map((cat) => (
                  <button
                    key={cat}
                    id={`filter-${cat.toLowerCase()}`}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none ${
                      activeCategory === cat
                        ? 'bg-[#2B1810] text-[#FAF6EE] shadow-sm'
                        : 'bg-[#F0E8DC] text-[#543725] hover:bg-[#E4D7C3]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* 6 Coffee Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMenu.map((item) => (
                <div
                  key={item.id}
                  id={`menu-card-${item.id}`}
                  className="bg-white rounded-2xl overflow-hidden border border-[#EADFCE] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group hover:-translate-y-1"
                >
                  {/* Item Image */}
                  <div className="relative h-56 overflow-hidden bg-[#F0E8DC]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-3.5 py-1.5 rounded-full bg-[#FAF6EE]/95 backdrop-blur-sm text-[#2B1810] font-bold text-base shadow-sm border border-[#EADFCE]">
                        {item.price}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-4">
                      <span className="px-2.5 py-1 rounded-md bg-[#2B1810]/80 text-[#FAF6EE] text-xs font-medium tracking-wide backdrop-blur-xs">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Item Content */}
                  <div className="p-6 flex flex-col flex-grow justify-between bg-white">
                    <div>
                      <h3 className="font-serif-heading text-xl font-bold text-[#2B1810] group-hover:text-[#8C6239] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-sm text-[#543725] mt-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Tasting Notes */}
                    <div className="mt-5 pt-4 border-t border-[#F0E8DC] flex flex-wrap gap-1.5">
                      {item.notes.map((note) => (
                        <span
                          key={note}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#FAF6EE] text-[#8C6239] border border-[#EADFCE]"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Note under menu */}
            <div className="mt-12 text-center text-sm text-[#8C6239] bg-[#F0E8DC]/70 max-w-xl mx-auto py-3 px-6 rounded-full border border-[#E4D7C3]">
              All drinks available with Oat Milk, Almond Milk, or House-made Madagascar Vanilla on request.
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 md:py-28 bg-[#F0E8DC]/50 border-y border-[#EADFCE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* About Images Grid */}
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <img
                      src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=700&q=80"
                      alt="Warm cozy coffee cup at Bean & Brew"
                      className="rounded-2xl shadow-md object-cover h-56 w-full"
                      loading="lazy"
                    />
                    <div className="p-6 rounded-2xl bg-[#2B1810] text-[#FAF6EE] flex flex-col justify-center">
                      <span className="font-serif-heading text-3xl font-bold text-[#E4D7C3]">Since 2021</span>
                      <p className="text-xs text-[#FAF6EE]/80 mt-1">Crafting warm mornings for our local neighborhood.</p>
                    </div>
                  </div>
                  <div className="space-y-4 pt-6">
                    <div className="p-6 rounded-2xl bg-white border border-[#E4D7C3] shadow-sm">
                      <Heart className="w-6 h-6 text-[#8C6239] mb-2" />
                      <h4 className="font-bold text-sm text-[#2B1810]">Mindful Hospitality</h4>
                      <p className="text-xs text-[#543725] mt-1">Every guest is treated like family from their first cup.</p>
                    </div>
                    <img
                      src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=700&q=80"
                      alt="Fresh coffee beans on a table"
                      className="rounded-2xl shadow-md object-cover h-64 w-full"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* About Text Content */}
              <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col space-y-6 text-left">
                <div>
                  <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#8C6239] uppercase">
                    Our Philosophy
                  </span>
                  <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B1810] mt-2 tracking-tight">
                    Rooted in Craft, Roasted for Community.
                  </h2>
                </div>

                <p className="text-base sm:text-lg text-[#543725] leading-relaxed">
                  Bean &amp; Brew was founded with a quiet promise: to strip away the rush of modern life and bring reverence back to coffee. We partner directly with sustainable smallholder farms in Colombia, Ethiopia, and Guatemala, paying ethical premiums that honor the farmers&apos; craft.
                </p>

                <p className="text-base sm:text-lg text-[#543725] leading-relaxed">
                  Every batch of beans is hand-roasted in small 5-kilo quantities twice weekly to ensure peak flavor. Whether you need a quick double espresso before your morning commute, or an afternoon table to read and unwind, our doors are open with warm smiles and steaming cups.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FAF6EE] border border-[#E4D7C3] flex items-center justify-center flex-shrink-0 text-[#8C6239] mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#2B1810]">Direct Trade Sourced</h4>
                      <p className="text-xs text-[#543725] mt-0.5">Ethically imported with fair compensation to origin growers.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FAF6EE] border border-[#E4D7C3] flex items-center justify-center flex-shrink-0 text-[#8C6239] mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#2B1810]">Cozy Seating &amp; Wi-Fi</h4>
                      <p className="text-xs text-[#543725] mt-0.5">Natural sunlight, soft acoustic music, and welcoming space.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    id="about-visit-btn"
                    href="#contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#2B1810] hover:text-[#8C6239] group transition-colors"
                  >
                    <span>Come visit us today in Historic Downtown</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 md:py-28 bg-[#FAF6EE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#8C6239] uppercase">
                Find Our Cafe
              </span>
              <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B1810] mt-2 tracking-tight">
                Visit Us &amp; Say Hello
              </h2>
              <p className="text-base sm:text-lg text-[#543725] mt-3 font-normal">
                Drop in for your morning ritual, or send us a message for table reservations and event questions.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Column: Contact & Hours Cards */}
              <div className="lg:col-span-5 space-y-6">
                {/* Location Card */}
                <div
                  id="contact-info-address"
                  className="p-6 rounded-2xl bg-white border border-[#EADFCE] shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#F0E8DC] flex items-center justify-center text-[#8C6239] flex-shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#2B1810]">Our Address</h3>
                      <p className="text-sm text-[#543725] mt-1 leading-relaxed">
                        428 Maple Blossom Lane<br />
                        Historic Downtown District<br />
                        Seattle, WA 98101
                      </p>
                      <span className="inline-block mt-3 text-xs font-semibold text-[#8C6239] hover:underline cursor-pointer">
                        Across from City Library Square
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hours Card */}
                <div
                  id="contact-info-hours"
                  className="p-6 rounded-2xl bg-white border border-[#EADFCE] shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#F0E8DC] flex items-center justify-center text-[#8C6239] flex-shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div className="w-full">
                      <h3 className="font-bold text-base text-[#2B1810]">Opening Hours</h3>
                      <div className="mt-3 space-y-2 text-sm text-[#543725]">
                        <div className="flex justify-between items-center py-1 border-b border-[#FAF6EE]">
                          <span className="font-medium text-[#2B1810]">Monday – Friday</span>
                          <span className="font-semibold text-[#8C6239]">6:30 AM – 6:00 PM</span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-b border-[#FAF6EE]">
                          <span className="font-medium text-[#2B1810]">Saturday – Sunday</span>
                          <span className="font-semibold text-[#8C6239]">7:30 AM – 7:00 PM</span>
                        </div>
                        <div className="flex justify-between items-center py-1">
                          <span className="text-xs text-[#8C6239]">Public Holidays</span>
                          <span className="text-xs font-medium text-[#543725]">8:00 AM – 4:00 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phone & Email Card */}
                <div
                  id="contact-info-phone"
                  className="p-6 rounded-2xl bg-white border border-[#EADFCE] shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#F0E8DC] flex items-center justify-center text-[#8C6239] flex-shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#2B1810]">Phone &amp; Inquiries</h3>
                      <p className="text-sm font-semibold text-[#2B1810] mt-1">
                        (555) 234-5678
                      </p>
                      <p className="text-xs text-[#8C6239] mt-0.5">
                        hello@beanandbrewcoffee.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="lg:col-span-7">
                <div className="p-8 sm:p-10 rounded-2xl bg-white border border-[#EADFCE] shadow-sm">
                  <h3 className="font-serif-heading text-2xl font-bold text-[#2B1810]">
                    Send us a Message
                  </h3>
                  <p className="text-sm text-[#543725] mt-1 mb-8">
                    Have questions regarding beans, group catering, or just want to say hi? We usually reply within a few hours.
                  </p>

                  {formSubmitted ? (
                    <div
                      id="contact-success-alert"
                      className="p-8 rounded-2xl bg-[#FAF6EE] border border-[#E4D7C3] text-center flex flex-col items-center space-y-4"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#2B1810] text-[#FAF6EE] flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-[#E4D7C3]" />
                      </div>
                      <h4 className="font-serif-heading text-xl font-bold text-[#2B1810]">
                        Message Received!
                      </h4>
                      <p className="text-sm text-[#543725] max-w-sm">
                        Thank you for reaching out to Bean &amp; Brew. Our team will read your note and get back to you shortly.
                      </p>
                      <button
                        id="contact-reset-btn"
                        type="button"
                        onClick={() => setFormSubmitted(false)}
                        className="mt-2 px-6 py-2 rounded-full bg-[#2B1810] text-[#FAF6EE] text-sm font-medium hover:bg-[#3D2419] transition-colors"
                      >
                        Send Another Note
                      </button>
                    </div>
                  ) : (
                    <form id="contact-form" onSubmit={handleFormSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-xs font-semibold uppercase tracking-wider text-[#2B1810] mb-2"
                          >
                            Your Name <span className="text-[#8C6239]">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Eleanor Vance"
                            className="w-full px-4 py-3 rounded-xl border border-[#EADFCE] bg-[#FAF6EE]/50 text-[#2B1810] text-sm focus:outline-none focus:ring-2 focus:ring-[#8C6239] focus:border-transparent transition-all"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="block text-xs font-semibold uppercase tracking-wider text-[#2B1810] mb-2"
                          >
                            Email Address <span className="text-[#8C6239]">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="eleanor@example.com"
                            className="w-full px-4 py-3 rounded-xl border border-[#EADFCE] bg-[#FAF6EE]/50 text-[#2B1810] text-sm focus:outline-none focus:ring-2 focus:ring-[#8C6239] focus:border-transparent transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-xs font-semibold uppercase tracking-wider text-[#2B1810] mb-2"
                        >
                          Topic
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-[#EADFCE] bg-[#FAF6EE]/50 text-[#2B1810] text-sm focus:outline-none focus:ring-2 focus:ring-[#8C6239] focus:border-transparent transition-all"
                        >
                          <option value="General Question">General Question</option>
                          <option value="Bean Sourcing & Roasting">Bean Sourcing &amp; Roasting</option>
                          <option value="Events & Catering">Events &amp; Catering</option>
                          <option value="Feedback">Feedback</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-xs font-semibold uppercase tracking-wider text-[#2B1810] mb-2"
                        >
                          Your Message <span className="text-[#8C6239]">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell us what's on your mind or request details about our seasonal beans..."
                          className="w-full px-4 py-3 rounded-xl border border-[#EADFCE] bg-[#FAF6EE]/50 text-[#2B1810] text-sm focus:outline-none focus:ring-2 focus:ring-[#8C6239] focus:border-transparent transition-all resize-none"
                        ></textarea>
                      </div>

                      <button
                        id="contact-submit-btn"
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#2B1810] text-[#FAF6EE] text-sm font-semibold hover:bg-[#3D2419] transition-all duration-200 shadow-sm active:scale-98 disabled:opacity-75"
                      >
                        {isSubmitting ? (
                          <span>Sending message...</span>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#2B1810] text-[#FAF6EE] border-t border-[#3D2419] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand column */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FAF6EE] flex items-center justify-center text-[#2B1810]">
                  <Coffee className="w-5 h-5 text-[#8C6239]" />
                </div>
                <span className="font-serif-heading text-2xl font-bold tracking-tight text-[#FAF6EE]">
                  Bean &amp; Brew
                </span>
              </div>
              <p className="text-sm text-[#E4D7C3]/80 max-w-sm leading-relaxed">
                A cozy neighborhood sanctuary dedicated to small-batch roasted coffees, seasonal pastries, and genuine community hospitality.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <a
                  href="#home"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-[#3D2419] text-[#E4D7C3] flex items-center justify-center hover:bg-[#8C6239] hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#home"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-[#3D2419] text-[#E4D7C3] flex items-center justify-center hover:bg-[#8C6239] hover:text-white transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#home"
                  aria-label="Twitter"
                  className="w-9 h-9 rounded-full bg-[#3D2419] text-[#E4D7C3] flex items-center justify-center hover:bg-[#8C6239] hover:text-white transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Navigation Links */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-[#E4D7C3] mb-4">
                Explore
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a href="#home" className="text-[#FAF6EE]/80 hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#menu" className="text-[#FAF6EE]/80 hover:text-white transition-colors">
                    Coffee Menu
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-[#FAF6EE]/80 hover:text-white transition-colors">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-[#FAF6EE]/80 hover:text-white transition-colors">
                    Location &amp; Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Hours Summary */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-[#E4D7C3] mb-4">
                Cafe Hours
              </h4>
              <div className="space-y-2 text-xs text-[#FAF6EE]/80">
                <p>
                  <span className="font-medium text-white block">Mon – Fri:</span>
                  6:30 AM – 6:00 PM
                </p>
                <p>
                  <span className="font-medium text-white block">Sat – Sun:</span>
                  7:30 AM – 7:00 PM
                </p>
                <p className="pt-2 text-[11px] text-[#E4D7C3]">
                  428 Maple Blossom Lane, Seattle
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[#3D2419] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF6EE]/60">
            <p>&copy; {new Date().getFullYear()} Bean &amp; Brew Coffee Co. All rights reserved.</p>
            <p className="flex items-center gap-1">
              <span>Handcrafted for coffee enthusiasts everywhere</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

