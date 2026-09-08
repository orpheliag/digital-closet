"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";
import { getCurrentUser,signOut } from "../lib/user";
import { getCurrentUserClothes } from "../lib/closet";
import { getCurrentUserOutfits } from "../lib/outfits";
import type { ClothingItem, SavedOutfit } from "../lib/types";

type User = {
  id: string;
  email?: string;
  user_metadata?: {
    username?: string;
  };
};

export default function AccountPage(){
	const router = useRouter();

	const [user, setUser] = useState<User | null>(null);
	const [clothes, setClothes] = useState<ClothingItem[]>([]);
	const [outfits, setOutfits] = useState<SavedOutfit[]>([]);
	const [loading, setLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");
	useEffect(() => {
	async function loadUser() {
		try {
		const currentUser = await getCurrentUser();
		if (!currentUser) {
			setLoading(false);
			return;
		}

		setUser(currentUser);
		const [currentClothes, currentOutfits] = await Promise.all([
			getCurrentUserClothes(),
			getCurrentUserOutfits(),
		]);
		setClothes(currentClothes);
		setOutfits(currentOutfits);
		} catch (error) {
			console.error("Unable to load account data:", error);
			const supabaseError = error as {
				message?: string;
				code?: string;
				details?: string;
				hint?: string;
			};
			const message = error instanceof Error ? error.message : supabaseError.message;
			const details = [supabaseError.code, supabaseError.details, supabaseError.hint]
				.filter(Boolean)
				.join(" - ");

			setErrorMessage(
				`Unable to load account: ${message || "Unknown Supabase error"}${details ? ` (${details})` : ""}`,
			);
		} finally {
		setLoading(false);
		}
	}

	loadUser();
	}, []);
	async function handleSignOut(){
		try {
			await signOut();
			router.push("/");
		} catch (error) {
			setErrorMessage(
			error instanceof Error ? error.message : "Unable to log out",
		);
		}
	}	
	if (loading) {
		return <p>Loading account...</p>;
	}

	if (errorMessage) {
		return <p>{errorMessage}</p>;
	}

	if (!user) {
		return <p>No user is logged in.</p>;
	}

	return(
		<main className="min-h-screen w-full bg-pink-300 text-white">
			<div className="mx-auto max-w-5xl p-6">
				<h1 className="text-3xl font-bold">My account</h1>
				<p className="mt-2">Email: {user.email}</p>
				<p>Pseudo: {user.user_metadata?.username}</p>

				<div className="mt-6 flex gap-3">
					<Link href="/closet" className="rounded-full bg-white px-4 py-2 text-pink-800">
						Add clothing
					</Link>
					<Link href="/outfit" className="rounded-full bg-pink-950 px-4 py-2 text-white">
						Generate outfit
					</Link>
				</div>

				<section className="mt-8">
					<h2 className="text-2xl font-semibold">My closet</h2>
					{clothes.length === 0 ? (
						<p className="mt-3">No clothes uploaded yet.</p>
					) : (
						<div className="mt-4 grid gap-4 sm:grid-cols-3">
							{clothes.map((item) => (
								<article key={item.id} className="overflow-hidden rounded-2xl bg-white text-pink-950">
									<img src={item.image_url} alt={item.name} className="h-48 w-full object-cover" />
									<div className="p-3">
										<p className="font-semibold">{item.name}</p>
										<p className="text-sm capitalize">{item.category}</p>
									</div>
								</article>
							))}
						</div>
					)}
				</section>

				<section className="mt-8">
					<h2 className="text-2xl font-semibold">Saved outfits</h2>
					{outfits.length === 0 ? (
						<p className="mt-3">No saved outfits yet.</p>
					) : (
						<div className="mt-4 space-y-4">
							{outfits.map((outfit) => (
								<article key={outfit.id} className="rounded-2xl bg-white p-4 text-pink-950">
									<p className="mb-3 font-semibold">
										Saved {new Date(outfit.created_at).toLocaleDateString()}
									</p>
									<div className="grid gap-3 sm:grid-cols-3">
										{outfit.items.map((item) => (
											<div key={item.id}>
												<img src={item.image_url} alt={item.name} className="h-32 w-full rounded-xl object-cover" />
												<p className="mt-1 text-sm">{item.name}</p>
											</div>
										))}
									</div>
								</article>
							))}
						</div>
					)}
				</section>

			<button 
				onClick={handleSignOut} 
				className="mt-8 rounded-full bg-pink-700 p-2">
				Sign out
			</button>
			</div>
		</main>
	);
}