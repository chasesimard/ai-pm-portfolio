export const proposedSolutionContent = {
    sectionEyebrow: 'Proposed Solution',
    sectionTitle:
        'Build a real internal product for AI observability, evaluation, and release control.',
    sectionDescription:
        'The solution is not a dashboard add-on. It is a platform product that gives Pulse teams a paved road for instrumentation, debugging, evaluation, governance, and post-launch operation across all Pulse Assist experiences.',

    slides: [
        {
            id: 'overview',
            eyebrow: 'Solution Overview',
            title: 'Create a shared platform layer behind Pulse Assist.',
            text:
                'The proposed solution is an internal AI platform product that standardizes how Pulse teams capture traces, evaluate changes, debug incidents, and operate AI features in production. Instead of every team inventing its own workflow, the company gets one trusted operating model.',
            bullets: [
                'Shared instrumentation across all AI surfaces',
                'Reusable evaluation and regression workflows',
                'Centralized operational visibility and review controls',
            ],
        },
        {
            id: 'mvp-scope',
            eyebrow: 'MVP Definition',
            title: 'Start with the highest-friction workflows, not the full vision.',
            text:
                'The MVP should be scoped around the places where AI inconsistency is most expensive today: resident-facing support workflows, voice/chat execution tracing, and pre-release evaluation for prompt and retrieval changes. This keeps the first version tight enough to launch and valuable enough to earn adoption.',
            bullets: [
                'MVP includes traces, trace explorer, baseline eval runner, and safe logging defaults',
                'First adoption targets the highest-volume customer-facing AI workflows',
                'Success depends on reducing debugging time and increasing release confidence',
            ],
        },
        {
            id: 'sdk',
            eyebrow: 'Solution Component',
            title: 'Instrumentation SDK and normalized trace schema',
            text:
                'The first technical layer is a lightweight SDK for Pulse teams to adopt across chat, SMS, voice, and internal support tools. It captures prompt versions, model identifiers, retrieval metadata, tool execution, workflow spans, latency, and cost in a consistent format.',
            bullets: [
                'TypeScript-friendly integration path',
                'One schema across channels and workflows',
                'Low-friction paved road for teams shipping AI',
            ],
        },
        {
            id: 'evals',
            eyebrow: 'Solution Component',
            title: 'Evaluation engine with offline, regression, and human review workflows',
            text:
                'Pulse needs a reusable way to test prompt and retrieval changes before they affect clients. That means golden datasets, regression comparisons across versions, scoring workflows, and human review where quality or policy risk is high.',
            bullets: [
                'Offline golden datasets for support scenarios',
                'Regression comparisons across prompt/model/retrieval changes',
                'Human review for sensitive or ambiguous outputs',
            ],
        },
        {
            id: 'ops',
            eyebrow: 'Solution Component',
            title: 'Operational visibility, alerting, and safe-launch controls',
            text:
                'After launch, teams need to know where time, cost, and quality failures happen inside real workflows. The platform should surface latency by step, anomalous behavior, failure categories, and safe logging defaults so teams can respond earlier and with more confidence.',
            bullets: [
                'Workflow-level anomaly detection',
                'Latency and cost tied to execution steps',
                'Safe logging, retention, and review defaults',
            ],
        },
        {
            id: 'implementation',
            eyebrow: 'Implementation Detail',
            title: 'The solution should feel technically believable and product-ready.',
            text:
                'This case is meant to reflect a real product build, not a vague concept. A credible implementation could use a TypeScript service layer, tracing concepts inspired by OpenTelemetry, a normalized trace store, an internal eval runner, and a product-facing analysis interface built in React/Next.js. Depending on deployment context, teams could use LangSmith, Langfuse, or AWS-native Bedrock-aligned observability patterns.',
            bullets: [
                'React / Next.js internal platform UI',
                'Trace ingestion + normalized execution store',
                'Eval orchestration + dashboards + review workflows',
            ],
        },
    ],
};