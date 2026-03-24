import {
  ArrowUpRight,
  BookOpenText,
  Code2,
  GitFork,
  Github,
  Globe,
  Rocket,
  Sparkles,
  Wrench,
} from "lucide-react";
import type { ComponentType } from "react";
import Link from "next/link";
import {
  getProjects,
  getProjectsRepositoryUrl,
  projectSections,
  type Project,
  type ProjectSectionId,
} from "@/lib/projects";

const sectionIcons: Record<
  ProjectSectionId,
  ComponentType<{ className?: string }>
> = {
  apps: Rocket,
  tooling: Wrench,
  experiments: Code2,
  templates: BookOpenText,
  participation: GitFork,
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
}

function ProjectActions({ project }: { project: Project }) {
  const previewUrl =
    project.homepage && project.homepage !== project.html_url
      ? project.homepage
      : null;

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
      <a
        href={project.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
      >
        <Github className="h-4 w-4" />
        Repo
      </a>
      {previewUrl ? (
        <a
          href={previewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <Globe className="h-4 w-4" />
          Live
        </a>
      ) : null}
    </div>
  );
}

function ProjectMeta({ project }: { project: Project }) {
  const parts = [
    project.language,
    project.stargazers_count > 0 ? `${project.stargazers_count} stars` : null,
    ...project.topics.slice(0, 2),
  ].filter(Boolean);

  if (parts.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
      {parts.map((part) => (
        <span key={part}>{part}</span>
      ))}
    </div>
  );
}

function ProjectRow({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  return (
    <article className="border-b border-border/40 py-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={`font-semibold tracking-tight ${
                featured ? "text-2xl sm:text-[1.9rem]" : "text-xl"
              }`}
            >
              {project.name}
            </h3>
            {project.featured ? (
              <span className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5" />
                Focus
              </span>
            ) : null}
            {project.fork ? (
              <span className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <GitFork className="h-3.5 w-3.5" />
                Fork
              </span>
            ) : null}
          </div>

          <p
            className={`mt-3 leading-7 text-muted-foreground ${
              featured ? "text-[15px]" : "text-sm"
            }`}
          >
            {project.summary}
          </p>
          <ProjectMeta project={project} />
        </div>

        <div className="shrink-0 space-y-4 text-sm lg:text-right">
          <p className="text-muted-foreground">
            最近更新于 {formatDate(project.updated_at)}
          </p>
          <ProjectActions project={project} />
        </div>
      </div>
    </article>
  );
}

export default async function ProjectsPage() {
  const { projects, source } = await getProjects();
  const repositoriesUrl = getProjectsRepositoryUrl();
  const featuredProjects = projects
    .filter((project) => project.featured)
    .sort((a, b) => a.featuredRank - b.featuredRank);
  const projectGroups = projectSections.map((section) => ({
    ...section,
    projects: projects.filter(
      (project) => project.section === section.id && !project.featured,
    ),
  }));
  const independentProjects = projects.filter(
    (project) => !project.fork,
  ).length;
  const stackCount = new Set(
    projects
      .map((project) => project.language)
      .filter((language): language is string => Boolean(language)),
  ).size;

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8 md:py-12">
      <div className="mx-auto max-w-5xl">
        <header className="animate-fade-in">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            Projects
          </p>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-muted-foreground">
            这里收录了我在 GitHub
            上的公开项目，按产品、工具、模板和底层实验做了整理。
          </p>

          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
            <span>{independentProjects} 个独立项目</span>
            <span>{stackCount} 种技术栈</span>
            <a
              href={repositoriesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-foreground"
            >
              GitHub Repositories
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 hover:text-foreground"
            >
              Blog
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </header>

        <nav className="section-divider mt-10 flex flex-wrap gap-x-6 gap-y-2 pt-4 text-sm animate-fade-in">
          <a href="#current-focus" className="font-medium text-foreground">
            Current Focus
          </a>
          {projectSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="text-muted-foreground hover:text-foreground"
            >
              {section.title}
            </a>
          ))}
        </nav>

        <section id="current-focus" className="mt-8 pt-5 animate-fade-in">
          <div className="mb-4 flex items-center gap-3">
            <Sparkles className="h-4 w-4 text-muted-foreground" />
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Current Focus
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                最近仍在持续投入，或者最能代表当前能力边界的一组项目。
              </p>
            </div>
          </div>

          <div>
            {featuredProjects.map((project) => (
              <ProjectRow key={project.name} project={project} featured />
            ))}
          </div>
        </section>

        {projectGroups.map((group) => {
          if (group.projects.length === 0) {
            return null;
          }

          const SectionIcon = sectionIcons[group.id];

          return (
            <section
              key={group.id}
              id={group.id}
              className="section-divider mt-12 pt-8 animate-fade-in"
            >
              <div className="mb-6 flex items-center gap-3">
                <SectionIcon className="h-4 w-4 text-muted-foreground" />
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">
                    {group.title}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {group.description}
                  </p>
                </div>
              </div>

              <div>
                {group.projects.map((project) => (
                  <ProjectRow key={project.name} project={project} />
                ))}
              </div>
            </section>
          );
        })}

        <footer className="section-divider mt-12 pt-6 text-sm text-muted-foreground">
          项目数据
          {source === "github" ? "在构建时从 GitHub 同步" : "使用本地快照回退"}
          ，完整仓库列表可在{" "}
          <a
            href={repositoriesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-4"
          >
            GitHub Repositories
          </a>
          中查看。
        </footer>
      </div>
    </div>
  );
}
