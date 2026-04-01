'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Slide = {
    id: string;
    eyebrow: string;
    title: string;
    text: string;
    bullets: string[];
};

type DetailSliderProps = {
    slides: Slide[];
};

export function DetailSlider({ slides }: DetailSliderProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeSlide = slides[activeIndex];

    const canGoBack = activeIndex > 0;
    const canGoForward = activeIndex < slides.length - 1;

    return (
        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
                    Slides
                </p>

                <div className="mt-4 space-y-2">
                    {slides.map((slide, index) => {
                        const isActive = index === activeIndex;

                        return (
                            <button
                                key={slide.id}
                                onClick={() => setActiveIndex(index)}
                                className={`w-full rounded-2xl px-4 py-4 text-left transition ${
                                    isActive
                                        ? 'bg-cyan-400/10 text-cyan-200'
                                        : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                                <p className="text-xs uppercase tracking-[0.2em]">
                                    {slide.eyebrow}
                                </p>
                                <p className="mt-2 text-sm font-medium">{slide.title}</p>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSlide.id}
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -18 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
                            {activeSlide.eyebrow}
                        </p>

                        <h3 className="mt-4 text-3xl font-semibold text-white">
                            {activeSlide.title}
                        </h3>

                        <p className="mt-6 max-w-3xl text-base leading-8 text-neutral-400">
                            {activeSlide.text}
                        </p>

                        <div className="mt-8 rounded-2xl border border-white/10 bg-neutral-900/70 p-6">
                            <p className="text-sm uppercase tracking-[0.2em] text-neutral-300">
                                Key points
                            </p>

                            <ul className="mt-4 space-y-3 text-sm leading-7 text-neutral-400">
                                {activeSlide.bullets.map((bullet) => (
                                    <li key={bullet}>• {bullet}</li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div className="mt-8 flex items-center justify-between">
                    <button
                        onClick={() => canGoBack && setActiveIndex((prev) => prev - 1)}
                        disabled={!canGoBack}
                        className={`rounded-full px-5 py-3 text-sm font-medium transition ${
                            canGoBack
                                ? 'border border-white/15 text-white hover:border-white/30 hover:bg-white/5'
                                : 'cursor-not-allowed border border-white/5 text-neutral-600'
                        }`}
                    >
                        Previous
                    </button>

                    <div className="text-sm text-neutral-500">
                        Slide {activeIndex + 1} of {slides.length}
                    </div>

                    <button
                        onClick={() => canGoForward && setActiveIndex((prev) => prev + 1)}
                        disabled={!canGoForward}
                        className={`rounded-full px-5 py-3 text-sm font-medium transition ${
                            canGoForward
                                ? 'bg-white text-black hover:bg-neutral-200'
                                : 'cursor-not-allowed bg-white/10 text-neutral-500'
                        }`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}