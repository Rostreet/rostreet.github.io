import BlogFeed from "@/components/BlogFeed";

export default function PostsPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 md:py-16">
      <div className="mx-auto max-w-4xl">
        <header className="animate-fade-in">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            Posts
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">
            Posts
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground">
            所有文章与笔记的归档列表。
          </p>
        </header>

        <BlogFeed className="mt-14" />
      </div>
    </div>
  );
}
