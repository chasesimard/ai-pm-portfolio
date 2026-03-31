'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { ArchitectureExplorer } from '@/components/architecture-explorer';
import { JiraWorkspace } from '@/components/jira-workspace';
import { MetricCard } from '@/components/metric-card';
import { ProblemCard } from '@/components/problem-card';
import { SectionHeading } from '@/components/section-heading';
import { StakeholderExplorer } from '@/components/stakeholder-explorer';
import { scenario } from '@/data/scenario';

type SectionId =
    | 'intro'
    | 'overview'
    | 'problem'
    | 'stakeholders'
    | 'workspace'
    | 'architecture';

const sections: { id: SectionId; label: string }[] = [
    { id: 'intro', label: 'Intro' },
    { id: 'overview', label: 'Why it matters' },
    { id: 'problem', label: 'Problem' },
    { id: 'stakeholders', label: 'Stakeholders' },
    { id: 'workspace', label: 'Jira workspace' },
    { id: 'architecture', label: 'Architecture' },
];

export default function Home() {
    const [activeSection, setActiveSection] = useState<SectionId>('intro');

    const activeIndex = useMemo(
        () => sections.findIndex((section) => section.id === activeSection),
        [activeSection]
    );

    const canGoBack = activeIndex > 0;
    const canGoForward = activeIndex < sections.length - 1;

    function goToNext() {
        if (!canGoForward) return;
        setActiveSection(sections[activeIndex + 1].id);
    }

    function goToPrevious() {
        if (!canGoBack) return;
        setActiveSection(sections[activeIndex - 1].id);
    }

    function goToSection(id: SectionId) {
        setActiveSection(id);
    }

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'ArrowRight') goToNext();
            if (event.key === 'ArrowLeft') goToPrevious();
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeIndex, canGoBack, canGoForward]);

    return (
        <main className="min-h-screen bg-neutral-950 text-white">
            <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/80 backdrop-blur">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                    <div>
                        <p className="text-sm font-medium tracking-[0.3em] text-neutral-300">
                            {scenario.owner.toUpperCase()}
                        </p>
                    </div>

                    <div className="hidden items-center gap-3 md:flex">
                        {sections.map((section, index) => {
                            const isActive = section.id === activeSection;
                            const isPast = index < activeIndex;

                            return (
                                <button
                                    key={section.id}
                                    onClick={() => goToSection(section.id)}
                                    className={`rounded-full px-3 py-2 text-sm transition ${
                                        isActive
                                            ? 'bg-white text-black'
                                            : isPast
                                                ? 'bg-white/10 text-white hover:bg-white/15'
                                                : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                                    }`}
                                >
                                    {section.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </header>

            <div className="mx-auto flex max-w-7xl gap-6 px-6 py-6">
                <aside className="hidden w-56 shrink-0 lg:block">
                    <div className="sticky top-28 rounded-3xl border border-white/10 bg-white/5 p-4">
                        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
                            Case study flow
                        </p>

                        <div className="mt-4 space-y-2">
                            {sections.map((section, index) => {
                                const isActive = section.id === activeSection;
                                const isPast = index < activeIndex;

                                return (
                                    <button
                                        key={section.id}
                                        onClick={() => goToSection(section.id)}
                                        className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${
                                            isActive
                                                ? 'bg-cyan-400/10 text-cyan-200'
                                                : 'hover:bg-white/5 text-neutral-400 hover:text-white'
                                        }`}
                                    >
                    <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${
                            isActive
                                ? 'bg-cyan-400/20 text-cyan-200'
                                : isPast
                                    ? 'bg-white/10 text-white'
                                    : 'bg-white/5 text-neutral-500'
                        }`}
                    >
                      {index + 1}
                    </span>
                                        <span className="text-sm">{section.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </aside>

                <section className="min-w-0 flex-1">
                    <div className="overflow-hidden rounded-[32px] border border-white/10 bg-neutral-950">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeSection}
                                initial={{ opacity: 0, y: 22 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -22 }}
                                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                className="h-[calc(100vh-145px)] overflow-y-auto"
                            >
                                {activeSection === 'intro' && (
                                    <div className="flex min-h-full items-center px-8 py-12 md:px-12">
                                        <div className="max-w-5xl">
                                            <p className="mb-6 text-sm uppercase tracking-[0.35em] text-neutral-400">
                                                {scenario.eyebrow}
                                            </p>

                                            <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-tight sm:text-6xl md:text-7xl">
                                                {scenario.siteTitle}
                                            </h1>

                                            <p className="mt-8 max-w-2xl text-lg leading-8 text-neutral-300">
                                                {scenario.summary}
                                            </p>

                                            <div className="mt-10 flex flex-wrap gap-4">
                                                <button
                                                    onClick={goToNext}
                                                    className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-neutral-200"
                                                >
                                                    {scenario.heroButtons.primary}
                                                </button>

                                                <button
                                                    onClick={() => goToSection('overview')}
                                                    className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/5"
                                                >
                                                    {scenario.heroButtons.secondary}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeSection === 'overview' && (
                                    <div className="min-h-full px-8 py-12 md:px-12">
                                        <div className="flex min-h-full flex-col justify-center">
                                            <SectionHeading
                                                eyebrow="Why this platform matters"
                                                title="The company has real AI scale, but no paved road."
                                                description={scenario.company.problem}
                                            />

                                            <div className="mt-12 grid gap-6 md:grid-cols-3">
                                                {scenario.metrics.map((metric) => (
                                                    <MetricCard
                                                        key={metric.label}
                                                        value={metric.value}
                                                        label={metric.label}
                                                        detail={metric.detail}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeSection === 'problem' && (
                                    <div className="min-h-full px-8 py-12 md:px-12">
                                        <div className="flex min-h-full flex-col justify-center">
                                            <SectionHeading
                                                eyebrow="Investigate the problem"
                                                title="The product challenge is not one issue — it is a system failure."
                                                description="Before defining roadmap or architecture, the first job is understanding where teams are losing time, confidence, and operational control."
                                            />

                                            <div className="mt-12 grid gap-6 md:grid-cols-2">
                                                {scenario.problemAreas.map((item) => (
                                                    <ProblemCard
                                                        key={item.title}
                                                        title={item.title}
                                                        body={item.body}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeSection === 'stakeholders' && (
                                    <div className="min-h-full px-8 py-12 md:px-12">
                                        <div className="flex min-h-full flex-col justify-center">
                                            <SectionHeading
                                                eyebrow="Stakeholder investigation"
                                                title="A platform PM has to balance multiple technical customers."
                                                description="Each stakeholder sees the problem differently. The platform succeeds only if it reduces friction across engineering, product, ML, and governance teams."
                                            />

                                            <div className="mt-12">
                                                <StakeholderExplorer stakeholders={scenario.stakeholders} />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeSection === 'workspace' && (
                                    <div className="min-h-full px-6 py-8 md:px-8">
                                        <SectionHeading
                                            eyebrow="Jira-style workspace"
                                            title="Execution should feel like a real product planning environment."
                                            description="This workspace is intentionally designed to feel like a live planning tool: dense issue table, realistic metadata, and a detailed issue drawer when you click into any ticket."
                                        />

                                        <div className="mt-10">
                                            <JiraWorkspace
                                                projectName={scenario.workspace.projectName}
                                                projectCode={scenario.workspace.projectCode}
                                                sprintName={scenario.workspace.sprintName}
                                                leftNav={scenario.workspace.leftNav}
                                                tabs={scenario.workspace.tabs}
                                                filters={scenario.workspace.filters}
                                                issues={scenario.workspace.issues}
                                            />
                                        </div>
                                    </div>
                                )}

                                {activeSection === 'architecture' && (
                                    <div className="min-h-full px-8 py-12 md:px-12">
                                        <div className="flex min-h-full flex-col justify-center">
                                            <SectionHeading
                                                eyebrow="Architecture explorer"
                                                title="The product is not just a dashboard — it is an operating system for AI quality."
                                                description="Each platform component exists to reduce ambiguity, standardize workflows, and make production AI systems easier to trust and operate."
                                            />

                                            <div className="mt-12">
                                                <ArchitectureExplorer
                                                    blocks={scenario.architectureBlocks}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                        <button
                            onClick={goToPrevious}
                            disabled={!canGoBack}
                            className={`rounded-full px-5 py-3 text-sm font-medium transition ${
                                canGoBack
                                    ? 'border border-white/15 text-white hover:border-white/30 hover:bg-white/5'
                                    : 'cursor-not-allowed border border-white/5 text-neutral-600'
                            }`}
                        >
                            Previous section
                        </button>

                        <div className="text-sm text-neutral-500">
                            Section {activeIndex + 1} of {sections.length}
                        </div>

                        <button
                            onClick={goToNext}
                            disabled={!canGoForward}
                            className={`rounded-full px-5 py-3 text-sm font-medium transition ${
                                canGoForward
                                    ? 'bg-white text-black hover:bg-neutral-200'
                                    : 'cursor-not-allowed bg-white/10 text-neutral-500'
                            }`}
                        >
                            Next section
                        </button>
                    </div>
                </section>
            </div>
        </main>
    );
}