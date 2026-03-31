'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';

type Issue = {
    id: string;
    summary: string;
    assignee: string;
    reporter: string;
    priority: string;
    status: string;
    created: string;
    updated: string;
    dueDate: string;
    epic: string;
    storyPoints: number;
    description: string;
    acceptanceCriteria: string[];
    dependencies: string[];
    risks: string[];
    successMetric: string;
};

type WorkspaceProps = {
    projectName: string;
    projectCode: string;
    sprintName: string;
    leftNav: string[];
    tabs: string[];
    filters: string[];
    issues: Issue[];
};

type ViewMode =
    | 'overview'
    | 'roadmap'
    | 'backlog'
    | 'board'
    | 'architecture'
    | 'observability'
    | 'launch'
    | 'summary'
    | 'list'
    | 'timeline';

function priorityClass(priority: string) {
    switch (priority) {
        case 'Highest':
            return 'bg-rose-500/10 text-rose-200 border border-rose-400/20';
        case 'High':
            return 'bg-amber-500/10 text-amber-200 border border-amber-400/20';
        default:
            return 'bg-white/5 text-neutral-200 border border-white/10';
    }
}

function statusClass(status: string) {
    switch (status) {
        case 'Done':
            return 'bg-emerald-500/15 text-emerald-200 border border-emerald-400/20';
        case 'In Progress':
            return 'bg-blue-500/15 text-blue-200 border border-blue-400/20';
        case 'Selected for Development':
            return 'bg-violet-500/15 text-violet-200 border border-violet-400/20';
        default:
            return 'bg-white/5 text-neutral-200 border border-white/10';
    }
}

function mapLeftNavToView(item: string): ViewMode {
    switch (item.toLowerCase()) {
        case 'overview':
            return 'overview';
        case 'roadmap':
            return 'roadmap';
        case 'backlog':
            return 'backlog';
        case 'board':
            return 'board';
        case 'architecture':
            return 'architecture';
        case 'observability':
            return 'observability';
        case 'launch':
            return 'launch';
        default:
            return 'overview';
    }
}

function mapTabToView(tab: string): ViewMode {
    switch (tab.toLowerCase()) {
        case 'summary':
            return 'summary';
        case 'board':
            return 'board';
        case 'list':
            return 'list';
        case 'timeline':
            return 'timeline';
        case 'architecture':
            return 'architecture';
        default:
            return 'summary';
    }
}

function IssueDrawer({
                         issue,
                         onClose,
                     }: {
    issue: Issue | null;
    onClose: () => void;
}) {
    return (
        <AnimatePresence>
            {issue ? (
                <>
                    <motion.div
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    <motion.div
                        className="fixed inset-y-0 right-0 z-50 w-full max-w-3xl overflow-y-auto border-l border-white/10 bg-[#11151c] p-8 shadow-2xl"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
                                    Issue detail
                                </p>
                                <h3 className="mt-3 text-3xl font-semibold text-white">
                                    {issue.id}
                                </h3>
                                <p className="mt-2 text-lg text-neutral-300">{issue.summary}</p>
                            </div>

                            <button
                                onClick={onClose}
                                className="rounded-lg border border-white/10 px-4 py-2 text-sm text-neutral-300 transition hover:border-white/20 hover:text-white"
                            >
                                Close
                            </button>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
              <span
                  className={`rounded-md px-3 py-1 text-xs font-medium ${priorityClass(
                      issue.priority
                  )}`}
              >
                {issue.priority}
              </span>
                            <span
                                className={`rounded-md px-3 py-1 text-xs font-medium ${statusClass(
                                    issue.status
                                )}`}
                            >
                {issue.status}
              </span>
                            <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-200">
                Epic: {issue.epic}
              </span>
                            <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-200">
                Story points: {issue.storyPoints}
              </span>
                        </div>

                        <div className="mt-8 grid gap-4 md:grid-cols-2">
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                                    Assignee
                                </p>
                                <p className="mt-2 text-base text-white">{issue.assignee}</p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                                    Reporter
                                </p>
                                <p className="mt-2 text-base text-white">{issue.reporter}</p>
                            </div>
                        </div>

                        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
                            <p className="text-sm uppercase tracking-[0.2em] text-neutral-300">
                                Description
                            </p>
                            <p className="mt-4 text-base leading-8 text-neutral-400">
                                {issue.description}
                            </p>
                        </div>

                        <div className="mt-6 grid gap-6 lg:grid-cols-2">
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                                <p className="text-sm uppercase tracking-[0.2em] text-neutral-300">
                                    Acceptance criteria
                                </p>
                                <ul className="mt-4 space-y-3 text-sm leading-7 text-neutral-400">
                                    {issue.acceptanceCriteria.map((item) => (
                                        <li key={item}>• {item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                                <p className="text-sm uppercase tracking-[0.2em] text-neutral-300">
                                    Dependencies
                                </p>
                                <ul className="mt-4 space-y-3 text-sm leading-7 text-neutral-400">
                                    {issue.dependencies.map((item) => (
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
                                {issue.risks.map((item) => (
                                    <li key={item}>• {item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-6 rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-6">
                            <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">
                                Success metric
                            </p>
                            <p className="mt-4 text-lg font-medium text-cyan-50">
                                {issue.successMetric}
                            </p>
                        </div>
                    </motion.div>
                </>
            ) : null}
        </AnimatePresence>
    );
}

function TableView({
                       issues,
                       onSelect,
                   }: {
    issues: Issue[];
    onSelect: (issue: Issue) => void;
}) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-[1200px] w-full border-collapse text-sm">
                <thead className="bg-[#1b2029] text-left text-neutral-400">
                <tr className="border-b border-white/10">
                    <th className="px-4 py-3 font-medium">Key</th>
                    <th className="px-4 py-3 font-medium">Summary</th>
                    <th className="px-4 py-3 font-medium">Assignee</th>
                    <th className="px-4 py-3 font-medium">Reporter</th>
                    <th className="px-4 py-3 font-medium">Priority</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Epic</th>
                    <th className="px-4 py-3 font-medium">Created</th>
                    <th className="px-4 py-3 font-medium">Updated</th>
                    <th className="px-4 py-3 font-medium">Due date</th>
                </tr>
                </thead>

                <tbody>
                {issues.map((issue) => (
                    <tr
                        key={issue.id}
                        onClick={() => onSelect(issue)}
                        className="cursor-pointer border-b border-white/5 transition hover:bg-white/[0.03]"
                    >
                        <td className="px-4 py-3 text-blue-300">{issue.id}</td>
                        <td className="px-4 py-3 text-neutral-100">{issue.summary}</td>
                        <td className="px-4 py-3 text-neutral-300">{issue.assignee}</td>
                        <td className="px-4 py-3 text-neutral-300">{issue.reporter}</td>
                        <td className="px-4 py-3">
                <span
                    className={`inline-flex rounded-md px-2 py-1 text-xs font-medium ${priorityClass(
                        issue.priority
                    )}`}
                >
                  {issue.priority}
                </span>
                        </td>
                        <td className="px-4 py-3">
                <span
                    className={`inline-flex rounded-md px-2 py-1 text-xs font-medium ${statusClass(
                        issue.status
                    )}`}
                >
                  {issue.status}
                </span>
                        </td>
                        <td className="px-4 py-3 text-neutral-300">{issue.epic}</td>
                        <td className="px-4 py-3 text-neutral-400">{issue.created}</td>
                        <td className="px-4 py-3 text-neutral-400">{issue.updated}</td>
                        <td className="px-4 py-3 text-neutral-400">{issue.dueDate}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

function BoardView({
                       issues,
                       onSelect,
                   }: {
    issues: Issue[];
    onSelect: (issue: Issue) => void;
}) {
    const columns = [
        'Backlog',
        'Selected for Development',
        'In Progress',
        'Done',
    ];

    return (
        <div className="grid gap-6 xl:grid-cols-4">
            {columns.map((column) => {
                const columnIssues = issues.filter((issue) => issue.status === column);

                return (
                    <div
                        key={column}
                        className="rounded-3xl border border-white/10 bg-white/5 p-4"
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-sm font-medium uppercase tracking-[0.25em] text-neutral-300">
                                {column}
                            </h3>
                            <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-neutral-400">
                {columnIssues.length}
              </span>
                        </div>

                        <div className="space-y-4">
                            {columnIssues.map((issue) => (
                                <button
                                    key={issue.id}
                                    onClick={() => onSelect(issue)}
                                    className="w-full rounded-2xl border border-white/10 bg-neutral-900 p-4 text-left transition hover:border-cyan-400/30 hover:bg-neutral-900/80"
                                >
                                    <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                                        {issue.id}
                                    </p>
                                    <h4 className="mt-2 text-base font-medium text-white">
                                        {issue.summary}
                                    </h4>
                                    <p className="mt-3 text-sm text-neutral-400">
                                        {issue.assignee} · {issue.epic}
                                    </p>
                                    <div className="mt-4 flex items-center justify-between">
                    <span
                        className={`rounded-md px-2 py-1 text-xs font-medium ${priorityClass(
                            issue.priority
                        )}`}
                    >
                      {issue.priority}
                    </span>
                                        <span className="text-xs text-neutral-500">
                      SP {issue.storyPoints}
                    </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function SummaryView({ issues }: { issues: Issue[] }) {
    const total = issues.length;
    const inProgress = issues.filter((i) => i.status === 'In Progress').length;
    const backlog = issues.filter((i) => i.status === 'Backlog').length;
    const done = issues.filter((i) => i.status === 'Done').length;

    return (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
                { label: 'Total issues', value: total },
                { label: 'In progress', value: inProgress },
                { label: 'Backlog', value: backlog },
                { label: 'Done', value: done },
            ].map((card) => (
                <div
                    key={card.label}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6"
                >
                    <p className="text-sm uppercase tracking-[0.2em] text-neutral-400">
                        {card.label}
                    </p>
                    <p className="mt-4 text-4xl font-semibold text-white">{card.value}</p>
                </div>
            ))}
        </div>
    );
}

function TimelineView({
                          issues,
                          onSelect,
                      }: {
    issues: Issue[];
    onSelect: (issue: Issue) => void;
}) {
    return (
        <div className="space-y-4">
            {issues.map((issue) => (
                <button
                    key={issue.id}
                    onClick={() => onSelect(issue)}
                    className="flex w-full items-start justify-between rounded-3xl border border-white/10 bg-white/5 p-6 text-left transition hover:border-white/20 hover:bg-white/[0.07]"
                >
                    <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                            {issue.id}
                        </p>
                        <h4 className="mt-2 text-lg font-medium text-white">
                            {issue.summary}
                        </h4>
                        <p className="mt-3 text-sm text-neutral-400">{issue.epic}</p>
                    </div>

                    <div className="text-right">
                        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                            Due date
                        </p>
                        <p className="mt-2 text-sm text-white">{issue.dueDate}</p>
                    </div>
                </button>
            ))}
        </div>
    );
}

function ArchitectureWorkspaceView({ issues }: { issues: Issue[] }) {
    const epics = [...new Set(issues.map((issue) => issue.epic))];

    return (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {epics.map((epic) => {
                const epicIssues = issues.filter((issue) => issue.epic === epic);

                return (
                    <div
                        key={epic}
                        className="rounded-3xl border border-white/10 bg-white/5 p-6"
                    >
                        <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
                            Workstream
                        </p>
                        <h3 className="mt-3 text-2xl font-semibold text-white">{epic}</h3>
                        <p className="mt-3 text-sm leading-7 text-neutral-400">
                            {epicIssues.length} linked issues in this product area.
                        </p>

                        <div className="mt-5 space-y-3">
                            {epicIssues.map((issue) => (
                                <div
                                    key={issue.id}
                                    className="rounded-2xl border border-white/10 bg-neutral-900/70 p-4"
                                >
                                    <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                                        {issue.id}
                                    </p>
                                    <p className="mt-2 text-sm text-white">{issue.summary}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function ObservabilityView({ issues }: { issues: Issue[] }) {
    const highestPriority = issues.filter((i) => i.priority === 'Highest').length;
    const evalRelated = issues.filter((i) =>
        i.epic.toLowerCase().includes('evaluation')
    ).length;
    const debuggingRelated = issues.filter((i) =>
        i.epic.toLowerCase().includes('debug')
    ).length;

    return (
        <div className="grid gap-6 xl:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-neutral-400">
                    Highest-priority issues
                </p>
                <p className="mt-4 text-4xl font-semibold text-white">
                    {highestPriority}
                </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-neutral-400">
                    Evaluation-related work
                </p>
                <p className="mt-4 text-4xl font-semibold text-white">{evalRelated}</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-neutral-400">
                    Debugging-related work
                </p>
                <p className="mt-4 text-4xl font-semibold text-white">
                    {debuggingRelated}
                </p>
            </div>
        </div>
    );
}

function LaunchView({ issues }: { issues: Issue[] }) {
    const doneCount = issues.filter((i) => i.status === 'Done').length;
    const total = issues.length;
    const readiness = Math.round((doneCount / total) * 100);

    return (
        <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
            <div className="rounded-3xl border border-white/10 bg-cyan-400/10 p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">
                    Launch readiness
                </p>
                <p className="mt-4 text-5xl font-semibold text-white">{readiness}%</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-neutral-300">
                    Launch checklist
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-neutral-400">
                    <li>• Shared instrumentation path is available</li>
                    <li>• Critical privacy-safe logging defaults are defined</li>
                    <li>• Initial trace explorer is usable for debugging</li>
                    <li>• Evaluation framework is ready for regression workflows</li>
                    <li>• High-risk issues have mitigation owners</li>
                </ul>
            </div>
        </div>
    );
}

export function JiraWorkspace({
                                  projectName,
                                  projectCode,
                                  sprintName,
                                  leftNav,
                                  tabs,
                                  filters,
                                  issues,
                              }: WorkspaceProps) {
    const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
    const [activeLeftNav, setActiveLeftNav] = useState<string>('Roadmap');
    const [activeTab, setActiveTab] = useState<string>('List');
    const [search, setSearch] = useState('');

    const filteredIssues = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return issues;
        return issues.filter(
            (issue) =>
                issue.id.toLowerCase().includes(q) ||
                issue.summary.toLowerCase().includes(q) ||
                issue.epic.toLowerCase().includes(q) ||
                issue.status.toLowerCase().includes(q)
        );
    }, [issues, search]);

    const activeView = useMemo<ViewMode>(() => {
        if (activeLeftNav === 'Roadmap') return mapTabToView(activeTab);
        return mapLeftNavToView(activeLeftNav);
    }, [activeLeftNav, activeTab]);

    const backlogIssues = filteredIssues.filter((issue) => issue.status !== 'Done');

    return (
        <>
            <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#161a22] shadow-2xl shadow-black/30">
                <div className="grid min-h-[860px] lg:grid-cols-[260px_minmax(0,1fr)]">
                    <aside className="border-r border-white/10 bg-[#11151c]">
                        <div className="border-b border-white/10 px-5 py-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/20 text-sm font-semibold text-blue-200">
                                    {projectCode}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white">{projectName}</p>
                                    <p className="text-xs text-neutral-400">Workspace</p>
                                </div>
                            </div>
                        </div>

                        <div className="px-3 py-4">
                            <p className="px-3 pb-2 text-xs uppercase tracking-[0.2em] text-neutral-500">
                                Navigation
                            </p>
                            <div className="space-y-1">
                                {leftNav.map((item) => (
                                    <button
                                        key={item}
                                        onClick={() => setActiveLeftNav(item)}
                                        className={`w-full rounded-xl px-3 py-2 text-left text-sm transition ${
                                            activeLeftNav === item
                                                ? 'bg-blue-500/15 text-blue-200'
                                                : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                                        }`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    <section className="min-w-0">
                        <div className="border-b border-white/10 bg-[#171b23] px-6 py-4">
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
                                            Project
                                        </p>
                                        <h2 className="mt-2 text-2xl font-semibold text-white">
                                            {projectName}
                                        </h2>
                                    </div>

                                    <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500">
                                        + Create
                                    </button>
                                </div>

                                <div className="flex flex-wrap items-center gap-2">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => {
                                                setActiveLeftNav('Roadmap');
                                                setActiveTab(tab);
                                            }}
                                            className={`rounded-lg px-3 py-2 text-sm transition ${
                                                activeLeftNav === 'Roadmap' && activeTab === tab
                                                    ? 'bg-white text-black'
                                                    : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                                            }`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                                    <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-neutral-300">
                      {sprintName}
                    </span>
                                        {filters.map((filter) => (
                                            <span
                                                key={filter}
                                                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-neutral-300"
                                            >
                        {filter}
                      </span>
                                        ))}
                                    </div>

                                    <input
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search work"
                                        className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none placeholder:text-neutral-500 xl:max-w-xs"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            {activeView === 'summary' || activeView === 'overview' ? (
                                <SummaryView issues={filteredIssues} />
                            ) : null}

                            {activeView === 'list' ? (
                                <TableView issues={filteredIssues} onSelect={setSelectedIssue} />
                            ) : null}

                            {activeView === 'backlog' ? (
                                <TableView issues={backlogIssues} onSelect={setSelectedIssue} />
                            ) : null}

                            {activeView === 'board' ? (
                                <BoardView issues={filteredIssues} onSelect={setSelectedIssue} />
                            ) : null}

                            {activeView === 'timeline' || activeView === 'roadmap' ? (
                                <TimelineView issues={filteredIssues} onSelect={setSelectedIssue} />
                            ) : null}

                            {activeView === 'architecture' ? (
                                <ArchitectureWorkspaceView issues={filteredIssues} />
                            ) : null}

                            {activeView === 'observability' ? (
                                <ObservabilityView issues={filteredIssues} />
                            ) : null}

                            {activeView === 'launch' ? (
                                <LaunchView issues={filteredIssues} />
                            ) : null}
                        </div>
                    </section>
                </div>
            </div>

            <IssueDrawer issue={selectedIssue} onClose={() => setSelectedIssue(null)} />
        </>
    );
}