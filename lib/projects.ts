export type GitHubProjectRepo = {
  name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  archived: boolean;
  topics: string[];
  updated_at: string;
};

export type ProjectSectionId =
  | "apps"
  | "tooling"
  | "experiments"
  | "templates"
  | "participation";

export type ProjectSection = {
  id: ProjectSectionId;
  title: string;
  description: string;
};

export type Project = GitHubProjectRepo & {
  summary: string;
  section: ProjectSectionId;
  featured: boolean;
  featuredRank: number;
  homepage: string | null;
};

type ProjectOverride = {
  summary?: string;
  section?: ProjectSectionId;
  featured?: boolean;
  featuredRank?: number;
  homepage?: string | null;
};

const GITHUB_REPOS_URL = "https://github.com/Rostreet?tab=repositories";
const GITHUB_API_URL =
  "https://api.github.com/users/Rostreet/repos?per_page=100&sort=updated";

export const projectSections: ProjectSection[] = [
  {
    id: "apps",
    title: "应用 / 网站",
    description: "更完整的产品、页面与业务场景项目。",
  },
  {
    id: "tooling",
    title: "UI / 工具",
    description: "组件库、CLI 与偏工程效率方向的工具实践。",
  },
  {
    id: "experiments",
    title: "框架 / 原理实验",
    description: "围绕 React、Vue 与前端底层机制的拆解和手写实现。",
  },
  {
    id: "templates",
    title: "模板 / 笔记",
    description: "模板仓库、配置沉淀和学习记录。",
  },
  {
    id: "participation",
    title: "参与 / Fork",
    description: "在社区项目基础上的参与、使用与实践。",
  },
];

const projectOverrides: Record<string, ProjectOverride> = {
  "rostreet.github.io": {
    featured: true,
    featuredRank: 1,
    section: "apps",
    homepage: null,
    summary:
      "当前这座博客与作品站，基于 Next.js 16、App Router 与静态导出构建。",
  },
  "NoteFlow": {
    featured: true,
    featuredRank: 2,
    section: "apps",
    summary:
      "面向记录与整理场景的笔记流产品原型，重点探索信息组织与写作体验。",
  },
  "IM-system": {
    featured: true,
    featuredRank: 3,
    section: "apps",
    summary:
      "用 Go 实现的即时通讯系统实验，关注聊天链路、消息传输与服务端组织。",
  },
  "Taichi-UI": {
    featured: true,
    featuredRank: 4,
    section: "tooling",
    summary:
      "面向 AI 场景的组件库与 playground，聚焦组件设计、可扩展性与交互体验。",
  },
  "Rostreet": {
    section: "templates",
    homepage: null,
    summary: "GitHub Profile 与个人配置仓库，用来维护对外形象与基础设置。",
  },
  "printsystem": {
    section: "apps",
    summary: "围绕打印业务流程的系统与页面实践。",
  },
  "Mini-react": {
    section: "experiments",
    summary:
      "用极少代码拆解 React 的基础能力，聚焦实现思路与最小功能闭环。",
  },
  "ShishanForum": {
    section: "apps",
    summary: "论坛社区方向的项目实践，关注信息流、交互与页面组织。",
  },
  "langchain-selflearn": {
    section: "experiments",
    summary:
      "围绕 LangChain 的自学与实验仓库，记录 Agent 与 LLM 应用实践。",
  },
  "Front-end-handwritten-issues": {
    section: "experiments",
    summary: "前端手写题与底层机制实现合集，覆盖常见高频原理问题。",
  },
  "my-fe-notes": {
    section: "templates",
    summary: "前端学习笔记与知识沉淀仓库。",
  },
  "MyVue": {
    section: "experiments",
    summary: "从零实现 Vue 核心响应式与渲染能力的实验仓库。",
  },
  "ElectronicProduct-display-website": {
    section: "apps",
    summary: "电子产品展示网站，聚焦营销信息编排与视觉呈现。",
  },
  "chz-cli": {
    section: "tooling",
    summary: "个人命令行工具集合，用来沉淀高频开发辅助能力。",
  },
  "react-template": {
    section: "templates",
    summary: "面向 React + TypeScript 项目的起手模板，减少重复工程配置。",
  },
  "zhaich.me": {
    section: "apps",
    summary: "上一版个人博客，整体表达和结构受 Anthony Fu 风格启发。",
  },
  "Cloud-Music": {
    section: "apps",
  },
  "tsreact_template": {
    section: "templates",
    summary: "TypeScript React 模板仓库，用于快速启动实验项目。",
  },
  "ShiShanClub": {
    section: "apps",
    summary: "社团 / 社区场景的全栈项目实践。",
  },
  "Core-Cloud": {
    section: "apps",
  },
  "gitOperations": {
    section: "templates",
    summary: "用于验证 Git 操作流程的实验仓库。",
  },
  "mini-vue": {
    section: "experiments",
    summary: "受 mini-vue 启发的源码实现练习，持续理解 Vue 运行机制。",
  },
  "vue3_template": {
    section: "templates",
    summary: "Vue 3 工程模板，作为常用项目脚手架基础。",
  },
  "music-project": {
    section: "apps",
    summary: "音乐类产品界面与功能交互练习项目。",
  },
  "meituan-zhaopin": {
    section: "apps",
  },
  "qqmusic-slide": {
    section: "apps",
  },
  "qqmusic": {
    section: "apps",
  },
  "neovate-code": {
    section: "participation",
    summary:
      "参与 AI code agent 相关项目实践，关注代码生成、修复与自动化开发体验。",
  },
  "Element-Plus-X": {
    section: "participation",
  },
};

const fallbackRepos: GitHubProjectRepo[] = [
  {
    name: "rostreet.github.io",
    html_url: "https://github.com/Rostreet/rostreet.github.io",
    description: null,
    homepage: null,
    language: "TypeScript",
    stargazers_count: 0,
    fork: false,
    archived: false,
    topics: [],
    updated_at: "2026-03-24T05:25:54Z",
  },
  {
    name: "Rostreet",
    html_url: "https://github.com/Rostreet/Rostreet",
    description: "Config files for my GitHub profile.",
    homepage: "https://github.com/Rostreet",
    language: null,
    stargazers_count: 0,
    fork: false,
    archived: false,
    topics: ["config", "github-config"],
    updated_at: "2026-02-12T10:40:07Z",
  },
  {
    name: "neovate-code",
    html_url: "https://github.com/Rostreet/neovate-code",
    description:
      "Neovate Code is a code agent to enhance your development. You can use it to generate code, fix bugs, review code, add tests, and more. You can run it in interactive mode or headless mode.",
    homepage: "https://neovateai.dev/",
    language: null,
    stargazers_count: 0,
    fork: true,
    archived: false,
    topics: [],
    updated_at: "2025-12-25T08:49:05Z",
  },
  {
    name: "IM-system",
    html_url: "https://github.com/Rostreet/IM-system",
    description: "easy go chat",
    homepage: null,
    language: "Go",
    stargazers_count: 0,
    fork: false,
    archived: false,
    topics: [],
    updated_at: "2025-12-15T06:14:44Z",
  },
  {
    name: "printsystem",
    html_url: "https://github.com/Rostreet/printsystem",
    description: null,
    homepage: null,
    language: "JavaScript",
    stargazers_count: 0,
    fork: false,
    archived: false,
    topics: [],
    updated_at: "2025-12-05T01:32:39Z",
  },
  {
    name: "NoteFlow",
    html_url: "https://github.com/Rostreet/NoteFlow",
    description: null,
    homepage: null,
    language: "TypeScript",
    stargazers_count: 0,
    fork: false,
    archived: false,
    topics: [],
    updated_at: "2025-11-28T17:53:41Z",
  },
  {
    name: "Mini-react",
    html_url: "https://github.com/Rostreet/Mini-react",
    description: "400 lines code implement basic functions of react",
    homepage: null,
    language: "JavaScript",
    stargazers_count: 0,
    fork: false,
    archived: false,
    topics: [],
    updated_at: "2025-10-15T10:27:56Z",
  },
  {
    name: "ShishanForum",
    html_url: "https://github.com/Rostreet/ShishanForum",
    description: null,
    homepage: null,
    language: "Vue",
    stargazers_count: 0,
    fork: false,
    archived: false,
    topics: [],
    updated_at: "2025-10-08T09:09:07Z",
  },
  {
    name: "langchain-selflearn",
    html_url: "https://github.com/Rostreet/langchain-selflearn",
    description: null,
    homepage: null,
    language: "JavaScript",
    stargazers_count: 0,
    fork: false,
    archived: false,
    topics: [],
    updated_at: "2025-09-25T17:15:30Z",
  },
  {
    name: "Taichi-UI",
    html_url: "https://github.com/Rostreet/Taichi-UI",
    description: "a components library with ai components and playground",
    homepage: null,
    language: "TypeScript",
    stargazers_count: 1,
    fork: false,
    archived: false,
    topics: [],
    updated_at: "2025-09-12T10:43:25Z",
  },
  {
    name: "Element-Plus-X",
    html_url: "https://github.com/Rostreet/Element-Plus-X",
    description:
      "🚀 Vue3 + Element-Plus 开箱即用的企业级AI组件库前端解决方案 | Element-Plus-X ",
    homepage: "https://element-plus-x.com",
    language: "Vue",
    stargazers_count: 0,
    fork: true,
    archived: false,
    topics: [],
    updated_at: "2025-07-20T06:06:54Z",
  },
  {
    name: "Front-end-handwritten-issues",
    html_url: "https://github.com/Rostreet/Front-end-handwritten-issues",
    description: null,
    homepage: null,
    language: "JavaScript",
    stargazers_count: 0,
    fork: false,
    archived: false,
    topics: [],
    updated_at: "2025-07-19T09:30:57Z",
  },
  {
    name: "my-fe-notes",
    html_url: "https://github.com/Rostreet/my-fe-notes",
    description: "My front-end study notes",
    homepage: null,
    language: null,
    stargazers_count: 0,
    fork: false,
    archived: false,
    topics: [],
    updated_at: "2025-07-06T09:53:02Z",
  },
  {
    name: "MyVue",
    html_url: "https://github.com/Rostreet/MyVue",
    description: "实现vue的核心功能",
    homepage: null,
    language: "TypeScript",
    stargazers_count: 0,
    fork: false,
    archived: false,
    topics: [],
    updated_at: "2025-06-26T09:47:09Z",
  },
  {
    name: "ElectronicProduct-display-website",
    html_url: "https://github.com/Rostreet/ElectronicProduct-display-website",
    description: null,
    homepage: null,
    language: "Vue",
    stargazers_count: 0,
    fork: false,
    archived: false,
    topics: [],
    updated_at: "2025-06-19T12:43:40Z",
  },
  {
    name: "chz-cli",
    html_url: "https://github.com/Rostreet/chz-cli",
    description: "a personal cli",
    homepage: null,
    language: "JavaScript",
    stargazers_count: 1,
    fork: false,
    archived: false,
    topics: [],
    updated_at: "2025-06-08T06:39:50Z",
  },
  {
    name: "react-template",
    html_url: "https://github.com/Rostreet/react-template",
    description: "a react template with typescript",
    homepage: null,
    language: "TypeScript",
    stargazers_count: 0,
    fork: false,
    archived: false,
    topics: [],
    updated_at: "2025-06-08T06:25:31Z",
  },
  {
    name: "zhaich.me",
    html_url: "https://github.com/Rostreet/zhaich.me",
    description: "a blog inspired by Anthony Fu",
    homepage: "https://zhaich-me.vercel.app",
    language: "Vue",
    stargazers_count: 0,
    fork: false,
    archived: false,
    topics: [],
    updated_at: "2025-06-07T07:52:45Z",
  },
  {
    name: "Cloud-Music",
    html_url: "https://github.com/Rostreet/Cloud-Music",
    description: "react仿网易云音乐项目",
    homepage: null,
    language: "TypeScript",
    stargazers_count: 0,
    fork: false,
    archived: false,
    topics: [],
    updated_at: "2025-06-06T11:17:09Z",
  },
  {
    name: "tsreact_template",
    html_url: "https://github.com/Rostreet/tsreact_template",
    description: "一个typescript的react模板",
    homepage: null,
    language: null,
    stargazers_count: 0,
    fork: false,
    archived: false,
    topics: [],
    updated_at: "2025-06-03T13:35:30Z",
  },
  {
    name: "ShiShanClub",
    html_url: "https://github.com/Rostreet/ShiShanClub",
    description: null,
    homepage: null,
    language: "TypeScript",
    stargazers_count: 0,
    fork: false,
    archived: false,
    topics: [],
    updated_at: "2025-06-01T08:37:33Z",
  },
  {
    name: "Core-Cloud",
    html_url: "https://github.com/Rostreet/Core-Cloud",
    description: "一个基于vue全家桶和elementplus的云盘项目",
    homepage: null,
    language: "Vue",
    stargazers_count: 1,
    fork: false,
    archived: false,
    topics: [],
    updated_at: "2025-04-10T17:38:24Z",
  },
  {
    name: "gitOperations",
    html_url: "https://github.com/Rostreet/gitOperations",
    description: "a demo to test git oprations",
    homepage: null,
    language: null,
    stargazers_count: 0,
    fork: false,
    archived: false,
    topics: [],
    updated_at: "2025-04-08T12:26:43Z",
  },
  {
    name: "mini-vue",
    html_url: "https://github.com/Rostreet/mini-vue",
    description: "my own mini-vue inspired by @cuixiaorui/mini-vue",
    homepage: null,
    language: null,
    stargazers_count: 0,
    fork: false,
    archived: false,
    topics: [],
    updated_at: "2025-02-21T11:01:22Z",
  },
  {
    name: "vue3_template",
    html_url: "https://github.com/Rostreet/vue3_template",
    description: "一个vue3模板",
    homepage: null,
    language: "Vue",
    stargazers_count: 0,
    fork: false,
    archived: false,
    topics: [],
    updated_at: "2024-12-11T07:59:22Z",
  },
  {
    name: "music-project",
    html_url: "https://github.com/Rostreet/music-project",
    description: null,
    homepage: null,
    language: "Vue",
    stargazers_count: 0,
    fork: false,
    archived: false,
    topics: [],
    updated_at: "2024-09-10T15:01:55Z",
  },
  {
    name: "meituan-zhaopin",
    html_url: "https://github.com/Rostreet/meituan-zhaopin",
    description: "基于vue3和elementui实现的美团招聘页面",
    homepage: null,
    language: "Vue",
    stargazers_count: 0,
    fork: false,
    archived: false,
    topics: [],
    updated_at: "2024-08-13T02:32:08Z",
  },
  {
    name: "qqmusic-slide",
    html_url: "https://github.com/Rostreet/qqmusic-slide",
    description: "在qq音乐静态基础上，使用js实现轮播图效果",
    homepage: null,
    language: "JavaScript",
    stargazers_count: 0,
    fork: false,
    archived: false,
    topics: [],
    updated_at: "2024-02-17T06:57:15Z",
  },
  {
    name: "qqmusic",
    html_url: "https://github.com/Rostreet/qqmusic",
    description: "通过html+css仿造实现qq音乐网页的静态效果",
    homepage: null,
    language: "HTML",
    stargazers_count: 0,
    fork: false,
    archived: false,
    topics: [],
    updated_at: "2024-01-30T15:38:22Z",
  },
];

function inferSection(repo: GitHubProjectRepo): ProjectSectionId {
  if (repo.fork) {
    return "participation";
  }

  const name = repo.name.toLowerCase();

  if (
    name.includes("mini") ||
    name.includes("handwritten") ||
    name.includes("langchain")
  ) {
    return "experiments";
  }

  if (
    name.includes("template") ||
    name.includes("notes") ||
    name.includes("config") ||
    name.includes("operations")
  ) {
    return "templates";
  }

  if (name.includes("cli") || name.includes("ui")) {
    return "tooling";
  }

  return "apps";
}

function buildFallbackSummary(
  repo: GitHubProjectRepo,
  section: ProjectSectionId,
): string {
  if (repo.description) {
    return repo.description.trim();
  }

  switch (section) {
    case "apps":
      return "一个面向真实页面或业务场景的项目实践。";
    case "tooling":
      return "聚焦工程效率、组件设计或开发体验的工具项目。";
    case "experiments":
      return "用于理解框架原理与底层机制的实验仓库。";
    case "templates":
      return "沉淀模板、配置与知识记录的基础仓库。";
    case "participation":
      return "基于社区项目的参与与实践记录。";
    default:
      return "项目源码与实现细节整理在该仓库中。";
  }
}

function normalizeProjects(repos: GitHubProjectRepo[]): Project[] {
  return repos
    .filter((repo) => !repo.archived)
    .sort((a, b) => b.updated_at.localeCompare(a.updated_at))
    .map((repo) => {
      const override = projectOverrides[repo.name];
      const section = override?.section ?? inferSection(repo);
      const summary =
        override?.summary ?? buildFallbackSummary(repo, section);

      return {
        ...repo,
        summary,
        section,
        featured: override?.featured ?? false,
        featuredRank: override?.featuredRank ?? Number.MAX_SAFE_INTEGER,
        homepage:
          override && "homepage" in override ? override.homepage ?? null : repo.homepage,
      };
    });
}

export async function getProjects(): Promise<{
  projects: Project[];
  source: "github" | "fallback";
}> {
  try {
    const response = await fetch(GITHUB_API_URL, {
      headers: {
        Accept: "application/vnd.github+json",
      },
      cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error(`GitHub API request failed: ${response.status}`);
    }

    const data = (await response.json()) as unknown;
    if (!Array.isArray(data)) {
      throw new Error("Unexpected GitHub API response");
    }

    return {
      projects: normalizeProjects(data as GitHubProjectRepo[]),
      source: "github",
    };
  } catch {
    return {
      projects: normalizeProjects(fallbackRepos),
      source: "fallback",
    };
  }
}

export function getProjectsRepositoryUrl() {
  return GITHUB_REPOS_URL;
}
