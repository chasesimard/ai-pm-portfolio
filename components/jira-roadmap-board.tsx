'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';

type Issue = {
    id: string;
    title: string;
    summary: string;
    description: string;
    priority: string;
    owner: string;
    status: string;
    columnId: string;
    acceptanceCriteria: string[];
    dependencies: string[];
    risks: string[];
    successMetric: string;
};

type Column = {
    id: string;
    title: string;
};

type JiraRoadmapBoardProps = {
    columns: Column[];
    issues: Issue[];
};

function priorityClasses(priority: string) {
    switch (priority) {
        case 'Highest':
            return 'border-rose-400/20 bg-rose-400/10 text-rose-200';
        case 'High':
            return 'border-amber-400/20 bg-amber-400/10 text-amber-200';
        default:
            return 'border-white/10 bg-white/5 text-neutral-200';
    }
}

export function JiraRoadmapBoard({
                                     columns,
                                     issues,
                                 }: JiraRoadmapBoardProps) {
    const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);

    const issuesByColumn = useMemo(() => {
        return columns.reduce<Record<string, Issue[]>>((acc, column) => {
            acc[column.id] = issues.filter((issue) => issue.columnId === column.id);
            return acc;
        }, {});
    }, [columns, issues]);

    const selectedIssue =
        issues.find((issue) => issue.id === selectedIssueId) ?? null;

    return (
        <>
            <div className="grid gap-6 xl:grid-cols-4">
                {columns.map((column) => {
                    const columnIssues = issuesByColumn[column.id] ?? [];

                    return (
                        <div
                            key={column.id}
                            className="rounded-3xl border border-white/10 bg-white/5 p-4"
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-sm font-medium uppercase tracking-[0.25em] text-neutral-300">
                                    {column.title}
                                </h3>
                                <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-neutral-400">
                  {columnIssues.length}
                </span>
                            </div>

                            <div className="space-y-4">
                                {columnIssues.map((issue) => (
                                    <button
                                        key={issue.id}
                                        onClick={() => setSelectedIssueId(issue.id)}
                                        className="w-full rounded-2xl border border-white/10 bg-neutral-900 p-4 text-left transition hover:border-cyan-400/30 hover:bg-neutral-900/80"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                                                    {issue.id}
                                                </p>
                                                <h4 className="mt-2 text-base font-medium text-white">
                                                    {issue.title}
                                                </h4>
                                            </div>

                                            <span
                                                className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${priorityClasses(
                                                    issue.priority
                                                )}`}
                                            >
                        {issue.priority}
                      </span>
                                        </div>

                                        <p className="mt-3 text-sm leading-7 text-neutral-400">
                                            {issue.summary}
                                        </p>

                                        <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                        Owner
                      </span>
                                            <span className="text-sm text-neutral-300">
                        {issue.owner}
                      </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            <AnimatePresence>
                {selectedIssue ? (
                    <>
                        <motion.div
                            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedIssueId(null)}
                        />

                        <motion.div
                            className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl overflow-y-auto border-l border-white/10 bg-neutral-950 p-8 shadow-2xl"
                            initial={{ x: '100%', opacity: 0.6 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: '100%', opacity: 0.6 }}
                            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
                                        Jira issue
                                    </p>
                                    <h3 className="mt-3 text-3xl font-semibold text-white">
                                        {selectedIssue.id}
                                    </h3>
                                    <p className="mt-2 text-lg text-neutral-300">
                                        {selectedIssue.title}
                                    </p>
                                </div>

                                <button
                                    onClick={() => setSelectedIssueId(null)}
                                    className="rounded-full border border-white/10 px-4 py-2 text-sm text-neutral-300 transition hover:border-white/20 hover:text-white"
                                >
                                    Close
                                </button>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-3">
                <span
                    className={`rounded-full border px-3 py-1 text-xs font-medium ${priorityClasses(
                        selectedIssue.priority
                    )}`}
                >
                  {selectedIssue.priority}
                </span>

                                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-200">
                  {selectedIssue.status}
                </span>

                                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-200">
                  Owner: {selectedIssue.owner}
                </span>
                            </div>

                            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
                                <p className="text-sm uppercase tracking-[0.2em] text-neutral-300">
                                    Description
                                </p>
                                <p className="mt-4 text-base leading-8 text-neutral-400">
                                    {selectedIssue.description}
                                </p>
                            </div>

                            <div className="mt-6 grid gap-6 lg:grid-cols-2">
                                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                                    <p className="text-sm uppercase tracking-[0.2em] text-neutral-300">
                                        Acceptance criteria
                                    </p>
                                    <ul className="mt-4 space-y-3 text-sm leading-7 text-neutral-400">
                                        {selectedIssue.acceptanceCriteria.map((item) => (
                                            <li key={item}>• {item}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                                    <p className="text-sm uppercase tracking-[0.2em] text-neutral-300">
                                        Dependencies
                                    </p>
                                    <ul className="mt-4 space-y-3 text-sm leading-7 text-neutral-400">
                                        {selectedIssue.dependencies.map((item) => (
                                            <li key={item}>• {item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-6 rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">
                                <p className="text-sm uppercase tracking-[0.2em] text-amber-200">
                                    Risks
                                </p>
                                <ul className="mt-4 space-y-3 text-sm leading-7 text-amber-50">
                                    {selectedIssue.risks.map((item) => (
                                        <li key={item}>• {item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-6 rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-6">
                                <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">
                                    Success metric
                                </p>
                                <p className="mt-4 text-lg font-medium text-cyan-50">
                                    {selectedIssue.successMetric}
                                </p>
                            </div>
                        </motion.div>
                    </>
                ) : null}
            </AnimatePresence>
        </>
    );
}
