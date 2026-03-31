type ProblemCardProps = {
    title: string;
    body: string;
};

export function ProblemCard({ title, body }: ProblemCardProps) {
    return (
        <div className="rounded-3xl border border-white/10 bg-neutral-900/70 p-6 transition hover:border-white/20 hover:bg-neutral-900">
            <h3 className="text-xl font-medium text-white">{title}</h3>
            <p className="mt-4 text-sm leading-7 text-neutral-400">{body}</p>
        </div>
    );
}