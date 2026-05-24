/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  ArrowRight, 
  Lock, 
  Check, 
  Home, 
  TrendingUp, 
  HelpCircle, 
  Layers, 
  Heart, 
  Star, 
  Download, 
  Database,
  ArrowUpRight,
  Sparkles,
  ShieldAlert,
  CalendarCheck
} from 'lucide-react';
import DreamableLogo from './components/DreamableLogo';
import ZipAvailabilityChecker from './components/ZipAvailabilityChecker';
import PhoneScriptPlayer from './components/PhoneScriptPlayer';
import CheckoutModal from './components/CheckoutModal';
import { LEAD_PACKAGES, FAQS } from './data';
import { LeadPackage } from './types';

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<LeadPackage>(LEAD_PACKAGES[1]); // Default to 400 package
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const openCheckoutWithPlan = (plan: LeadPackage, prefilledZip?: string) => {
    setSelectedPlan(plan);
    setIsCheckoutOpen(true);
  };

  const handleZipCheckedSuccessfully = (zip: string) => {
    // Open checkout with their zip code pre-filled!
    const updatedPlan = { ...selectedPlan };
    openCheckoutWithPlan(updatedPlan);
    
    // Give a brief delay to allow modal lifecycle to register then focus and inject
    setTimeout(() => {
      // Find checkout form fields and trigger injection
      const zipField = document.getElementById('serviceZip') as HTMLInputElement;
      if (zipField) {
        zipField.value = zip;
        // Dispatch synthetic event to let React state manage it
        const event = new Event('input', { bubbles: true });
        zipField.dispatchEvent(event);
      }
    }, 150);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div id="dreamable-website-root" className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-white selection:text-black antialiased overflow-x-hidden">
      
      {/* GLOBAL TOP PROMOTION BANNER */}
      <div id="top-promo-banner" className="bg-white text-black py-2.5 px-4 text-center text-xs font-bold tracking-wide relative z-40 flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-yellow-500 animate-spin" />
        <span>LIMITED TERRITORY OFFER: Claim exclusive zip codes. Direct phone scripts & TEXT playbooks included free.</span>
        <button 
          onClick={() => openCheckoutWithPlan(LEAD_PACKAGES[1])}
          className="underline font-extrabold hover:text-stone-850 transition-colors ml-1 inline-flex items-center gap-0.5"
        >
          Secure Your Locks Now <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* STICKY HEADER (Glassmorphic REDX Reference) */}
      <header id="site-header" className="sticky top-0 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-900 z-30 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-6">
            <a href="#" className="flex items-center">
              <DreamableLogo variant="dark" className="h-10" />
            </a>
            <span className="hidden md:inline-flex py-1 px-2.5 bg-neutral-900 border border-neutral-800 rounded-full text-[10px] text-neutral-400 font-mono tracking-wider font-semibold">
              Predictive Leads Engine v4.8
            </span>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-neutral-400">
            <a href="#problem-section" className="hover:text-white transition-colors">The Opportunity</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">Predictive Analytics</a>
            <a href="#scripts" className="hover:text-white transition-colors">Dialogue Scripts</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing Territories</a>
            <a href="#faqs" className="hover:text-white transition-colors">Agent Help FAQs</a>
          </nav>

          {/* CTA & Contact Actions */}
          <div className="flex items-center gap-4">
            <a 
              href="tel:18005550199" 
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-neutral-400 hover:text-white transition-colors mr-2"
            >
              <Phone className="w-3.5 h-3.5 text-neutral-500" />
              <span>(800) 555-0199</span>
            </a>
            
            <button
              id="header-cta-button"
              onClick={() => openCheckoutWithPlan(LEAD_PACKAGES[1])}
              className="bg-neutral-100 text-black py-2.5 px-5 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-neutral-200 hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer shadow-sm shadow-white/5"
            >
              Get Leads Now
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION (REDX Layout Reference - Highly Conversion Centered) */}
      <section id="hero-segment" className="relative py-16 lg:py-24 border-b border-neutral-900 overflow-hidden">
        {/* Abstract background vector representation grids */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* HERO LEFT: The Value Hook */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <span className="inline-flex py-1 px-3 bg-neutral-900 border border-neutral-800 rounded-full text-[10px] text-neutral-300 font-bold tracking-widest uppercase">
                🛡️ Territory Exclusive Real Estate Intelligence
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05]">
                Find Listings <span className="underline decoration-stone-500 underline-offset-8">BEFORE</span> They Hit Zillow.
              </h1>

              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Stop fighting other agents over recycled leads. Our custom predictive algorithms evaluate dozens of homeowner behavioral markers to locate coordinates of those most likely to sell shortly. Contact pre-market leads proactively before competitors arrive.
              </p>

              {/* Count metrics list */}
              <div className="grid grid-cols-3 gap-4 border-t border-b border-neutral-900 py-6 max-w-lg mx-auto lg:mx-0">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono">94.3%</div>
                  <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider mt-1">Territory Exclusivity</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono">&lt; 12h</div>
                  <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider mt-1">Lead Stream Delivery</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono">18.4%</div>
                  <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider mt-1">Sourcing ROI Uptick</div>
                </div>
              </div>

              {/* Small trust tag */}
              <p className="text-xs text-neutral-500 flex items-center justify-center lg:justify-start gap-1.5 leading-none">
                <Star className="w-3.5 h-3.5 fill-yellow-500 stroke-yellow-500" />
                <span>The ultimate data advantages for listings acquisition. Trusted by solo & brokerage teams alike.</span>
              </p>
            </div>

            {/* HERO RIGHT: Sourcing Territory Availability Checker Box */}
            <div className="lg:col-span-5">
              <div className="relative">
                {/* Visual blur circle accent */}
                <div className="absolute -inset-1.5 bg-neutral-800 rounded-2xl blur opacity-20 pointer-events-none" />
                <ZipAvailabilityChecker onSuccess={handleZipCheckedSuccessfully} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION: The Opportunity (Heart & Lucrative Real Estate) */}
      <section id="problem-section" className="py-20 bg-neutral-950 border-b border-neutral-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-[10px] font-mono font-bold text-neutral-400 tracking-widest uppercase">
              The Reality of Listings Sourcing
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Real Estate remains one of the greatest businesses to build.
            </h2>
            <div className="h-0.5 w-12 bg-neutral-800 mx-auto" />
            <p className="text-neutral-400 text-sm leading-relaxed">
              As a professional agent, you lock in listings and guide clients through life's most essential milestone—selling or searching for the sanctuary where families gather, bond, and build key relationships. Beyond personal fulfillment, it is incredibly lucrative.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Old Way vs New Way Columns */}
            <div className="bg-neutral-900/40 border border-neutral-900 rounded-2xl p-6 lg:p-8 space-y-5 relative">
              <span className="py-1 px-2.5 bg-red-950/25 border border-red-900/40 text-red-400 rounded-full text-[10px] tracking-wider uppercase font-extrabold absolute top-6 right-6">
                Reactive & Exhausting
              </span>
              <div className="h-10 w-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-neutral-100">The Sourcing Bottleneck</h3>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Most lead generators flag homeowner activity <strong className="text-neutral-200 font-medium">AFTER</strong> they enter public listings. By the time prospects hit Zillow, realtor.com, or public MLS boards, fifty other local operators are already dialling. This places you in exhausting bidding wars, crushing listings margins and forcing cut-throat competition.
              </p>
              <div className="text-[10px] text-neutral-500 font-mono">
                ✖ Cold call neighbors who closed years ago to send kids to neighborhood schools.
                <br />
                ✖ Contact elders who plan to "age in place" for another quarter century.
              </div>
            </div>

            <div className="bg-stone-900/30 border border-stone-800 rounded-2xl p-6 lg:p-8 space-y-5 relative">
              <span className="py-1 px-2.5 bg-emerald-950/35 border border-emerald-900/40 text-emerald-400 rounded-full text-[10px] tracking-wider uppercase font-extrabold absolute top-6 right-6">
                Predictive & Exclusive
              </span>
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <h1 className="text-lg font-bold text-white">The Predictive Breakthrough</h1>
              <p className="text-neutral-400 text-xs leading-relaxed">
                <strong>Right Time, Right Place Leads</strong> rewrites the playbook. By utilizing deep-intelligence predictive systems, we search pre-market indicators (loan ages, financial shifts, lifestyle timelines) to source those who are <strong className="text-white">most likely to move soon</strong>. Reach out proactively to listings contenders before they list.
              </p>
              <div className="text-[10px] text-emerald-400/90 font-mono">
                ✓ Reach verified pre-market home assets first.
                <br />
                ✓ Build relations before other brokers are aware.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: How It Works Grid */}
      <section id="how-it-works" className="py-20 bg-neutral-900/10 border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
            <span className="text-[10px] font-mono font-bold text-neutral-500 tracking-widest uppercase">
              Proactive Sourcing Blueprint
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              A Data-Driven Formula for Real Sells
            </h2>
            <p className="text-neutral-400 text-xs">
              How our pre-market algorithms route qualified exclusive seller leads straight into your active outbox.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            {/* Step 1 */}
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center font-black text-xs text-white mx-auto md:mx-0 font-mono shadow-sm">
                01
              </div>
              <h3 className="text-base font-bold text-white">Data Ingestion</h3>
              <p className="text-neutral-400 text-xs leading-relaxed">
                We monitor dozens of localized indicators per zip domain—assessing mortgage duration, deed history, equity values, property types, and market velocity to find likely listings sellers.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center font-black text-xs text-white mx-auto md:mx-0 font-mono shadow-sm">
                02
              </div>
              <h3 className="text-base font-bold text-white">Territory Lock</h3>
              <p className="text-neutral-400 text-xs leading-relaxed">
                We enforce direct zip exclusivity. Your designated territory bounds are instantly locked upon claiming, guaranteeing you zero licensing overlap from local subscribers.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center font-black text-xs text-white mx-auto md:mx-0 font-mono shadow-sm">
                03
              </div>
              <h3 className="text-base font-bold text-white">Daily Refresh</h3>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Unlock matching profiles, complete lists with phone numbers, estimated equity indicators, and verified emails, then leverage our structured script library to scale listings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Inline Script Player Preview */}
      <section id="scripts" className="py-20 bg-neutral-950 border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-12">
            
            {/* Left copy column */}
            <div className="lg:col-span-4 space-y-4 text-center lg:text-left">
              <span className="text-[10px] font-mono font-bold text-neutral-400 tracking-widest uppercase">
                Dialogue Assets Included
              </span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight leading-none">
                Engage leads with absolute certainty.
              </h2>
              <div className="h-0.5 w-10 bg-neutral-800 my-4 mx-auto lg:mx-0" />
              <p className="text-neutral-400 text-xs leading-relaxed">
                We don’t just deliver data and walk away. Every territorial subscription comes equipped with our proprietary outreach blueprints, teleprospecting dialogue scripts, and mail templates. Use our interactive coach to build robust pitching sequences.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => openCheckoutWithPlan(LEAD_PACKAGES[1])}
                  className="inline-flex items-center gap-1 text-xs font-bold text-white hover:underline pointer-events-auto"
                >
                  <span>Unlock complete playbooks and leads</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right script player component */}
            <div className="lg:col-span-8">
              <PhoneScriptPlayer />
            </div>

          </div>
        </div>
      </section>

      {/* SECTION: Pricing Matrix (The Core of Conversion) */}
      <section id="pricing" className="py-20 bg-neutral-950 border-b border-neutral-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-[10px] font-mono font-bold text-neutral-400 tracking-widest uppercase">
              Active Lead Offers
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Exclusive Zip territories. Match your budget volume.
              <br />
              All prices strictly locked.
            </h2>
            <p className="text-neutral-400 text-xs max-w-lg mx-auto">
              Select your required monthly leads index below. Territory locking activates immediately, claiming database ownership for your designated area.
            </p>
          </div>

          {/* Pricing Deck Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {LEAD_PACKAGES.map((plan) => {
              const isBestValue = plan.id === 'plan-400';
              return (
                <div
                  id={`pricing-card-${plan.id}`}
                  key={plan.id}
                  className={`border rounded-2xl p-6 flex flex-col justify-between transition-all relative ${
                    isBestValue
                      ? 'bg-stone-900/45 border-white shadow-xl shadow-white/5 ring-1 ring-white/50'
                      : 'bg-neutral-900/30 border-neutral-900 hover:border-neutral-800'
                  }`}
                >
                  {isBestValue && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-white text-black text-[9px] font-black uppercase tracking-widest rounded-full shadow-md">
                      Recommended Best Sourcing Ratio
                    </span>
                  )}

                  <div>
                    <h3 className="text-sm font-bold text-white tracking-tight uppercase tracking-wider">{plan.name}</h3>
                    {plan.saving && (
                      <span className="inline-block mt-1 text-[9px] bg-emerald-500/10 text-emerald-400 py-0.5 px-1.5 rounded font-bold uppercase">
                        {plan.saving}
                      </span>
                    )}

                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-4xl font-black text-white">${plan.price}</span>
                      <span className="text-neutral-400 text-xs">/ mo</span>
                    </div>

                    <div className="mt-2 text-xs font-semibold text-neutral-300">
                      🎯 {plan.leadsCount} pre-market leads/mo
                    </div>

                    <div className="h-[1px] bg-neutral-900 my-5" />

                    <ul className="space-y-3.5 mb-8">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-400 leading-tight">
                          <Check className="w-4 h-4 text-emerald-450 flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    id={`purchase-btn-${plan.id}`}
                    onClick={() => openCheckoutWithPlan(plan)}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs transition-all tracking-wider uppercase flex items-center justify-center gap-1.5 cursor-pointer ${
                      isBestValue
                        ? 'bg-white text-black hover:bg-neutral-200'
                        : 'bg-neutral-900 text-white hover:bg-neutral-800 border border-neutral-850'
                    }`}
                  >
                    <span>Choose Sourcing Package</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center text-xs text-neutral-500 flex flex-col sm:flex-row items-center justify-center gap-4">
            <span className="inline-flex items-center gap-1 cursor-default">
              <Lock className="w-3.5 h-3.5" /> Direct monthly subscriptions. No setup costs, cancel anytime.
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1 cursor-default">
              <Database className="w-3.5 h-3.5" /> Enterprise accuracy scoring certified index.
            </span>
          </div>
        </div>
      </section>

      {/* SECTION: Accordion FAQs */}
      <section id="faqs" className="py-20 bg-neutral-950 border-b border-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-4 mb-16">
            <span className="text-[10px] font-mono font-bold text-neutral-500 tracking-widest uppercase">
              Prospecting Support Center
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Frequently Asked Sourcing Inquiries
            </h2>
            <p className="text-neutral-400 text-xs">
              Clear advisory breakdowns detailing database sources, territorial locking, and dashboard credentials.
            </p>
          </div>

          <div id="faq-accordions" className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  id={`faq-item-${idx}`}
                  key={idx}
                  className="bg-neutral-900/25 border border-neutral-900 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    id={`faq-trigger-${idx}`}
                    onClick={() => toggleFaq(idx)}
                    className="w-full py-4.5 px-5 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  >
                    <span className="text-xs font-bold text-neutral-200 hover:text-white transition-colors">
                      {faq.question}
                    </span>
                    <HelpCircle className={`w-4 h-4 font-normal text-neutral-500 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-white' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 pt-1.5 text-xs text-neutral-400 leading-relaxed border-t border-neutral-900 bg-neutral-950/20">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OUTRO CTA BANNER (Exclusive Territory Rush) */}
      <section id="outro-cta" className="py-24 bg-neutral-950 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-stone-800/10 via-transparent to-transparent opacity-50 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-7">
          <span className="text-[10px] font-mono font-bold bg-white text-black py-1 px-3.5 rounded-full uppercase tracking-widest">
            Last Territory Warning Lock
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none max-w-2xl mx-auto">
            Ready to control exclusive seller coordinates?
          </h2>
          <p className="text-neutral-450 text-sm max-w-lg mx-auto leading-relaxed">
            Protect your territory. Once an agent locks a ZIP code, it is instantly removed from the Dreamable local lead indexing pipeline. Use the checker now to safeguard your exclusivity.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto pt-2">
            <button
              id="outro-cta-leads"
              onClick={() => openCheckoutWithPlan(LEAD_PACKAGES[1])}
              className="w-full sm:w-auto py-3.5 px-8 bg-white text-black hover:bg-stone-200 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-white/5 active:scale-[0.98] transition-all cursor-pointer"
            >
              Exclusively Lock ZIP Now
            </button>
            <a
              href="mailto:partner-support@dreamabledigital.com"
              className="w-full sm:w-auto py-3.5 px-6 border border-neutral-800 hover:border-neutral-700 bg-neutral-950 rounded-xl font-semibold text-neutral-400 hover:text-white text-xs tracking-wider transition-colors inline-block"
            >
              Inquire Corporate Brokerage Custom Seats
            </a>
          </div>
        </div>
      </section>

      {/* HIGH END MINIMAL FOOTER */}
      <footer id="site-footer" className="bg-neutral-950 border-t border-neutral-900 py-16 text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-neutral-900 pb-12">
            
            {/* Left column brand */}
            <div className="md:col-span-2 space-y-4">
              <a href="#" className="flex items-center">
                <DreamableLogo variant="dark" className="h-10" />
              </a>
              <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
                Dreamable Digital represents modern predictive intelligence for local real estate brokers. We source off-market home signals prior to public listings, giving you listings margin safety first.
              </p>
            </div>

            {/* Middle links */}
            <div>
              <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-widest mb-4">Sourcing Solutions</h4>
              <ul className="space-y-2.5 text-xs">
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How Predictive Engines Work</a></li>
                <li><a href="#scripts" className="hover:text-white transition-colors">Prospecting Script Center</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Territorial Price Matrices</a></li>
                <li><a href="#faqs" className="hover:text-white transition-colors">Support FAQ Helpdesk</a></li>
              </ul>
            </div>

            {/* Corporate contact details */}
            <div>
              <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-widest mb-4">Corporate Office</h4>
              <p className="text-xs text-neutral-500 leading-normal">
                Dreamable Digital Corporate Sourcing HQ
                <br />
                3250 Onyx Boulevard, Suite 1100
                <br />
                Austin, Texas 78701
                <br />
                <a href="mailto:onboarding@dreamabledigital.com" className="hover:text-white transition-colors underline block mt-2">onboarding@dreamabledigital.com</a>
              </p>
            </div>

          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-neutral-600">
            <div>
              <p>© {new Date().getFullYear()} Dreamable Digital Inc. All rights reserved. Sourced via high fidelity localized predictive indexing data models.</p>
              <p className="mt-1">Disclaimer: Predictive lead models offer propensity insights. Real estate transactions entail localized zoning, brokerage terms, and local state disclosure policies.</p>
            </div>
            
            <div className="flex gap-4 items-center flex-shrink-0">
              <a href="#" className="hover:text-neutral-400">Security Encrypt Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-neutral-400">Territorial Seat Rules</a>
            </div>
          </div>
        </div>
      </footer>

      {/* CHECKOUT WIZARD OVERLAY MODAL */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <CheckoutModal
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
            selectedPlan={selectedPlan}
            allPlans={LEAD_PACKAGES}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
