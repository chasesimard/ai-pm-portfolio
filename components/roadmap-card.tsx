type RoadmapCardProps = {
    phase: string;
    title: string;
    goal: string;
    deliverables: string[];
    risk: string;
};

export function RoadmapCard({
                                phase,
                                title,
                                goal,
                                deliverables,
                                risk,
                            }: RoadmapCardProps) {
    return (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">{phase}</p>
            <h3 className="mt-4 text-2xl font-semibold text-white">{title}</h3>
            <p className="mt-4 text-sm leading-7 text-neutral-400">{goal}</p>

            <div className="mt-6">
                <p className="text-sm uppercase tracking-[0.2em] text-neutral-300">
                    Deliverables
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-neutral-400">
                    {deliverables.map((item) => (
                        <li key={item}>• {item}</li>
                    ))}
                </ul>
            </div>

            <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-amber-200">Key risk</p>
                <p className="mt-2 text-sm leading-7 text-amber-50">{risk}</p>
            </div>
        </div>
    );
}