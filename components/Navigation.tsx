"use client";

import { Moon, Rss, Sun, Camera } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
    { href: "/", label: "首页" },
    { href: "/about", label: "关于" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center"
            aria-label="返回首页"
          >
            <NavigationWordmark />
          </Link>

          <div className="flex items-center space-x-1 sm:space-x-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    inline-flex items-center px-4 py-2 rounded-lg
                    text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? "text-foreground bg-accent"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    }
                  `}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/interests"
              className={`
                inline-flex items-center justify-center p-2 rounded-lg
                transition-all duration-200
                ${
                  pathname === "/interests"
                    ? "text-foreground bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
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
              className="inline-flex items-center justify-center p-2 rounded-lg
                text-muted-foreground hover:text-foreground hover:bg-accent/50
                transition-all duration-200"
              aria-label="RSS 订阅"
            >
              <Rss className="w-5 h-5" />
            </Link>
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex items-center justify-center p-2 rounded-lg
                text-muted-foreground hover:text-foreground hover:bg-accent/50
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
