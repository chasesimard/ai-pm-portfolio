'use client';

import { useState } from 'react';

type ArchitectureBlock = {
    id: string;
    name: string;
    summary: string;
    details: string;
    owner: string;
    successMetric: string;
};

type ArchitectureExplorerProps = {
    blocks: ArchitectureBlock[];
};

export function ArchitectureExplorer({
                                         blocks,
                                     }: ArchitectureExplorerProps) {
    const [activeId, setActiveId] = useState(blocks[0]?.id);
    const activeBlock = blocks.find((block) => block.id === activeId);

    return (
        <div className="grid gap-6 lg:grid-cols-[420px_minmax(0,1fr)]">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {blocks.map((block) => {
                    const isActive = block.id === activeId;

                    return (
                        <button
                            key={block.id}
                            onClick={() => setActiveId(block.id)}
                            className={`rounded-3xl border p-5 text-left transition ${
                                isActive
                                    ? 'border-cyan-400/40 bg-cyan-400/10'
                                    : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]'
                            }`}
                        >
                            <p className="text-lg font-medium text-white">{block.name}</p>
                            <p className="mt-3 text-sm leading-7 text-neutral-400">
                                {block.summary}
                            </p>
                        </button>
                    );
                })}
            </div>

            {activeBlock ? (
                <div className="rounded-3xl border border-white/10 bg-neutral-900/70 p-8">
                    <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
                        Selected component
                    </p>

                    <h3 className="mt-4 text-3xl font-semibold text-white">
                        {activeBlock.name}
                    </h3>

                    <p className="mt-6 max-w-3xl text-base leading-8 text-neutral-400">
                        {activeBlock.details}
                    </p>

                    <div className="mt-8 grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                            <p className="text-xs uppercase tracking-[0.2em] text-neutral-300">
                                Primary owner
                            </p>
                            <p className="mt-3 text-lg font-medium text-white">
                                {activeBlock.owner}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                            <p className="text-xs uppercase tracking-[0.2em] text-neutral-300">
                                Key success metric
                            </p>
                            <p className="mt-3 text-lg font-medium text-white">
                                {activeBlock.successMetric}
                            </p>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}