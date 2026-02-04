import React, { useEffect, useState } from 'react';
import { ArrowRight, Box, Cpu, Zap, Sun, Menu, X, ChevronDown } from 'lucide-react';
import { COMPANY_INFO } from '../constants';
import { useLanguage, Language } from '../LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'EN' ? 'FR' : 'EN');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="relative flex items-center gap-1 px-3 py-1.5 border border-white/20 text-xs font-mono tracking-wider hover:bg-white hover:text-black transition-all group"
      aria-label={`Switch to ${language === 'EN' ? 'French' : 'English'}`}
    >
      <span className={`transition-opacity ${language === 'EN' ? 'opacity-100' : 'opacity-40'}`}>EN</span>
      <span className="text-white/30 group-hover:text-black/30">/</span>
      <span className={`transition-opacity ${language === 'FR' ? 'opacity-100' : 'opacity-40'}`}>FR</span>
    </button>
  );
};

const UI = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t('nav.technology'), href: '#tech' },
    { label: t('nav.mission'), href: '#mission' },
    { label: t('nav.infrastructure'), href: '#infrastructure' },
  ];

  const infrastructureNodes = [
    { title: t('infra.node1.title'), id: 'NODE-01', desc: t('infra.node1.desc') },
    { title: t('infra.node2.title'), id: 'NODE-02', desc: t('infra.node2.desc') },
    { title: t('infra.node3.title'), id: 'NODE-03', desc: t('infra.node3.desc') },
    { title: t('infra.node4.title'), id: 'NODE-04', desc: t('infra.node4.desc') },
  ];

  return (
    <div className="relative z-10 w-full text-neutral-100 pointer-events-none">

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 p-6 md:px-12 transition-all duration-300 pointer-events-auto flex justify-between items-center z-50 ${isScrolled ? 'bg-neutral-950/80 backdrop-blur-md border-b border-white/10' : ''}`}
      >
        <div className="flex items-center gap-2">
           <div className="w-4 h-4 bg-white rotate-45"></div>
           <span className="font-bold text-xl tracking-tighter">{COMPANY_INFO.name}</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-mono tracking-widest hover:text-white/60 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <LanguageSwitcher />
          <a href="#contact" className="px-4 py-2 border border-white/20 text-xs font-mono hover:bg-white hover:text-black transition-all">
            {t('nav.getAccess')}
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-3">
          <LanguageSwitcher />
          <button className="text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-neutral-950 flex flex-col justify-center items-center gap-8 pointer-events-auto md:hidden">
           {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-2xl font-light tracking-widest"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20">
        <div className="max-w-4xl 2xl:max-w-7xl">
           <div className="flex items-center gap-4 mb-4 opacity-70">
              <span className="h-px w-8 bg-white/50"></span>
              <span className="text-xs font-mono tracking-[0.2em]">{t('hero.tagline')}</span>
           </div>

           <h1 className="text-6xl md:text-9xl 2xl:text-[11rem] font-medium tracking-tighter leading-[0.9] mb-8 mix-blend-difference">
             {t('hero.title1')} <br/>
             {t('hero.title2')} <span className="opacity-50">{t('hero.title3')}</span> <br/>
             {t('hero.title4')}
           </h1>

           <div className="bg-neutral-950/60 backdrop-blur-sm p-6 border-l border-white/20 mb-12 max-w-lg rounded-r-lg">
             <p className="text-sm md:text-base text-neutral-200 font-mono leading-relaxed">
               {t('hero.description')}
             </p>
           </div>

           <div className="pointer-events-auto inline-flex gap-4">
              <a
                href="mailto:afriplansolar@yahoo.fr"
                className="group flex items-center gap-2 bg-white text-black px-8 py-4 font-mono text-sm tracking-wider hover:bg-neutral-200 transition-colors"
              >
                {t('hero.cta')}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
           </div>
        </div>

        <div className="absolute bottom-10 left-0 w-full flex justify-center animate-bounce opacity-50">
            <ChevronDown size={24} />
        </div>
      </section>

      {/* Stats / Scroller */}
      <div id="tech" className="w-full bg-neutral-950/90 backdrop-blur-md border-y border-white/10 pointer-events-auto scroll-mt-20">
        <div className="flex flex-wrap divide-x divide-white/10">
           {[
             { label: t('stats.gridUptime'), val: "99.99%" },
             { label: t('stats.capacity'), val: "850 MW" },
             { label: t('stats.nodes'), val: "4,200+" },
             { label: t('stats.region'), val: "DRC/KIN" },
           ].map((stat, i) => (
             <div key={i} className="flex-1 p-6 text-center min-w-[150px]">
               <div className="text-xs font-mono text-neutral-400 mb-1 font-bold">{stat.label}</div>
               <div className="text-2xl font-light tracking-tight text-white">{stat.val}</div>
             </div>
           ))}
        </div>
      </div>

      {/* Mission Section */}
      <section id="mission" className="min-h-screen py-24 px-6 md:px-12 flex items-center bg-gradient-to-b from-transparent to-neutral-950/90 pointer-events-auto">
        <div className="grid md:grid-cols-2 gap-16 w-full max-w-6xl mx-auto">
          {/* Added background for legibility against dithered noise */}
          <div className="bg-neutral-950/80 backdrop-blur-md p-8 md:p-12 border border-white/5 rounded-sm">
            <h2 className="text-4xl md:text-6xl mb-8 tracking-tighter">{t('mission.title1')} <br/> {t('mission.title2')}</h2>
            <div className="w-12 h-1 bg-white mb-8"></div>
            <p className="text-neutral-300 text-lg leading-relaxed mb-6">
              {t('mission.p1')}
            </p>
            <p className="text-neutral-300 text-lg leading-relaxed">
              {t('mission.p2')}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-neutral-900/80 backdrop-blur-sm border border-white/5 p-8 flex flex-col justify-between aspect-square hover:bg-neutral-800/80 transition-colors group">
                <Sun className="text-neutral-500 group-hover:text-white transition-colors" size={32} />
                <span className="font-mono text-xs">{t('mission.solarCapture')}</span>
             </div>
             <div className="bg-neutral-900/80 backdrop-blur-sm border border-white/5 p-8 flex flex-col justify-between aspect-square hover:bg-neutral-800/80 transition-colors group translate-y-8">
                <Cpu className="text-neutral-500 group-hover:text-white transition-colors" size={32} />
                <span className="font-mono text-xs">{t('mission.aiOptimization')}</span>
             </div>
             <div className="bg-neutral-900/80 backdrop-blur-sm border border-white/5 p-8 flex flex-col justify-between aspect-square hover:bg-neutral-800/80 transition-colors group">
                <Box className="text-neutral-500 group-hover:text-white transition-colors" size={32} />
                <span className="font-mono text-xs">{t('mission.modularStorage')}</span>
             </div>
             <div className="bg-neutral-900/80 backdrop-blur-sm border border-white/5 p-8 flex flex-col justify-between aspect-square hover:bg-neutral-800/80 transition-colors group translate-y-8">
                <Zap className="text-neutral-500 group-hover:text-white transition-colors" size={32} />
                <span className="font-mono text-xs">{t('mission.zeroLatency')}</span>
             </div>
          </div>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section id="infrastructure" className="py-24 px-6 md:px-12 bg-neutral-950 pointer-events-auto border-t border-white/10">
         <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <h2 className="text-5xl md:text-7xl tracking-tighter">{t('infra.title1')} <br/> {t('infra.title2')}</h2>
              <div className="text-right mt-8 md:mt-0">
                 <p className="font-mono text-xs text-neutral-500 mb-2">{t('infra.status')}</p>
                 <div className="flex items-center gap-2">
                   <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                   <span className="font-mono">{t('infra.operational')}</span>
                 </div>
              </div>
            </div>

            <div className="space-y-px bg-white/10">
               {infrastructureNodes.map((item, i) => (
                 <div key={i} className="group bg-neutral-950 p-8 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-900 transition-colors cursor-pointer">
                    <div className="flex items-baseline gap-8">
                       <span className="font-mono text-neutral-600 text-sm">0{i+1}</span>
                       <h3 className="text-2xl md:text-3xl font-light">{item.title}</h3>
                    </div>
                    <div className="flex items-center gap-8 mt-4 md:mt-0 opacity-0 group-hover:opacity-100 transition-opacity">
                       <span className="font-mono text-xs text-neutral-400">{item.id}</span>
                       <span className="hidden md:block text-sm text-neutral-500">{item.desc}</span>
                       <ArrowRight className="-rotate-45 group-hover:rotate-0 transition-transform" />
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-[70vh] flex flex-col justify-between py-24 px-6 md:px-12 bg-neutral-950 pointer-events-auto border-t border-white/10 relative overflow-hidden">
         {/* Dither Gradient Background */}
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-950 to-neutral-950 opacity-50"></div>

         <div className="relative z-10 max-w-4xl">
            <h2 className="text-6xl md:text-8xl tracking-tighter mb-8">{t('contact.title1')} <br/> {t('contact.title2')}</h2>
            <p className="text-xl text-neutral-400 max-w-xl mb-12">
               {t('contact.description')}
            </p>

            <form className="space-y-6 max-w-md" onSubmit={(e) => e.preventDefault()}>
               <div className="space-y-2">
                  <label className="font-mono text-xs text-neutral-500 uppercase">{t('contact.identification')}</label>
                  <input type="text" className="w-full bg-transparent border-b border-white/20 py-2 focus:border-white focus:outline-none transition-colors font-mono" placeholder={t('contact.namePlaceholder')} />
               </div>
               <div className="space-y-2">
                  <label className="font-mono text-xs text-neutral-500 uppercase">{t('contact.frequency')}</label>
                  <input type="email" className="w-full bg-transparent border-b border-white/20 py-2 focus:border-white focus:outline-none transition-colors font-mono" placeholder={t('contact.emailPlaceholder')} />
               </div>
               <a href="mailto:afriplansolar@yahoo.fr" className="inline-block w-full md:w-auto text-center bg-white text-black px-8 py-3 font-mono text-xs tracking-widest hover:bg-neutral-200 transition-colors mt-8">
                  {t('contact.submit')}
               </a>
            </form>
         </div>

         <div className="relative z-10 flex flex-col md:flex-row justify-between items-end mt-24 pt-8 border-t border-white/10">
            {/* Social Links Removed */}
            <div className="md:w-full flex justify-end">
               <div className="text-right">
                  <p className="font-mono text-xs text-neutral-600">© 2024 {COMPANY_INFO.name}. {t('contact.rights')}</p>
                  <p className="font-mono text-xs text-neutral-600">{COMPANY_INFO.location}</p>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
};

export default UI;
