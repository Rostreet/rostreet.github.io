"use client";

import { Camera, Github, Mail, Moon, Rss, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BilibiliIcon, JuejinIcon } from "@/components/Icons";

function NavigationWordmark() {
  return (
    <span className="wordmark-shell">
      <span className="wordmark-glow" aria-hidden="true" />
      <svg
        viewBox="0 0 160 52"
        className="wordmark-float relative z-10 h-10 w-[8.5rem] overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="nav-wordmark-fill"
            x1="0"
            y1="0"
            x2="160"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              offset="0%"
              stopColor="var(--foreground)"
              stopOpacity="0.75"
            />
            <stop offset="48%" stopColor="var(--foreground)" stopOpacity="1" />
            <stop
              offset="100%"
              stopColor="var(--muted-foreground)"
              stopOpacity="0.72"
            />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              values="-14 0;14 0;-14 0"
              dur="9s"
              repeatCount="indefinite"
            />
          </linearGradient>
          <linearGradient
            id="nav-wordmark-accent"
            x1="0"
            y1="10"
            x2="160"
            y2="38"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#b37a34" stopOpacity="0.18" />
            <stop offset="55%" stopColor="#d6a76a" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8c5a2b" stopOpacity="0.2" />
          </linearGradient>
          <filter
            id="nav-wordmark-blur"
            x="-20%"
            y="-50%"
            width="140%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="1.8" />
          </filter>
        </defs>

        <path
          d="M10 34C19 21 33 15 41 18C46 20 44 26 37 31C28 37 24 42 31 44C42 47 58 34 70 18C73 14 76 15 75 21C74 27 73 35 77 38C82 42 92 33 101 21C104 17 108 15 110 17C112 20 110 25 108 31C106 36 108 39 113 38C121 37 132 30 146 16"
          fill="none"
          stroke="url(#nav-wordmark-accent)"
          strokeWidth="5.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.42"
          filter="url(#nav-wordmark-blur)"
        />
        <path
          d="M10 34C19 21 33 15 41 18C46 20 44 26 37 31C28 37 24 42 31 44C42 47 58 34 70 18C73 14 76 15 75 21C74 27 73 35 77 38C82 42 92 33 101 21C104 17 108 15 110 17C112 20 110 25 108 31C106 36 108 39 113 38C121 37 132 30 146 16"
          fill="none"
          stroke="url(#nav-wordmark-fill)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="wordmark-signature"
        />
        <path
          d="M78 40C90 47 108 48 127 42C139 38 148 30 154 21"
          fill="none"
          stroke="url(#nav-wordmark-accent)"
          strokeWidth="1.75"
          strokeLinecap="round"
          className="wordmark-trail"
        />
        <path
          d="M110 16C117 15 123 16 127 18"
          fill="none"
          stroke="url(#nav-wordmark-accent)"
          strokeWidth="1.2"
          strokeLinecap="round"
          className="wordmark-flick"
        />
      </svg>
      <span className="sr-only">zch</span>
    </span>
  );
}

export default function Navigation() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 从 localStorage 读取保存的主题，如果没有则使用系统偏好
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const navItems = [
    { href: "/blog", label: "Blog" },
    { href: "/projects", label: "Project" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/86 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="group inline-flex items-center"
            aria-label="返回首页"
          >
            <NavigationWordmark />
          </Link>

          <div className="flex min-w-0 items-center justify-end gap-0.5 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(`${item.href}/`));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    relative inline-flex h-9 items-center px-2.5 text-sm font-medium transition-colors duration-200 sm:px-3
                    ${
                      isActive
                        ? "text-foreground after:absolute after:inset-x-2 after:-bottom-px after:h-px after:bg-foreground/70"
                        : "text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  {item.label}
                </Link>
              );
            })}
            <span className="mx-1 hidden h-4 w-px bg-border/70 sm:block" />
            <a
              href="mailto:feaaizch1001@gmail.com"
              className="hidden h-9 w-9 items-center justify-center rounded-full
                text-muted-foreground hover:text-foreground sm:inline-flex
                transition-all duration-200"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/Rostreet"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full
                text-muted-foreground hover:text-foreground
                transition-all duration-200"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://space.bilibili.com/285033804"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-9 w-9 items-center justify-center rounded-full
                text-muted-foreground hover:text-foreground sm:inline-flex
                transition-all duration-200"
              aria-label="Bilibili"
            >
              <BilibiliIcon className="w-5 h-5" />
            </a>
            <a
              href="https://juejin.cn/user/3600253306288539"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-9 w-9 items-center justify-center rounded-full
                text-muted-foreground hover:text-foreground md:inline-flex
                transition-all duration-200"
              aria-label="稀土掘金"
            >
              <JuejinIcon className="w-5 h-5" />
            </a>
            <Link
              href="/interests"
              className={`
                inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200
                ${
                  pathname === "/interests"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }
              `}
              aria-label="摄影"
            >
              <Camera className="w-5 h-5" />
            </Link>
            {/* RSS 订阅按钮 */}
            <Link
              href="/rss.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full
                text-muted-foreground hover:text-foreground
                transition-all duration-200"
              aria-label="RSS 订阅"
            >
              <Rss className="w-5 h-5" />
            </Link>
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full
                text-muted-foreground hover:text-foreground
                transition-all duration-200"
              aria-label="Toggle theme"
              disabled={!mounted}
            >
              {!mounted ? (
                <div className="w-5 h-5" />
              ) : theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
