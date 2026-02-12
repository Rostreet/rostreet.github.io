"use client";

import { Share2 } from "lucide-react";

interface ShareButtonProps {
	title: string;
}

export default function ShareButton({ title }: ShareButtonProps) {
	const handleShare = () => {
		if (navigator.share) {
			navigator.share({
				title,
				url: window.location.href,
			});
		}
	};

	return (
		<button
			type="button"
			className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border/40 hover:border-border/80 transition-all"
			onClick={handleShare}
		>
			<Share2 className="w-4 h-4" />
			<span className="hidden sm:inline">分享</span>
		</button>
	);
}
