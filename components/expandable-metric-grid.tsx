'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Card = {
    id: string;
    label: string;
    value: string;
    detail: string;
    modalTitle: string;
    modalBody: string;
};

type ExpandableMetricGridProps = {
    cards: Card[];
};

export function ExpandableMetricGrid({
                                         cards,
                                     }: ExpandableMetricGridProps) {
    const [activeCardId, setActiveCardId] = useState<string | null>(null);

    const activeCard = cards.find((card) => card.id === activeCardId) ?? null;
    const [leadCard, ...secondaryCards] = cards;

    return (
        <>
            <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
                {leadCard ? (
                    <button
                        onClick={() => setActiveCardId(leadCard.id)}
                        className="rounded-[28px] border border-white/10 bg-white/5 p-8 text-left transition hover:border-white/20 hover:bg-white/[0.07]"
                    >
                        <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
                            Lead signal
                        </p>

                        <div className="mt-6 flex items-end justify-between gap-6">
                            <div>
                                <p className="text-6xl font-semibold tracking-tight text-white">
                                    {leadCard.value}
                                </p>
                                <h3 className="mt-4 max-w-md text-2xl font-semibold text-white">
                                    {leadCard.label}
                                </h3>
                            </div>

                            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-neutral-300">
                Click to expand
              </span>
                        </div>

                        <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-400">
                            {leadCard.detail}
                        </p>

                        <div className="mt-8 rounded-2xl border border-cyan-400/15 bg-cyan-400/10 p-5">
                            <p className="text-sm leading-7 text-cyan-50">
                                This is the strongest signal that the organization is already operating at a scale where ad hoc AI debugging and evaluation workflows no longer hold.
                            </p>
                        </div>
                    </button>
                ) : null}

                <div className="grid gap-6">
                    {secondaryCards.map((card) => (
                        <button
                            key={card.id}
                            onClick={() => setActiveCardId(card.id)}
                            className="rounded-[28px] border border-white/10 bg-white/5 p-6 text-left transition hover:border-white/20 hover:bg-white/[0.07]"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-4xl font-semibold tracking-tight text-white">
                                        {card.value}
                                    </p>
                                    <h3 className="mt-3 text-lg font-semibold text-white">
                                        {card.label}
                                    </h3>
                                </div>

                                <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-neutral-300">
                  Expand
                </span>
                            </div>

                            <p className="mt-4 text-sm leading-7 text-neutral-400">
                                {card.detail}
                            </p>
                        </button>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {activeCard ? (
                    <>
                        <motion.div
                            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveCardId(null)}
                        />

                        <motion.div
                            className="fixed inset-0 z-50 flex items-center justify-center p-6"
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-[#11151c] p-8 shadow-2xl">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
                                            Why it matters
                                        </p>
                                        <h3 className="mt-4 text-3xl font-semibold text-white">
                                            {activeCard.modalTitle}
                                        </h3>
                                    </div>

                                    <button
                                        onClick={() => setActiveCardId(null)}
                                        className="rounded-full border border-white/10 px-4 py-2 text-sm text-neutral-300 transition hover:border-white/20 hover:text-white"
                                    >
                                        Close
                                    </button>
                                </div>

                                <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
                                    <p className="text-sm uppercase tracking-[0.2em] text-neutral-300">
                                        Context
                                    </p>
                                    <p className="mt-4 text-base leading-8 text-neutral-400">
                                        {activeCard.modalBody}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                ) : null}
            </AnimatePresence>
        </>
    );
}