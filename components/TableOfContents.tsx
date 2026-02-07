"use client";

import { List } from "lucide-react";
import { useEffect, useState } from "react";

interface TableOfContentsProps {
  content: string;
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

// 生成标题 ID 的工具函数（与 page.tsx 保持一致）
function generateHeadingId(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u4e00-\u9fa5-]+/g, "") // 保留中文字符
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // 提取标题
    const lines = content.split("\n");
    const extractedHeadings: Heading[] = [];

    lines.forEach((line) => {
      const trimmed = line.trim();
      let level = 0;
      let text = "";

      if (trimmed.startsWith("#### ")) {
        level = 4;
        text = trimmed.substring(5);
      } else if (trimmed.startsWith("### ")) {
        level = 3;
        text = trimmed.substring(4);
      } else if (trimmed.startsWith("## ")) {
        level = 2;
        text = trimmed.substring(3);
      } else if (trimmed.startsWith("# ")) {
        level = 1;
        text = trimmed.substring(2);
      }

      if (level > 0 && text) {
        const id = generateHeadingId(text) || `heading-${Math.random().toString(36).substr(2, 9)}`;
        extractedHeadings.push({ id, text, level });
      }
    });

    setHeadings(extractedHeadings);

    // 监听滚动以高亮当前标题
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -66% 0px" }
    );

    // 延迟观察，确保 DOM 已渲染
    const timer = setTimeout(() => {
      extractedHeadings.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.observe(element);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [content]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground sticky top-0 py-2">
        <List className="w-4 h-4" />
        <span>目录</span>
      </div>
      <nav className="space-y-2">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            onClick={(e) => handleClick(e, heading.id)}
            className={`
              block text-sm py-1.5 px-3 rounded-lg
              transition-all duration-200
              border-l-2
              ${
                activeId === heading.id
                  ? "text-foreground border-foreground"
                  : "text-muted-foreground hover:text-foreground border-transparent"
              }
              ${heading.level === 1 ? "ml-0 font-semibold" : ""}
              ${heading.level === 2 ? "ml-4" : ""}
              ${heading.level === 3 ? "ml-8 text-xs" : ""}
              ${heading.level === 4 ? "ml-12 text-xs" : ""}
            `}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
