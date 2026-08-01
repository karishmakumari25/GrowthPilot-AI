import React from 'react';

function Home() {
  return (
    <div className="antialiased bg-surface text-on-surface">
      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-outline-variant" data-purpose="navigation">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            {/* Logo Section */}
            <div className="flex items-center space-x-3" data-purpose="brand-logo">
              <div className="w-8 h-8 bg-primary-container rounded-sm flex items-center justify-center">
                <span className="text-on-primary-container font-bold text-xs">GP</span>
              </div>
              <span className="text-white font-bold text-lg tracking-tight">GrowthPilot AI</span>
            </div>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-10 text-[11px] font-bold uppercase tracking-widest text-on-surface/60">
              <a className="hover:text-primary transition-colors" href="#solutions">Solutions</a>
              <a className="hover:text-primary transition-colors" href="#how-it-works">Platform</a>
              <a className="hover:text-primary transition-colors" href="#features">Capabilities</a>
              <a className="hover:text-primary transition-colors" href="#pricing">Pricing</a>
            </nav>
            {/* CTA Button */}
            <div className="flex items-center space-x-6">
              <a className="text-[11px] font-bold text-on-surface/80 hover:text-white transition-colors uppercase tracking-widest" href="/dashboard">Log In</a>
              <a className="bg-primary-container text-on-primary-container px-6 py-2.5 rounded-sm text-[11px] font-bold hover:bg-primary transition-all uppercase tracking-widest" href="/contact">
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-40 pb-32 overflow-hidden" data-purpose="hero">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-5xl md:text-8xl font-extrabold text-white mb-10 tracking-tight leading-[1.05]">
              Scale Your Enterprise with <br/><span className="text-primary">Precision Intelligence.</span>
            </h1>
            <p className="text-on-surface/50 text-lg md:text-2xl max-w-3xl mx-auto mb-16 font-light leading-relaxed">
              The complete growth engine for ambitious teams. We combine advanced AI diagnostics with world-class execution to dominate market share.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a className="w-full sm:w-auto bg-primary-container text-on-primary-container px-10 py-5 rounded-sm font-bold text-xs uppercase tracking-[0.15em] hover:bg-primary transition-all shadow-lg" href="/ai-analyzer">
                Start Free Trial
              </a>
              <a className="w-full sm:w-auto bg-transparent border border-outline text-white px-10 py-5 rounded-sm font-bold text-xs uppercase tracking-[0.15em] hover:bg-surface-container transition-all" href="#how-it-works">
                Watch Platform Demo
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-spacing border-t border-outline-variant" id="features">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-24">
              <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">Core Capabilities</h2>
              <p className="text-3xl md:text-5xl font-bold text-white tracking-tight">Purpose-built for speed and scale.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16" data-purpose="features-grid">
              <div>
                <div className="mb-10 text-primary">
                  <span className="material-symbols-outlined text-4xl">insights</span>
                </div>
                <h3 className="text-white text-xl font-bold mb-5 tracking-tight">Market Diagnostics</h3>
                <p className="text-on-surface/50 text-base leading-relaxed font-light">Leverage deep-learning models to identify untapped market segments and customer intent patterns in real-time.</p>
              </div>
              <div>
                <div className="mb-10 text-primary">
                  <span className="material-symbols-outlined text-4xl">rocket_launch</span>
                </div>
                <h3 className="text-white text-xl font-bold mb-5 tracking-tight">Performance Nodes</h3>
                <p className="text-on-surface/50 text-base leading-relaxed font-light">Automate multi-channel campaign execution with algorithmic precision, ensuring maximum ROI on every dollar spent.</p>
              </div>
              <div>
                <div className="mb-10 text-primary">
                  <span className="material-symbols-outlined text-4xl">verified_user</span>
                </div>
                <h3 className="text-white text-xl font-bold mb-5 tracking-tight">Competitor Edge</h3>
                <p className="text-on-surface/50 text-base leading-relaxed font-light">Gain predictive visibility into competitor moves before they happen with our proprietary trend-mapping engine.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="section-spacing bg-surface-container-lowest border-y border-outline-variant" id="how-it-works">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-24">
              <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">Implementation</h2>
              <p className="text-3xl md:text-5xl font-bold text-white tracking-tight">The Modern Roadmap</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-outline-variant border border-outline-variant" data-purpose="process-steps">
              <div className="bg-surface-container-lowest p-12 transition-all group">
                <div className="text-on-surface/20 text-xs font-bold mb-8 tracking-widest group-hover:text-primary transition-colors">STEP 01</div>
                <h3 className="text-white font-bold text-xl mb-4 tracking-tight">Discovery</h3>
                <p className="text-on-surface/50 text-sm leading-relaxed font-light">Ingest historical data and current objectives into our AI environment.</p>
              </div>
              <div className="bg-surface-container-lowest p-12 transition-all group">
                <div className="text-on-surface/20 text-xs font-bold mb-8 tracking-widest group-hover:text-primary transition-colors">STEP 02</div>
                <h3 className="text-white font-bold text-xl mb-4 tracking-tight">Analysis</h3>
                <p className="text-on-surface/50 text-sm leading-relaxed font-light">System-wide audit identifying inefficiencies and growth bottlenecks.</p>
              </div>
              <div className="bg-surface-container-lowest p-12 transition-all group">
                <div className="text-on-surface/20 text-xs font-bold mb-8 tracking-widest group-hover:text-primary transition-colors">STEP 03</div>
                <h3 className="text-white font-bold text-xl mb-4 tracking-tight">Deployment</h3>
                <p className="text-on-surface/50 text-sm leading-relaxed font-light">Execute optimized strategies through our unified platform interface.</p>
              </div>
              <div className="bg-surface-container-lowest p-12 transition-all group">
                <div className="text-on-surface/20 text-xs font-bold mb-8 tracking-widest group-hover:text-primary transition-colors">STEP 04</div>
                <h3 className="text-white font-bold text-xl mb-4 tracking-tight">Scale</h3>
                <p className="text-on-surface/50 text-sm leading-relaxed font-light">Automated feedback loops continuously refine and expand reach.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="section-spacing" id="solutions">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-6">
              <div>
                <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">Enterprise Solutions</h2>
                <p className="text-3xl md:text-5xl font-bold text-white tracking-tight">Precision Service Modules</p>
              </div>
              <a className="text-on-surface/80 text-xs font-bold uppercase tracking-[0.15em] flex items-center gap-3 hover:text-primary transition-all" href="#">
                View All Solutions <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12" data-purpose="solutions-grid">
              <div className="group p-10 border border-outline-variant hover:border-primary transition-colors rounded-sm">
                <div className="flex items-start gap-8">
                  <span className="material-symbols-outlined text-primary text-4xl">desktop_windows</span>
                  <div>
                    <h3 className="text-white text-2xl font-bold mb-5 tracking-tight">Experience Design</h3>
                    <p className="text-on-surface/50 text-base leading-relaxed font-light mb-8">High-performance React &amp; WordPress environments built for sub-second load times and maximum conversion architecture.</p>
                    <ul className="space-y-3 text-xs font-bold text-on-surface/40 uppercase tracking-widest">
                      <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Custom UI/UX Frameworks</li>
                      <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> CMS Enterprise Integration</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="group p-10 border border-outline-variant hover:border-primary transition-colors rounded-sm">
                <div className="flex items-start gap-8">
                  <span className="material-symbols-outlined text-primary text-4xl">search_check</span>
                  <div>
                    <h3 className="text-white text-2xl font-bold mb-5 tracking-tight">Intelligence Search</h3>
                    <p className="text-on-surface/50 text-base leading-relaxed font-light mb-8">Technical SEO and content strategy powered by semantic search analysis to capture high-value organic traffic.</p>
                    <ul className="space-y-3 text-xs font-bold text-on-surface/40 uppercase tracking-widest">
                      <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Semantic Keyword Mapping</li>
                      <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Automated Technical Audits</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="group p-10 border border-outline-variant hover:border-primary transition-colors rounded-sm">
                <div className="flex items-start gap-8">
                  <span className="material-symbols-outlined text-primary text-4xl">hub</span>
                  <div>
                    <h3 className="text-white text-2xl font-bold mb-5 tracking-tight">Marketing Orchestration</h3>
                    <p className="text-on-surface/50 text-base leading-relaxed font-light mb-8">Omnichannel campaign management using AI-driven attribution models to track and optimize every touchpoint.</p>
                    <ul className="space-y-3 text-xs font-bold text-on-surface/40 uppercase tracking-widest">
                      <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Lead Gen Automation</li>
                      <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> CRM Synchronization</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="group p-10 border border-outline-variant hover:border-primary transition-colors rounded-sm">
                <div className="flex items-start gap-8">
                  <span className="material-symbols-outlined text-primary text-4xl">map</span>
                  <div>
                    <h3 className="text-white text-2xl font-bold mb-5 tracking-tight">Local Market Capture</h3>
                    <p className="text-on-surface/50 text-base leading-relaxed font-light mb-8">Precision targeting for geo-specific growth, optimizing Google Business Profiles and local citations at scale.</p>
                    <ul className="space-y-3 text-xs font-bold text-on-surface/40 uppercase tracking-widest">
                      <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> GMB Multi-location Mgmt</li>
                      <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Reputation Monitoring</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="section-spacing border-t border-outline-variant bg-surface-container-lowest" id="pricing">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-24">
              <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">Subscription Tiers</h2>
              <p className="text-3xl md:text-5xl font-bold text-white tracking-tight">Scale at your own pace.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch" data-purpose="pricing-table">
              <div className="bg-surface p-12 rounded-sm border border-outline-variant flex flex-col h-full hover:border-primary transition-colors">
                <div className="mb-10">
                  <h3 className="text-on-surface/40 font-bold text-[11px] uppercase tracking-[0.2em] mb-6">Core</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-5xl font-bold text-white tracking-tighter">$79</span>
                    <span className="text-on-surface/40 text-xs ml-2 uppercase tracking-widest font-bold">/ Month</span>
                  </div>
                  <p className="text-on-surface/40 text-sm font-light">Essential diagnostics for emerging brands.</p>
                </div>
                <ul className="space-y-5 mb-12 flex-grow">
                  <li className="flex items-center gap-4 text-sm text-on-surface/60"><span className="material-symbols-outlined text-lg text-primary">check</span> AI Market Analyzer</li>
                  <li className="flex items-center gap-4 text-sm text-on-surface/60"><span className="material-symbols-outlined text-lg text-primary">check</span> Standard SEO Reports</li>
                  <li className="flex items-center gap-4 text-sm text-on-surface/60"><span className="material-symbols-outlined text-lg text-primary">check</span> Single Domain Support</li>
                </ul>
                <button className="w-full py-4 rounded-sm border border-outline text-white text-[11px] font-bold hover:bg-surface-container transition-all uppercase tracking-[0.15em]">
                  Select Core
                </button>
              </div>
              <div className="bg-surface-container-low p-12 rounded-sm border-2 border-primary-container flex flex-col h-full relative">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary-container text-on-primary-container text-[10px] font-bold px-6 py-1.5 rounded-full uppercase tracking-widest">
                  Recommended
                </div>
                <div className="mb-10">
                  <h3 className="text-primary font-bold text-[11px] uppercase tracking-[0.2em] mb-6">Business</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-5xl font-bold text-white tracking-tighter">$199</span>
                    <span className="text-on-surface/40 text-xs ml-2 uppercase tracking-widest font-bold">/ Month</span>
                  </div>
                  <p className="text-on-surface/40 text-sm font-light">The standard for professional marketing teams.</p>
                </div>
                <ul className="space-y-5 mb-12 flex-grow">
                  <li className="flex items-center gap-4 text-sm text-on-surface/80"><span className="material-symbols-outlined text-lg text-primary">check</span> Predictive Competitor Edge</li>
                  <li className="flex items-center gap-4 text-sm text-on-surface/80"><span className="material-symbols-outlined text-lg text-primary">check</span> Advanced Conversion Opt.</li>
                  <li className="flex items-center gap-4 text-sm text-on-surface/80"><span className="material-symbols-outlined text-lg text-primary">check</span> Priority AI Processing</li>
                  <li className="flex items-center gap-4 text-sm text-on-surface/80"><span className="material-symbols-outlined text-lg text-primary">check</span> Up to 5 Domain Nodes</li>
                </ul>
                <button className="w-full py-4 rounded-sm bg-primary-container text-on-primary-container text-[11px] font-bold hover:bg-primary transition-all uppercase tracking-[0.15em]">
                  Deploy Business
                </button>
              </div>
              <div className="bg-surface p-12 rounded-sm border border-outline-variant flex flex-col h-full hover:border-primary transition-colors">
                <div className="mb-10">
                  <h3 className="text-on-surface/40 font-bold text-[11px] uppercase tracking-[0.2em] mb-6">Enterprise</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-5xl font-bold text-white tracking-tighter">$399</span>
                    <span className="text-on-surface/40 text-xs ml-2 uppercase tracking-widest font-bold">/ Month</span>
                  </div>
                  <p className="text-on-surface/40 text-sm font-light">Complete ecosystem for global operations.</p>
                </div>
                <ul className="space-y-5 mb-12 flex-grow">
                  <li className="flex items-center gap-4 text-sm text-on-surface/60"><span className="material-symbols-outlined text-lg text-primary">check</span> Dedicated Growth Strategist</li>
                  <li className="flex items-center gap-4 text-sm text-on-surface/60"><span className="material-symbols-outlined text-lg text-primary">check</span> Custom ML Model Training</li>
                  <li className="flex items-center gap-4 text-sm text-on-surface/60"><span className="material-symbols-outlined text-lg text-primary">check</span> API Access &amp; Integrations</li>
                  <li className="flex items-center gap-4 text-sm text-on-surface/60"><span className="material-symbols-outlined text-lg text-primary">check</span> Unlimited Domain Nodes</li>
                </ul>
                <button className="w-full py-4 rounded-sm border border-outline text-white text-[11px] font-bold hover:bg-surface-container transition-all uppercase tracking-[0.15em]">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Main Footer */}
      <footer className="py-24 border-t border-outline-variant bg-surface-container-lowest" data-purpose="footer">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-24">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-6 h-6 bg-primary-container rounded-sm flex items-center justify-center">
                  <span className="text-on-primary-container font-bold text-[8px]">GP</span>
                </div>
                <span className="text-white font-bold text-sm tracking-tight uppercase tracking-[0.1em]">GrowthPilot AI</span>
              </div>
              <p className="text-on-surface/40 text-sm max-w-sm font-light leading-relaxed">
                Empowering the next generation of enterprise leaders with precision intelligence and automated growth frameworks.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold text-[11px] uppercase tracking-[0.2em] mb-8">Resources</h4>
              <ul className="space-y-5 text-sm text-on-surface/40">
                <li><a className="hover:text-primary transition-colors" href="#">Documentation</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">API Reference</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Growth Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-[11px] uppercase tracking-[0.2em] mb-8">Company</h4>
              <ul className="space-y-5 text-sm text-on-surface/40">
                <li><a className="hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Security Certs</a></li>
                <li><a className="hover:text-primary transition-colors" href="/contact">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-on-surface/30 text-[10px] font-bold uppercase tracking-[0.3em]">© 2024 GrowthPilot AI Global. All rights reserved.</p>
            <div className="flex space-x-10 text-on-surface/30">
              <a className="hover:text-white transition-colors text-[10px] uppercase font-bold tracking-[0.2em]" href="#">LinkedIn</a>
              <a className="hover:text-white transition-colors text-[10px] uppercase font-bold tracking-[0.2em]" href="#">Twitter / X</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
