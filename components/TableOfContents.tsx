'use client';

import { useEffect, useState } from 'react';
import { List } from 'lucide-react';

interface TableOfContentsProps {
  content: string;
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // 提取标题
    const lines = content.split('\n');
    const extractedHeadings: Heading[] = [];

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      let level = 0;
      let text = '';

      if (trimmed.startsWith('### ')) {
        level = 3;
        text = trimmed.substring(4);
      } else if (trimmed.startsWith('## ')) {
        level = 2;
        text = trimmed.substring(3);
      } else if (trimmed.startsWith('# ')) {
        level = 1;
        text = trimmed.substring(2);
      }

      if (level > 0 && text) {
        const id = `heading-${index}`;
        extractedHeadings.push({ id, text, level });
      }
    });

    setHeadings(extractedHeadings);

    // 为每个标题添加 ID
    extractedHeadings.forEach(({ id }) => {
      const element = document.getElementById(id) as HTMLElement;
      if (element) {
        element.style.scrollMarginTop = '80px';
      }
    });

    // 监听滚动以高亮当前标题
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -66% 0px' }
    );

    extractedHeadings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [content]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
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
              ${activeId === heading.id
                ? 'text-foreground border-foreground'
                : 'text-muted-foreground hover:text-foreground border-transparent'
              }
              ${heading.level === 1 ? 'ml-0 font-semibold' : ''}
              ${heading.level === 2 ? 'ml-4' : ''}
              ${heading.level === 3 ? 'ml-8 text-xs' : ''}
            `}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
