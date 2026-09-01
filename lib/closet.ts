import { supabase } from "./supabase";

export async function getClothes() {
  return supabase.from("clothes").select("*");
}

export async function addClothe(item: {
  name: string;
  image_url: string;
  category: string;
  user_id: string;
}) {
  return supabase.from("clothes").insert(item);
}