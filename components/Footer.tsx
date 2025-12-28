import { Github, Mail } from "lucide-react";
import { BilibiliIcon, JuejinIcon } from "./Icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Email",
      href: "mailto:hello@example.com",
      icon: Mail,
    },
    {
      name: "GitHub",
      href: "https://github.com",
      icon: Github,
    },
    {
      name: "Bilibili",
      href: "https://bilibili.com",
      icon: BilibiliIcon,
    },
    {
      name: "稀土掘金",
      href: "https://juejin.cn",
      icon: JuejinIcon,
    },
  ];

  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-12">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-6">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={link.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
            <p className="text-sm text-muted-foreground">
              © {currentYear} Personal Blog. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
