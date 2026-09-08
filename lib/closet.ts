import { supabase } from "./supabase";
import { getCurrentUser } from "./user";
import type { ClothingItem } from "./types";

const clothesBucket = "clothes";

export async function getCurrentUserClothes(): Promise<ClothingItem[]> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You must be signed in to view your clothes.");
  }

  const { data, error } = await supabase
    .from("clothes")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as ClothingItem[];
}

export async function addClothe(item: {
  name: string;
  image_url: string;
  category: ClothingItem["category"];
}) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You must be signed in to add clothes.");
  }

  const { data, error } = await supabase
    .from("clothes")
    .insert({ ...item, user_id: user.id })
    .select()
    .single();

  if (error) throw error;
  return data as ClothingItem;
}

export async function uploadClothing(input: {
  file: File;
  name: string;
  category: ClothingItem["category"];
}) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You must be signed in to upload clothes.");
  }

  const fileExtension = input.file.name.split(".").pop() || "jpg";
  const filePath = `${user.id}/${crypto.randomUUID()}.${fileExtension}`;
  const { error: uploadError } = await supabase.storage
    .from(clothesBucket)
    .upload(filePath, input.file, { contentType: input.file.type });

  if (uploadError) throw uploadError;

  const { data: publicUrl } = supabase.storage
    .from(clothesBucket)
    .getPublicUrl(filePath);

  try {
    return await addClothe({
      name: input.name,
      image_url: publicUrl.publicUrl,
      category: input.category,
    });
  } catch (error) {
    await supabase.storage.from(clothesBucket).remove([filePath]);
    throw error;
  }
}