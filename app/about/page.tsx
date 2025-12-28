import { Mail, MapPin, Github } from "lucide-react";
import Link from "next/link";
import { BilibiliIcon, JuejinIcon } from "@/components/Icons";

export default function AboutPage() {
  const skills = [
    "React / Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "PostgreSQL",
    "Docker",
    "AWS",
    "Git",
  ];

  const interests = [
    "Web 开发",
    "系统设计",
    "开源项目",
    "技术写作",
    "用户体验设计",
    "性能优化",
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="max-w-4xl mx-auto animate-fade-in">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            关于我
          </h1>
          <p className="text-xl text-muted-foreground">
            热爱编程，享受创造，追求卓越
          </p>
        </header>

        {/* Main Content */}
        <div className="grid gap-12 md:grid-cols-3">
          {/* Profile Section */}
          <div className="md:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">简介</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  你好！我是一名全栈开发者，专注于构建高质量、用户友好的 Web
                  应用。 我对新技术充满热情，喜欢探索和尝试各种编程语言和框架。
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  在日常工作中，我主要使用 React、Next.js 和 Node.js 进行开发，
                  但我保持开放的心态，乐于学习任何能够解决问题的工具和技术。
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  通过这个博客，我希望能够分享我的学习心得、项目经验和技术见解，
                  同时也能够记录自己的成长历程。
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">技术栈</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-lg bg-accent text-foreground text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">兴趣爱好</h2>
              <ul className="grid grid-cols-2 gap-2">
                {interests.map((interest) => (
                  <li
                    key={interest}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {interest}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="border border-border/40 rounded-xl p-6 bg-card">
              <h3 className="text-lg font-bold mb-4">联系方式</h3>
              <div className="space-y-3">
                <a
                  href="mailto:hello@example.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <Mail className="w-5 h-5" />
                  <span className="text-sm">hello@example.com</span>
                </a>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm">中国</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border/40">
                <h4 className="text-sm font-medium mb-3">社交媒体</h4>
                <div className="flex gap-3">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-accent hover:bg-accent/80 transition-colors duration-200"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://bilibili.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-accent hover:bg-accent/80 transition-colors duration-200"
                    aria-label="Bilibili"
                  >
                    <BilibiliIcon className="w-5 h-5" />
                  </a>
                  <a
                    href="https://juejin.cn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-accent hover:bg-accent/80 transition-colors duration-200"
                    aria-label="稀土掘金"
                  >
                    <JuejinIcon className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="border border-border/40 rounded-xl p-6 bg-card">
              <h3 className="text-lg font-bold mb-4">统计</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    文章数量
                  </span>
                  <span className="text-sm font-medium">5+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    项目经验
                  </span>
                  <span className="text-sm font-medium">3年+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    开源贡献
                  </span>
                  <span className="text-sm font-medium">活跃</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <section className="mt-16 pt-8 border-t border-border/40">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">让我们开始合作</h2>
            <p className="text-muted-foreground mb-6">
              如果你对我的工作感兴趣，或者想要讨论一个项目，欢迎随时联系我
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="mailto:hello@example.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-colors duration-200 font-medium"
              >
                <Mail className="w-4 h-4" />
                发送邮件
              </a>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border/40 hover:border-border/80 transition-all font-medium"
              >
                查看文章
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
