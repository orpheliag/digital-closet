export const clothingCategories = ["top", "bottom", "shoes"] as const;

export type ClothingCategory = (typeof clothingCategories)[number];

export type ClothingItem = {
  id: string;
  user_id: string;
  name: string;
  image_url: string;
  category: ClothingCategory;
  created_at: string;
};

export type OutfitSelection = {
  top: ClothingItem;
  bottom: ClothingItem;
  shoes: ClothingItem;
};

export type SavedOutfit = {
  id: string;
  user_id: string;
  created_at: string;
  items: ClothingItem[];
};
