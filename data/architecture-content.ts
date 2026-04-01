export const architectureContent = {
    sectionEyebrow: 'Architecture',
    sectionTitle:
        'Each layer exists to reduce ambiguity and operational risk.',
    sectionDescription:
        'The architecture is designed to support adoption, consistent observability, reusable evaluation workflows, and governance-safe production operation.',

    blocks: [
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
};