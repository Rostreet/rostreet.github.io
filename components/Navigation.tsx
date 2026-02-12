"use client";

import { Moon, Rss, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navigation() {
	const pathname = usePathname();
	const [theme, setTheme] = useState<"light" | "dark">("light");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		// 从 localStorage 读取保存的主题，如果没有则使用系统偏好
		const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
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
		{ href: "/interests", label: "摄影" },
		{ href: "/about", label: "关于" },
	];

	return (
		<nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<Link href="/" className="flex items-center space-x-2">
						<span className="text-xl font-bold tracking-tight">zch</span>
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
