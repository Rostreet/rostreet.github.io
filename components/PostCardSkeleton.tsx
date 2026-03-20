export default function PostCardSkeleton() {
  return (
    <div className="block rounded-xl border border-border/40 bg-card animate-pulse">
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-5 w-16 rounded bg-muted/50"></div>
          <div className="h-5 w-24 rounded bg-muted/50"></div>
          <div className="h-5 w-20 rounded bg-muted/50"></div>
        </div>
        <div className="h-6 w-3/4 rounded bg-muted/30"></div>
        <div className="h-4 w-full rounded bg-muted/20"></div>
        <div className="h-4 w-2/3 rounded bg-muted/20"></div>
      </div>
    </div>
  );
}
