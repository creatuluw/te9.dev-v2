const LLMNGN_CONTENT = {
    meta: {
        title: "LLMNGN",
        tagline: "Context Persistence for OpenCode",
        version: "1.0.0",
        lastUpdated: "2025-03-21"
    },
    
    surface: {
        intro: [
            "Context persistence for OpenCode.",
            "Remembers your coding decisions across sessions.",
            "No more starting from scratch."
        ],
        keywords: ["context", "persistence", "memory", "plugin", "open", "code"]
    },
    
    installation: {
        command: "npx degit hoipippeloi/llmngn.xyz/.opencode .opencode && cd .opencode && bun install && cd ..",
        powershell: "npx degit hoipippeloi/llmngn.xyz/.opencode .opencode; cd .opencode; bun install; cd ..",
        installs: [
            "Plugin hooks (.opencode/plugins/llmngn.ts)",
            "Configuration (.opencode/plugins/llmngn.json)",
            "Interactive command (.opencode/commands/llmngn.md)"
        ],
        verification: [
            "Start OpenCode in your project",
            "Plugin auto-loads automatically",
            "No additional setup required"
        ]
    },
    
    contextTypes: [
        { type: "decision", use: "Important choices", retention: "180 days" },
        { type: "architecture", use: "System design", retention: "365 days" },
        { type: "debt", use: "Technical debt", retention: "90 days" },
        { type: "file_change", use: "Code changes", retention: "90 days" },
        { type: "task", use: "Todos", retention: "60 days" },
        { type: "command", use: "Commands run", retention: "30 days" }
    ],
    
    commands: {
        init: {
            syntax: "llmngn init",
            description: "Initialize the plugin",
            details: "Stores a usage instruction record for future reference."
        },
        add: {
            syntax: "llmngn add <text>",
            description: "Store new context",
            options: [
                "-t, --type - Context type (decision, file_change, task, debt, command, architecture)",
                "-m, --metadata - Extra data as JSON",
                "-s, --session - Session ID"
            ],
            examples: [
                'llmngn add "Using Redis for cache" --type decision',
                'llmngn add "Fixed auth bug" --type file_change --metadata \'{"file":"src/auth.ts"}\''
            ]
        },
        list: {
            syntax: "llmngn list",
            description: "Show all records",
            options: [
                "-l, --limit - Max results (default: 100)",
                "-t, --type - Filter by type",
                "-s, --session - Filter by session"
            ],
            examples: [
                "llmngn list --limit 20",
                "llmngn list --type decision"
            ]
        },
        get: {
            syntax: "llmngn get <id>",
            description: "Get specific record",
            example: "llmngn get abc123-def456"
        },
        query: {
            syntax: "llmngn query <text>",
            description: "Search context semantically",
            options: [
                "-l, --limit - Max results",
                "-t, --types - Filter by types (comma-separated)"
            ],
            examples: [
                'llmngn query "authentication" --limit 10',
                'llmngn query "database" --types decision,architecture'
            ],
            note: "Semantic search finds conceptually related context, not just keyword matches."
        },
        delete: {
            syntax: "llmngn delete <id> --force",
            description: "Remove a record",
            warning: "Permanent deletion"
        },
        clean: {
            syntax: "llmngn clean",
            description: "Remove expired records",
            note: "Safe command - only removes past retention date."
        },
        stats: {
            syntax: "llmngn stats",
            description: "Show database info",
            shows: [
                "Total records",
                "Database size",
                "Record types breakdown",
                "Oldest/newest records"
            ]
        },
        export: {
            syntax: "llmngn export --output <file>",
            description: "Backup all data",
            example: "llmngn export --output backup.json"
        },
        import: {
            syntax: "llmngn import <file>",
            description: "Restore from backup",
            example: "llmngn import backup.json"
        },
        purge: {
            syntax: "llmngn purge --force",
            description: "Delete everything",
            warning: "Permanent! Export first."
        }
    },
    
    interactiveCommands: [
        "/llmngn store this decision",
        "/llmngn show me recent changes",
        "/llmngn find anything about auth",
        "/llmngn export my data",
        "/llmngn what's in my database?"
    ],
    
    faq: {
        installation: [
            {
                q: "How do I install LLMNGN?",
                a: "Run: npx degit hoipippeloi/llmngn.xyz/.opencode .opencode && cd .opencode && bun install && cd .."
            },
            {
                q: "Do I need to configure anything?",
                a: "No. Works out of the box with sensible defaults. Customize in .opencode/plugins/llmngn.json if needed."
            },
            {
                q: "How do I verify installation?",
                a: "Start OpenCode, plugin auto-loads. Run llmngn stats to see database info."
            },
            {
                q: "Can I use LLMNGN with any LLM?",
                a: "LLMNGN is designed for OpenCode CLI. Works with any model supported by OpenCode."
            }
        ],
        usage: [
            {
                q: "How do I store a decision?",
                a: 'llmngn add "Your decision text" --type decision or /llmngn store that we decided to use Redis'
            },
            {
                q: "How do I search my context?",
                a: 'llmngn query "your search term" or /llmngn find anything about authentication'
            },
            {
                q: "How do I see all my stored items?",
                a: "llmngn list"
            },
            {
                q: "How do I delete a record?",
                a: "llmngn delete <record-id> --force (get ID from llmngn list)"
            },
            {
                q: "How do I backup my data?",
                a: "llmngn export --output backup.json (restore with llmngn import backup.json)"
            }
        ],
        technical: [
            {
                q: "Where is my data stored?",
                a: "All data is stored locally in .lancedb/ folder in your project directory. No cloud upload."
            },
            {
                q: "Is my data secure?",
                a: "Yes. Data stays on your machine. Auto-redacts API keys, passwords, tokens, secrets."
            },
            {
                q: "How long is context kept?",
                a: "Architecture: 365 days, Decisions: 180 days, File changes: 90 days, Tasks: 60 days, Commands: 30 days"
            },
            {
                q: "Can I use LLMNGN offline?",
                a: "Yes. Everything runs locally. No internet required after installation."
            },
            {
                q: "What if I delete the .lancedb folder?",
                a: "You can recreate it by running llmngn init again. All data will be lost unless you have a backup."
            },
            {
                q: "How do I reset everything?",
                a: "rm -rf .lancedb then reinstall if needed."
            }
        ],
        team: [
            {
                q: "Can I share context with my team?",
                a: "Export and share JSON files: llmngn export --output team-context.json (team imports with llmngn import team-context.json)"
            },
            {
                q: "Why isn't context showing in OpenCode?",
                a: "Context is injected at session start. Try: 1) Start a new OpenCode session, 2) Verify data exists: llmngn list, 3) Check plugin is enabled in .opencode/plugins/llmngn.json"
            },
            {
                q: "How does semantic search work?",
                a: 'LLMNGN uses vector embeddings to find conceptually related context. "Database" finds "PostgreSQL", "SQL", "data storage", etc.'
            }
        ],
        billing: [
            {
                q: "Is LLMNGN free?",
                a: "Yes. Completely free and open source (MIT license)."
            },
            {
                q: "Are there premium features?",
                a: "No. All features are free."
            }
        ],
        support: [
            {
                q: "How do I report a bug?",
                a: "Create an issue at: https://github.com/hoipippeloi/llmngn.xyz/issues"
            },
            {
                q: "How do I get help?",
                a: "Email: support@llmngn.xyz, GitHub Issues: github.com/hoipippeloi/llmngn.xyz/issues"
            },
            {
                q: "Can I contribute?",
                a: "Yes. Check Development Guide for contributing information."
            }
        ]
    },
    
    tutorials: {
        firstWorkflow: {
            title: "Your First LLMNGN Workflow",
            time: "10 minutes",
            difficulty: "Beginner",
            prerequisites: "OpenCode installed",
            steps: [
                {
                    title: "Install LLMNGN",
                    command: "npx degit hoipippeloi/llmngn.xyz/.opencode .opencode && cd .opencode && bun install && cd ..",
                    verify: "llmngn stats"
                },
                {
                    title: "Store the Decision",
                    command: 'llmngn add "Using JWT for stateless authentication" --type decision',
                    alternative: "/llmngn store that we're using JWT for auth"
                },
                {
                    title: "Add More Context",
                    commands: [
                        'llmngn add "PostgreSQL for primary database with Redis cache" --type architecture',
                        'llmngn add "Need to implement rate limiting" --type task',
                        'llmngn add "Created auth middleware in src/middleware/auth.ts" --type file_change'
                    ]
                },
                {
                    title: "Start a New Session",
                    note: "LLMNGN automatically queries your stored context, finds relevant decisions, and injects them into the new session."
                },
                {
                    title: "Search Your Context",
                    command: 'llmngn query "authentication"',
                    alternative: "/llmngn find anything about auth"
                },
                {
                    title: "View All Records",
                    commands: ["llmngn list", "llmngn list --type decision"]
                },
                {
                    title: "Backup Your Data",
                    commands: ["llmngn export --output backup.json", "llmngn import backup.json"]
                }
            ],
            proTips: [
                "Be consistent: Store decisions as you make them",
                "Use types: Categorize with --type decision for better organization",
                "Search smart: Use semantic queries, not just keywords",
                "Backup often: Export before major refactors"
            ]
        },
        teamCollaboration: {
            title: "Team Collaboration with LLMNGN",
            time: "15 minutes",
            difficulty: "Intermediate",
            prerequisites: "LLMNGN installed, team project",
            steps: [
                {
                    title: "Capture Team Decisions",
                    commands: [
                        'llmngn add "Microservices with API gateway pattern" --type architecture',
                        'llmngn add "React frontend, Node.js backend, PostgreSQL database" --type decision',
                        'llmngn add "ESLint + Prettier with Airbnb config" --type decision',
                        'llmngn add "Refactor legacy auth module in Q2" --type debt'
                    ]
                },
                {
                    title: "Export Team Context",
                    command: "llmngn export --output team-context.json"
                },
                {
                    title: "Share with Team",
                    options: [
                        "Git repository: git add team-context.json && git commit -m 'Add team context backup'",
                        "Shared drive: Place in team shared folder",
                        "Direct transfer: Send via email/chat"
                    ]
                },
                {
                    title: "Team Member Imports",
                    command: "llmngn import team-context.json",
                    verify: "llmngn list"
                },
                {
                    title: "Onboard New Developer",
                    steps: [
                        "Install LLMNGN",
                        "Import team context: llmngn import team-context.json",
                        "Search to learn: llmngn query \"architecture\""
                    ]
                },
                {
                    title: "Maintain Living Documentation",
                    weekly: [
                        'llmngn add "Implemented user roles" --type file_change --metadata \'{"file":"src/roles.ts"}\'',
                        "llmngn export --output team-context-2025-01.json",
                        "git add team-context-2025-01.json && git commit -m 'January team context'"
                    ]
                }
            ],
            bestPractices: [
                "Regular Exports: llmngn export --output team-context-$(date +%Y-%m).json",
                "Decision Reviews: llmngn list --type architecture",
                "Clean Expired: llmngn clean (monthly)",
                "Merge Contexts: Export individual contexts and merge manually"
            ]
        }
    },
    
    troubleshooting: {
        cli: [
            {
                problem: "Command not found",
                solutions: ["Run llmngn --version", "Reinstall: cd .opencode && bun install"]
            },
            {
                problem: "No data showing",
                solutions: ["Run llmngn stats to verify database", "Check .lancedb/ folder exists"]
            },
            {
                problem: "Permission errors",
                solutions: ["Run as administrator (Windows)", "Check folder permissions"]
            }
        ],
        usage: [
            {
                problem: "Delete command fails",
                solutions: ["Ensure you have correct record ID", "Add --force flag to confirm"]
            },
            {
                problem: "Can't find record ID",
                solutions: ["Run llmngn list to see all IDs", "Use llmngn get <id> to verify"]
            },
            {
                problem: "Accidentally deleted",
                solutions: ["Restore from backup: llmngn import backup.json"]
            }
        ],
        search: [
            {
                problem: "No results found",
                solutions: ["Try different keywords", "Check if context exists: llmngn list", "Semantic search may not match exact words"]
            },
            {
                problem: "Too many results",
                solutions: ["Add --limit 5 to show fewer", "Filter by type: --type decision", "Be more specific in search"]
            },
            {
                problem: "Results not relevant",
                solutions: ["Try synonyms", "Use more specific query", "Check context type weights (decisions ranked higher)"]
            }
        ]
    },
    
    links: {
        email: "support@llmngn.xyz",
        github: "https://github.com/hoipippeloi/llmngn.xyz",
        issues: "https://github.com/hoipippeloi/llmngn.xyz/issues"
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = LLMNGN_CONTENT;
}
