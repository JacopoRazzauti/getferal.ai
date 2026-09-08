module.exports = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['"Inter Tight"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
                        display: ['Newsreader', 'ui-serif', 'Georgia', 'serif'],
                    },
                    colors: {
                        ink: {
                            50:  '#f8fafc',
                            100: '#f1f5f9',
                            200: '#e2e8f0',
                            300: '#cbd5e1',
                            400: '#94a3b8',
                            500: '#64748b',
                            600: '#475569',
                            700: '#334155',
                            800: '#1e293b',
                            900: '#0f172a',
                            950: '#020617',
                        },
                        accent: {
                            50:  '#ecfdf5',
                            100: '#d1fae5',
                            200: '#a7f3d0',
                            300: '#6ee7b7',
                            400: '#34d399',
                            500: '#10b981',
                            600: '#059669',
                            700: '#047857',
                            800: '#065f46',
                            900: '#064e3b',
                        },
                    },
                    boxShadow: {
                        'soft': '0 1px 2px rgba(15,23,42,0.04), 0 4px 12px rgba(15,23,42,0.04)',
                        'lifted': '0 1px 3px rgba(15,23,42,0.06), 0 12px 32px -12px rgba(15,23,42,0.12)',
                        'glow-accent': '0 0 0 1px rgba(5,150,105,0.18), 0 8px 28px -8px rgba(5,150,105,0.35)',
                    },
                    backgroundImage: {
                        'grid': "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><path d='M24 0H0v24' fill='none' stroke='%23e2e8f0' stroke-width='0.5'/></svg>\")",
                    }
                }
            }
        };
module.exports.content = ["./src/site.jsx"];
