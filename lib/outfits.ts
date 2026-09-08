import { getCurrentUser } from "./user";
import { supabase } from "./supabase";
import type { ClothingItem, OutfitSelection, SavedOutfit } from "./types";

export async function saveOutfit(selection: OutfitSelection) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You must be signed in to save an outfit.");
  }

  const { data: outfit, error: outfitError } = await supabase
    .from("outfits")
    .insert({ user_id: user.id })
    .select("id, user_id, created_at")
    .single();

  if (outfitError) {
    throw new Error(`Unable to create outfit: ${outfitError.message}`);
  }

  const { error: itemsError } = await supabase.from("outfit_items").insert([
    { outfit_id: outfit.id, clothes_id: selection.top.id },
    { outfit_id: outfit.id, clothes_id: selection.bottom.id },
    { outfit_id: outfit.id, clothes_id: selection.shoes.id },
  ]);

  if (itemsError) {
    await supabase.from("outfits").delete().eq("id", outfit.id);
    throw new Error(`Unable to add outfit items: ${itemsError.message}`);
  }

  return outfit;
}

export async function getCurrentUserOutfits(): Promise<SavedOutfit[]> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You must be signed in to view your outfits.");
  }

  const { data, error } = await supabase
    .from("outfits")
    .select("id, user_id, created_at, outfit_items(clothes(*))")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return ((data ?? []) as Array<{
    id: string;
    user_id: string;
    created_at: string;
    outfit_items: Array<{ clothes: ClothingItem[] }>;
  }>).map((outfit) => ({
    id: outfit.id,
    user_id: outfit.user_id,
    created_at: outfit.created_at,
    items: outfit.outfit_items
      .flatMap((item) => item.clothes)
      .filter((item): item is ClothingItem => item !== null),
  }));
}