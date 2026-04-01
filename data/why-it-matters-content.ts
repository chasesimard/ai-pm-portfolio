export const whyItMattersContent = {
    company: {
        name: 'Pulse',
        type: 'B2B SaaS for property management operators',
        problem:
            'Pulse Assist is now embedded across resident chat, SMS, voice, and internal workflows, but there is no shared platform for tracing, evaluation, debugging, and safe release control.',
    },

    sectionEyebrow: 'Why it matters',
    sectionTitle: 'At Pulse, this is no longer a technical inconvenience. It is a product and client trust problem.',
    sectionDescription:
        'Once AI becomes part of the customer experience, weak observability affects product quality, support efficiency, implementation confidence, and long-term client trust.',

    cards: [
        {
            id: 'scale',
            label: 'AI surfaces already live',
            value: '4+',
            detail:
                'Pulse Assist is already active in resident chat, SMS, voice, and internal support workflows.',
            modalTitle: 'Why AI surface area matters',
            modalBody:
                'The issue is not whether one model is behaving well in one isolated prototype. Pulse already has AI behavior distributed across several channels and use cases. That means inconsistency is now a product-level problem. Every additional AI surface increases the cost of fragmented debugging, fragmented evaluation, and fragmented release practices.',
        },
        {
            id: 'mttr',
            label: 'Current incident recovery pattern',
            value: 'Slow + manual',
            detail:
                'When something breaks, teams reconstruct events manually across prompts, logs, tools, and client reports.',
            modalTitle: 'Why incident recovery matters',
            modalBody:
                'In a real SaaS environment, time-to-resolution is not just an engineering KPI. It affects customer confidence, support burden, and internal trust between teams. If Customer Success hears about failures before Product or Engineering can explain them, the company loses credibility even when the issue is eventually fixed.',
        },
        {
            id: 'regressions',
            label: 'Release confidence',
            value: 'Low',
            detail:
                'Prompt and retrieval changes can move forward without a consistent pre-production evaluation framework.',
            modalTitle: 'Why release confidence matters',
            modalBody:
                'Pulse needs to be able to tell the difference between a change that sounds better and a change that is actually safer, more accurate, and more scalable. Without structured evaluation and release gates, AI quality becomes hard to defend internally and even harder to defend in front of customers when incidents occur.',
        },
    ],
};