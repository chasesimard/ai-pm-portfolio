'use client';

import { useState } from 'react';

type Stakeholder = {
    id: string;
    name: string;
    role: string;
    goals: string[];
    painPoints: string[];
    needs: string;
};

type StakeholderExplorerProps = {
    stakeholders: Stakeholder[];
};

export function StakeholderExplorer({
                                        stakeholders,
                                    }: StakeholderExplorerProps) {
    const [activeId, setActiveId] = useState(stakeholders[0]?.id);
    const activeStakeholder = stakeholders.find((s) => s.id === activeId);

    return (
        <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-3">
                <div className="space-y-2">
                    {stakeholders.map((stakeholder) => {
                        const isActive = stakeholder.id === activeId;

                        return (
                            <button
                                key={stakeholder.id}
                                onClick={() => setActiveId(stakeholder.id)}
                                className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                                    isActive
                                        ? 'border-cyan-400/40 bg-cyan-400/10'
                                        : 'border-transparent bg-white/0 hover:border-white/10 hover:bg-white/5'
                                }`}
                            >
                                <p className="text-base font-medium text-white">
                                    {stakeholder.name}
                                </p>
                                <p className="mt-1 text-sm leading-6 text-neutral-400">
                                    {stakeholder.role}
                                </p>
                            </button>
                        );
                    })}
                </div>
            </div>

            {activeStakeholder ? (
                <div className="rounded-3xl border border-white/10 bg-neutral-900/70 p-8">
                    <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
                        Selected stakeholder
                    </p>
                    <h3 className="mt-4 text-3xl font-semibold text-white">
                        {activeStakeholder.name}
                    </h3>
                    <p className="mt-3 max-w-2xl text-lg leading-8 text-neutral-400">
                        {activeStakeholder.role}
                    </p>

                    <div className="mt-8 grid gap-6 xl:grid-cols-2">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                            <p className="text-sm uppercase tracking-[0.2em] text-neutral-300">
                                Goals
                            </p>
                            <ul className="mt-4 space-y-3 text-sm leading-7 text-neutral-400">
                                {activeStakeholder.goals.map((goal) => (
                                    <li key={goal}>• {goal}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                            <p className="text-sm uppercase tracking-[0.2em] text-neutral-300">
                                Pain points
                            </p>
                            <ul className="mt-4 space-y-3 text-sm leading-7 text-neutral-400">
                                {activeStakeholder.painPoints.map((pain) => (
                                    <li key={pain}>• {pain}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-6">
                        <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">
                            What they need from the platform
                        </p>
                        <p className="mt-4 text-base leading-8 text-cyan-50">
                            {activeStakeholder.needs}
                        </p>
                    </div>
                </div>
            ) : null}
        </div>
    );
}