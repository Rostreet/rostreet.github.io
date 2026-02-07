import { Mail, MapPin } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const skills = ["JavaScript", "Typecript", "Node.js", "Golang", "Git"];

  const interests = ["全栈开发", "ai & agent", "计算机底层原理", "算法", "音乐", "跑步"];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="max-w-4xl mx-auto animate-fade-in">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">关于我</h1>
        </header>

        {/* Main Content */}
        <div className="grid gap-12 md:grid-cols-3">
          {/* Profile Section */}
          <div className="md:col-span-2 space-y-8">
            <section>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  你好！目前我是一名前端/全栈开发者，也是一名HZAU的大三学生
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  在日常工作 / 学习中，我主要使用 React、Next.js 和 Node.js 进行开发，
                  目前在学习golang来作为后端的开发语言，
                  我相信语言只是工具，主要目标是理解业务并解决问题
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  通过这个博客，我希望能够分享我的学习笔记、项目经历和人生感悟
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
              <h2 className="text-2xl font-bold mb-4">学习经历</h2>
              <ol className="relative border-s border-border/40 ps-6 space-y-6">
                <li className="relative">
                  <span className="absolute -start-[9px] top-1.5 h-3 w-3 rounded-full bg-primary" />
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h4 className="text-base font-semibold">华中农业大学 信息管理与信息系统</h4>
                    <span className="text-xs text-muted-foreground">2023.09 - 2027.06</span>
                  </div>
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">工作经历</h2>
              <ol className="relative border-s border-border/40 ps-6 space-y-6">
                <li className="relative">
                  <span className="absolute -start-[9px] top-1.5 h-3 w-3 rounded-full bg-primary" />
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h4 className="text-base font-semibold">shopee 前端开发实习生</h4>
                    <span className="text-xs text-muted-foreground">2025.08 - 2025.12</span>
                  </div>
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">兴趣爱好</h2>
              <ul className="grid grid-cols-2 gap-2">
                {interests.map((interest) => (
                  <li key={interest} className="flex items-center gap-2 text-muted-foreground">
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
                  <span className="text-sm">feaaizch1001@gmail.com</span>
                </a>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm">中国 湖北 武汉</span>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="border border-border/40 rounded-xl p-6 bg-card">
              <h3 className="text-lg font-bold mb-4">统计</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">文章数量</span>
                  <span className="text-sm font-medium">5+</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <section className="mt-16 pt-8 border-t border-border/40">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">联系我</h2>
            <p className="text-muted-foreground mb-6">
              无论你是对我还是我的工作感兴趣，还是想要讨论某个项目，或者正在招人
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="mailto:feaaizch1001@gmail.com"
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
