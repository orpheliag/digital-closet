"use client";

import Link from "next/link";
import { useState } from "react";

const closetStats = [
  { label: "Items saved", value: "124" },
  { label: "Outfits made", value: "38" },
  { label: "Favorites", value: "17" },
];

const outfitIdeas = [
	{ title: "Coffee run", detail: "Soft layers and easy denim" },
	{ title: "Office chic", detail: "Sharp lines, relaxed confidence" },
	{ title: "Weekend casual", detail: "Comfort with a little polish" },
	{ title: "Date night", detail: "A look with a point of view" },
];
export default function Home() {
	const [activeOutfit, setActiveOutfit] = useState(0);
	const currentOutfit = outfitIdeas[activeOutfit];

	function showPreviousOutfit() {
		setActiveOutfit((current) => (current === 0 ? outfitIdeas.length - 1 : current - 1));
	}

	function showNextOutfit() {
		setActiveOutfit((current) => (current + 1) % outfitIdeas.length);
	}

  return (
		<main className="app-shell">
			<header className="app-header">
				<div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
					<Link href="/" className="app-brand text-xl font-bold">Digital Closet</Link>
					<Link href="/login" className="app-button-quiet">Log in</Link>
				</div>
			</header>

			<section className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:px-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:py-20">
				<div>
					<p className="text-sm font-bold uppercase tracking-[0.24em] text-pink-700">Your wardrobe, reimagined</p>
					<h1 className="mt-5 max-w-2xl text-5xl font-bold leading-[1.02] tracking-tight text-pink-950 sm:text-7xl">
						Get dressed without the daily guesswork.
					</h1>
					<p className="mt-6 max-w-xl text-lg leading-8 text-pink-900/75">
						Keep your favorite pieces in one place, then let your closet suggest a look when inspiration runs low.
					</p>
					<div className="mt-8 flex flex-wrap gap-3">
						<Link href="/register" className="app-button-primary">Create your closet</Link>
						<Link href="/outfit" className="app-button-quiet">Generate an outfit</Link>
					</div>
				</div>

				<div className="app-panel overflow-hidden p-4 sm:p-6">
					<div className="relative overflow-hidden rounded-2xl bg-pink-100">
						<img src="/mock-outfit.png" alt={`${currentOutfit.title} outfit`} className="h-72 w-full object-contain sm:h-80" />
						<button
							type="button"
							onClick={showPreviousOutfit}
							aria-label="Previous outfit"
							title="Previous outfit"
							className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl text-pink-950 shadow-sm hover:bg-white"
						>
							&#8592;
						</button>
						<button
							type="button"
							onClick={showNextOutfit}
							aria-label="Next outfit"
							title="Next outfit"
							className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl text-pink-950 shadow-sm hover:bg-white"
						>
							&#8594;
						</button>
					</div>
					<div className="mt-4 flex items-end justify-between gap-4">
						<div>
							<p className="text-xs font-bold uppercase tracking-widest text-pink-600">Outfit idea</p>
							<p className="mt-2 text-xl font-bold text-pink-950">{currentOutfit.title}</p>
							<p className="mt-1 text-sm text-pink-900/65">{currentOutfit.detail}</p>
						</div>
						<p className="text-sm font-semibold text-pink-700">{activeOutfit + 1} / {outfitIdeas.length}</p>
					</div>
					<div className="mt-4 flex gap-2">
						{outfitIdeas.map((outfit, index) => (
							<button
								key={outfit.title}
								type="button"
								onClick={() => setActiveOutfit(index)}
								aria-label={`Show ${outfit.title}`}
								className={`h-2 flex-1 rounded-full ${index === activeOutfit ? "bg-pink-700" : "bg-pink-200"}`}
							/>
						))}
					</div>
				</div>
			</section>

			<section className="mx-auto grid max-w-6xl gap-4 px-6 pb-12 sm:grid-cols-3 sm:px-10">
				{closetStats.map((stat) => (
					<div key={stat.label} className="app-panel p-5">
						<p className="text-3xl font-bold text-pink-950">{stat.value}</p>
						<p className="mt-1 text-sm text-pink-900/65">{stat.label}</p>
					</div>
				))}
			</section>

			<footer className="border-t border-pink-200 px-6 py-6 text-center text-sm text-pink-900/60">
				Digital Closet · 2026
			</footer>
		</main>
  );
}
