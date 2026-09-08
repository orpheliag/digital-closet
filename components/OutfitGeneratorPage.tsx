"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCurrentUserClothes } from "../lib/closet";
import { saveOutfit } from "../lib/outfits";
import { getCurrentUser } from "../lib/user";
import type { ClothingItem, OutfitSelection } from "../lib/types";

function chooseRandomItem(items: ClothingItem[], category: ClothingItem["category"]) {
  const matchingItems = items.filter((item) => item.category === category);
  return matchingItems[Math.floor(Math.random() * matchingItems.length)];
}

export default function OutfitGeneratorPage() {
  const router = useRouter();
  const [clothes, setClothes] = useState<ClothingItem[]>([]);
  const [selection, setSelection] = useState<OutfitSelection | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadClothes() {
      try {
        const user = await getCurrentUser();

        if (!user) {
          router.replace("/login?next=/outfit");
          return;
        }

        setClothes(await getCurrentUserClothes());
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : "Unable to load your clothes.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadClothes();
  }, [router]);

  function generateOutfit() {
    setMessage("");
    setErrorMessage("");

    const top = chooseRandomItem(clothes, "top");
    const bottom = chooseRandomItem(clothes, "bottom");
    const shoes = chooseRandomItem(clothes, "shoes");

    if (!top || !bottom || !shoes) {
      setSelection(null);
      setErrorMessage("Add at least one top, one bottom, and one pair of shoes first.");
      return;
    }

    setSelection({ top, bottom, shoes });
  }

  async function handleSaveOutfit() {
    if (!selection) return;

    setSaving(true);
    setMessage("");
    setErrorMessage("");

    try {
      await saveOutfit(selection);
      setMessage("Outfit saved.");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to save the outfit.",
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <main className="p-8">Loading your closet...</main>;
  }

  return (
    <main className="min-h-screen bg-pink-100 p-6 text-pink-950 sm:p-10">
      <div className="mx-auto max-w-5xl">
        <Link href="/account" className="text-sm font-semibold underline">
          Back to account
        </Link>

        <header className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-pink-700">
              Digital Closet
            </p>
            <h1 className="mt-2 text-4xl font-bold">Generate an outfit</h1>
            <p className="mt-2 text-pink-800">
              Pick one piece from each required category in your closet.
            </p>
          </div>
          <button
            type="button"
            onClick={generateOutfit}
            className="rounded-full bg-pink-700 px-5 py-3 font-semibold text-white hover:bg-pink-800"
          >
            Generate outfit
          </button>
        </header>

        {errorMessage && (
          <p className="mt-6 rounded-xl bg-red-100 p-4 text-red-800">{errorMessage}</p>
        )}
        {message && (
          <p className="mt-6 rounded-xl bg-green-100 p-4 text-green-800">{message}</p>
        )}

        {selection ? (
          <section className="mt-8 grid gap-5 sm:grid-cols-3" aria-label="Generated outfit">
            {(["top", "bottom", "shoes"] as const).map((category) => {
              const item = selection[category];

              return (
                <article key={item.id} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="h-72 w-full object-cover"
                  />
                  <div className="p-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-pink-600">
                      {category}
                    </p>
                    <h2 className="mt-1 text-lg font-semibold">{item.name}</h2>
                  </div>
                </article>
              );
            })}
          </section>
        ) : (
          <section className="mt-8 rounded-2xl bg-white p-8 text-center shadow-sm">
            <p>Your generated outfit will appear here.</p>
          </section>
        )}

        <button
          type="button"
          onClick={handleSaveOutfit}
          disabled={!selection || saving}
          className="mt-6 rounded-full bg-pink-950 px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          {saving ? "Saving..." : "Save outfit"}
        </button>
      </div>
    </main>
  );
}
