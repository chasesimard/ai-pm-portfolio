type MetricCardProps = {
    value: string;
    label: string;
    detail: string;
};

export function MetricCard({ value, label, detail }: MetricCardProps) {
    return (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-3xl font-semibold text-white">{value}</p>
            <h3 className="mt-4 text-sm font-medium uppercase tracking-[0.2em] text-neutral-300">
                {label}
            </h3>
            <p className="mt-3 text-sm leading-7 text-neutral-400">{detail}</p>
        </div>
    );
}