import React from "react";
import ReactDOM from "react-dom";
const { useState, useEffect } = React;

        // Main App Component
        function App() {
            const sections = ['home', 'getting-started', 'video-preparation', 'label-preparation', 'dataset-validator', 'running-feral', 'config-docs', 'api-docs', 'examples', 'faq', 'contact'];
            const sectionFromHash = () => sections.includes(window.location.hash.slice(1)) ? window.location.hash.slice(1) : 'home';
            const [activeSection, setActiveSection] = useState(sectionFromHash);
            useEffect(() => {
                const navigate = () => { setActiveSection(sectionFromHash()); setIsSidebarOpen(false); };
                window.addEventListener('hashchange', navigate);
                return () => window.removeEventListener('hashchange', navigate);
            }, []);
            useEffect(() => { window.scrollTo(0, 0); }, [activeSection]);
            const [isSidebarOpen, setIsSidebarOpen] = useState(false);

            const handleNavClick = (section) => {
                setActiveSection(section);
                window.location.hash = section;
                setIsSidebarOpen(false);
                
            };

            return (
                <div className="min-h-screen text-ink-900 antialiased flex flex-col">
                    {/* Header */}
                    <header className="glass sticky top-0 z-50">
                      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button
                                className="md:hidden p-2 -ml-2 rounded-lg text-ink-700 hover:bg-ink-100 focus:outline-none focus:ring-2 focus:ring-accent-500"
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                aria-label="Toggle navigation"
                                aria-expanded={isSidebarOpen}
                                aria-controls="sidebar-navigation"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {isSidebarOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                            <button onClick={() => handleNavClick('home')} className="flex items-center gap-2.5 group">
                                <img
                                    src="./src/images/feral-logo.png"
                                    alt="FERAL Logo"
                                    className="h-8 w-8 rounded-lg group-hover:scale-105 transition"
                                />
                                <div className="flex items-baseline gap-2">
                                    <span className="text-xl font-bold tracking-tight text-ink-900">FERAL</span>
                                </div>
                            </button>
                        </div>

                        <nav className="hidden lg:flex items-center gap-1">
                            <NavLink section="home" current={activeSection} onClick={handleNavClick}>Home</NavLink>
                            <NavLink section="getting-started" current={activeSection} onClick={handleNavClick}>Get Started</NavLink>
                            <NavLink section="running-feral" current={activeSection} onClick={handleNavClick}>Run</NavLink>
                            <NavLink section="dataset-validator" current={activeSection} onClick={handleNavClick}>Validator</NavLink>
                            <NavLink section="examples" current={activeSection} onClick={handleNavClick}>Examples</NavLink>
                            <NavLink section="faq" current={activeSection} onClick={handleNavClick}>FAQ</NavLink>
                        </nav>

                        <div className="flex items-center gap-2">
                            <a
                                href="https://www.biorxiv.org/content/10.1101/2025.11.16.688666v2"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-200 bg-rose-50/60 hover:bg-rose-50 text-rose-700 text-sm font-medium transition"
                                title="Read the preprint on bioRxiv"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>
                                <span>Preprint</span>
                            </a>
                            <a
                                href="https://github.com/Skovorp/feral"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-ink-200 hover:border-ink-300 hover:bg-ink-50 text-ink-700 text-sm font-medium transition"
                                title="View on GitHub"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.438 9.8 8.205 11.39.6.113.82-.26.82-.577v-2.173c-3.338.726-4.033-1.61-4.033-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.746.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.835 2.808 1.305 3.495.998.108-.775.418-1.305.76-1.605-2.665-.3-5.466-1.333-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.125-.303-.54-1.523.115-3.176 0 0 1.005-.323 3.3 1.23a11.49 11.49 0 0 1 3-.403c1.02.005 2.045.137 3 .403 2.295-1.553 3.3-1.23 3.3-1.23.655 1.653.24 2.873.12 3.176.77.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.37.81 1.1.81 2.22v3.293c0 .32.22.694.825.576C20.565 22.295 24 17.795 24 12.5 24 5.87 18.63.5 12 .5z" />
                                </svg>
                                <span>GitHub</span>
                            </a>
                            <a
                                href="https://colab.research.google.com/drive/1wPe7MX3IiY3zsFkeTzLzHgynrtj-wXFP?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ink-900 hover:bg-ink-800 text-white text-sm font-medium transition shadow-soft"
                            >
                                <span>Open in Colab</span>
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                            </a>
                        </div>
                      </div>
                    </header>

                    {/* Main Content Area */}
                    <div className="flex flex-1 max-w-7xl w-full mx-auto">
                        {/* Sidebar */}
                        <aside id="sidebar-navigation" className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'visible translate-x-0 pt-20' : 'invisible -translate-x-full'} md:visible md:sticky md:top-16 md:translate-x-0 md:h-[calc(100vh-4rem)] w-72 bg-white/80 md:bg-transparent md:backdrop-blur-0 backdrop-blur p-5 overflow-y-auto transition-transform duration-300 ease-in-out z-40 md:z-auto md:border-r md:border-ink-200/60`}>
                            <nav className="space-y-1">
                                <div className="sidebar-group-title">Overview</div>
                                <SidebarLink section="home" current={activeSection} onClick={handleNavClick}>Introduction</SidebarLink>
                                <SidebarLink section="getting-started" current={activeSection} onClick={handleNavClick}>Getting Started</SidebarLink>

                                <div className="sidebar-group-title pt-3">Prepare your data</div>
                                <SidebarLink section="video-preparation" current={activeSection} onClick={handleNavClick}>Video Preparation</SidebarLink>
                                <SidebarLink section="label-preparation" current={activeSection} onClick={handleNavClick}>Label Preparation</SidebarLink>
                                <SidebarLink section="dataset-validator" current={activeSection} onClick={handleNavClick}>Dataset Validator</SidebarLink>

                                <div className="sidebar-group-title pt-3">Run FERAL</div>
                                <SidebarLink section="running-feral" current={activeSection} onClick={handleNavClick}>Running FERAL</SidebarLink>
                                <SidebarLink section="config-docs" current={activeSection} onClick={handleNavClick}>Config documentation</SidebarLink>
                                <SidebarLink section="api-docs" current={activeSection} onClick={handleNavClick}>API documentation</SidebarLink>

                                <div className="sidebar-group-title pt-3">Reference</div>
                                <SidebarLink section="examples" current={activeSection} onClick={handleNavClick}>Examples</SidebarLink>
                                <SidebarLink section="faq" current={activeSection} onClick={handleNavClick}>FAQ</SidebarLink>
                                <SidebarLink section="contact" current={activeSection} onClick={handleNavClick}>Contact</SidebarLink>
                            </nav>

                            <div className="mt-6 pt-5 border-t border-ink-200/70 space-y-2">
                                <a
                                    href="https://www.biorxiv.org/content/10.1101/2025.11.16.688666v2"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-ink-600 hover:text-rose-700 hover:bg-rose-50/60 text-sm transition"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.7" stroke="currentColor" className="w-4 h-4 flex-shrink-0">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
                                    </svg>
                                    Preprint (bioRxiv)
                                </a>
                                <a
                                    href="https://github.com/Skovorp/feral"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-ink-600 hover:text-ink-900 hover:bg-ink-100/60 text-sm transition"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
                                        <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.438 9.8 8.205 11.39.6.113.82-.26.82-.577v-2.173c-3.338.726-4.033-1.61-4.033-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.746.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.835 2.808 1.305 3.495.998.108-.775.418-1.305.76-1.605-2.665-.3-5.466-1.333-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.125-.303-.54-1.523.115-3.176 0 0 1.005-.323 3.3 1.23a11.49 11.49 0 0 1 3-.403c1.02.005 2.045.137 3 .403 2.295-1.553 3.3-1.23 3.3-1.23.655 1.653.24 2.873.12 3.176.77.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.37.81 1.1.81 2.22v3.293c0 .32.22.694.825.576C20.565 22.295 24 17.795 24 12.5 24 5.87 18.63.5 12 .5z" />
                                    </svg>
                                    GitHub repository
                                </a>
                                <a
                                    href="https://github.com/Skovorp/feral/discussions"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-ink-600 hover:text-ink-900 hover:bg-ink-100/60 text-sm transition"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.6" stroke="currentColor" className="w-4 h-4 flex-shrink-0">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                                    </svg>
                                    Discussions
                                </a>
                                <a
                                    href="https://pypi.org/project/feral/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-ink-600 hover:text-ink-900 hover:bg-ink-100/60 text-sm transition"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.6" stroke="currentColor" className="w-4 h-4 flex-shrink-0">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
                                    </svg>
                                    pypi.org/project/feral
                                </a>
                            </div>
                        </aside>

                        {/* Content Area */}
                        <main className="flex-1 px-4 md:px-10 py-8 md:py-12 overflow-y-auto min-w-0 space-y-10">
                            {activeSection === 'home' && <HomeSection handleNavClick={handleNavClick} />}
                            {activeSection === 'getting-started' && <GettingStartedSection handleNavClick={handleNavClick} />}
                            {activeSection === 'video-preparation' && <VideoPreparationSection />}
                            {activeSection === 'label-preparation' && <LabelPreparationSection handleNavClick={handleNavClick} />}
                            {activeSection === 'running-feral' && <RunningFeralSection handleNavClick={handleNavClick} />}
                            {activeSection === 'config-docs' && <ConfigDocsSection handleNavClick={handleNavClick} />}
                            {activeSection === 'api-docs' && <ApiDocsSection handleNavClick={handleNavClick} />}
                            {activeSection === 'dataset-validator' && <DatasetValidatorSection />}
                            {activeSection === 'examples' && <ExamplesSection />}
                            {activeSection === 'contact' && <ContactSection />}
                            {activeSection === 'faq' && <FAQSection />}
                        </main>
                    </div>

                    {/* Overlay for mobile sidebar */}
                    {isSidebarOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>
                    )}

                    {/* Footer */}

                    <footer className="bg-ink-950 text-ink-300 mt-16">
                        <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
                                <div className="md:col-span-2">
                                    <div className="flex items-center gap-2.5 mb-3">
                                        <img src="./src/images/feral-logo.png" alt="FERAL" className="h-7 w-7 rounded-md" />
                                        <span className="text-lg font-bold tracking-tight text-white">FERAL</span>
                                    </div>
                                    <p className="text-sm text-ink-400 max-w-md leading-relaxed">
                                        Feature Extraction for Recognition of Animal Locomotion. Open-source supervised
                                        animal behavior segmentation using state-of-the-art video models.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-semibold text-white tracking-widest uppercase mb-3">Project</h4>
                                    <ul className="space-y-2 text-sm">
                                        <li><a href="https://www.biorxiv.org/content/10.1101/2025.11.16.688666v2" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Preprint (bioRxiv)</a></li>
                                        <li><a href="https://github.com/Skovorp/feral" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">GitHub</a></li>
                                        <li><a href="/pretrained_checkpoints" className="hover:text-white transition">Pretrained checkpoints</a></li>
                                        <li><a href="https://github.com/Skovorp/feral/discussions" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Discussions</a></li>
                                        <li><a href="https://pypi.org/project/feral/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">PyPI</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-xs font-semibold text-white tracking-widest uppercase mb-3">Built at</h4>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <img src="./src/images/rockefeller_logo.png" alt="The Rockefeller University" className="h-9 opacity-80 hover:opacity-100 transition bg-white rounded-md px-2 py-1" />
                                        <img src="src\images\HHMI_logo.png" alt="HHMI" className="h-9 opacity-90 hover:opacity-100 transition bg-white rounded-md px-2 py-1" />
                                    </div>
                                </div>
                            </div>
                            <div className="pt-6 border-t border-ink-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-500">
                                <p>&copy; {new Date().getFullYear()} FERAL, Skovorodnikov &amp; Razzauti, The Rockefeller University.</p>
                                <p>
                                    <a href="/llms.txt" className="hover:text-white transition mx-2">Agent documentation</a>
                                </p>
                            </div>
                        </div>
                    </footer>
                </div>
            );
        }

        // Navigation Components
        const NavLink = ({ section, current, onClick, children }) => (
            <button
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${current === section ? 'text-ink-900 bg-ink-100' : 'text-ink-600 hover:text-ink-900 hover:bg-ink-100/70'} focus:outline-none focus:ring-2 focus:ring-accent-500/30`}
                onClick={() => onClick(section)}
            >
                {children}
            </button>
        );

        const SidebarLink = ({ section, current, onClick, children }) => (
            <button
                className={`group block w-full text-left px-3 py-1.5 rounded-lg text-[13.5px] transition relative ${current === section ? 'bg-ink-900 text-white font-medium shadow-soft' : 'text-ink-700 hover:bg-ink-100/70 hover:text-ink-900'} focus:outline-none focus:ring-2 focus:ring-accent-500/30`}
                onClick={() => onClick(section)}
            >
                {children}
            </button>
        );
        
        // ===== Hero Mosaic (GIFs) =====
const HeroMosaic = () => (
  <div className="mt-6 flex flex-col space-y-4">
    
    {/* ---------- ROW 1: Ant + Worm ---------- */}
    <div className="grid grid-cols-2 gap-4">
      <figure className="overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-black flex items-center justify-center">
        <img
          src="src/videos/ants_example.gif"
          alt="Ants example behavior"
          className="w-full h-full object-contain"
        />
      </figure>

      <figure className="overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-black flex items-center justify-center">
        <img
          src="src/videos/worms_example.gif"
          alt="Worms example behavior"
          className="w-full h-full object-contain"
        />
      </figure>
    </div>

    {/* ---------- ROW 2: Main Feature ---------- */}
    <div>
      <figure className="relative overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-black flex items-center justify-center">
        <img
          src="src/images/camera_interaction.gif"
          alt="Example behavior"
          className="w-full h-full object-contain"
        />
        <figcaption
          className="absolute rounded-lg bg-black/60 text-white font-semibold tracking-wide backdrop-blur-sm"
          style={{
            top: "2.5%",
            right: "2.5%",
            fontSize: "clamp(0.9rem, 2.6vw, 2rem)",
            padding: "0.4em 0.8em",
          }}
        >
          Camera interaction
        </figcaption>
      </figure>
    </div>

    {/* ---------- ROW 3: CalMS21 ---------- */}
    <div>
      <figure className="overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-black flex items-center justify-center">
        <img
          src="src/videos/calms_example.gif"
          alt="CalMS21 example"
          className="w-full h-full object-contain"
        />
      </figure>
    </div>

    {/* ---------- ROW 4: Pan20K Gorilla ---------- */}
    <div>
      <figure className="overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-black flex items-center justify-center">
        <img
          src="src/videos/gorilla1.gif"
          alt="Pan20K example"
          className="w-full h-full object-contain"
        />
      </figure>
    </div>

  </div>
);





        const AgentCard = () => {
            const [copyStatus, setCopyStatus] = useState('');
            const url = 'https://getferal.ai/llms.txt';
            const copyUrl = async () => {
                try {
                    await navigator.clipboard.writeText(url);
                    setCopyStatus('Copied!');
                } catch {
                    setCopyStatus('Select the URL to copy it manually.');
                }
            };
            return (
                <div className="surface p-8 md:p-10">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                        <div className="flex-1 min-w-0">
                            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-ink-900">FERAL is agent friendly!</h2>
                            <p className="mt-3 text-ink-600 leading-relaxed">Your agent can help install FERAL, choose where to run it, prepare videos, validate labels, and select a training preset for your data and GPU. It can run training and inference, check results, and troubleshoot errors using our docs and dedicated skill.</p>
                        </div>
                        <div className="flex items-center gap-4 self-end sm:self-auto flex-shrink-0">
                            <img src="/src/images/codex.png" alt="Codex" className="w-14 h-14 object-contain" />
                            <img src="/src/images/clawd.svg" alt="Claude Code" className="w-16 h-14 object-contain" />
                        </div>
                    </div>
                    <div className="mt-5 flex flex-col md:flex-row md:items-center gap-4">
                    <p className="text-ink-900 flex-shrink-0"><strong>Just give your agent this:</strong></p>
                    <div className="flex w-full md:flex-1 min-w-0 items-center gap-3 bg-ink-950 rounded-xl px-5 py-3 border border-ink-800/50">
                        <span className="min-w-0 flex-1 font-mono text-sm text-accent-300 break-all select-all">{url}</span>
                        <button type="button" onClick={copyUrl} className="flex-shrink-0 p-2 rounded-lg text-ink-400 hover:text-white hover:bg-white/10 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-300" aria-label="Copy FERAL llms.txt URL" title={copyStatus === 'Copied!' ? 'Copied!' : 'Copy URL'}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                                {copyStatus === 'Copied!' ? <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" /> : <><rect x="9" y="9" width="11" height="11" rx="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 9V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4" /></>}
                            </svg>
                        </button>
                    </div>
                    </div>
                    <p role="status" className={copyStatus && copyStatus !== 'Copied!' ? 'text-sm text-ink-600 mt-2' : 'sr-only'}>{copyStatus}</p>
                </div>
            );
        };

        // Content Sections
        const HomeSection = ({ handleNavClick }) => (
  <section id="home" className="space-y-10">
    {/* Hero */}
    <div className="relative overflow-hidden surface dot-grid">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-400/60 to-transparent"></div>
      <div className="px-6 md:px-12 pt-12 md:pt-16 pb-12 md:pb-16">
        <div className="flex flex-wrap items-center gap-3">
          {/* <a
            href="https://www.biorxiv.org/content/10.1101/2025.11.16.688666v2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 text-[11px] font-semibold uppercase tracking-[0.12em] ring-1 ring-inset ring-rose-200 transition"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>
            New · bioRxiv 2025
          </a>*/}
        </div>

        <h1 className="mt-5 text-[2.6rem] sm:text-5xl md:text-[5.25rem] font-medium tracking-[-0.04em] leading-[1.02] text-ink-900">
          Animal behavior,<br/>
          <span className="font-display italic font-normal text-ink-900/90">segmented from <span className="display-rule">raw video</span>.</span>
        </h1>

        <p className="mt-7 max-w-2xl text-[17px] text-ink-600 leading-[1.55]">
          FERAL is an open-source toolkit that learns to label behaviors directly from videos 
          <span className="text-ink-900 font-medium"> without pose estimation</span>. 
          It fine-tunes the latest video-understanding models on your small set of manual labels, 
          so you can go from raw footage to frame-level ethograms in one afternoon.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            onClick={() => handleNavClick('getting-started')}
            className="inline-flex items-center gap-2 bg-ink-900 hover:bg-ink-800 text-white font-medium py-2.5 px-5 rounded-xl shadow-soft hover:shadow-lifted transition"
          >
            Get started
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </button>
          <a
            href="https://github.com/Skovorp/feral"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-0 py-2.5 rounded-xl border border-ink-200 hover:border-amber-400 bg-white hover:bg-amber-50/60 text-ink-900 font-medium overflow-hidden transition"
          >
            <span className="flex items-center gap-2 px-4 border-r border-ink-200 group-hover:border-amber-300 transition">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.438 9.8 8.205 11.39.6.113.82-.26.82-.577v-2.173c-3.338.726-4.033-1.61-4.033-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.746.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.835 2.808 1.305 3.495.998.108-.775.418-1.305.76-1.605-2.665-.3-5.466-1.333-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.125-.303-.54-1.523.115-3.176 0 0 1.005-.323 3.3 1.23a11.49 11.49 0 0 1 3-.403c1.02.005 2.045.137 3 .403 2.295-1.553 3.3-1.23 3.3-1.23.655 1.653.24 2.873.12 3.176.77.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.37.81 1.1.81 2.22v3.293c0 .32.22.694.825.576C20.565 22.295 24 17.795 24 12.5 24 5.87 18.63.5 12 .5z" />
              </svg>
              <span>Star on GitHub</span>
            </span>
            <span className="flex items-center gap-1.5 px-4 text-amber-600" aria-hidden="true">
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20"><path d="M10 1.5l2.61 5.29 5.84.85-4.22 4.12.99 5.81L10 14.83l-5.22 2.74.99-5.81L1.55 7.64l5.84-.85L10 1.5z"/></svg>
              <span className="text-sm">Star</span>
            </span>
          </a>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-600">
          <a
            href="https://www.biorxiv.org/content/10.1101/2025.11.16.688666v2"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-rose-700 underline decoration-ink-300 hover:decoration-rose-400 underline-offset-4 transition"
          >
            Read the preprint
          </a>
          <a
            href="https://colab.research.google.com/drive/1wPe7MX3IiY3zsFkeTzLzHgynrtj-wXFP?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink-900 underline decoration-ink-300 hover:decoration-ink-500 underline-offset-4 transition"
          >
            Try on Colab
          </a>
        </div>

        <div className="mt-10 max-w-2xl terminal">
          <div className="terminal__bar">
            <span className="terminal__dot terminal__dot--r"></span>
            <span className="terminal__dot terminal__dot--y"></span>
            <span className="terminal__dot terminal__dot--g"></span>
            <span className="ml-2">install</span>
          </div>
          <div className="terminal__body">
            <div><span className="prompt">$</span> pip install feral</div>
            <div className="comment mt-2"># Then run the 3 subcommands of the feral CLI:</div>
            <div><span className="prompt">$</span> feral reencode ./raw ./reencoded</div>
            <div><span className="prompt">$</span> feral train ./reencoded ./labels.json</div>
            <div><span className="prompt">$</span> feral infer ./checkpoint.pth ./videos</div>
          </div>
        </div>
      </div>
    </div>

    {/* Feature pills row */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="surface p-5">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-lg font-semibold text-ink-900">No pose estimation</h3>
        </div>
        <p className="text-sm text-ink-600 leading-relaxed">FERAL learns directly from raw pixels. Works in cluttered, occluded, and multi-animal scenes.</p>
      </div>
      <div className="surface p-5">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-lg font-semibold text-ink-900">Just 3 commands</h3>
        </div>
        <p className="text-sm text-ink-600 leading-relaxed">Re-encode your videos, train, run infererence. Weights &amp; Biases logging out of the box</p>
      </div>
      <div className="surface p-5">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-lg font-semibold text-ink-900">Validated across species</h3>
        </div>
        <p className="text-sm text-ink-600 leading-relaxed">Mice, ants, worms, apes, dolphins, zebras from single-animal to colony-scale. Beats prior SOTA on CalMS21</p>
      </div>
    </div>

    <AgentCard />

    {/* About */}
    {/*
    <div className="surface p-8 md:p-10">
      <span className="pill bg-ink-100 text-ink-600 ring-1 ring-inset ring-ink-200">About</span>
      <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-ink-900">Why FERAL exists</h2>
      <div className="mt-4 space-y-4 text-ink-700 leading-relaxed max-w-3xl">
        <p>
          AI is advancing at lightning speed: new video-understanding models arrive every month and quality is
          improving exponentially. To put that power in the hands of biologists who study behavior, we built FERAL.
        </p>
        <p>
          FERAL (<em>Feature Extraction for Recognition of Animal Locomotion</em>) segments behaviors directly from
          raw videos with latest video-understanding models. This enables automated behavior analysis in complex lab
          and field recordings where earlier pose-based methods struggled. On Caltech Mouse behavior dataset (CALMs) 
          we achieve state-of-the art performance (94.5 MaP).
        </p>
        <p>
          You don't need keypoint tracking, just raw videos and labels. Reach out through
          <button onClick={() => handleNavClick('contact')} className="link mx-1">Contact</button>
          or open a thread on
          <a href="https://github.com/Skovorp/feral/discussions" target="_blank" rel="noopener noreferrer" className="link ml-1">GitHub Discussions</a>.
        </p>
      </div>
    </div>
     */}
    
    {/* Acknowledgments */}
    <div className="surface p-8 md:p-10">
      <h2 className="text-3xl font-semibold tracking-[-0.03em] text-ink-900">Built at The Rockefeller University</h2>
      {/* <p className="mt-3 text-ink-600 max-w-2xl">A joint effort between the Data Science Platform and the Vosshall Laboratory.</p>*/}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="group relative bg-gradient-to-br from-ink-50 to-white border border-ink-200 rounded-2xl p-6 transition hover:shadow-lifted hover:-translate-y-0.5">
          <div className="flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-ink-900">Peter Skovorodnikov</h4>
              <p className="text-xs text-ink-500 uppercase tracking-wider mt-0.5">Lead Developer</p>
              <a href="mailto:peter.skovorodnikov@gmail.com" className="block mt-3 text-xs sm:text-sm text-ink-700 hover:text-accent-700 transition break-all">peter.skovorodnikov@gmail.com</a>
              <a href="https://aiml.rockefeller.edu/" target="_blank" rel="noopener noreferrer" className="block mt-1 text-xs text-ink-500 hover:text-ink-900 transition">Data Science Platform →</a>
            </div>
            <img src="./src/images/peter.jpeg" alt="Peter Skovorodnikov" className="hidden sm:block w-12 h-12 rounded-xl object-cover flex-shrink-0" />
          </div>
        </div>

        <div className="group relative bg-gradient-to-br from-ink-50 to-white border border-ink-200 rounded-2xl p-6 transition hover:shadow-lifted hover:-translate-y-0.5">
          <div className="flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-ink-900">Jacopo Razzauti</h4>
              <p className="text-xs text-ink-500 uppercase tracking-wider mt-0.5">Co-Developer</p>
              <a href="mailto:jacopo.razza@gmail.com" className="block mt-3 text-xs sm:text-sm text-ink-700 hover:text-accent-700 transition break-all">jacopo.razza@gmail.com</a>
              <a href="https://www.rockefeller.edu/research/2355-vosshall-laboratory/" target="_blank" rel="noopener noreferrer" className="block mt-1 text-xs text-ink-500 hover:text-ink-900 transition">Vosshall Laboratory →</a>
            </div>
            <img src="./src/images/jacopo.jpg" alt="Jacopo Razzauti" className="hidden sm:block w-12 h-12 rounded-xl object-cover flex-shrink-0" />
          </div>
        </div>
      </div>

    </div>

    <a
      href="https://github.com/Skovorp/feral"
      target="_blank"
      rel="noopener noreferrer"
      className="block group relative overflow-hidden rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-white hover:border-amber-300 transition shadow-soft hover:shadow-lifted"
    >
      <div className="px-6 md:px-10 py-8 md:py-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
          <span className="w-12 h-12 rounded-xl bg-amber-400/25 ring-1 ring-amber-300 grid place-items-center flex-shrink-0 group-hover:bg-amber-400/45 transition">
            <svg className="w-6 h-6 text-amber-600 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20"><path d="M10 1.5l2.61 5.29 5.84.85-4.22 4.12.99 5.81L10 14.83l-5.22 2.74.99-5.81L1.55 7.64l5.84-.85L10 1.5z"/></svg>
          </span>
          <div className="min-w-0">
            <p className="text-2xl md:text-3xl font-semibold text-ink-900">Help us reach more researchers!</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-ink-900 group-hover:bg-ink-800 text-white text-base md:text-lg font-medium transition flex-shrink-0">
          <span>⭐</span> Star FERAL on GitHub
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
        </span>
      </div>
    </a>

    <HeroMosaic />    

            </section>
        );

const GettingStartedSection = ({ handleNavClick }) => (
  <section id="getting-started" className="surface p-8 md:p-10">
    <span className="pill bg-ink-100 text-ink-600 ring-1 ring-inset ring-ink-200">Step 0 · Setup</span>
    <h2 className="mt-3 text-3xl md:text-[2.5rem] font-semibold tracking-[-0.03em] text-ink-900">Getting Started</h2>

    <div className="mt-5 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
      <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
      <div className="text-sm text-amber-900 leading-relaxed">
        <strong>FERAL needs a modern NVIDIA GPU</strong>. Ampere architecture or newer (compute capability 8.0+).
        V100, T4, and the free Google Colab T4 will <strong>not</strong> work. Supported: A100, H100, L40,
        RTX&nbsp;3000/4000/5000 series, and newer.
      </div>
    </div>

    {/* High-level intro */}
    <p className="mt-6 text-ink-700 leading-relaxed max-w-3xl">
      To use FERAL you need (1) videos and (2) discrete behavior labels for
      some of these videos. FERAL then trains a deep learning model to predict
      behaviors that you have labeled. At the end, FERAL will automatically 
      evaluate its accuracy using a hold-out set. Then you’ll be able to predict 
      these behaviors on as many videos as you want using the model you trained!
    </p>

    {/* One-line install terminal */}
    <div className="mt-6 max-w-2xl terminal">
      <div className="terminal__bar">
        <span className="terminal__dot terminal__dot--r"></span>
        <span className="terminal__dot terminal__dot--y"></span>
        <span className="terminal__dot terminal__dot--g"></span>
        <span className="ml-2">install</span>
      </div>
      <div className="terminal__body">
        <div><span className="prompt">$</span> pip install feral</div>
        <div className="comment mt-2"># Provides: feral reencode | train | train-config | infer</div>
      </div>
    </div>

    {/* System requirements */}
    <div className="mt-10">
      <span className="pill bg-ink-100 text-ink-600 ring-1 ring-inset ring-ink-200">Requirements</span>
      <h3 className="mt-3 text-2xl font-semibold tracking-[-0.025em] text-ink-900">System Requirements</h3>
    </div>
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="rounded-xl border border-ink-200 bg-white p-4 flex items-center gap-3">
        <span className="w-8 h-8 rounded-lg bg-ink-50 text-ink-700 grid place-items-center text-xs font-mono font-semibold flex-shrink-0">OS</span>
        <div className="text-sm text-ink-700"><strong className="text-ink-900">Linux</strong> recommended. Windows GPU training has not been revalidated for this release. Mac untested.</div>
      </div>
      <div className="rounded-xl border border-ink-200 bg-white p-4 flex items-center gap-3">
        <span className="w-8 h-8 rounded-lg bg-ink-50 text-ink-700 grid place-items-center text-xs font-mono font-semibold flex-shrink-0">PY</span>
        <div className="text-sm text-ink-700"><strong className="text-ink-900">Python 3.10+</strong></div>
      </div>
      <div className="rounded-xl border border-ink-200 bg-white p-4 flex items-center gap-3">
        <span className="w-8 h-8 rounded-lg bg-ink-50 text-ink-700 grid place-items-center text-xs font-mono font-semibold flex-shrink-0">PT</span>
        <div className="text-sm text-ink-700"><strong className="text-ink-900">PyTorch 2.5+</strong> with compatible CUDA</div>
      </div>
      <div className="rounded-xl border border-ink-200 bg-white p-4 flex items-center gap-3">
        <span className="w-8 h-8 rounded-lg bg-accent-50 text-accent-700 grid place-items-center text-xs font-mono font-semibold flex-shrink-0">GPU</span>
        <div className="text-sm text-ink-700"><strong className="text-ink-900">NVIDIA Ampere+</strong> (compute 8.0+), 8&nbsp;GB+ with memory-saving settings</div>
      </div>
    </div>
    <p className="mt-3 text-xs text-ink-500 leading-relaxed">
      <strong>Windows note:</strong> FERAL installs <code>decord</code> and <code>triton-windows</code> on Windows. See
      <a href="https://github.com/Skovorp/feral/issues/11" target="_blank" rel="noopener noreferrer" className="link mx-1">issue&nbsp;#11</a>
      for the <code>torch.compile</code> compatibility discussion; avoid PyTorch 2.8 and 2.9 on Windows because a
      <code>torch.compile</code> bug crashes training (use 2.7 or 2.10+).
    </p>

    <div className="mt-10 flex items-center gap-3">
      <span className="pill bg-ink-100 text-ink-600 ring-1 ring-inset ring-ink-200">Workflow</span>
    </div>
    <p className="mt-3 text-ink-700 leading-relaxed">
      Prepare your data in <strong>3 steps</strong>:
    </p>

    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
      <button
        onClick={() => handleNavClick("video-preparation")}
        className="text-left rounded-2xl border border-ink-200 bg-white hover:border-accent-400 hover:shadow-soft transition p-5 group"
      >
        <div className="flex items-center gap-2 text-xs font-semibold text-ink-400 uppercase tracking-wider">
          <span className="w-5 h-5 rounded-full bg-ink-900 text-white grid place-items-center text-[10px]">1</span>
          Step
        </div>
        <h4 className="mt-3 font-semibold text-ink-900">Prepare your videos</h4>
        <p className="mt-1 text-sm text-ink-600 leading-relaxed">FERAL needs seek-able video files. Re-encode in one command.</p>
        <span className="mt-3 inline-flex items-center gap-1 text-xs text-accent-700 group-hover:gap-2 transition-all">Video Preparation →</span>
      </button>
      <button
        onClick={() => handleNavClick("label-preparation")}
        className="text-left rounded-2xl border border-ink-200 bg-white hover:border-accent-400 hover:shadow-soft transition p-5 group"
      >
        <div className="flex items-center gap-2 text-xs font-semibold text-ink-400 uppercase tracking-wider">
          <span className="w-5 h-5 rounded-full bg-ink-900 text-white grid place-items-center text-[10px]">2</span>
          Step
        </div>
        <h4 className="mt-3 font-semibold text-ink-900">Prepare your labels</h4>
        <p className="mt-1 text-sm text-ink-600 leading-relaxed">Convert annotations into the JSON schema FERAL expects.</p>
        <span className="mt-3 inline-flex items-center gap-1 text-xs text-accent-700 group-hover:gap-2 transition-all">Label Preparation →</span>
      </button>
      <button
        onClick={() => handleNavClick("running-feral")}
        className="text-left rounded-2xl border border-ink-200 bg-white hover:border-accent-400 hover:shadow-soft transition p-5 group"
      >
        <div className="flex items-center gap-2 text-xs font-semibold text-ink-400 uppercase tracking-wider">
          <span className="w-5 h-5 rounded-full bg-ink-900 text-white grid place-items-center text-[10px]">3</span>
          Step
        </div>
        <h4 className="mt-3 font-semibold text-ink-900">Run FERAL</h4>
        <p className="mt-1 text-sm text-ink-600 leading-relaxed">Train a model on your dataset and predict on unannotated videos.</p>
        <span className="mt-3 inline-flex items-center gap-1 text-xs text-accent-700 group-hover:gap-2 transition-all">Running FERAL →</span>
      </button>
    </div>

    {/* How to run */}
    <div className="mt-12 flex items-center gap-3">
      <span className="pill bg-ink-100 text-ink-600 ring-1 ring-inset ring-ink-200">Environments</span>
    </div>
    <h3 className="mt-3 text-2xl font-semibold tracking-[-0.025em] text-ink-900">
      Choose how to run FERAL
    </h3>

    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* A. Local */}
      <div className="rounded-2xl border border-ink-200 bg-white p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <span className="pill bg-ink-900 text-white">Option A</span>
        </div>
        <h4 className="font-semibold text-ink-900 text-lg">Local / HPC</h4>
        <p className="text-sm text-ink-600 mt-1 leading-relaxed">Best when you have your own GPU and command-line experience.</p>
        {/* <div className="mt-4 terminal">
          <div className="terminal__bar"><span className="terminal__dot terminal__dot--r"></span><span className="terminal__dot terminal__dot--y"></span><span className="terminal__dot terminal__dot--g"></span><span className="ml-2">install</span></div>
          <div className="terminal__body"><div><span className="prompt">$</span> pip install feral</div></div>
        </div>*/}
        <ul className="mt-4 space-y-1.5 text-sm text-ink-700">
          <li className="flex gap-2"><span className="text-accent-600">●</span> Bring your own CUDA + PyTorch (2.5+)</li>
          <li className="flex gap-2"><span className="text-accent-600">●</span> Data never leaves your machine</li>
          <li className="flex gap-2"><span className="text-accent-600">●</span> Free </li>
          <li className="flex gap-2"><span className="text-amber-600">▲</span> Needs Ampere+ GPU; 8&nbsp;GB+ with memory-saving settings</li>
        </ul>
        <button onClick={() => handleNavClick("running-feral")} className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-ink-900 hover:bg-ink-800 text-white font-medium py-2 px-4 rounded-xl transition">
          Run locally
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
        </button>
      </div>

      {/* B. Colab */}
      <div className="rounded-2xl border-2 border-accent-400 bg-gradient-to-br from-accent-50 to-white p-6 flex flex-col shadow-glow-accent">
        <div className="flex items-center gap-2 mb-3">
          <span className="pill bg-accent-600 text-white">Option B</span>
        </div>
        <h4 className="font-semibold text-ink-900 text-lg">Google Colab</h4>
        <p className="text-sm text-ink-600 mt-1 leading-relaxed">Try FERAL in your browser using our Colab notebook.</p>
        <ul className="mt-4 space-y-1.5 text-sm text-ink-700">
          <li className="flex gap-2"><span className="text-accent-600">●</span> Zero setup</li>
          <li className="flex gap-2"><span className="text-accent-600">●</span> Use an A100 / L4 GPU</li>
          <li className="flex gap-2"><span className="text-accent-600">●</span> Integrated with your Drive</li>
          <li className="flex gap-2"><span className="text-amber-600">▲</span> Paid Colab Pro required</li>
          <li className="flex gap-2"><span className="text-amber-600">▲</span> Runs longer than 8h might crash</li>
        </ul>
        <button onClick={() => handleNavClick("running-feral")} className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-accent-600 hover:bg-accent-700 text-white font-medium py-2 px-4 rounded-xl transition">
          Open Colab guide
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
        </button>
      </div>

      {/* C. RunPod */}
      <div className="rounded-2xl border border-ink-200 bg-white p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <span className="pill bg-ink-900 text-white">Option C</span>
        </div>
        <h4 className="font-semibold text-ink-900 text-lg">Cloud GPU (e.g. RunPod)</h4>
        <p className="text-sm text-ink-600 mt-1 leading-relaxed">Dedicated GPU server with full control. Best for large datasets.</p>
        <ul className="mt-4 space-y-1.5 text-sm text-ink-700">
          <li className="flex gap-2"><span className="text-accent-600">●</span> Long-running A100 / H100 pod</li>
          <li className="flex gap-2"><span className="text-accent-600">●</span> Persistent storage</li>
          <li className="flex gap-2"><span className="text-amber-600">▲</span> Pay-as-you-go</li>
        </ul>
        <button onClick={() => handleNavClick("running-feral")} className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-ink-900 hover:bg-ink-800 text-white font-medium py-2 px-4 rounded-xl transition">
          Run on RunPod
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
        </button>
      </div>
    </div>

    {/* Bottom quick links 
    <div className="mt-10 flex flex-wrap gap-2">
      <button onClick={() => handleNavClick("video-preparation")} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-ink-200 hover:border-ink-300 hover:bg-ink-50 text-ink-700 text-sm transition">Video Prep</button>
      <button onClick={() => handleNavClick("label-preparation")} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-ink-200 hover:border-ink-300 hover:bg-ink-50 text-ink-700 text-sm transition">Label Prep</button>
      <button onClick={() => handleNavClick("dataset-validator")} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-ink-200 hover:border-ink-300 hover:bg-ink-50 text-ink-700 text-sm transition">Validator</button>
      <button onClick={() => handleNavClick("running-feral")} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ink-900 hover:bg-ink-800 text-white text-sm transition">Run FERAL</button>
    </div>
    */}

  </section>
);

  

        const VideoPreparationSection = () => {
            const [isCodeExpanded, setIsCodeExpanded] = useState(false);
            const [copySuccess, setCopySuccess] = useState(false);

            const reencodingScript = `#!/usr/bin/env python3
"""
FERAL Video Re-encoding Script with Auto-FFmpeg Installation
Converts videos to the required format for FERAL processing.

Features:
- Automatically downloads and sets up FFmpeg if not installed
- Cross-platform support (Windows, macOS, Linux)
- Parallel processing for faster conversion
- Progress tracking and error handling

Usage:
    python reencode_videos.py /path/to/input/videos /path/to/output/videos

Requirements:
    - Python 3.6+
    - Internet connection (for FFmpeg auto-download if needed)
"""

import os
import sys
import subprocess
import argparse
import platform
import urllib.request
import zipfile
import tarfile
from multiprocessing import Pool
import mimetypes
from pathlib import Path

# FFmpeg download URLs for different platforms
FFMPEG_URLS = {
    'Windows': 'https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip',
    'Darwin': 'https://evermeet.cx/ffmpeg/ffmpeg-7.1.zip',
    'Linux': 'https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz'
}

def get_platform():
    import platform
    sysname = platform.system()
    if sysname in ('Darwin', 'Windows'):
        return sysname
    else:
        return 'Linux'

def download_file(url, filename):
    """Download a file with progress indication."""
    print(f"Downloading {filename}...")
    
    def progress_hook(block_num, block_size, total_size):
        downloaded = block_num * block_size
        if total_size > 0:
            percent = min(100, (downloaded * 100) // total_size)
            print(f"\\rProgress: {percent}% ({downloaded}/{total_size} bytes)", end='')
    
    urllib.request.urlretrieve(url, filename, reporthook=progress_hook)
    print("\\nDownload complete!")

def extract_ffmpeg(archive_path, extract_dir):
    """Extract FFmpeg from downloaded archive."""
    print(f"Extracting {archive_path}...")
    
    if archive_path.endswith('.zip'):
        with zipfile.ZipFile(archive_path, 'r') as zip_ref:
            zip_ref.extractall(extract_dir)
    elif archive_path.endswith('.tar.xz'):
        with tarfile.open(archive_path, 'r:xz') as tar_ref:
            tar_ref.extractall(extract_dir)
    
    print("Extraction complete!")

def find_ffmpeg_binary(extract_dir, platform_name):
    """Find the FFmpeg binary in the extracted directory."""
    if platform_name == 'Windows':
        # Look for ffmpeg.exe in subdirectories
        for root, dirs, files in os.walk(extract_dir):
            if 'ffmpeg.exe' in files:
                return os.path.join(root, 'ffmpeg.exe')
    else:
        # Look for ffmpeg binary in subdirectories  
        for root, dirs, files in os.walk(extract_dir):
            if 'ffmpeg' in files:
                ffmpeg_path = os.path.join(root, 'ffmpeg')
                # Make sure it's executable
                os.chmod(ffmpeg_path, 0o755)
                return ffmpeg_path
    
    return None

def setup_ffmpeg():
    """Download and setup FFmpeg if not available."""
    platform_name = get_platform()
    
    # Check if ffmpeg is already available
    try:
        subprocess.run(['ffmpeg', '-version'], capture_output=True, check=True)
        print("✅ FFmpeg is already installed and available!")
        return 'ffmpeg'
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("FFmpeg not found in PATH. Setting up FFmpeg automatically...")
    
    # Create ffmpeg directory
    ffmpeg_dir = os.path.join(os.getcwd(), 'ffmpeg_portable')
    os.makedirs(ffmpeg_dir, exist_ok=True)
    
    # Check if we already have a portable version
    existing_ffmpeg = find_ffmpeg_binary(ffmpeg_dir, platform_name)
    if existing_ffmpeg and os.path.exists(existing_ffmpeg):
        print("✅ Using existing portable FFmpeg installation!")
        return existing_ffmpeg
    
    # Download FFmpeg
    if platform_name not in FFMPEG_URLS:
        raise RuntimeError(f"Unsupported platform: {platform_name}")
    
    url = FFMPEG_URLS[platform_name]
    archive_name = url.split('/')[-1]
    archive_path = os.path.join(ffmpeg_dir, archive_name)
    
    try:
        download_file(url, archive_path)
        extract_ffmpeg(archive_path, ffmpeg_dir)
        
        # Find the binary
        ffmpeg_binary = find_ffmpeg_binary(ffmpeg_dir, platform_name)
        
        if not ffmpeg_binary:
            raise RuntimeError("Could not find FFmpeg binary after extraction")
        
        # Test the binary
        subprocess.run([ffmpeg_binary, '-version'], capture_output=True, check=True)
        print("✅ FFmpeg setup complete!")
        
        # Clean up archive
        os.remove(archive_path)
        
        return ffmpeg_binary
        
    except Exception as e:
        print(f"❌ Error setting up FFmpeg: {e}")
        print("Please install FFmpeg manually from https://ffmpeg.org/download.html")
        sys.exit(1)

def is_video_file(filepath):
    """Check if file is a video based on MIME type."""
    mime_type, _ = mimetypes.guess_type(filepath)
    return mime_type is not None and mime_type.startswith('video')

def process_file(args):
    """Process a single video file with ffmpeg."""
    input_path, output_dir, ffmpeg_binary = args
    
    # Create output filename with .mp4 extension
    input_name = Path(input_path).stem
    output_path = os.path.join(output_dir, f"{input_name}.mp4")
    
    # Skip if output already exists
    if os.path.exists(output_path):
        print(f"Output already exists, skipping: {output_path}")
        return True
    
    # FFmpeg command for FERAL-compatible encoding
    cmd = [
        ffmpeg_binary, "-i", input_path,
        "-vf", "scale=256:256:flags=lanczos",  # Resize to 256x256 with high-quality scaling
        "-c:v", "libx264",                      # H.264 video codec
        "-pix_fmt", "yuv420p",                  # Standard pixel format
        "-crf", "25",                           # Constant rate factor (quality)
        "-preset", "superfast",                 # Encoding speed/quality balance
        "-an",                                  # Remove audio
        "-y",                                   # Overwrite output files
        output_path
    ]
    
    try:
        print(f"Processing: {os.path.basename(input_path)} -> {os.path.basename(output_path)}")
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        print(f"✅ Successfully processed: {os.path.basename(output_path)}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Error processing {input_path}: {e.stderr}")
        return False

def main():
    parser = argparse.ArgumentParser(description="Re-encode videos for FERAL processing with auto-FFmpeg setup")
    parser.add_argument("input_dir", help="Directory containing input videos")
    parser.add_argument("output_dir", help="Directory for re-encoded videos")
    parser.add_argument("--processes", "-p", type=int, default=4, 
                        help="Number of parallel processes (default: 4)")
    
    args = parser.parse_args()
    
    print("🎬 FERAL Video Re-encoding Script")
    print("=" * 50)
    
    # Validate input directory
    if not os.path.isdir(args.input_dir):
        print(f"❌ Error: Input directory does not exist: {args.input_dir}")
        sys.exit(1)
    video_paths = []
    for filename in os.listdir(args.input_dir):
        filepath = os.path.join(args.input_dir, filename)
        if os.path.isfile(filepath) and is_video_file(filepath):
            video_paths.append(filepath)
        else:
            print(f"Input directory must only have videos. Found not video: {filepath}")
            sys.exit(1)
    if not video_paths:
        print("❌ No video files found in input directory.")
        sys.exit(1)
    print(f"📁 Found {len(video_paths)} video files to process")
    
    # Create output directory
    out_dir = Path(args.output_dir)
    if out_dir.exists():
        if any(out_dir.iterdir()):
            print(f"Directory '{out_dir}' should be empty")
            sys.exit(1)
    else:
        out_dir.mkdir(parents=True)
    
    # Setup FFmpeg (download if needed)
    ffmpeg_binary = setup_ffmpeg()
    input_files = [(x, args.output_dir, ffmpeg_binary) for x in video_paths]
    
    print(f"Using this ffmpeg path: {ffmpeg_binary}")
    print(f"Using {args.processes} parallel processes")
    print(f"Output directory: {args.output_dir}")
    print("-" * 50)
    
    # Process files in parallel
    with Pool(processes=args.processes) as pool:
        results = pool.map(process_file, input_files)
    
    successful = sum(results)
    total = len(input_files)
    print("-" * 50)
    print(f"🎉 Processing complete: {successful}/{total} files successful")
    
    if successful < total:
        print(f"⚠️  {total - successful} files failed to process")
        sys.exit(1)
    else:
        print("✨ All videos successfully re-encoded for FERAL!")
        print(f"📂 Converted videos are in: {args.output_dir}")

if __name__ == "__main__":
    main()`;

            const copyToClipboard = async () => {
                try {
                    await navigator.clipboard.writeText(reencodingScript);
                    setCopySuccess(true);
                    setTimeout(() => setCopySuccess(false), 2000);
                } catch (err) {
                    console.error('Failed to copy: ', err);
                }
            };

            const downloadScript = () => {
                const blob = new Blob([reencodingScript], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'reencode_videos.py';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            };

            return (
            <section id="video-preparation" className="surface p-8 md:p-10">
                <span className="pill bg-ink-100 text-ink-600 ring-1 ring-inset ring-ink-200">Step 1 · Data prep</span>
                <h2 className="mt-3 text-3xl md:text-[2.5rem] font-semibold tracking-[-0.03em] text-ink-900">Video Preparation</h2>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Re-encoding is built into the <code className="bg-gray-100 px-1 py-0.5 rounded">feral</code>
                  &nbsp;CLI as a single subcommand. Once you've run
                  <code className="bg-gray-100 px-1 py-0.5 rounded ml-1">pip install feral</code>, you have
                  everything needed.
                </p>

                  {/* Quick-start checklist */}
                  <ol className="list-decimal list-inside space-y-4 text-gray-700 leading-relaxed mb-6">
                    <li>
                      Place <strong>all videos you want FERAL to use</strong> in a single
                      folder. That folder should contain <em>only</em> those videos.
                    </li>

                    <li>
                      Pick an <strong>empty</strong> output folder for the re-encoded videos
                      (FERAL refuses to write into a non-empty directory to avoid clobbering files). 
                      If the folder doesn't exist, we will create it automatically.
                    </li>

                    <li>
                      Run the re-encode command:
                      <pre className="bg-ink-950 text-accent-300 font-mono text-[13px] rounded-xl p-4 overflow-x-auto border border-ink-800/50 mt-2"><code>feral reencode /path/to/raw/videos /path/to/reencoded/videos</code></pre>
                    </li>
                  </ol>

                  {/* Options */}
                  <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-3">Command Options</h3>
                  <div className="overflow-x-auto mb-6">
                    <table className="w-full text-sm text-left border border-gray-200">
                      <thead className="text-xs uppercase bg-gray-100 text-gray-700">
                        <tr>
                          <th className="px-4 py-2 border-b">Flag</th>
                          <th className="px-4 py-2 border-b">Default</th>
                          <th className="px-4 py-2 border-b">Description</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-700">
                        <tr className="border-b">
                          <td className="px-4 py-2 font-mono">--processes / -p</td>
                          <td className="px-4 py-2">4</td>
                          <td className="px-4 py-2">Number of parallel FFmpeg workers.</td>
                        </tr>
                        <tr className="border-b">
                          <td className="px-4 py-2 font-mono">--smallest-side / -s</td>
                          <td className="px-4 py-2">512</td>
                          <td className="px-4 py-2">Downsize so the shortest side is at most this many pixels (aspect ratio preserved). Videos already smaller are left as-is.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* <pre className="bg-ink-950 text-accent-300 font-mono text-[13px] rounded-xl p-4 overflow-x-auto border border-ink-800/50 mb-6"><code>feral reencode ./raw_videos ./reencoded_videos -p 8 -s 384</code></pre>*/}

               

                  {/* What & why */}
                  <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-3">
                    Why is re-encoding needed?
                  </h3>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    During training, FERAL samples frames from anywhere in a video, so the encoding
                    must support efficient random frame access. Many common video encodings can't do
                    that efficiently and would throttle the GPU. <code className="bg-gray-100 px-1 py-0.5 rounded">feral reencode</code>
                    &nbsp;rewrites your footage with H.264 + a small GOP and the <code className="bg-gray-100 px-1 py-0.5 rounded">faststart</code>
                    &nbsp;flag so reading frame N is fast.
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    By default the model resizes videos to <strong>256&nbsp;×&nbsp;256&nbsp;px</strong> internally, so 
                    during re-encoding we pre-downsize your videos (by default to <strong>512&nbsp;px</strong>). 
                    This shrinks file size and speeds up data loading during training. Aspect ratio is preserved.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    The command uses <strong>FFmpeg</strong> under the hood. If FFmpeg isn't on your
                    <code className="bg-gray-100 px-1 py-0.5 rounded ml-1">PATH</code>, FERAL detects your OS,
                    downloads a portable build, and reuses it next time.
                  </p>
                  <div className="mt-8 rounded-2xl border border-ink-200 bg-gradient-to-br from-ink-50 to-white p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
  <div>
    <p className="text-sm font-semibold text-ink-900">Enjoying FERAL?</p>
    <p className="text-sm text-ink-600">A GitHub star helps us support the research community.</p>
  </div>
  <a
    href="https://github.com/Skovorp/feral"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-ink-900 hover:bg-ink-800 text-white text-sm font-medium transition flex-shrink-0"
  >
    <span>⭐</span> Star on GitHub
  </a>
</div>

            </section>
        );
        };

        // LabelPreparationSection.jsx (or inline with your other sections)
        const LabelPreparationSection = ({ handleNavClick }) => {
            const borisScript = window.BORIS_TO_FERAL_SCRIPT || '# Script not loaded';
            const [borisCopied, setBorisCopied] = useState(false);

            const copyBorisScript = async () => {
                try {
                    await navigator.clipboard.writeText(borisScript);
                    setBorisCopied(true);
                    setTimeout(() => setBorisCopied(false), 2000);
                } catch (err) {
                    console.error('Copy failed:', err);
                }
            };

            return (
            <section
            id="label-preparation"
            className="surface p-8 md:p-10"
            >
            <span className="pill bg-ink-100 text-ink-600 ring-1 ring-inset ring-ink-200">Step 2 · Data prep</span>
            <h2 className="mt-3 text-3xl md:text-[2.5rem] font-semibold tracking-[-0.03em] text-ink-900">Label Preparation</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                    You need to structure your labels as a JSON file with a specific format. Here is an example of such file
                </p>

                <div className="bg-ink-950 text-ink-100 p-4 rounded-xl text-[12.5px] font-mono overflow-x-auto border border-ink-800/50 leading-relaxed">
                    <pre><code>{`{
  "is_multilabel": false,
  "class_names": {
    "0": "other",
    "1": "contact",
    "2": "attempt",
    "3": "flight",
    "4": "kicking",
    "5": "genital_contact",
    "6": "mating"
  },
  "splits": {
    "train": [
      "video_file_1.mp4",
      "video_file_2.mp4"
    ],
    "val": [
      "video_file_3.mp4"
    ],
    "test": [
      "video_file_4.mp4"
    ],
    "inference": [
      "video_file_5.mp4",
      "video_file_6.mp4",
      "video_file_7.mp4"
    ]
  },
  "labels": {
    "video_file_1.mp4": [0, 0, 1, 1, 2, 0, 0, 3, 3, 0],
    "video_file_2.mp4": [0, 0, 0, 4, 4, 5, 6, 6, 0, 0],
    "video_file_3.mp4": [0, 1, 1, 0, 0, 0, 2, 2, 3, 0],
    "video_file_4.mp4": [0, 6, 6, 6, 6, 6, 0, 0, 1, 1]
  }
}`}</code></pre>
                </div>
                <p className="text-gray-700 leading-relaxed mt-3 text-sm">
                  <strong>Note on the <code>inference</code> split:</strong> videos listed under
                  <code className="bg-gray-100 px-1 py-0.5 rounded ml-1">"inference"</code> do <em>not</em> need entries in
                  <code className="bg-gray-100 px-1 py-0.5 rounded ml-1">"labels"</code>. FERAL only uses them to predict on,
                  not to compute loss or metrics.
                </p>
<p className="text-gray-700 leading-relaxed mt-4 mb-2">
  For <strong>multi-label datasets</strong> (<code>is_multilabel: true</code>), each frame is represented by a
   <strong>multi-hot vector</strong> (one entry per class, 0/1), not a single integer:
</p>

<div className="bg-ink-950 text-ink-100 p-4 rounded-xl text-[12.5px] font-mono overflow-x-auto border border-ink-800/50 leading-relaxed">
  <pre><code>{`{
  "is_multilabel": true,
  "class_names": {
    "0": "contact",
    "1": "attempt",
    "2": "flight",
    "3": "kicking",
    "4": "genital_contact",
    "5": "mating"
  },
  "labels": {
    "035FQHMNRk.mp4": [
      [0,0,1,0,0,0],
      [1,0,0,0,0,0],
      [1,1,0,0,0,0],
      [0,0,0,0,0,0]
    ]
  },
  "splits": {
    "train": ["035FQHMNRk.mp4"],
    "val": [],
    "test": [],
    "inference": ["035FQHMNRk.mp4"]
  }
}`}</code></pre>
</div>

                <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Field Descriptions</h3>
                <div className="space-y-4">
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">is_multilabel</h4>
                        <p className="text-gray-700 leading-relaxed">
                            <strong>Required:</strong> Yes<br/>
                            <strong>Type:</strong> <code className="bg-gray-100 px-2 py-1 rounded text-sm">true</code> or <code className="bg-gray-100 px-2 py-1 rounded text-sm">false</code><br/>
                            <strong>Description:</strong> Set to <code className="bg-gray-100 px-2 py-1 rounded text-sm">false</code> if each frame
                            has exactly one label (mutually exclusive classes, softmax + cross-entropy under the hood).
                            Set to <code className="bg-gray-100 px-2 py-1 rounded text-sm">true</code> if frames can carry several
                            simultaneous behaviors (multi-hot vectors, sigmoid + BCE under the hood).
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">class_names</h4>
                        <p className="text-gray-700 leading-relaxed">
                            <strong>Required:</strong> Yes<br/>
                            <strong>Description:</strong> Maps numeric class IDs to human-readable class names.<br/>
                            <strong>Format:</strong> <code className="bg-gray-100 px-2 py-1 rounded text-sm">{'{'}"class_id": "class_name"{'}'}</code><br/>
                            <strong>Rules:</strong>
                        </p>
                        <ul className="list-disc list-inside text-gray-700 mt-1 ml-2 space-y-1 text-sm">
                          <li>Keys must be <strong>strings</strong>, e.g. <code>"0"</code>, <code>"1"</code> (not raw integers).</li>
                          <li>Keys must be <strong>consecutive integers from <code>"0"</code> to <code>"N-1"</code></strong>. No gaps.</li>
                          <li>Values must be <strong>unique</strong>.</li>
                          <li>Single-label: you can create a catch-all background class named <code>"other"</code>; class-averaged metrics automatically exclude it.</li>
                          <li>Multi-label: no dedicated <code>"other"</code> class is needed, a frame of all zeros means &ldquo;no labeled behavior&rdquo;.</li>
                        </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">splits</h4>
                      <p className="text-gray-700 leading-relaxed">
                          <strong>Required:</strong> Yes<br/>
                          <strong>Description:</strong> Defines dataset partitions. Each value is an array of video filenames.<br/>
                          <strong>Allowed keys:</strong>
                      </p>
                      <ul className="list-disc list-inside text-gray-700 mt-1 ml-2 space-y-1 text-sm">
                        <li><code>train</code>, videos used to train the model</li>
                        <li><code>val</code>, held-out videos evaluated after each training epoch</li>
                        <li><code>test</code>, held-out videos scored at the end of training (optional)</li>
                        <li><code>inference</code>, unannotated videos for the trained model to label (optional). These do <strong>not</strong> need entries in <code>labels</code>.</li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed mt-2 text-sm">
                        Any split can be omitted or empty. To run inference-only with a trained checkpoint use
                        <code className="bg-gray-100 px-1 py-0.5 rounded ml-1">feral infer path/to/checkpoint path/to/video/folder</code>
                      </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">labels</h4>
                        <p className="text-gray-700 leading-relaxed">
                            <strong>Required:</strong> Yes (object; can be empty if you only run inference)<br/>
                            <strong>Single-label format:</strong>
                            <code className="bg-gray-100 px-2 py-1 rounded text-sm ml-1">{'{ "video.mp4": [int, int, ...] }'}</code>, each element is a class ID in <code>[0, N-1]</code>.<br/>
                            <strong>Multi-label format:</strong>
                            <code className="bg-gray-100 px-2 py-1 rounded text-sm ml-1">{'{ "video.mp4": [[0/1, ...], [0/1, ...], ...] }'}</code>, each frame is an array of length <code>N</code> with values 0 or 1.<br/>
                            <strong>Length:</strong> the array length for each video must equal the video's frame count exactly.
                        </p>
                    </div>
                </div>

                <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Requirements</h3>
                <ul className="text-gray-700 leading-relaxed space-y-2">
                    <li><strong>Consistency:</strong> Every file in the <code>train</code>, <code>val</code>, and <code>test</code> splits must have an entry in <code className="bg-gray-100 px-2 py-1 rounded text-sm">labels</code>. <code>inference</code> videos do not.</li>
                    <li><strong>Valid class IDs:</strong> Every integer that appears in a single-label array must exist as a key in <code className="bg-gray-100 px-2 py-1 rounded text-sm">class_names</code>.</li>
                    <li><strong>Multi-label vectors:</strong> Each per-frame array must have length equal to the number of classes, with values strictly 0 or 1.</li>
                    <li><strong>Mutually exclusive partitions:</strong> A video must not appear in more than one of <code>train</code>, <code>val</code>, <code>test</code>.</li>
                    <li><strong>File extensions:</strong> Filenames must include the extension matching the re-encoded files (typically <code>.mp4</code>).</li>
                    <li><strong>Array length:</strong> The label array length for a video must equal that video's frame count exactly. FERAL asserts this at load time.</li>
                </ul>

                <div className="mt-6 rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100/70 p-4">
                    <p className="text-blue-900 text-sm leading-relaxed">
                      <span className="mr-1" role="img" aria-label="Light bulb">💡</span>
                      <strong className="font-semibold">Tip:</strong>
                      {" "}
                      Not sure your JSON is valid? Try uploading it to our{" "}
                      <button
                        type="button"
                        onClick={() => handleNavClick("dataset-validator")}
                        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-blue-700 bg-white/70 hover:bg-white shadow-sm ring-1 ring-inset ring-blue-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      >
                        Label Validation Tool
                      </button>
                    </p>
                  </div>

                <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Converting Existing Annotations to FERAL Format</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                    FERAL doesn’t come with a built-in annotation interface. Instead, it integrates directly with the BORIS behavioral-annotation software. 
                    Latest BORIS version can export labels directly in FERAL format. If you use another tool, let us know and we’ll add support for it.
                </p>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-4">
                    <p className="text-yellow-800 font-medium">
                        ⚠️ <strong>Important:</strong> When converting annotations, ensure that video filenames in your annotation data 
                        match the re-encoded video files (with .mp4 extensions) rather than the original raw video file names.
                    </p>
                </div>

                <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">BORIS to JSON Conversion Script</h4>
                <p className="text-gray-700 leading-relaxed mb-4">
                    Currently BORIS plugin doesnt support multilabel behaviors. To export those or if you have an old BORIS version
                    you can run this script manually. It will convert BORIS TSV files to a correct JSON structure.
                </p>

                <div className="relative">
                    <button
                        onClick={copyBorisScript}
                        className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-ink-800/80 hover:bg-ink-700 text-ink-100 text-xs font-medium border border-ink-700 transition"
                        aria-label="Copy script"
                    >
                        {borisCopied ? (
                            <>
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                                Copied
                            </>
                        ) : (
                            <>
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                                Copy
                            </>
                        )}
                    </button>
                    <div className="bg-ink-950 text-ink-100 p-4 pr-20 rounded-xl text-[12.5px] font-mono overflow-x-auto border border-ink-800/50 leading-relaxed">
                        <pre><code>{borisScript}</code></pre>
                    </div>
                </div>

                <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                    <p className="text-yellow-800 font-medium">
                        ⚠️ <strong>Note:</strong> This script assumes your BORIS TSV files contain columns for 'Media duration (s)', 'FPS', 'Behavior', 'Behavior type', and 'Time'. 
                        Make sure the files contain these columns.
                    </p>
                </div>

            </section>
            );
        };


 const RunningFeralSection = ({ handleNavClick }) => {
  const [isTransferExpanded, setIsTransferExpanded] = React.useState(false);

  return (
    <section id="running-feral" className="surface p-8 md:p-10">
      <span className="pill bg-ink-100 text-ink-600 ring-1 ring-inset ring-ink-200">Step 3 · Train &amp; infer</span>
      <h2 className="mt-3 text-3xl md:text-[2.5rem] font-semibold tracking-[-0.03em] text-ink-900">Running FERAL</h2>

      <div className="mt-3 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
        <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
        <div className="text-sm text-amber-900 leading-relaxed">
          <strong>Hardware requirement.</strong> FERAL uses large video models. For smooth training we recommend GPUs with at least <strong>24&nbsp;GB VRAM</strong> (e.g. A100 / RTX 4090 / RTX 6000). For smaller GPUs, start with <code>--mode lite --gradient-checkpointing</code>. See <a href="https://www.biorxiv.org/content/10.1101/2025.11.16.688666v2" target="_blank" rel="noopener noreferrer" className="link">hardware benchmarks in our paper</a>.
        </div>
      </div>

      <h3 className="text-2xl font-semibold text-gray-800 mt-10 mb-3">
        Option A: Local or High Performance Cluster
      </h3>
      <p className="text-gray-700 leading-relaxed mb-3">
        Before you start, make sure your environment has at least:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>Python 3.10</li>
        <li>PyTorch 2.4.0</li>
        <li>CUDA 12.4</li>
      </ul>
      
      <p className="text-gray-700 leading-relaxed mb-3">
        You can try older versions, but we don&apos;t guarantee compatibility. Ensure that you
        can access your video folder and the JSON file containing labels from the training job.
      </p>

      {/* Option B: Google Colab */}
      <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">
        Option B: Google Colab (Recommended)
      </h3>
      <p className="text-gray-700 leading-relaxed mb-4">
        Run FERAL directly in your browser with our self-contained Colab notebook. No installation,
        drivers, or environment setup, and your data can live in Google Drive.
      </p>

      <div className="mb-4 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
        <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
        <div className="text-sm text-amber-900 leading-relaxed">
          <strong>GPU requirement.</strong> Pick an <code>A100</code> or <code>L4</code> runtime in Colab.
          The free T4 tier will <strong>not</strong> work with FERAL (no bfloat16 / flash-attention support).
          Colab Pro is <strong>no longer free for academics</strong>.
        </div>
      </div>

      <a
        href="https://colab.research.google.com/drive/1wPe7MX3IiY3zsFkeTzLzHgynrtj-wXFP?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-ink-900 hover:bg-ink-800 text-white font-medium py-2.5 px-5 rounded-xl shadow-soft hover:shadow-lifted transition"
      >
        Launch FERAL in Colab
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
      </a>

      {/* Colab runtime limits & downsampling */}
      <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
        If your Colab run is too slow or times out
      </h4>
      <p className="text-gray-700 leading-relaxed mb-2">
        Colab runtimes often reset after several hours. If training takes too long or crashes,
        you can shorten runs by downsampling your dataset. Just add <code className="bg-gray-100 px-1 py-0.5 rounded">--part_subsample 0.3</code> and
        we'll randomly sample 30% of the chunks from all your videos. You can also add <code className="bg-gray-100 px-1 py-0.5 rounded">--subsample_keep_rare_threshold 0.03</code>
        to keep all chunks with behaviors that are rarer than 3%.
      </p>
      

      {/* Option C: RunPod */}
      <h3 className="text-2xl font-semibold text-gray-800 mt-10 mb-3">
        Option C: Cloud Server on RunPod
      </h3>
      <p className="text-gray-700 leading-relaxed">
        Any GPU cloud provider works for FERAL. We use
        <a
          href="https://www.runpod.io"
          target="_blank"
          className="link mx-1"
          rel="noopener noreferrer"
        >
          RunPod
        </a>
        because it&apos;s the easiest to spin up, with full control of the environment and long-running pods for large datasets.
      </p>

      <ul className="list-disc list-inside mt-4 space-y-2 text-sm text-gray-700">
        <li>We suggest the <strong>H100 SXM</strong> GPU. Per-hour it&apos;s expensive, but it trains fastest. In our tests it&apos;s the most cost-efficient pick measured in <strong>$ / training run</strong>.</li>
        <li>Use the <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">runpod-torch-v280</code> template (PyTorch&nbsp;2.8), which is what we run on.</li>
      </ul>

      <div className="mt-4 mb-2">
        <a
          href="https://console.runpod.io/deploy?type=GPU&gpu=H100+SXM&count=1&template=runpod-torch-v280"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-ink-900 hover:bg-ink-800 text-white font-medium py-2.5 px-5 rounded-xl shadow-soft hover:shadow-lifted transition"
        >
          Deploy H100 + Torch&nbsp;2.8 template
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
        </a>
      </div>

      <ol className="list-decimal list-inside space-y-2 mt-4 text-gray-700">
        <li>
          Get a RunPod account with some credit, or contact us if you need access help.
        </li>
        <li>
          Go to{" "}
          <a
            href="https://console.runpod.io/deploy?type=GPU&gpu=H100+SXM&count=1&template=runpod-torch-v280"
            className="link"
            rel="noopener noreferrer"
          >
            this RunPod deploy link
          </a>{" "}
          and enable <em>SSH Terminal Access</em> and <em>Start Jupyter Notebook</em>.
          Increase disk size if needed.
        </li>
        <li>
          Go to{" "}
          <a
            href="https://console.runpod.io/pods"
            className="link"
            rel="noopener noreferrer"
          >
            My Pods
          </a>
          , wait for startup, then click <em>Connect → Jupyter Lab :8888</em>.
        </li>
        <li>
          Once in Jupyter Lab, open <em>Terminal</em> and run{" "}
          <code className="bg-gray-200 px-1 rounded">
            apt update && apt install -y unzip
          </code>
          .
        </li>
        <li>
          Transfer your videos and labels to the server ( we recommend trying gdown to download from google drive, or scp to upload directly from you machine (requires ssh setup), or use s3 compatible storage (industry standard, fast, but paid).
        </li>
      </ol>





      {/* Step 1: Prepare your data */}
      <h3 className="text-2xl font-semibold text-gray-800 mt-10 mb-3">
        1. Prepare your data
      </h3>

      <p className="text-gray-700 leading-relaxed mb-4">
        Before starting training, you must have:
      </p>

      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>
          A folder containing all your <strong>re-encoded videos</strong>
        </li>
        <li>
          A single <code className="bg-gray-100 px-1 py-0.5 rounded">.json</code> file with your
          frame-by-frame annotations in FERAL format.
        </li>
      </ul>

     

      <p className="text-sm text-ink-600 mb-3">Confirm your JSON is valid before launching a training run.</p>
      <button
        onClick={() => handleNavClick("dataset-validator")}
        className="inline-flex items-center gap-2 bg-ink-900 hover:bg-ink-800 text-white font-medium py-2.5 px-5 rounded-xl shadow-soft hover:shadow-lifted transition mb-6"
      >
        Validate dataset
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
      </button>

      {/* Step 2: Start training */}
      <h3 className="text-2xl font-semibold text-gray-800 mt-10 mb-3">
        2. Install FERAL
      </h3>

      <p className="text-gray-700 leading-relaxed">
        Just run this command. Note that this expects an already working pytorch installation
      </p>

      <pre className="bg-ink-950 text-accent-300 font-mono text-[13px] rounded-xl p-4 overflow-x-auto border border-ink-800/50 mt-2"><code>pip install feral</code></pre>

      <p className="text-gray-700 leading-relaxed mt-3">
        That single command installs the <code className="bg-gray-100 px-1 py-0.5 rounded">feral</code> CLI
        with subcommands <code>reencode</code>, <code>train</code>, <code>train-config</code>, and <code>infer</code>.
      </p>

      <h3 className="text-2xl font-semibold text-gray-800 mt-10 mb-3">
        3. Re-encode videos
      </h3>
      <pre className="bg-ink-950 text-accent-300 font-mono text-[13px] rounded-xl p-4 overflow-x-auto border border-ink-800/50 mb-3"><code>feral reencode /path/to/raw/videos /path/to/reencoded/videos</code></pre>
      <p className="text-gray-700 leading-relaxed mb-4">
        See <button onClick={() => handleNavClick("video-preparation")} className="link">Video Preparation</button> for options.
      </p>

      <h3 className="text-2xl font-semibold text-gray-800 mt-10 mb-3">
        4. Start training
      </h3>
      <pre className="bg-gray-900 text-green-300 p-4 rounded-md text-sm font-mono overflow-x-auto"><code>feral train /path/to/reencoded/videos /path/to/labels.json</code></pre>

      <p className="text-gray-700 leading-relaxed mt-3">
        FERAL will print an interactive prompt for Weights &amp; Biases logging:
      </p>
      <ul className="list-disc list-inside text-gray-700 mt-2 mb-4 space-y-1 text-sm">
        <li><code className="bg-gray-100 px-1 py-0.5 rounded">open</code>, log to a shared community W&amp;B account (no setup, public).</li>
        <li><code className="bg-gray-100 px-1 py-0.5 rounded">personal</code>, log to your own W&amp;B project (you'll be asked for a
          <a href="https://wandb.ai/authorize" target="_blank" rel="noopener noreferrer" className="link ml-1">W&amp;B API key</a> and project URL).</li>
        <li><code className="bg-gray-100 px-1 py-0.5 rounded">skip</code>, no W&amp;B; metrics print to stdout. You still see per-epoch numbers.</li>
      </ul>

      <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Useful flags for <code>feral train</code></h4>
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-sm text-left border border-gray-200">
          <thead className="text-xs uppercase bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border-b">Flag</th>
              <th className="px-4 py-2 border-b">Description</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <tr className="border-b"><td className="px-4 py-2 font-mono">--checkpoint, -c PATH</td><td className="px-4 py-2">Resume / fine-tune from a saved checkpoint.</td></tr>
            <tr className="border-b"><td className="px-4 py-2 font-mono">--part_subsample FLOAT</td><td className="px-4 py-2">Use a fraction in (0-1) of training chunks. Useful for quick smoke tests on Colab.</td></tr>
            <tr className="border-b"><td className="px-4 py-2 font-mono">--subsample_keep_rare_threshold FLOAT</td><td className="px-4 py-2">When subsampling, keep all chunks containing classes whose frequency is below this threshold. Requires <code>--part_subsample</code>.</td></tr>
          </tbody>
        </table>
      </div>

      {/* train-config */}
      <h3 className="text-2xl font-semibold text-gray-800 mt-10 mb-3">
        5. Non-interactive: <code>feral train-config</code>
      </h3>
      <p className="text-gray-700 leading-relaxed mb-2">
        For HPC submissions, CI, or scripted runs use a YAML config (no interactive W&amp;B prompt):
      </p>
      <pre className="bg-gray-900 text-green-300 p-4 rounded-md text-sm font-mono overflow-x-auto mb-2"><code>feral train-config /path/to/your_config.yaml</code></pre>
      <p className="text-gray-700 leading-relaxed mb-4 text-sm">
        Config follows the same schema as <code className="bg-gray-100 px-1 py-0.5 rounded">feral/default_config.yaml</code>.
        See <a href="https://github.com/Skovorp/feral/tree/cleanup/configs" target="_blank" rel="noopener noreferrer" className="link"><code>configs/</code></a> in the repo for ready-to-edit examples (calms, ants, worms, mabe).
      </p>

      {/* Inference */}
      <h3 className="text-2xl font-semibold text-gray-800 mt-10 mb-3">
        6. Inference on new videos
      </h3>
      <p className="text-gray-700 leading-relaxed mb-2">
        Run a trained checkpoint on a folder of unlabeled videos, no labels JSON needed:
      </p>
      <pre className="bg-ink-950 text-accent-300 font-mono text-[13px] rounded-xl p-4 overflow-x-auto border border-ink-800/50 mb-3"><code>feral infer /path/to/checkpoint.pth /path/to/videos</code></pre>
      <p className="text-gray-700 leading-relaxed mb-2 text-sm">
        Checkpoints saved by FERAL embed the full training cfg, class names, and the <code>is_multilabel</code> flag, so the
        inference command knows exactly how the model was trained.
      </p>
      <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Useful flags for <code>feral infer</code></h4>
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-sm text-left border border-gray-200">
          <thead className="text-xs uppercase bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border-b">Flag</th>
              <th className="px-4 py-2 border-b">Default</th>
              <th className="px-4 py-2 border-b">Description</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <tr className="border-b"><td className="px-4 py-2 font-mono">--output, -o PATH</td><td className="px-4 py-2"><code>inference_&#123;folder&#125;.json</code></td><td className="px-4 py-2">Where to save predictions.</td></tr>
            <tr className="border-b"><td className="px-4 py-2 font-mono">--batch_size, -b INT</td><td className="px-4 py-2">8</td><td className="px-4 py-2">DataLoader batch size for inference.</td></tr>
            <tr className="border-b"><td className="px-4 py-2 font-mono">--num_workers, -w INT</td><td className="px-4 py-2">4</td><td className="px-4 py-2">DataLoader workers.</td></tr>
            <tr className="border-b"><td className="px-4 py-2 font-mono">--compile</td><td className="px-4 py-2">off</td><td className="px-4 py-2">Wrap the model in <code>torch.compile</code> for faster inference.</td></tr>
          </tbody>
        </table>
      </div>

      <p className="text-gray-700 leading-relaxed mb-4 text-sm">
        Alternatively, you can also run inference through <code>feral train</code> by removing the train partition
        from your config, or set <code>train</code>/<code>val</code>/<code>test</code> to empty arrays in your labels JSON
        and put videos under <code>inference</code>.
      </p>

      {/* Step 7: Track performance */}
      <h3 className="text-2xl font-semibold text-gray-800 mt-10 mb-3">
        7. Track performance
      </h3>

      <p className="text-gray-700 leading-relaxed">
        In Weights &amp; Biases, monitor:
        <br />
        1. <strong>val_raster_plot / ema_val_raster_plot</strong>: raster of model predictions across validation videos.
        <br />
        2. <strong>ema_val_frame_level_map</strong>: main metric (Average Precision across classes, frame-level).
        &lt;0.5 is weak, &gt;0.9 is strong.
        <br />
        3. <strong>train_map / val_map / ema_val_map</strong>: batch-level Average Precision.
        <br />
        4. <strong>train loss / val loss</strong>: should steadily go down. If train loss drops while val loss rises,
        you're overfitting.
      </p>

      <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
        What's EMA?
      </h4>
      <p className="text-gray-700 leading-relaxed">
        EMA (Exponential Moving Average) keeps a smoothed copy of the model weights:
        <code className="bg-gray-100 px-1 py-0.5 rounded ml-1">
          ema = 0.999 × ema + 0.001 × weights
        </code>
        . FERAL saves outputs from both the main model and the EMA model so you can pick whichever performs better.
      </p>

      {/* Step 8: Final results */}
      <h3 className="text-2xl font-semibold text-gray-800 mt-10 mb-3">
        8. Get final results
      </h3>

      <p className="text-gray-700 leading-relaxed">
        At the end of a training run, FERAL writes predictions to{" "}
        <code className="bg-gray-100 px-1 py-0.5 rounded font-mono">answers/_inference_&#123;run_name&#125;_&#123;timestamp&#125;.json</code>.
        Standalone <code>feral infer</code> writes to <code className="bg-gray-100 px-1 py-0.5 rounded font-mono">inference_&#123;folder_name&#125;.json</code> by default
        (overridable with <code>--output</code>). Either file contains the per-frame predicted class probabilities for every video
        you provided in the inference split.
      </p>
    </section>
  );
};


// ===== Config documentation helpers =====
const RiskPill = ({ level }) => (
  level === 'high'
    ? <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide bg-red-100 text-red-700 ring-1 ring-inset ring-red-200 whitespace-nowrap">High&#8209;risk</span>
    : <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide bg-emerald-100 text-emerald-700 ring-1 ring-inset ring-emerald-200 whitespace-nowrap">Safe to tune</span>
);

const ParamRow = ({ name, def: defVal, level, children }) => (
  <tr className={`border-b border-gray-100 align-top ${level === 'high' ? 'bg-red-50/40' : ''}`}>
    <td className="px-4 py-3">
      <div className="font-mono text-[13px] text-ink-900 break-words">{name}</div>
      <div className="mt-1.5"><RiskPill level={level} /></div>
    </td>
    <td className="px-4 py-3 font-mono text-[12px] text-gray-500 whitespace-nowrap">{defVal}</td>
    <td className="px-4 py-3 text-sm text-gray-700 leading-relaxed">{children}</td>
  </tr>
);

const ParamTable = ({ children }) => (
  <div className="overflow-x-auto mb-8 rounded-xl border border-gray-200">
    <table className="w-full text-left min-w-[640px]">
      <thead className="text-xs uppercase bg-gray-50 text-gray-500">
        <tr>
          <th className="px-4 py-2.5 font-medium w-40">Parameter</th>
          <th className="px-4 py-2.5 font-medium">Default</th>
          <th className="px-4 py-2.5 font-medium">What it does &amp; how to tune</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  </div>
);

const ConfigDocsSection = ({ handleNavClick }) => (
  <section id="config-docs" className="surface p-8 md:p-10">
    <span className="pill bg-ink-100 text-ink-600 ring-1 ring-inset ring-ink-200">Reference · Config parameters</span>
    <h2 className="mt-3 text-3xl md:text-[2.5rem] font-semibold tracking-[-0.03em] text-ink-900">Config documentation</h2>

    <p className="text-gray-700 leading-relaxed mt-4">
      Every FERAL run is driven by a config with the same schema as{" "}
      <a href="https://github.com/Skovorp/feral/blob/main/feral/default_config.yaml" target="_blank" rel="noopener noreferrer" className="link"><code>feral/default_config.yaml</code></a>.
      This page documents every parameter: what it does, its default, and how to change it for
      what you&apos;re trying to do. Presets (<code className="bg-gray-100 px-1 py-0.5 rounded">--mode</code>) override a
      handful of these for you, so most users never edit YAML by hand.
    </p>

    <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 rounded-2xl border border-gray-200 bg-gray-50/60 p-4 text-sm">
      <div className="flex items-center gap-2"><RiskPill level="high" /><span className="text-gray-700">Wrong values crash the run or silently wreck accuracy. Change only if you know why.</span></div>
      <div className="flex items-center gap-2"><RiskPill level="safe" /><span className="text-gray-700">Adjust freely to fit your dataset and hardware.</span></div>
    </div>

    <div className="mt-4 flex gap-3 rounded-2xl border border-sky-200 bg-sky-50/70 p-4">
      <svg className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      <div className="text-sm text-sky-900 leading-relaxed">
        Checkpoints embed the full config they were trained with. <code className="bg-white/70 px-1 py-0.5 rounded">feral infer</code> reads
        the data and model parameters (backbone, resolution, chunking, etc.) back from the checkpoint, so you don&apos;t re-specify them at inference.
      </div>
    </div>

    {/* Presets */}
    <h3 className="text-2xl font-semibold text-gray-800 mt-10 mb-3">Start here: presets (<code>--mode</code>)</h3>
    <p className="text-gray-700 leading-relaxed mb-4">
      A preset is a small overlay on the defaults. Pass it to{" "}
      <code className="bg-gray-100 px-1 py-0.5 rounded">feral train --mode</code> (or{" "}
      <code className="bg-gray-100 px-1 py-0.5 rounded">feral infer --mode</code>) instead of editing YAML.
      Terms like EMA, mixup, and label smoothing are defined in the parameter tables below.
    </p>
    <div className="overflow-x-auto mb-6 rounded-xl border border-gray-200">
      <table className="w-full text-left text-sm min-w-[640px]">
        <thead className="text-xs uppercase bg-gray-50 text-gray-500">
          <tr>
            <th className="px-4 py-2.5 font-medium">Mode</th>
            <th className="px-4 py-2.5 font-medium">What it changes</th>
            <th className="px-4 py-2.5 font-medium">Use when</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          <tr className="border-b border-gray-100 align-top">
            <td className="px-4 py-3 font-mono text-[13px] text-ink-900">lite</td>
            <td className="px-4 py-3">Smallest V-JEPA&nbsp;2.1 (ViT-B/384), full fine-tune, 50% chunk overlap, EMA off.</td>
            <td className="px-4 py-3">You want the cheapest, fastest run — iterating, a small GPU, or a tight budget.</td>
          </tr>
          <tr className="border-b border-gray-100 align-top">
            <td className="px-4 py-3 font-mono text-[13px] text-ink-900">max</td>
            <td className="px-4 py-3">Default backbone; trains at 66% overlap, evaluates/infers at 80% overlap + 9-frame smoothing, EMA on.</td>
            <td className="px-4 py-3">You want the strongest accuracy. This is the recipe that hits SOTA on CalMS21.</td>
          </tr>
          <tr className="align-top">
            <td className="px-4 py-3 font-mono text-[13px] text-ink-900">rare</td>
            <td className="px-4 py-3">ViT-B/384 full fine-tune; mixup and label smoothing off, grad-norm clip and class-weight cap on.</td>
            <td className="px-4 py-3">A behavior is scarce and the model keeps ignoring it (rare-positive data).</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p className="text-gray-700 leading-relaxed mt-10 text-sm">
      The full parameter reference follows, grouped by where each key sits in the config.
      <code>model:</code>, <code>data:</code>, and <code>training:</code> are nested blocks;
      the <strong>Top-level</strong> and <strong>Augmentation &amp; EMA</strong> keys sit at the config root.
    </p>

    {/* Top-level */}
    <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Top-level</h3>
    <ParamTable>
      <ParamRow name="run_name" def="new_run" level="safe">Names the run. Used in checkpoint and answer filenames and as the W&amp;B run name. Cosmetic — set it to anything descriptive.</ParamRow>
      <ParamRow name="backbone" def="vjepa2_vitl_diving48" level="high">The frozen video encoder the classifier is built on. Options span V-JEPA&nbsp;2 (<code>vjepa2_vitl_*</code>), V-JEPA&nbsp;2.1 (<code>vjepa2_1_vitb/l/g/gg_384</code>), and VideoPrism (<code>videoprism_v1_base/large</code>). Bigger is more accurate but far heavier — the giant/gigantic variants run out of memory (OOM) on a single 24&nbsp;GB GPU, and VideoPrism needs PyTorch&nbsp;≥&nbsp;2.5. Never swap this on an existing checkpoint: the head is trained for one encoder&apos;s feature space.</ParamRow>
      <ParamRow name="predict_per_item" def="64" level="high">How many per-frame predictions the model emits per chunk. In every shipped config this equals <code>chunk_length</code>. Leave it at 64 unless you change <code>chunk_length</code> to match — a mismatch misaligns predictions with frames.</ParamRow>
      <ParamRow name="seed" def="0" level="safe">RNG seed. Change it to get a different weight init and data order (e.g. to average several runs).</ParamRow>
      <ParamRow name="device" def="cuda" level="high">Compute device. FERAL relies on bfloat16 + flash-attention, which need a modern NVIDIA GPU — keep this <code>cuda</code>. <code>cpu</code> and <code>mps</code> will not run.</ParamRow>
      <ParamRow name="starting_checkpoint" def="null" level="safe">Path to a checkpoint to warm-start / fine-tune from (<code>null</code> = fresh head). Same as <code>--checkpoint</code> on the CLI.</ParamRow>
      <ParamRow name="max_batches" def="null" level="safe">Cap on batches per epoch (<code>null</code> = no cap). Set something small like 5 for a quick smoke test.</ParamRow>
      <ParamRow name="multilabel_threshold" def="0.85" level="safe">Probability cutoff for turning per-frame scores into positive labels on multi-label datasets. Affects exported labels and reported metrics only, not training. Lower to catch more positives, raise for precision.</ParamRow>
    </ParamTable>

    {/* model */}
    <h3 className="text-2xl font-semibold text-gray-800 mt-10 mb-3"><code>model:</code></h3>
    <ParamTable>
      <ParamRow name="fc_drop_rate" def="0.5" level="safe">Dropout on the classification head. Raise (0.6–0.7) if a small dataset overfits; lower toward 0.3 for large ones.</ParamRow>
      <ParamRow name="class_weights" def="inv_freq_sqrt" level="safe">How class imbalance is handled in the loss. <code>inv_freq_sqrt</code> up-weights rare classes gently (inverse square-root frequency); <code>inv_freq</code> is the stronger 1/frequency; <code>null</code> disables weighting. Try <code>inv_freq</code> for very skewed data.</ParamRow>
      <ParamRow name="freeze_encoder_layers" def="12" level="safe">How many backbone transformer blocks to freeze (only the rest + head train). More frozen = less VRAM and less overfit but a lower ceiling; <code>0</code> = full fine-tune. Presets range 0–12. This is the first parameter to reach for when trading memory against accuracy.</ParamRow>
      <ParamRow name="gradient_checkpointing" def="false" level="safe">Recompute activations in the backward pass for a big VRAM cut at ~25–30% lower speed — enough to fit a ViT-L in ~9&nbsp;GB at batch size 4. V-JEPA only; it errors on VideoPrism backbones.</ParamRow>
      <ParamRow name="max_class_weight" def="null" level="safe">Cap on any single class&apos;s weight so an ultra-rare class doesn&apos;t dominate the loss (<code>null</code> = no cap). Set e.g. 20 for very skewed data (the <code>rare</code> preset does).</ParamRow>
    </ParamTable>

    {/* data */}
    <h3 className="text-2xl font-semibold text-gray-800 mt-10 mb-3"><code>data:</code></h3>
    <ParamTable>
      <ParamRow name="chunk_length" def="64" level="high">Frames per chunk — the model&apos;s temporal window. Coupled to <code>predict_per_item</code> and to how the backbone was pretrained; 64 is the tested value. Changing it changes the token count (how many patches the transformer processes — more tokens means more compute and VRAM) and the label alignment, so keep <code>predict_per_item</code> equal to it.</ParamRow>
      <ParamRow name="chunk_shift" def="32" level="safe">Stride between consecutive chunks. Overlap = 1&nbsp;−&nbsp;<code>chunk_shift</code>/<code>chunk_length</code> (32&nbsp;→&nbsp;50%, 16&nbsp;→&nbsp;75%). Smaller means more overlap: more training data and smoother labels, but slower. The <code>max</code> preset trains at 21 (66%).</ParamRow>
      <ParamRow name="chunk_step" def="1" level="safe">Stride within a chunk — take every Nth frame, so the window spans <code>(chunk_length−1)·step+1</code> real frames. Raise to 2–3 to cover more time for slow behaviors at the same token cost; it effectively lowers the fps the model sees.</ParamRow>
      <ParamRow name="eval_chunk_shift" def="null" level="safe">Chunk stride used only for val/test/inference (<code>null</code> = reuse <code>chunk_shift</code>). Lets you evaluate at a denser overlap than you trained — the <code>max</code> preset trains at 66% but evaluates at 80% (shift 12).</ParamRow>
      <ParamRow name="eval_smoothing_window" def="null" level="safe">N-frame moving average over the per-frame probabilities (which are already averaged across overlapping chunks) at val/test/inference (<code>null</code> or 1 = off). Smooths jittery labels; 9 is the <code>max</code> value. Applied per class, never across a video boundary.</ParamRow>
      <ParamRow name="resize_to" def="256" level="safe">Square input resolution (px) fed to the backbone. Higher = more spatial detail but quadratically more tokens and VRAM. Keep it a multiple of the patch size (16); backbones are native to 256, 288, or 384, and most example configs use 256 or 384. V-JEPA interpolates position embeddings when this differs from the backbone&apos;s native size (you just get a warning). Same as <code>--resolution</code>.</ParamRow>
      <ParamRow name="resize_style" def="square" level="safe"><code>square</code> stretches frames to <code>resize_to</code>×<code>resize_to</code>; <code>rectangle</code> preserves aspect ratio with the short side at <code>resize_to</code>. Use <code>rectangle</code> if squashing distorts your animals.</ParamRow>
      <ParamRow name="do_aa" def="true" level="safe">Enable TrivialAugmentWide during training. This applies random image augmentations; it does not control resize anti-aliasing.</ParamRow>
      <ParamRow name="part_sample" def="1.0" level="safe">Fraction (0–1) of training chunks to keep — a random subsample. Use &lt;1.0 for fast smoke tests or Colab. Same as <code>--part_subsample</code>.</ParamRow>
      <ParamRow name="subsample_keep_rare_threshold" def="null" level="safe">When subsampling, always keep chunks that contain any class rarer than this frequency, so you don&apos;t drop rare behaviors. Requires <code>part_sample</code>&nbsp;&lt;&nbsp;1.</ParamRow>
    </ParamTable>

    {/* training */}
    <h3 className="text-2xl font-semibold text-gray-800 mt-10 mb-3"><code>training:</code></h3>
    <ParamTable>
      <ParamRow name="epochs" def="10" level="safe">Passes over the training set. 10 is a solid default; raise for small datasets that underfit and watch val metrics for overfitting.</ParamRow>
      <ParamRow name="train_bs" def="4" level="high">Training batch size. Keep the preset value; the learning rate is tuned to it.</ParamRow>
      <ParamRow name="val_bs" def="8" level="safe">Validation/inference batch size. No effect on the model; raise for speed until you OOM.</ParamRow>
      <ParamRow name="num_workers" def="-1" level="safe">DataLoader worker processes. <code>-1</code> = auto (min(16, CPUs)); <code>0</code> = load in the main process (useful when debugging).</ParamRow>
      <ParamRow name="part_warmup" def="0.2" level="high">Fraction of total steps spent linearly warming the LR from 0. 0.2 = first 20%. Raise it for a very high LR or an unstable start.</ParamRow>
      <ParamRow name="lr" def="4.0e-5" level="high">Peak learning rate for the AdamW optimizer. The single most sensitive parameter — too high diverges or collapses to one class, too low underfits. 4e-5 is tuned for the default fine-tune.</ParamRow>
      <ParamRow name="weight_decay" def="0.1" level="safe">AdamW weight decay (regularization). Raise toward 0.2 if overfitting, lower toward 0.05 if underfitting.</ParamRow>
      <ParamRow name="label_smoothing" def="0.1" level="safe">Softens the hard 0/1 training labels to curb overconfidence. Helps most datasets; set 0 for rare-positive data where it hurts (the <code>rare</code> preset does).</ParamRow>
      <ParamRow name="compile" def="true" level="safe"><code>torch.compile</code> for a large speedup. Safe to leave on; turn off if you hit a compiler/platform bug (see the README&apos;s Windows/torch notes) — training still works, just slower.</ParamRow>
      <ParamRow name="patience" def="null" level="safe">Early-stopping patience in epochs (<code>null</code> = off). Set e.g. 3 to stop when val stops improving.</ParamRow>
      <ParamRow name="grad_clip_norm" def="null" level="safe">Global gradient-norm clip (<code>null</code> = off). Set 1.0 to tame gradient spikes on rare-class runs (the <code>rare</code> preset does).</ParamRow>
      <ParamRow name="log_grad_norm" def="true" level="safe">Log the global grad norm every step (cheap). Diagnostic only — leave on.</ParamRow>
      <ParamRow name="heavy_log_every" def="null" level="safe">If set (e.g. 200), every N steps log per-layer grad/weight norms and loss histograms. Diagnostic; leave <code>null</code> for normal runs.</ParamRow>
    </ParamTable>

    {/* augmentation / EMA */}
    <h3 className="text-2xl font-semibold text-gray-800 mt-10 mb-3">Augmentation &amp; EMA</h3>
    <ParamTable>
      <ParamRow name="mixup_alpha" def="0.8" level="safe">Strength of mixup augmentation on chunks (<code>null</code> = off). 0.8 is a good default; turn it off for rare-positive datasets where blending destroys the signal (the <code>rare</code> preset does).</ParamRow>
      <ParamRow name="ema_decay" def="null" level="safe">Exponential moving average of weights, used for evaluation (<code>null</code> = off). 0.999 (the <code>max</code> preset) can lift final accuracy; leave off for short full fine-tunes.</ParamRow>
    </ParamTable>

    <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50/60 p-5">
      <p className="text-sm text-gray-700 leading-relaxed">
        Ready-to-edit configs for real datasets (CalMS21, ants, worms, MABe) live in{" "}
        <a href="https://github.com/Skovorp/feral/tree/main/configs" target="_blank" rel="noopener noreferrer" className="link"><code>configs/</code></a> in the repo.
        To run one, see{" "}
        <button onClick={() => handleNavClick("api-docs")} className="link"><code>feral train-config</code> in the API reference</button>.
      </p>
    </div>
  </section>
);

const ApiDocsSection = ({ handleNavClick }) => (
  <section id="api-docs" className="surface p-8 md:p-10">
    <span className="pill bg-ink-100 text-ink-600 ring-1 ring-inset ring-ink-200">Reference · CLI &amp; Python API</span>
    <h2 className="mt-3 text-3xl md:text-[2.5rem] font-semibold tracking-[-0.03em] text-ink-900">API documentation</h2>

    <p className="text-gray-700 leading-relaxed mt-4">
      FERAL exposes two interfaces: a command-line tool (<code className="bg-gray-100 px-1 py-0.5 rounded">feral ...</code>),
      installed with the package, and a small Python API (<code className="bg-gray-100 px-1 py-0.5 rounded">import feral</code>)
      for scripting. Both drive the same training and inference code. Parameter meanings are in the{" "}
      <button onClick={() => handleNavClick("config-docs")} className="link">config documentation</button>.
    </p>

    {/* CLI */}
    <h3 className="text-2xl font-semibold text-gray-800 mt-10 mb-3">Command-line interface</h3>

    <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-2"><code>feral reencode</code></h4>
    <p className="text-gray-700 leading-relaxed mb-2 text-sm">Re-encode videos into a format that supports fast random frame access. Installs FFmpeg if it isn&apos;t found.</p>
    <pre className="bg-ink-950 text-accent-300 font-mono text-[13px] rounded-xl p-4 overflow-x-auto border border-ink-800/50 mb-3"><code>feral reencode INPUT_DIR OUTPUT_DIR [-p PROCESSES] [-s SMALLEST_SIDE]</code></pre>
    <div className="overflow-x-auto mb-6 rounded-xl border border-gray-200">
      <table className="w-full text-left text-sm min-w-[560px]">
        <thead className="text-xs uppercase bg-gray-50 text-gray-500"><tr><th className="px-4 py-2.5 font-medium">Argument</th><th className="px-4 py-2.5 font-medium">Description</th></tr></thead>
        <tbody className="text-gray-700">
          <tr className="border-b border-gray-100"><td className="px-4 py-2.5 font-mono text-[13px]">INPUT_DIR</td><td className="px-4 py-2.5">Directory of input videos (must contain only videos).</td></tr>
          <tr className="border-b border-gray-100"><td className="px-4 py-2.5 font-mono text-[13px]">OUTPUT_DIR</td><td className="px-4 py-2.5">Destination directory (must be empty or not yet exist).</td></tr>
          <tr className="border-b border-gray-100"><td className="px-4 py-2.5 font-mono text-[13px]">--processes, -p</td><td className="px-4 py-2.5">Parallel worker processes. Default 4.</td></tr>
          <tr><td className="px-4 py-2.5 font-mono text-[13px]">--smallest-side, -s</td><td className="px-4 py-2.5">Downscale so the shortest side is at most this many px, preserving aspect ratio. Default 512.</td></tr>
        </tbody>
      </table>
    </div>

    <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-2"><code>feral train</code></h4>
    <p className="text-gray-700 leading-relaxed mb-2 text-sm">Interactive training from a video folder and a labels JSON. Prompts for W&amp;B logging unless you pass a flag.</p>
    <pre className="bg-ink-950 text-accent-300 font-mono text-[13px] rounded-xl p-4 overflow-x-auto border border-ink-800/50 mb-3"><code>feral train VIDEO_FOLDER LABELS_JSON [--mode lite|max|rare] [--resolution PX]
           [--no-wandb] [--public-wandb] [-c CHECKPOINT]
           [--part_subsample F] [--subsample_keep_rare_threshold F]
           [--gradient-checkpointing]</code></pre>
    <div className="overflow-x-auto mb-6 rounded-xl border border-gray-200">
      <table className="w-full text-left text-sm min-w-[560px]">
        <thead className="text-xs uppercase bg-gray-50 text-gray-500"><tr><th className="px-4 py-2.5 font-medium">Argument</th><th className="px-4 py-2.5 font-medium">Description</th></tr></thead>
        <tbody className="text-gray-700">
          <tr className="border-b border-gray-100"><td className="px-4 py-2.5 font-mono text-[13px]">VIDEO_FOLDER</td><td className="px-4 py-2.5">Folder of re-encoded training videos.</td></tr>
          <tr className="border-b border-gray-100"><td className="px-4 py-2.5 font-mono text-[13px]">LABELS_JSON</td><td className="px-4 py-2.5">Path to your <code>labels.json</code> (see Label Preparation).</td></tr>
          <tr className="border-b border-gray-100"><td className="px-4 py-2.5 font-mono text-[13px]">--mode</td><td className="px-4 py-2.5">Apply a preset: <code>lite</code>, <code>max</code>, or <code>rare</code>. See the config docs.</td></tr>
          <tr className="border-b border-gray-100"><td className="px-4 py-2.5 font-mono text-[13px]">--resolution</td><td className="px-4 py-2.5">Square input resolution, e.g. 384. Overrides the backbone default.</td></tr>
          <tr className="border-b border-gray-100"><td className="px-4 py-2.5 font-mono text-[13px]">--no-wandb</td><td className="px-4 py-2.5">Skip Weights &amp; Biases; print metrics to stdout only (non-interactive).</td></tr>
          <tr className="border-b border-gray-100"><td className="px-4 py-2.5 font-mono text-[13px]">--public-wandb</td><td className="px-4 py-2.5">Log to the shared community W&amp;B account, no prompt (public).</td></tr>
          <tr className="border-b border-gray-100"><td className="px-4 py-2.5 font-mono text-[13px]">--checkpoint, -c</td><td className="px-4 py-2.5">Warm-start / fine-tune from a saved checkpoint.</td></tr>
          <tr className="border-b border-gray-100"><td className="px-4 py-2.5 font-mono text-[13px]">--part_subsample</td><td className="px-4 py-2.5">Keep a fraction (0–1) of training chunks. Good for quick tests.</td></tr>
          <tr className="border-b border-gray-100"><td className="px-4 py-2.5 font-mono text-[13px]">--subsample_keep_rare_threshold</td><td className="px-4 py-2.5">When subsampling, keep all chunks with classes below this frequency. Requires <code>--part_subsample</code>.</td></tr>
          <tr><td className="px-4 py-2.5 font-mono text-[13px]">--gradient-checkpointing</td><td className="px-4 py-2.5">Trade speed for a big VRAM cut (V-JEPA only).</td></tr>
        </tbody>
      </table>
    </div>

    <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-2"><code>feral train-config</code></h4>
    <p className="text-gray-700 leading-relaxed mb-2 text-sm">Non-interactive training from a YAML config — for HPC jobs, CI, or scripted sweeps. The config follows the schema in the <button onClick={() => handleNavClick("config-docs")} className="link">config documentation</button>; set <code>data.prefix</code> (video folder) and <code>data.label_json</code> inside it.</p>
    <pre className="bg-ink-950 text-accent-300 font-mono text-[13px] rounded-xl p-4 overflow-x-auto border border-ink-800/50 mb-6"><code>feral train-config path/to/config.yaml</code></pre>

    <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-2"><code>feral infer</code></h4>
    <p className="text-gray-700 leading-relaxed mb-2 text-sm">Label a folder of unlabeled videos from a trained checkpoint. Data and model settings are read from the checkpoint, so no config or labels JSON is needed.</p>
    <pre className="bg-ink-950 text-accent-300 font-mono text-[13px] rounded-xl p-4 overflow-x-auto border border-ink-800/50 mb-3"><code>feral infer CHECKPOINT VIDEO_FOLDER [-o OUTPUT] [-b BATCH_SIZE]
           [-w NUM_WORKERS] [--compile] [--mode lite|max] [--resolution PX]</code></pre>
    <div className="overflow-x-auto mb-6 rounded-xl border border-gray-200">
      <table className="w-full text-left text-sm min-w-[560px]">
        <thead className="text-xs uppercase bg-gray-50 text-gray-500"><tr><th className="px-4 py-2.5 font-medium">Argument</th><th className="px-4 py-2.5 font-medium">Description</th></tr></thead>
        <tbody className="text-gray-700">
          <tr className="border-b border-gray-100"><td className="px-4 py-2.5 font-mono text-[13px]">CHECKPOINT</td><td className="px-4 py-2.5">Path to a checkpoint from <code>feral train</code> (under <code>checkpoints/</code>).</td></tr>
          <tr className="border-b border-gray-100"><td className="px-4 py-2.5 font-mono text-[13px]">VIDEO_FOLDER</td><td className="px-4 py-2.5">Folder of videos to label.</td></tr>
          <tr className="border-b border-gray-100"><td className="px-4 py-2.5 font-mono text-[13px]">--output, -o</td><td className="px-4 py-2.5">Output JSON path. Default <code>inference_&lt;folder&gt;.json</code>.</td></tr>
          <tr className="border-b border-gray-100"><td className="px-4 py-2.5 font-mono text-[13px]">--batch_size, -b</td><td className="px-4 py-2.5">Batch size. Default 8.</td></tr>
          <tr className="border-b border-gray-100"><td className="px-4 py-2.5 font-mono text-[13px]">--num_workers, -w</td><td className="px-4 py-2.5">DataLoader workers. Default 4.</td></tr>
          <tr className="border-b border-gray-100"><td className="px-4 py-2.5 font-mono text-[13px]">--compile</td><td className="px-4 py-2.5">Compile the model with <code>torch.compile</code> (faster after warm-up).</td></tr>
          <tr className="border-b border-gray-100"><td className="px-4 py-2.5 font-mono text-[13px]">--mode</td><td className="px-4 py-2.5">Overlap preset — <code>lite</code> (50%, faster) or <code>max</code> (80% + smoothing). Model size stays as trained.</td></tr>
          <tr><td className="px-4 py-2.5 font-mono text-[13px]">--resolution</td><td className="px-4 py-2.5">Override the square input resolution (default: as trained).</td></tr>
        </tbody>
      </table>
    </div>

    {/* Python API */}
    <h3 className="text-2xl font-semibold text-gray-800 mt-10 mb-3">Python API</h3>
    <p className="text-gray-700 leading-relaxed mb-3 text-sm">
      <code className="bg-gray-100 px-1 py-0.5 rounded">import feral</code> exposes the public surface below. Imports are lazy —
      heavy dependencies like torch load only when you touch a symbol that needs them, so <code>import feral</code> stays fast.
    </p>
    <div className="overflow-x-auto mb-6 rounded-xl border border-gray-200">
      <table className="w-full text-left text-sm min-w-[640px]">
        <thead className="text-xs uppercase bg-gray-50 text-gray-500"><tr><th className="px-4 py-2.5 font-medium">Symbol</th><th className="px-4 py-2.5 font-medium">Description</th></tr></thead>
        <tbody className="text-gray-700">
          <tr className="border-b border-gray-100 align-top"><td className="px-4 py-2.5 font-mono text-[12.5px]">run_training(cfg)</td><td className="px-4 py-2.5">Train from a config <em>dict</em> (same schema as <code>default_config.yaml</code>). Writes checkpoints to <code>checkpoints/</code> and predictions to <code>answers/</code>; returns <code>None</code>.</td></tr>
          <tr className="border-b border-gray-100 align-top"><td className="px-4 py-2.5 font-mono text-[12.5px]">run_inference_folder(checkpoint_path, video_folder, output=None, batch_size=8, num_workers=4, compile=False, mode=None, resolution=None)</td><td className="px-4 py-2.5">Label every video in <code>video_folder</code> from a checkpoint and write a JSON of per-frame predictions.</td></tr>
          <tr className="border-b border-gray-100 align-top"><td className="px-4 py-2.5 font-mono text-[12.5px]">apply_mode(cfg, mode)</td><td className="px-4 py-2.5">Return <code>cfg</code> deep-merged with a preset overlay (<code>"lite"</code>, <code>"max"</code>, <code>"rare"</code>). Non-mutating.</td></tr>
          <tr className="border-b border-gray-100 align-top"><td className="px-4 py-2.5 font-mono text-[12.5px]">PRESETS</td><td className="px-4 py-2.5">Dict of the preset overlays, keyed by mode name.</td></tr>
          <tr className="border-b border-gray-100 align-top"><td className="px-4 py-2.5 font-mono text-[12.5px]">BACKBONES</td><td className="px-4 py-2.5">Dict of available backbones → build spec (<code>source</code>, slug/hub name, <code>hidden_dim</code>, <code>img_size</code>).</td></tr>
          <tr className="border-b border-gray-100 align-top"><td className="px-4 py-2.5 font-mono text-[12.5px]">FeralModel</td><td className="px-4 py-2.5">The <code>nn.Module</code>: frozen backbone + classification head.</td></tr>
          <tr className="border-b border-gray-100 align-top"><td className="px-4 py-2.5 font-mono text-[12.5px]">ClsDataset</td><td className="px-4 py-2.5">The chunked-video <code>Dataset</code> used for training and evaluation.</td></tr>
          <tr className="border-b border-gray-100 align-top"><td className="px-4 py-2.5 font-mono text-[12.5px]">validate_labels_json(labels_json, video_folder)</td><td className="px-4 py-2.5">Validate a labels dict against the video folder, raising clear errors on problems.</td></tr>
          <tr className="align-top"><td className="px-4 py-2.5 font-mono text-[12.5px]">__version__</td><td className="px-4 py-2.5">Installed FERAL version string.</td></tr>
        </tbody>
      </table>
    </div>

    <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Example</h4>
    <pre className="bg-ink-950 text-accent-300 font-mono text-[13px] rounded-xl p-4 overflow-x-auto border border-ink-800/50 mb-3"><code>{`from importlib.resources import files
import yaml
import feral

# Load the packaged defaults, then apply the "lite" preset.
with files("feral").joinpath("default_config.yaml").open() as f:
    cfg = yaml.safe_load(f)
cfg = feral.apply_mode(cfg, "lite")

# Point it at your data and name the run.
cfg["data"]["prefix"] = "reencoded_videos/"
cfg["data"]["label_json"] = "labels.json"
cfg["run_name"] = "my_run"
cfg["wandb"] = None

feral.run_training(cfg)   # writes checkpoints/my_run_best_checkpoint.pt

# Label new videos with the trained checkpoint.
feral.run_inference_folder(
    "checkpoints/my_run_best_checkpoint.pt",
    "new_videos/",
    output="predictions.json",
)`}</code></pre>
    <p className="text-gray-700 leading-relaxed text-sm">
      For the command-line equivalent of every step above, see{" "}
      <button onClick={() => handleNavClick("running-feral")} className="link">Running FERAL</button>.
    </p>
  </section>
);


 const DatasetValidatorSection = () => {
    const [file, setFile] = useState(null);
    const [validationResult, setValidationResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setValidationResult(null);
        setError(null);
    };

    const validateFeralDataset = (data) => {
        const issues = [];
        const warnings = [];
        const notes = [];

        const isPlainObject = (v) =>
            v !== null && typeof v === 'object' && !Array.isArray(v);

        // ---------- 1. Top-level shape ----------
        if (!isPlainObject(data)) {
            return { isValid: false, issues: ['Top-level JSON must be an object.'], warnings, notes, metadata: null };
        }

        const requiredKeys = ['is_multilabel', 'class_names', 'labels', 'splits'];
        const missingTop = requiredKeys.filter(k => !(k in data));
        missingTop.forEach(k => issues.push(`Missing required top-level key: "${k}".`));

        const allowedTopKeys = new Set([...requiredKeys, 'description', 'version', 'comments']);
        Object.keys(data).forEach(k => {
            if (!allowedTopKeys.has(k)) {
                warnings.push(`Unrecognized top-level key "${k}", FERAL will ignore it.`);
            }
        });

        // ---------- 2. is_multilabel ----------
        const isMulti = data.is_multilabel;
        if (typeof isMulti !== 'boolean') {
            issues.push('"is_multilabel" must be a boolean (true or false).');
        }

        // ---------- 3. class_names ----------
        let classIds = [];
        let numClasses = 0;
        if (!('class_names' in data)) {
            // already reported
        } else if (!isPlainObject(data.class_names)) {
            issues.push('"class_names" must be an object mapping string class IDs to string class names.');
        } else {
            classIds = Object.keys(data.class_names);
            numClasses = classIds.length;

            if (numClasses === 0) {
                issues.push('"class_names" cannot be empty.');
            } else {
                // Keys must be consecutive integer strings "0".."N-1"
                const expected = Array.from({ length: numClasses }, (_, i) => String(i));
                const actualSet = new Set(classIds);
                const missingKeys = expected.filter(k => !actualSet.has(k));
                if (missingKeys.length > 0) {
                    issues.push(`"class_names" keys must be consecutive strings "0".."${numClasses - 1}". Missing: ${missingKeys.map(s => `"${s}"`).join(', ')}.`);
                }
                const extraKeys = classIds.filter(k => !expected.includes(k));
                if (extraKeys.length > 0) {
                    issues.push(`"class_names" has unexpected keys: ${extraKeys.map(s => `"${s}"`).join(', ')}. Keys must be the strings "0".."${numClasses - 1}".`);
                }

                // Values must be unique non-empty strings
                const vals = Object.values(data.class_names);
                const seenVals = new Set();
                const dupVals = new Set();
                vals.forEach(v => {
                    if (typeof v !== 'string') {
                        issues.push(`"class_names" values must be strings. Found ${JSON.stringify(v)}.`);
                    } else if (v.trim() === '') {
                        issues.push('"class_names" values cannot be empty strings.');
                    }
                    if (seenVals.has(v)) dupVals.add(v);
                    seenVals.add(v);
                });
                if (dupVals.size > 0) {
                    issues.push(`"class_names" values must be unique. Duplicates: ${[...dupVals].map(s => `"${s}"`).join(', ')}.`);
                }

                // Naming guidance
                if (typeof isMulti === 'boolean') {
                    const hasOther = vals.includes('other');
                    if (!isMulti) {
                        if (!hasOther) {
                            warnings.push('Single-label mode: no class is named "other". FERAL averages metrics across all classes; if you have a background/none class, naming it "other" lets metrics exclude it.');
                        } else if (data.class_names['0'] !== 'other') {
                            warnings.push('Single-label mode: class "other" is not at ID 0. We recommend reserving 0 for the background class.');
                        }
                    }
                }
            }
        }

        // ---------- 4. labels object ----------
        if (!('labels' in data)) {
            // already reported
        } else if (!isPlainObject(data.labels)) {
            issues.push('"labels" must be an object mapping video filenames to label arrays.');
        }

        // ---------- 5. splits object ----------
        const ALLOWED_SPLITS = ['train', 'val', 'test', 'inference'];
        let trainFiles = [], valFiles = [], testFiles = [], inferenceFiles = [];

        if (!('splits' in data)) {
            // already reported
        } else if (!isPlainObject(data.splits)) {
            issues.push('"splits" must be an object with keys train / val / test / inference.');
        } else {
            // Reject unknown keys
            Object.keys(data.splits).forEach(k => {
                if (!ALLOWED_SPLITS.includes(k)) {
                    issues.push(`"splits" has invalid key "${k}". Allowed: ${ALLOWED_SPLITS.join(', ')}.`);
                }
            });

            const checkSplitArr = (name) => {
                if (!(name in data.splits)) return [];
                const arr = data.splits[name];
                if (!Array.isArray(arr)) {
                    issues.push(`"splits.${name}" must be an array of filenames.`);
                    return [];
                }
                arr.forEach((f, i) => {
                    if (typeof f !== 'string') {
                        issues.push(`"splits.${name}[${i}]" must be a string filename. Got ${JSON.stringify(f)}.`);
                    }
                });
                return arr.filter(f => typeof f === 'string');
            };

            trainFiles = checkSplitArr('train');
            valFiles = checkSplitArr('val');
            testFiles = checkSplitArr('test');
            inferenceFiles = checkSplitArr('inference');

            // Empty / missing split warnings
            if (trainFiles.length === 0 && valFiles.length === 0 && testFiles.length === 0 && inferenceFiles.length === 0) {
                issues.push('All splits are empty or missing. Add at least one of train / val / test / inference.');
            }
            if (trainFiles.length === 0 && (valFiles.length > 0 || testFiles.length > 0)) {
                warnings.push('"splits.train" is empty, FERAL will skip training and only evaluate / infer.');
            }
            if (trainFiles.length > 0 && valFiles.length === 0) {
                warnings.push('"splits.val" is empty, you will have no validation curves or EMA selection during training.');
            }

            // Duplicates within each split
            ['train', 'val', 'test', 'inference'].forEach(name => {
                const arr = data.splits[name];
                if (!Array.isArray(arr)) return;
                const seen = new Set(), dup = new Set();
                arr.forEach(f => { if (seen.has(f)) dup.add(f); seen.add(f); });
                if (dup.size > 0) {
                    issues.push(`"splits.${name}" contains duplicate filenames: ${[...dup].map(s => `"${s}"`).join(', ')}.`);
                }
            });

            // train / val / test must be mutually exclusive
            const overlap = (a, b) => a.filter(x => b.includes(x));
            const tv = overlap(trainFiles, valFiles);
            const tt = overlap(trainFiles, testFiles);
            const vt = overlap(valFiles, testFiles);
            if (tv.length > 0) issues.push(`Same video appears in both train and val: ${tv.map(s => `"${s}"`).join(', ')}.`);
            if (tt.length > 0) issues.push(`Same video appears in both train and test: ${tt.map(s => `"${s}"`).join(', ')}.`);
            if (vt.length > 0) issues.push(`Same video appears in both val and test: ${vt.map(s => `"${s}"`).join(', ')}.`);

            // inference is allowed to overlap with anything (not an error)
        }

        // If structural shape failed, stop early
        if (issues.length > 0 && (!isPlainObject(data.class_names) || !isPlainObject(data.labels) || !isPlainObject(data.splits) || typeof isMulti !== 'boolean')) {
            return { isValid: false, issues, warnings, notes, metadata: null };
        }

        // ---------- 6. Cross-checks: split files vs labels ----------
        const labels = data.labels || {};
        const labeledFiles = Object.keys(labels);

        const supervisedFiles = [...new Set([...trainFiles, ...valFiles, ...testFiles])];
        const missingFromLabels = supervisedFiles.filter(f => !(f in labels));
        if (missingFromLabels.length > 0) {
            issues.push(`These videos are in train/val/test but missing from "labels": ${missingFromLabels.map(s => `"${s}"`).join(', ')}.`);
        }

        const inferenceWithLabels = inferenceFiles.filter(f => f in labels);
        if (inferenceWithLabels.length > 0 && trainFiles.length + valFiles.length + testFiles.length === 0) {
            notes.push(`${inferenceWithLabels.length} inference video(s) have entries in "labels"; FERAL will ignore those labels at inference time.`);
        }

        const orphanLabels = labeledFiles.filter(f => !supervisedFiles.includes(f) && !inferenceFiles.includes(f));
        if (orphanLabels.length > 0) {
            warnings.push(`Videos have labels but appear in no split (will be unused): ${orphanLabels.map(s => `"${s}"`).join(', ')}.`);
        }

        // ---------- 7. Per-video label validation ----------
        const behaviorCounts = {};
        const classCounts = {};
        classIds.forEach(id => {
            classCounts[id] = 0;
            behaviorCounts[data.class_names[id]] = 0;
        });

        const videoMetadata = {};

        const splitOf = (fn) => {
            if (trainFiles.includes(fn)) return 'train';
            if (valFiles.includes(fn)) return 'val';
            if (testFiles.includes(fn)) return 'test';
            if (inferenceFiles.includes(fn)) return 'inference';
            return 'unassigned';
        };

        // Add inference-only videos that have no labels into metadata so the user can see them
        const allReferencedVideos = new Set([
            ...labeledFiles,
            ...trainFiles,
            ...valFiles,
            ...testFiles,
            ...inferenceFiles,
        ]);

        allReferencedVideos.forEach(fn => {
            const split = splitOf(fn);
            const inLabels = fn in labels;

            // For supervised splits, missing labels already reported above.
            if (!inLabels) {
                videoMetadata[fn] = {
                    split,
                    frameCount: 0,
                    behaviorCounts: {},
                    classIdCounts: {},
                    notes: split === 'inference' ? ['No labels (inference only, OK).'] : ['Missing labels.']
                };
                return;
            }

            const labelArray = labels[fn];
            const videoBeh = {};
            const videoCls = {};
            classIds.forEach(id => {
                videoCls[id] = 0;
                videoBeh[data.class_names[id]] = 0;
            });

            if (!Array.isArray(labelArray)) {
                issues.push(`"labels.${fn}" must be an array.`);
                videoMetadata[fn] = { split, frameCount: 0, behaviorCounts: videoBeh, classIdCounts: videoCls, notes: ['labels entry is not an array'] };
                return;
            }
            if (labelArray.length === 0) {
                issues.push(`"labels.${fn}" is empty, must contain one entry per video frame.`);
            }

            const frameCount = labelArray.length;

            if (isMulti === true) {
                let badShapes = 0;
                let badValues = 0;
                labelArray.forEach((frame, idx) => {
                    if (!Array.isArray(frame)) {
                        if (badShapes === 0) issues.push(`Multi-label: each frame must be an array. First bad: "${fn}" frame ${idx}.`);
                        badShapes++;
                        return;
                    }
                    if (frame.length !== numClasses) {
                        if (badShapes === 0) issues.push(`Multi-label: each per-frame array must have length ${numClasses}. First bad: "${fn}" frame ${idx} has length ${frame.length}.`);
                        badShapes++;
                        return;
                    }
                    frame.forEach((v, j) => {
                        if (v !== 0 && v !== 1) {
                            if (badValues === 0) issues.push(`Multi-label values must be 0 or 1. First bad: "${fn}" frame ${idx} class ${j} = ${JSON.stringify(v)}.`);
                            badValues++;
                            return;
                        }
                        if (v === 1) {
                            const id = classIds[j];
                            const name = data.class_names[id];
                            videoCls[id] = (videoCls[id] || 0) + 1;
                            videoBeh[name] = (videoBeh[name] || 0) + 1;
                            classCounts[id]++;
                            behaviorCounts[name]++;
                        }
                    });
                });
                if (badShapes > 1) issues.push(`(+${badShapes - 1} more shape errors in "${fn}")`);
                if (badValues > 1) issues.push(`(+${badValues - 1} more value errors in "${fn}")`);
            } else if (isMulti === false) {
                let badInts = 0;
                let outOfRange = 0;
                labelArray.forEach((label, idx) => {
                    if (!Number.isInteger(label)) {
                        if (badInts === 0) issues.push(`Single-label: every entry must be an integer class ID. First bad: "${fn}" frame ${idx} = ${JSON.stringify(label)}.`);
                        badInts++;
                        return;
                    }
                    const key = String(label);
                    if (!(key in data.class_names)) {
                        if (outOfRange === 0) issues.push(`Single-label: class ID ${label} (frame ${idx} of "${fn}") is not in "class_names" (valid range: 0..${numClasses - 1}).`);
                        outOfRange++;
                        return;
                    }
                    const name = data.class_names[key];
                    videoCls[key]++;
                    videoBeh[name]++;
                    classCounts[key]++;
                    behaviorCounts[name]++;
                });
                if (badInts > 1) issues.push(`(+${badInts - 1} more non-integer values in "${fn}")`);
                if (outOfRange > 1) issues.push(`(+${outOfRange - 1} more out-of-range IDs in "${fn}")`);
            }

            videoMetadata[fn] = { split, frameCount, behaviorCounts: videoBeh, classIdCounts: videoCls };
        });

        // ---------- 8. Class balance & coverage ----------
        const totalLabeledFrames = Object.values(videoMetadata).reduce((a, m) => a + (m.split !== 'inference' ? m.frameCount : 0), 0);

        // Classes with zero coverage in train (only meaningful when train exists)
        if (trainFiles.length > 0 && numClasses > 0) {
            const trainClassCounts = Array(numClasses).fill(0);
            trainFiles.forEach(fn => {
                const m = videoMetadata[fn];
                if (!m) return;
                classIds.forEach((id, idx) => { trainClassCounts[idx] += (m.classIdCounts[id] || 0); });
            });
            trainClassCounts.forEach((c, idx) => {
                if (c === 0) {
                    warnings.push(`Class "${data.class_names[String(idx)]}" (id ${idx}) has 0 frames in the train split.`);
                }
            });
        }

        // Rare-class warnings (relative to all labeled frames in supervised splits)
        if (totalLabeledFrames > 0) {
            for (const [name, count] of Object.entries(behaviorCounts)) {
                const pct = (count / totalLabeledFrames) * 100;
                if (count > 0 && pct < 0.5) {
                    warnings.push(`Class "${name}" is rare (${pct.toFixed(2)}% of labeled frames). Consider --subsample_keep_rare_threshold or rebalancing.`);
                }
            }
        }

        const metadata = {
            isMulti: !!isMulti,
            trainVideos: trainFiles.length,
            valVideos: valFiles.length,
            testVideos: testFiles.length,
            inferenceVideos: inferenceFiles.length,
            totalClasses: numClasses,
            classNames: data.class_names || {},
            totalFrames: Object.values(videoMetadata).reduce((a, v) => a + (v.frameCount || 0), 0),
            behaviorCounts,
            classCounts,
            videoMetadata
        };

        return { isValid: issues.length === 0, issues, warnings, notes, metadata };
    };


    const validateDataset = async () => {
        if (!file) {
            setError("Please select a file to validate.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setValidationResult(null);

        try {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const fileContent = e.target.result;

                try {
                    const data = JSON.parse(fileContent);
                    const validation = validateFeralDataset(data);

                    setValidationResult({
                        status: validation.isValid ? 'success' : 'error',
                        message: validation.isValid
                            ? `JSON file "${file.name}" is valid!`
                            : `JSON file "${file.name}" has validation errors.`,
                        details: validation.isValid
                            ? 'All required fields are present and properly formatted.'
                            : 'Please fix the issues listed below.',
                        issues: validation.issues,
                        warnings: validation.warnings,
                        notes: validation.notes || [],
                        metadata: validation.metadata
                    });
                } catch (parseErr) {
                    setValidationResult({
                        status: 'error',
                        message: `Invalid JSON format for file "${file.name}".`,
                        details: parseErr.message,
                        issues: [`JSON parsing error: ${parseErr.message}`],
                        warnings: [],
                        notes: [],
                        metadata: null
                    });
                }

                setIsLoading(false);
            };

            reader.readAsText(file);
        } catch (err) {
            setError(`Unexpected error: ${err.message}`);
            setIsLoading(false);
        }
    };

    return (
        <section id="dataset-validator" className="surface p-8 md:p-10">
            <span className="pill bg-ink-100 text-ink-600 ring-1 ring-inset ring-ink-200">Tool</span>
            <h2 className="mt-3 text-3xl md:text-[2.5rem] font-semibold tracking-[-0.03em] text-ink-900">Dataset Validator</h2>
            <p className="mt-3 text-ink-700 leading-relaxed max-w-2xl">
                Upload your FERAL dataset JSON to validate its structure end-to-end and inspect dataset statistics.
                The validator runs entirely in your browser, your file never leaves your machine.
            </p>
            <details className="mb-6 bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-700">
              <summary className="cursor-pointer font-medium">What does this validator check?</summary>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>All required top-level keys: <code>is_multilabel</code>, <code>class_names</code>, <code>labels</code>, <code>splits</code>.</li>
                <li><code>class_names</code> keys are consecutive strings <code>"0"</code>..<code>"N-1"</code>; values are unique non-empty strings.</li>
                <li>Single-label labels are integers in <code>[0, N-1]</code>; multi-label frames are 0/1 vectors of length N.</li>
                <li><code>splits</code> uses only <code>train</code>/<code>val</code>/<code>test</code>/<code>inference</code> keys, each an array of filenames; train/val/test are mutually exclusive.</li>
                <li>Every supervised video (train/val/test) has a corresponding entry in <code>labels</code>; inference videos are allowed to skip labels.</li>
                <li>Class coverage in train, rare-class warnings, orphan labels, and empty-array errors.</li>
              </ul>
            </details>

            <div className="mb-4 rounded-2xl border-2 border-dashed border-ink-200 hover:border-accent-300 transition bg-ink-50/40 p-6 text-center">
                <label htmlFor="file-upload" className="cursor-pointer">
                    <svg className="w-10 h-10 mx-auto text-ink-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"/></svg>
                    <p className="mt-2 text-sm text-ink-700">
                        <span className="font-medium text-accent-700">Click to upload</span> your dataset JSON
                    </p>
                    <p className="text-xs text-ink-500 mt-1">Validation runs entirely in your browser.</p>
                    <input id="file-upload" type="file" accept=".json" onChange={handleFileChange} className="hidden" />
                </label>
                {file && (
                    <p className="mt-3 text-xs text-ink-700 inline-flex items-center gap-1.5 bg-white border border-ink-200 rounded-full px-3 py-1">
                        <svg className="w-3.5 h-3.5 text-accent-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                        {file.name}
                    </p>
                )}
            </div>

            {file ? (
                <button
                    onClick={validateDataset}
                    disabled={isLoading}
                    className={`inline-flex items-center gap-2 bg-ink-900 hover:bg-ink-800 text-white font-medium py-2.5 px-5 rounded-xl shadow-soft hover:shadow-lifted transition ${isLoading ? 'opacity-60 cursor-not-allowed pointer-events-none' : ''}`}
                >
                    {isLoading ? (
                        <>
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3"/><path d="M22 12a10 10 0 01-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
                            Validating...
                        </>
                    ) : (
                        <>
                            Validate Dataset
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                        </>
                    )}
                </button>
            ) : (
                <p className="text-sm text-ink-500">Choose a JSON file above to begin validation.</p>
            )}

            {error && (
                <div className="mt-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md" role="alert">
                    <p className="font-bold">Error:</p>
                    <p>{error}</p>
                </div>
            )}

            {validationResult && (
                <div className="mt-6 space-y-6">
                    {/* Main validation result */}
                    <div className={`rounded-2xl border p-5 ${
                        validationResult.status === 'success'
                            ? 'border-accent-200 bg-accent-50'
                            : validationResult.status === 'error'
                            ? 'border-rose-200 bg-rose-50'
                            : 'border-ink-200 bg-ink-50'
                    }`}>
                        <div className="flex items-start gap-3">
                            <div className={`w-9 h-9 rounded-xl grid place-items-center flex-shrink-0 ${
                                validationResult.status === 'success' ? 'bg-accent-600 text-white'
                                : validationResult.status === 'error' ? 'bg-rose-600 text-white'
                                : 'bg-ink-700 text-white'
                            }`}>
                                {validationResult.status === 'success' ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                                ) : validationResult.status === 'error' ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className={`text-base font-semibold ${
                                    validationResult.status === 'success' ? 'text-accent-900'
                                    : validationResult.status === 'error' ? 'text-rose-900'
                                    : 'text-ink-900'
                                }`}>
                                    {validationResult.status === 'success' ? 'Validation passed'
                                    : validationResult.status === 'error' ? 'Validation failed'
                                    : 'Information'}
                                </h3>
                                <p className="text-sm text-ink-700 mt-1">{validationResult.message}</p>
                                {validationResult.details && (
                                    <p className="text-xs text-ink-500 mt-1">{validationResult.details}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Issues, Warnings & Notes */}
                    {(validationResult.issues?.length > 0 ||
                        validationResult.warnings?.length > 0 ||
                        validationResult.notes?.length > 0) && (
                        <div className="space-y-4">
                            {validationResult.issues?.length > 0 && (
                                <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-5">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="w-6 h-6 rounded-md bg-rose-600 text-white grid place-items-center text-xs font-semibold">{validationResult.issues.length}</span>
                                        <h4 className="font-semibold text-rose-900 text-sm uppercase tracking-wider">Issues</h4>
                                    </div>
                                    <ul className="space-y-1.5 text-sm text-rose-900">
                                        {validationResult.issues.map((issue, index) => (
                                            <li key={index} className="flex gap-2"><span className="text-rose-500 mt-0.5">•</span><span>{issue}</span></li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {validationResult.warnings?.length > 0 && (
                                <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="w-6 h-6 rounded-md bg-amber-500 text-white grid place-items-center text-xs font-semibold">{validationResult.warnings.length}</span>
                                        <h4 className="font-semibold text-amber-900 text-sm uppercase tracking-wider">Warnings</h4>
                                    </div>
                                    <ul className="space-y-1.5 text-sm text-amber-900">
                                        {validationResult.warnings.map((warning, index) => (
                                            <li key={index} className="flex gap-2"><span className="text-amber-500 mt-0.5">•</span><span>{warning}</span></li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {validationResult.notes?.length > 0 && (
                                <div className="rounded-2xl border border-ink-200 bg-ink-50/60 p-5">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="w-6 h-6 rounded-md bg-ink-700 text-white grid place-items-center text-xs font-semibold">{validationResult.notes.length}</span>
                                        <h4 className="font-semibold text-ink-900 text-sm uppercase tracking-wider">Notes</h4>
                                    </div>
                                    <ul className="space-y-1.5 text-sm text-ink-700">
                                        {validationResult.notes.map((n, index) => (
                                            <li key={index} className="flex gap-2"><span className="text-ink-400 mt-0.5">•</span><span>{n}</span></li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Summary statistics, show even when there are issues, so users see partial info */}
                    {validationResult.metadata && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between flex-wrap gap-3">
                                <h3 className="text-xl font-semibold tracking-tight text-ink-900">Dataset Analysis</h3>
                                <div className="flex items-center gap-2">
                                    <span className={`pill ${validationResult.metadata.isMulti ? 'bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200' : 'bg-accent-50 text-accent-700 ring-1 ring-inset ring-accent-200'}`}>
                                        {validationResult.metadata.isMulti ? 'Multi-label' : 'Single-label'}
                                    </span>
                                    <span className="pill bg-ink-100 text-ink-700 ring-1 ring-inset ring-ink-200">
                                        {validationResult.metadata.totalClasses} class{validationResult.metadata.totalClasses === 1 ? '' : 'es'}
                                    </span>
                                </div>
                            </div>

                            {/* Summary Cards */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                                <div className="rounded-xl border border-ink-200 bg-white p-4">
                                    <h4 className="text-[10px] font-semibold text-ink-500 uppercase tracking-wider">Train</h4>
                                    <p className="mt-1 text-2xl font-bold text-ink-900 tabular-nums">{validationResult.metadata.trainVideos}</p>
                                    <p className="text-[10px] text-ink-400 mt-0.5">videos</p>
                                </div>
                                <div className="rounded-xl border border-ink-200 bg-white p-4">
                                    <h4 className="text-[10px] font-semibold text-ink-500 uppercase tracking-wider">Val</h4>
                                    <p className="mt-1 text-2xl font-bold text-ink-900 tabular-nums">{validationResult.metadata.valVideos}</p>
                                    <p className="text-[10px] text-ink-400 mt-0.5">videos</p>
                                </div>
                                <div className="rounded-xl border border-ink-200 bg-white p-4">
                                    <h4 className="text-[10px] font-semibold text-ink-500 uppercase tracking-wider">Test</h4>
                                    <p className="mt-1 text-2xl font-bold text-ink-900 tabular-nums">{validationResult.metadata.testVideos}</p>
                                    <p className="text-[10px] text-ink-400 mt-0.5">videos</p>
                                </div>
                                <div className="rounded-xl border border-ink-200 bg-white p-4">
                                    <h4 className="text-[10px] font-semibold text-ink-500 uppercase tracking-wider">Inference</h4>
                                    <p className="mt-1 text-2xl font-bold text-ink-900 tabular-nums">{validationResult.metadata.inferenceVideos}</p>
                                    <p className="text-[10px] text-ink-400 mt-0.5">videos</p>
                                </div>
                                <div className="rounded-xl border border-accent-200 bg-accent-50 p-4 col-span-2 md:col-span-1">
                                    <h4 className="text-[10px] font-semibold text-accent-700 uppercase tracking-wider">Total Labeled</h4>
                                    <p className="mt-1 text-2xl font-bold text-accent-900 tabular-nums">{validationResult.metadata.totalFrames.toLocaleString()}</p>
                                    <p className="text-[10px] text-accent-700/70 mt-0.5">frames</p>
                                </div>
                            </div>

                            {/* Behavior distribution */}
                            <div className="rounded-2xl border border-ink-200 bg-white">
                                <div className="px-5 py-3 border-b border-ink-100 flex items-center justify-between">
                                    <h4 className="font-semibold text-ink-900 text-sm uppercase tracking-wider">Behavior Distribution</h4>
                                    <span className="text-xs text-ink-500 tabular-nums">{Object.values(validationResult.metadata.behaviorCounts).reduce((a,b) => a+b, 0).toLocaleString()} positive frames</span>
                                </div>
                                <div className="p-5 space-y-2">
                                    {(() => {
                                        const entries = Object.entries(validationResult.metadata.behaviorCounts);
                                        const max = Math.max(1, ...entries.map(([,c]) => c));
                                        return entries.map(([behavior, count]) => (
                                            <div key={behavior} className="flex items-center gap-3">
                                                <span className="w-32 text-sm text-ink-700 capitalize truncate">{behavior}</span>
                                                <div className="flex-1 h-2 rounded-full bg-ink-100 overflow-hidden">
                                                    <div className="h-full bg-accent-500 rounded-full transition-all" style={{ width: `${(count / max) * 100}%` }}></div>
                                                </div>
                                                <span className="w-20 text-right text-sm font-medium text-ink-900 tabular-nums">{count.toLocaleString()}</span>
                                            </div>
                                        ));
                                    })()}
                                </div>
                            </div>

                            {/* Per-video analysis */}
                            <div className="rounded-2xl border border-ink-200 bg-white">
                                <div className="px-5 py-3 border-b border-ink-100">
                                    <h4 className="font-semibold text-ink-900 text-sm uppercase tracking-wider">Per-Video Analysis</h4>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead className="text-[11px] uppercase tracking-wider text-ink-500 bg-ink-50/50">
                                            <tr>
                                                <th className="px-5 py-2.5 text-left font-medium">Video File</th>
                                                <th className="px-5 py-2.5 text-left font-medium">Split</th>
                                                <th className="px-5 py-2.5 text-right font-medium">Frames</th>
                                                <th className="px-5 py-2.5 text-left font-medium">Behaviors</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-ink-100">
                                            {Object.entries(validationResult.metadata.videoMetadata).map(
                                                ([videoFile, meta]) => (
                                                    <tr key={videoFile} className="hover:bg-ink-50/50 transition">
                                                        <td className="px-5 py-2.5 font-mono text-xs text-ink-900 truncate max-w-[280px]" title={videoFile}>{videoFile}</td>
                                                        <td className="px-5 py-2.5">
                                                            <span className={`pill text-[10px] ${
                                                                meta.split === 'train' ? 'bg-accent-50 text-accent-700 ring-1 ring-inset ring-accent-200'
                                                                : meta.split === 'val' ? 'bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200'
                                                                : meta.split === 'test' ? 'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200'
                                                                : meta.split === 'inference' ? 'bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-200'
                                                                : 'bg-ink-100 text-ink-600 ring-1 ring-inset ring-ink-200'
                                                            }`}>{meta.split}</span>
                                                        </td>
                                                        <td className="px-5 py-2.5 text-right tabular-nums text-ink-700">{meta.frameCount.toLocaleString()}</td>
                                                        <td className="px-5 py-2.5">
                                                            <div className="flex flex-wrap gap-1">
                                                                {Object.entries(meta.behaviorCounts)
                                                                    .filter(([_, count]) => count > 0)
                                                                    .map(([behavior, count]) => (
                                                                        <span key={behavior} className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] bg-ink-100 text-ink-700 rounded-md">
                                                                            <span className="font-medium">{behavior}</span>
                                                                            <span className="text-ink-500 tabular-nums">{count}</span>
                                                                        </span>
                                                                    ))}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};


        const ExamplesSection = () => {
            const examples = [
                {
                    emoji: "🐭",
                    title: "CalMS21",
                    subtitle: "Resident-intruder mice",
                    body: "Resident-intruder social interactions with rich behavior labels. FERAL learns directly from raw video and expert annotations to produce frame-level behavioral segmentation.",
                    media: "src/videos/calms_example.gif",
                    figure: null,
                    credit: (
                        <span>
                            Sun et&nbsp;al. (2021). <em>Caltech Mouse Social Interactions Dataset (CalMS21)</em>.
                            <a className="link ml-1" href="https://doi.org/10.22002/D1.1991" target="_blank" rel="noopener noreferrer">CaltechDATA</a>.
                        </span>
                    ),
                    pills: ["single-animal", "social", "frame-level"],
                },
                {
                    emoji: "🪱",
                    title: "Worms",
                    subtitle: "C. elegans locomotor states",
                    body: "Freely moving C. elegans performing four canonical locomotor behaviors: forward crawling, reverse crawling, turning, and pausing. Forward and reverse crawling look nearly identical frame-by-frame, so temporal context is essential, FERAL leverages overlapping chunk inference to disambiguate directionality.",
                    media: "src/videos/worms_example.gif",
                    figure: "src/images/worms_figure.png",
                    credit: <span>Credits: Friedericke Buck.</span>,
                    pills: ["single-animal", "locomotion", "temporal context"],
                },
                {
                    emoji: "🐜",
                    title: "Ants",
                    subtitle: "Ooceraea biroi grooming",
                    body: "Adult-larva interactions in the clonal raider ant Ooceraea biroi, recorded from the side at 10 fps. Self-grooming and allogrooming are challenging for pose pipelines because of occlusion and side-view geometry. FERAL identifies both directly from raw video.",
                    media: "src/videos/ants_example.gif",
                    figure: "src/images/ants_figure.png",
                    credit: <span>Credits: Janet Zhao &amp; Dominic Frank.</span>,
                    pills: ["dyadic", "social", "occlusion"],
                },
                {
                    emoji: "🐜",
                    title: "Collective behavior",
                    subtitle: "O. biroi colony raids",
                    body: "Colonies filmed continuously over several days to study emergent group raiding. FERAL detects the onset and duration of collective raids directly from raw frames, even in dense colonies where individuals overlap and occlude each other.",
                    media: null,
                    figure: "src/images/collective_figure.png",
                    credit: <span>Credits: Tomas Kay.</span>,
                    pills: ["collective", "long-form", "colony"],
                },
                {
                    emoji: "🦍",
                    title: "Pan20K",
                    subtitle: "Wild-ape field recordings",
                    body: "Naturalistic field videos of wild apes in complex forest environments. FERAL handles strong occlusions, moving cameras, and variable lighting to robustly classify behaviors without pose estimation.",
                    media: "src/videos/gorilla1.gif",
                    figure: null,
                    credit: (
                        <span>
                            <a className="link" href="https://link.springer.com/content/pdf/10.1007/s11263-024-02003-z.pdf" target="_blank" rel="noopener noreferrer">Brookes et&nbsp;al. (2024)</a>.
                        </span>
                    ),
                    pills: ["field", "wild", "occlusion"],
                },
            ];

            return (
                <section id="examples" className="space-y-8">
                    <div className="surface p-8 md:p-10">
                        <span className="pill bg-ink-100 text-ink-600 ring-1 ring-inset ring-ink-200">Reference</span>
                        <h2 className="mt-3 text-3xl md:text-[2.5rem] font-semibold tracking-[-0.03em] text-ink-900">Example Datasets</h2>
                        <p className="mt-3 text-ink-700 leading-relaxed max-w-3xl">
                            FERAL has been applied across diverse datasets spanning single-animal, dyadic, and colony-scale
                            behaviors. Each example shows the dataset, the analysis setup, and the kind of segmentation FERAL produces.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        {examples.map((ex, idx) => (
                            <article key={idx} className="surface overflow-hidden flex flex-col">
                                {ex.media && (
                                    <div className="relative aspect-video bg-ink-950 overflow-hidden">
                                        <img src={ex.media} alt={`${ex.title} example`} className="absolute inset-0 w-full h-full object-contain" loading="lazy" />
                                        <div className="absolute top-3 left-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-white text-xs">
                                            <span>{ex.title}</span>
                                        </div>
                                    </div>
                                )}
                                <div className="p-6 flex-1 flex flex-col">
                                    {!ex.media && (
                                        <div className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-ink-500">
                                            {ex.title}
                                        </div>
                                    )}
                                    <h3 className="text-xl font-semibold text-ink-900 tracking-tight">{ex.title}</h3>
                                    <p className="text-xs uppercase tracking-wider text-ink-500 mt-0.5">{ex.subtitle}</p>
                                    <p className="mt-3 text-sm text-ink-700 leading-relaxed">{ex.body}</p>
                                    <div className="mt-4 flex flex-wrap gap-1.5">
                                        {ex.pills.map((tag, i) => (
                                            <span key={i} className="inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded-md bg-ink-100 text-ink-700">{tag}</span>
                                        ))}
                                    </div>
                                    {ex.figure && (
                                        <img src={ex.figure} alt={`${ex.title} segmentation`} className="mt-4 w-full rounded-xl border border-ink-200" loading="lazy" />
                                    )}
                                    <div className="mt-4 pt-4 border-t border-ink-200/70 text-xs text-ink-500 leading-relaxed">
                                        {ex.credit}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            );
        };

        const ContactSection = () => {
            const sendDirectEmail = (email, name) => {
                const subject = encodeURIComponent('FERAL Inquiry');
                const body = encodeURIComponent(`Hello ${name},\n\nI have a question about FERAL:\n\n`);
                window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
            };

            return (
                <section id="contact" className="space-y-6">
                    <div className="surface p-8 md:p-10">
                        <span className="pill bg-ink-100 text-ink-600 ring-1 ring-inset ring-ink-200">Contact</span>
                        <h2 className="mt-3 text-3xl md:text-[2.5rem] font-semibold tracking-[-0.03em] text-ink-900">Get in touch</h2>
                        <p className="mt-3 text-ink-700 leading-relaxed max-w-2xl">
                            Have questions about FERAL or need help with your data? Reach out directly, or open a thread on
                            <a href="https://github.com/Skovorp/feral/discussions" target="_blank" rel="noopener noreferrer" className="link ml-1">GitHub Discussions</a>
                            &nbsp;to ask a question or request a feature.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
                        <div className="lg:col-span-3 flex flex-col gap-5">
                            <div className="surface p-6 lg:flex-1">
                                <h3 className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-3">Institution</h3>
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 mt-0.5 text-ink-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3l9 4.5M3 7.5l9-4.5m0 0v18m-9-13.5v13.5h18V7.5M6 21v-6m4 6v-6m4 6v-6m4 6v-6"/></svg>
                                    <div>
                                        <p className="font-semibold text-ink-900 text-sm">The Rockefeller University</p>
                                        <p className="text-xs text-ink-600 mt-1 leading-relaxed">
                                            Data Science Platform · Laboratory of Neurogenetics and Behavior<br/>
                                            1230 York Avenue, New York, NY 10065
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <a href="https://github.com/Skovorp/feral/discussions" target="_blank" rel="noopener noreferrer" className="surface p-6 block lg:flex lg:flex-col lg:justify-center lg:flex-1 hover:border-accent-300 hover:shadow-lifted transition group">
                                <div className="flex items-start gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.6" stroke="currentColor" className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zM12.375 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm3.75 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"/></svg>
                                    <div>
                                        <p className="font-semibold text-ink-900 text-sm group-hover:text-accent-700 transition">GitHub Discussions</p>
                                        <p className="text-xs text-ink-600 mt-0.5">Best place for questions, feature requests, and bug reports.</p>
                                    </div>
                                </div>
                            </a>
                        </div>

                        {/* Maintainers */}
                        <div className="lg:col-span-2">
                            <div className="surface p-6 h-full">
                                <h3 className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-4">Maintainers</h3>
                                <div className="space-y-3">
                                    <button onClick={() => sendDirectEmail('peter.skovorodnikov@gmail.com', 'Peter')} className="w-full text-left rounded-xl border border-ink-200 hover:border-accent-300 hover:bg-accent-50/40 transition p-4 flex items-start gap-3 group">
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-ink-900">Peter Skovorodnikov</p>
                                            <p className="text-[11px] uppercase tracking-wider text-ink-500 mt-0.5">Lead developer</p>
                                            <p className="text-xs text-accent-700 mt-1.5 truncate group-hover:underline">peter.skovorodnikov@gmail.com</p>
                                        </div>
                                        <img src="./src/images/peter.jpeg" alt="Peter Skovorodnikov" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                                    </button>
                                    <button onClick={() => sendDirectEmail('jacopo.razza@gmail.com', 'Jacopo')} className="w-full text-left rounded-xl border border-ink-200 hover:border-accent-300 hover:bg-accent-50/40 transition p-4 flex items-start gap-3 group">
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-ink-900">Jacopo Razzauti</p>
                                            <p className="text-[11px] uppercase tracking-wider text-ink-500 mt-0.5">Co-developer</p>
                                            <p className="text-xs text-accent-700 mt-1.5 truncate group-hover:underline">jacopo.razza@gmail.com</p>
                                        </div>
                                        <img src="./src/images/jacopo.jpg" alt="Jacopo Razzauti" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            );
        };

        const FAQSection = () => {
            const items = [
                {
                    q: "How do I install FERAL?",
                    a: <span>One command: <code className="bg-gray-100 px-1 py-0.5 rounded">pip install feral</code>. This installs the <code>feral</code> CLI with subcommands <code>reencode</code>, <code>train</code>, <code>train-config</code>, and <code>infer</code>. You need Python 3.10+ and PyTorch 2.5+.</span>,
                },
                {
                    q: "How do I cite FERAL?",
                    a: <span>Please cite the bioRxiv preprint: Skovorodnikov &amp; Razzauti et&nbsp;al. (2025). <em>FERAL: Feature Extraction for Recognition of Animal Locomotion</em>. bioRxiv 2025.11.16.688666. <a href="https://www.biorxiv.org/content/10.1101/2025.11.16.688666v2" target="_blank" rel="noopener noreferrer" className="link">Read it here</a>.</span>,
                },
                {
                    q: "What GPUs are supported?",
                    a: <span>NVIDIA Ampere architecture or newer (compute capability 8.0+) with configurations benchmarked from 8&nbsp;GB VRAM using gradient checkpointing (paper Table 3). That includes A100, H100, A10, L4, L40, RTX 3000/4000/5000 series, and newer. <strong>V100 (Volta) and T4 (Turing), including the free Google Colab T4, will not work</strong> because FERAL relies on bfloat16 and flash attention.</span>,
                },
                {
                    q: "What input video formats are supported?",
                    a: <span>FERAL accepts standard formats (MP4, AVI, MOV, MKV, WebM) and re-encodes them via <code>feral reencode</code> to H.264 + faststart with downsizing to a configurable shortest-side (default 512&nbsp;px). Re-encoding is required for fast random frame access during training.</span>,
                },
                {
                    q: "Single-label or multi-label?",
                    a: <span>Set <code>is_multilabel: false</code> when each frame has exactly one behavior (mutually exclusive, softmax). Set <code>is_multilabel: true</code> when frames can carry several simultaneous behaviors (multi-hot 0/1 vectors, sigmoid + BCE). The flag must match how your <code>labels</code> arrays are shaped; the validator will catch mismatches.</span>,
                },
                {
                    q: "Do I need labels for inference videos?",
                    a: <span>No. Videos listed under <code>splits.inference</code> do not need entries in <code>labels</code>. Training uses one <code>labels.json</code>; when adding or removing sessions, update its labels and splits together. You can also run a trained checkpoint on any folder of videos with <code>feral infer CHECKPOINT VIDEO_FOLDER</code>, no JSON required.</span>,
                },
                {
                    q: "Where are training results saved?",
                    a: <span>Per-frame predictions land in <code className="bg-gray-100 px-1 py-0.5 rounded">answers/_inference_&#123;run_name&#125;_&#123;timestamp&#125;.json</code> after a training run, or in <code>inference_&#123;folder_name&#125;.json</code> after standalone <code>feral infer</code> (configurable with <code>--output</code>). Checkpoints embed the full training cfg, class names, and the multi-label flag.</span>,
                },
                {
                    q: "How do W&B logging options work?",
                    a: <span><code>feral train</code> prompts you to choose: <code>open</code> (shared community W&amp;B project, no setup), <code>personal</code> (your own W&amp;B project, paste API key + project URL), or <code>skip</code> (metrics print to stdout only). For non-interactive runs, pass <code>--no-wandb</code> to keep metrics local or <code>--public-wandb</code> to publish to the community project.</span>,
                },
                {
                    q: "I'm running out of GPU memory, what can I tune?",
                    a: <span>Start with <code>--mode lite --gradient-checkpointing</code>. See <a href="https://www.biorxiv.org/content/10.1101/2025.11.16.688666v2" target="_blank" rel="noopener noreferrer" className="link">our paper</a> for measured throughput and memory tradeoffs.</span>,
                },
                {
                    q: "I'm on Windows, anything special?",
                    a: <span>Windows GPU training has not been revalidated for this release. FERAL automatically installs <code>decord</code> and <code>triton-windows</code> as a drop-in for <code>triton</code>. Match its version to PyTorch (for PyTorch 2.10, use <code>triton-windows&gt;=3.6,&lt;3.7</code>). Avoid PyTorch 2.8 and 2.9 on Windows because of a <code>torch.compile</code> bug (<a href="https://github.com/pytorch/pytorch/issues/162430" target="_blank" rel="noopener noreferrer" className="link">pytorch#162430</a>); use 2.7 or 2.10+.</span>,
                },
                {
                    q: "What metrics should I track?",
                    a: <span>Watch <strong>mAP</strong> and <strong>F1</strong> on the <strong>val</strong> split. mAP &lt;&nbsp;0.5 is weak, &gt;&nbsp;0.9 is strong. FERAL also logs EMA versions of the metrics (computed on a smoothed copy of the weights), but EMA isn&apos;t necessarily better, compare both and pick whichever performs best on your val set.</span>,
                },
            ];
            return (
                <section id="faq" className="surface p-8 md:p-10">
                    <span className="pill bg-ink-100 text-ink-600 ring-1 ring-inset ring-ink-200">Reference</span>
                    <h2 className="mt-3 text-3xl md:text-[2.5rem] font-semibold tracking-[-0.03em] text-ink-900">Frequently Asked Questions</h2>
                    <p className="mt-3 text-ink-600 max-w-2xl">Quick answers about installation, GPUs, label format, and tuning.</p>
                    <div className="mt-8 divide-y divide-ink-200/70">
                        {items.map((it, idx) => (
                            <details key={idx} className="group py-4">
                                <summary className="flex justify-between items-center gap-4 cursor-pointer text-base font-medium text-ink-900 list-none">
                                    <span>{it.q}</span>
                                    <span className="w-7 h-7 rounded-full bg-ink-100 text-ink-700 grid place-items-center group-hover:bg-accent-100 group-hover:text-accent-700 group-open:bg-ink-900 group-open:text-white transition flex-shrink-0">
                                        <svg className="h-3.5 w-3.5 group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </span>
                                </summary>
                                <div className="mt-3 text-sm text-ink-600 leading-relaxed pr-10">{it.a}</div>
                            </details>
                        ))}
                    </div>
                </section>
            );
        };

        // Render the App
        ReactDOM.render(<App />, document.getElementById('root'));
