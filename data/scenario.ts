export const scenario = {
    siteTitle: 'From feature request to production reality.',
    eyebrow: 'Interactive AI Product Portfolio',
    owner: 'Chase Harper-Simard',
    summary:
        'An immersive case study showing how I would define, prioritize, and execute an internal AI observability and evaluation platform through stakeholder discovery, roadmap planning, issue tracking, and system design.',
    heroButtons: {
        primary: 'Enter workspace',
        secondary: 'View overview',
    },
    company: {
        name: 'Pulse',
        type: 'Fast-growing SaaS company',
        problem:
            'Multiple teams are shipping AI features, but there is no shared way to trace, evaluate, debug, or safely operate LLM workflows in production.',
    },
    metrics: [
        {
            label: 'AI teams shipping today',
            value: '7',
            detail:
                'Support, search, internal copilots, workflow automation, and content generation teams.',
        },
        {
            label: 'Current MTTR for AI incidents',
            value: '18 hrs',
            detail:
                'Debugging is fragmented across logs, prompts, tools, and custom workflows.',
        },
        {
            label: 'Regressions caught pre-prod',
            value: '<10%',
            detail:
                'Most teams lack a standardized evaluation and release-gate workflow.',
        },
    ],
    problemAreas: [
        {
            title: 'No shared instrumentation',
            body:
                'Each team logs different things, making traces inconsistent and cross-team debugging extremely slow.',
        },
        {
            title: 'Weak evaluation discipline',
            body:
                'Prompt and model changes ship without standardized offline evals, online review loops, or regression gates.',
        },
        {
            title: 'High operational risk',
            body:
                'Cost spikes, latency regressions, and silent quality failures are often discovered after production impact.',
        },
        {
            title: 'No paved road for teams',
            body:
                'Engineers repeatedly rebuild internal debugging and monitoring workflows instead of using one trusted platform path.',
        },
    ],
    stakeholders: [
        {
            id: 'ml-engineering',
            name: 'ML Engineering',
            role: 'Builds and maintains model and evaluation pipelines',
            goals: [
                'Standardize eval workflows',
                'Catch regressions before production',
                'Understand model behavior over time',
            ],
            painPoints: [
                'No shared evaluation framework',
                'Hard to compare prompt/model/version changes',
                'Low confidence in release quality',
            ],
            needs:
                'A reusable eval engine with offline datasets, production trace sampling, and regression reporting.',
        },
        {
            id: 'backend-engineering',
            name: 'Backend Engineering',
            role: 'Owns APIs, service orchestration, and production reliability',
            goals: [
                'Reduce debugging time',
                'Make traces easy to follow',
                'Catch latency and cost anomalies earlier',
            ],
            painPoints: [
                'Custom logging everywhere',
                'Hard to trace multi-step workflows',
                'Tool failures are hard to isolate',
            ],
            needs:
                'Step-level tracing, workflow spans, cost and latency visibility, and consistent instrumentation defaults.',
        },
        {
            id: 'product-teams',
            name: 'Product Teams',
            role: 'Ship AI-enabled features to end users',
            goals: [
                'Launch faster with lower risk',
                'Know whether users actually succeed',
                'Avoid building observability from scratch',
            ],
            painPoints: [
                'No paved road for AI launches',
                'No standard KPI layer',
                'Success metrics vary by team',
            ],
            needs:
                'A clear platform path for instrumentation, evaluation, launch readiness, and post-launch monitoring.',
        },
        {
            id: 'privacy-security',
            name: 'Privacy & Security',
            role: 'Ensures data handling is compliant and safe',
            goals: [
                'Define safe logging boundaries',
                'Prevent sensitive leakage',
                'Support observability without violating policy',
            ],
            painPoints: [
                'AI logs may contain sensitive content',
                'Teams instrument inconsistently',
                'Retention and redaction rules are unclear',
            ],
            needs:
                'Redaction defaults, retention guidance, and platform-level safe logging controls.',
        },
    ],
    architectureBlocks: [
        {
            id: 'sdk',
            name: 'Instrumentation SDK',
            summary:
                'Standardized tracing and metadata capture for all AI applications.',
            details:
                'The SDK is the paved-road entry point. It captures trace IDs, spans, prompt/template versions, model identifiers, retrieval metadata, tool usage, latency, and cost context. Product-wise, this reduces duplicate effort and makes downstream observability consistent across teams.',
            owner: 'Platform Engineering',
            successMetric: 'Time to first trace',
        },
        {
            id: 'trace-store',
            name: 'Trace Store',
            summary: 'Stores normalized execution traces across AI workflows.',
            details:
                'The trace store becomes the system of record for workflow-level debugging. It allows engineering and product teams to investigate multi-step agent behavior across prompts, tools, and retrieval calls without stitching together logs manually.',
            owner: 'Backend Engineering',
            successMetric: 'Trace coverage',
        },
        {
            id: 'eval-engine',
            name: 'Evaluation Engine',
            summary:
                'Runs offline evals, regression checks, and sampled review workflows.',
            details:
                'This layer makes quality measurable before and after launch. It supports curated datasets, LLM-as-judge patterns, human review, and regression comparisons across prompt/model/workflow versions.',
            owner: 'ML Engineering',
            successMetric: 'Regressions caught pre-prod',
        },
        {
            id: 'review-queue',
            name: 'Human Review Queue',
            summary: 'Routes ambiguous or high-risk outputs to structured review.',
            details:
                'Not every workflow should fully auto-resolve. This queue supports human-in-the-loop review for sensitive, low-confidence, or policy-relevant outputs, turning quality control into a first-class product workflow.',
            owner: 'Product + Ops',
            successMetric: 'High-risk review SLA',
        },
        {
            id: 'policy-layer',
            name: 'Policy & Redaction Layer',
            summary: 'Applies privacy-safe logging and retention defaults.',
            details:
                'This layer ensures observability is usable in enterprise settings by masking sensitive content, applying retention rules, and creating safe defaults that privacy and security teams can trust.',
            owner: 'Privacy & Security',
            successMetric: 'Policy compliance coverage',
        },
        {
            id: 'dashboards',
            name: 'Dashboards & Alerts',
            summary:
                'Surfaces latency, cost, quality, and failure signals in one place.',
            details:
                'This is the operating layer for teams after launch. It brings together quality signals, anomaly detection, cost drift, and failure taxonomy views so incidents can be detected and resolved faster.',
            owner: 'Product + Platform',
            successMetric: 'MTTR',
        },
    ],
    workspace: {
        projectName: 'Pulse AI Platform',
        projectCode: 'PLAT',
        sprintName: 'Q2 Platform Foundations',
        leftNav: [
            'Overview',
            'Roadmap',
            'Backlog',
            'Board',
            'Architecture',
            'Observability',
            'Launch',
        ],
        tabs: ['Summary', 'Board', 'List', 'Timeline', 'Architecture'],
        filters: ['AI Platform', 'High Priority', 'Q2 Sprint'],
        issues: [
            {
                id: 'PLAT-101',
                summary: 'Define trace schema v1',
                assignee: 'PE',
                reporter: 'CH',
                priority: 'Highest',
                status: 'Selected for Development',
                created: 'Mar 30, 2026',
                updated: 'Mar 30, 2026',
                dueDate: 'Apr 5, 2026',
                epic: 'Instrumentation Foundation',
                storyPoints: 5,
                description:
                    'Define the first shared trace schema for AI applications so teams emit comparable workflow data across prompts, retrieval, tools, latency, and cost.',
                acceptanceCriteria: [
                    'Prompt/template version is captured',
                    'Model ID and provider are captured',
                    'Tool calls and retrieval spans are represented',
                    'Latency and cost metadata are available per workflow step',
                ],
                dependencies: [
                    'Alignment with ML Engineering',
                    'Privacy-safe logging review',
                ],
                risks: [
                    'Schema may be too loose to standardize traces effectively',
                    'Over-design could slow adoption across teams',
                ],
                successMetric: 'Trace coverage across AI apps',
            },
            {
                id: 'PLAT-102',
                summary: 'Build instrumentation SDK',
                assignee: 'PE',
                reporter: 'CH',
                priority: 'Highest',
                status: 'In Progress',
                created: 'Mar 29, 2026',
                updated: 'Mar 30, 2026',
                dueDate: 'Apr 9, 2026',
                epic: 'Instrumentation Foundation',
                storyPoints: 8,
                description:
                    'Build the paved-road SDK for internal AI teams so traces, spans, prompt metadata, and workflow context are captured consistently without one-off logging.',
                acceptanceCriteria: [
                    'SDK integrates with at least 2 internal AI apps',
                    'Default helper methods exist for traces and spans',
                    'Prompt and model metadata are captured automatically',
                    'Documentation exists for adoption',
                ],
                dependencies: ['PLAT-101'],
                risks: [
                    'SDK complexity could reduce adoption',
                    'Different app architectures may resist standardization',
                ],
                successMetric: 'Time to first trace',
            },
            {
                id: 'PLAT-103',
                summary: 'Launch trace explorer',
                assignee: 'BE',
                reporter: 'CH',
                priority: 'High',
                status: 'Backlog',
                created: 'Mar 27, 2026',
                updated: 'Mar 29, 2026',
                dueDate: 'Apr 18, 2026',
                epic: 'Debugging Experience',
                storyPoints: 8,
                description:
                    'Ship the first trace explorer so teams can inspect workflow runs end-to-end and debug prompts, retrieval calls, tools, and model outputs from one interface.',
                acceptanceCriteria: [
                    'Users can open a full trace timeline',
                    'Prompt, retrieval, tool, and response steps are visible',
                    'Latency by step is shown',
                    'Basic search/filter support exists',
                ],
                dependencies: ['PLAT-101', 'PLAT-102'],
                risks: [
                    'Initial UI may show too much detail without clear hierarchy',
                ],
                successMetric: 'MTTR reduction',
            },
            {
                id: 'PLAT-104',
                summary: 'Offline eval dataset framework',
                assignee: 'ML',
                reporter: 'CH',
                priority: 'High',
                status: 'Backlog',
                created: 'Mar 26, 2026',
                updated: 'Mar 28, 2026',
                dueDate: 'Apr 21, 2026',
                epic: 'Evaluation Layer',
                storyPoints: 5,
                description:
                    'Create a reusable evaluation framework so teams can register offline datasets, compare runs across versions, and use release gates before deployment.',
                acceptanceCriteria: [
                    'Teams can register eval datasets',
                    'Runs can be compared across versions',
                    'Pass/fail thresholds can be defined',
                    'Results can be reviewed by stakeholders',
                ],
                dependencies: ['PLAT-101'],
                risks: [
                    'Teams may disagree on evaluation criteria',
                    'Coverage may initially be too shallow',
                ],
                successMetric: 'Regressions caught pre-prod',
            },
            {
                id: 'PLAT-105',
                summary: 'Privacy-safe logging defaults',
                assignee: 'SEC',
                reporter: 'CH',
                priority: 'Highest',
                status: 'Selected for Development',
                created: 'Mar 24, 2026',
                updated: 'Mar 29, 2026',
                dueDate: 'Apr 11, 2026',
                epic: 'Governance Layer',
                storyPoints: 5,
                description:
                    'Define platform-level redaction and retention defaults so observability scales without creating enterprise privacy and security risk.',
                acceptanceCriteria: [
                    'Redaction rules can be configured centrally',
                    'Retention settings exist by environment',
                    'Sensitive fields are masked by default',
                    'Security signs off on baseline policy',
                ],
                dependencies: ['Security review'],
                risks: [
                    'Too-aggressive masking may hurt debugging',
                    'Too-lenient defaults create trust risk',
                ],
                successMetric: 'Policy compliance coverage',
            },
            {
                id: 'PLAT-106',
                summary: 'Anomaly alerting',
                assignee: 'PM',
                reporter: 'CH',
                priority: 'Medium',
                status: 'Backlog',
                created: 'Mar 20, 2026',
                updated: 'Mar 27, 2026',
                dueDate: 'Apr 28, 2026',
                epic: 'Operational Visibility',
                storyPoints: 3,
                description:
                    'Add alerts for cost spikes, latency drift, and failure-rate anomalies so teams can respond to production issues earlier.',
                acceptanceCriteria: [
                    'Cost anomalies can trigger alerts',
                    'Latency drift can trigger alerts',
                    'Failure-rate spikes are surfaced',
                    'Teams can tune thresholds',
                ],
                dependencies: ['Trace Explorer', 'Reliable telemetry'],
                risks: [
                    'Too many alerts reduce trust in the system',
                    'Teams may overreact to noisy anomalies',
                ],
                successMetric: 'Incident detection time',
            },
            {
                id: 'PLAT-107',
                summary: 'Human review queue',
                assignee: 'PO',
                reporter: 'CH',
                priority: 'Medium',
                status: 'Done',
                created: 'Mar 18, 2026',
                updated: 'Mar 25, 2026',
                dueDate: 'Mar 26, 2026',
                epic: 'Evaluation Layer',
                storyPoints: 3,
                description:
                    'Build a review queue for low-confidence or policy-sensitive outputs so human-in-the-loop quality control becomes part of the operating model.',
                acceptanceCriteria: [
                    'Low-confidence events can be routed',
                    'Reviewers can approve or reject outcomes',
                    'Reason codes are captured',
                    'Review latency can be tracked',
                ],
                dependencies: ['Confidence signals'],
                risks: ['Routing too broadly could create operational burden'],
                successMetric: 'High-risk review SLA',
            },
        ],
    },
};