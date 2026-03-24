export default function PostCardSkeleton() {
	return (
		<div className="animate-pulse border-b border-border/40 py-8">
			<div className="space-y-4">
				<div className="flex items-center gap-3">
					<div className="h-4 w-14 rounded-full bg-muted/60" />
					<div className="h-4 w-24 rounded-full bg-muted/50" />
					<div className="h-4 w-16 rounded-full bg-muted/40" />
				</div>
				<div className="h-8 w-2/3 rounded bg-muted/40" />
				<div className="h-4 w-full rounded bg-muted/30" />
				<div className="h-4 w-4/5 rounded bg-muted/25" />
			</div>
		</div>
	);
}
