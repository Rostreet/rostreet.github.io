export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="mt-20 border-t border-border/40">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col gap-3 py-5 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
					<p>© {currentYear} Zhai Changhao</p>
				</div>
			</div>
		</footer>
	);
}
