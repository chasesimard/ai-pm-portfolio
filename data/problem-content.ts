export const problemContent = {
    sectionEyebrow: 'Problem',
    sectionTitle:
        'Pulse Assist is live across multiple products, but the operating model behind it is breaking down.',
    sectionDescription:
        'Pulse is not trying to decide whether to use AI. It already has AI products in market. The problem is that those products have scaled faster than the company’s ability to trace, evaluate, debug, and safely improve them across teams.',

    slides: [
        {
            id: 'company-context',
            eyebrow: 'Company Context',
            title: 'Pulse is already an AI-enabled platform, not an AI experiment.',
            text:
                'Pulse is a B2B SaaS platform used by property management operators to handle resident communication and service workflows. Its AI product layer, Pulse Assist, is already active across resident webchat, SMS support, AI voice, knowledge retrieval, and internal agent-assist experiences. This means the organization is no longer in an experimentation phase; it is in an operational scale phase.',
            bullets: [
                'AI already touches multiple customer-facing and internal workflows',
                'Several product and engineering teams contribute to AI behavior',
                'Client trust now depends on consistency, not just feature novelty',
            ],
        },
        {
            id: 'cross-team-fragmentation',
            eyebrow: 'Problem 1',
            title: 'Each team is shipping AI behavior, but no team owns the full system view.',
            text:
                'The resident support bot team, the voice automation team, the internal operations tooling team, and the platform/backend teams all contribute to different parts of the user experience. But when something goes wrong in production, there is no shared execution-level workflow view that helps the company understand what happened from beginning to end.',
            bullets: [
                'Prompt, retrieval, tool, and response behavior are observed in different places',
                'Debugging spans across product, ML, support, and backend teams',
                'Ownership is distributed, but observability is not unified',
            ],
        },
        {
            id: 'client-facing-failures',
            eyebrow: 'Problem 2',
            title: 'Clients feel the inconsistency before the company can explain it.',
            text:
                'Clients do not experience these failures as “observability gaps.” They experience them as confusing resident answers, inconsistent escalations, bad call outcomes, weak knowledge retrieval, or workflows that appear to work in one channel but not another. The result is higher support burden, lower trust, and harder renewal conversations.',
            bullets: [
                'A resident may get one answer in chat and a different one over voice',
                'A property manager may escalate an issue without understanding why the AI failed',
                'Customer Success hears symptoms before Engineering can isolate causes',
            ],
        },
        {
            id: 'evaluation-gaps',
            eyebrow: 'Problem 3',
            title: 'Prompt and model changes move faster than evaluation discipline.',
            text:
                'As Pulse Assist expands, teams are iterating prompts, response logic, retrieval strategies, and tool integrations quickly. But there is no reusable offline evaluation framework, no shared golden datasets, and no standard release gate that tells teams whether a change is truly safer or better before it ships.',
            bullets: [
                'Regression risk is high across prompt and retrieval changes',
                'Quality decisions rely too heavily on manual review or intuition',
                'The same evaluation effort gets recreated by multiple teams',
            ],
        },
        {
            id: 'operational-risk',
            eyebrow: 'Problem 4',
            title: 'Production risk is being discovered too late and too expensively.',
            text:
                'Latency drift, cost spikes, weak answers, routing mistakes, and policy-sensitive outputs are often surfaced after they begin affecting real customer workflows. Without a consistent trace, evaluation, and alerting foundation, incident response is slower than it should be and learning does not compound across teams.',
            bullets: [
                'MTTR stays high because workflows are reconstructed manually',
                'Operational signals are not consistently tied to execution steps',
                'The business reacts to incidents instead of preventing them',
            ],
        },
    ],
};