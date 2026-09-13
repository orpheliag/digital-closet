import { describe, expect, it } from "vitest";
import { selectRandomOutfit } from "./outfit-selection";
import type { ClothingItem } from "./types";

function clothing(
  id: string,
  category: ClothingItem["category"],
): ClothingItem {
  return {
    id,
    user_id: "user-1",
    name: id,
    image_url: `https://example.com/${id}.png`,
    category,
    created_at: "2026-01-01T00:00:00.000Z",
  };
}

describe("selectRandomOutfit", () => {
  it("selects exactly one item from each required category", () => {
    const items = [
      clothing("top-1", "top"),
      clothing("top-2", "top"),
      clothing("bottom-1", "bottom"),
      clothing("shoes-1", "shoes"),
    ];

    const outfit = selectRandomOutfit(items, () => 0);

    expect(outfit).not.toBeNull();
    expect(outfit && Object.keys(outfit)).toEqual(["top", "bottom", "shoes"]);
    expect(outfit?.top.category).toBe("top");
    expect(outfit?.bottom.category).toBe("bottom");
    expect(outfit?.shoes.category).toBe("shoes");
  });

  it("returns null when a required category is missing", () => {
    const items = [
      clothing("top-1", "top"),
      clothing("shoes-1", "shoes"),
    ];

    expect(selectRandomOutfit(items, () => 0)).toBeNull();
  });

  it("uses the random choice within each category", () => {
    const items = [
      clothing("top-1", "top"),
      clothing("top-2", "top"),
      clothing("bottom-1", "bottom"),
      clothing("shoes-1", "shoes"),
    ];

    const outfit = selectRandomOutfit(items, () => 0.99);

    expect(outfit?.top.id).toBe("top-2");
    expect(outfit?.bottom.id).toBe("bottom-1");
    expect(outfit?.shoes.id).toBe("shoes-1");
  });
});
