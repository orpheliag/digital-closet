import type { ClothingItem, ClothingCategory, OutfitSelection } from "./types";

function chooseRandomItem(
  items: ClothingItem[],
  category: ClothingCategory,
  random: () => number,
) {
  const matchingItems = items.filter((item) => item.category === category);

  if (matchingItems.length === 0) {
    return undefined;
  }

  return matchingItems[Math.floor(random() * matchingItems.length)];
}

export function selectRandomOutfit(
  items: ClothingItem[],
  random: () => number = Math.random,
): OutfitSelection | null {
  const top = chooseRandomItem(items, "top", random);
  const bottom = chooseRandomItem(items, "bottom", random);
  const shoes = chooseRandomItem(items, "shoes", random);

  if (!top || !bottom || !shoes) {
    return null;
  }

  return { top, bottom, shoes };
}
