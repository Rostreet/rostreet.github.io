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
			className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
			onClick={handleShare}
		>
			<Share2 className="w-4 h-4" />
			<span>分享</span>
		</button>
	);
}
