import Image from "next/image";
import outfit from "../public/mock-outfit.png";
const closetStats = [
  { label: "Items saved", value: "124" },
  { label: "Outfits made", value: "38" },
  { label: "Favorites", value: "17" },
];

const outfitIdeas = [
  "Coffee run",
  "Office chic",
  "Weekend casual",
  "Date night",
];
export default function Home() {
  return (
	<main>
		<div className="absolute top-0 inset-x-0 pb-8 bg-pink-700">
			<h1 className="text-xl font-semibold text-center">
				Digital Closet
			</h1>
			<button className="absolute top-0 right-0  rounded-full p-2  bg-red-300 hover:bg-red-800 font-semibold text-white">
				My closet
			</button>
		</div>

		<div className="absolute inset-0 top-12 bg-purple-200 text-5xl font-bold text-center ">
			Wardrobe planner
			<div className="grid grid-rows-1 grid-cols-3 gap-4">
				<div>
					<img src="/mock-outfit.png" alt="outfit-1" width={200} height={200} />
				</div>
				<div>
					<img src="/mock-outfit.png" alt="outfit-2" width={200} height={200}  />
				</div>
				<div>
					<img src="/mock-outfit.png" alt="outfit-3" width={200} height={200}  />
				</div>
			</div>
		</div>

		<div className="absolute bottom-0 inset-x-0 pt-3 bg-pink-800 text-center text-amber-50">
			Made in 2026 - Image par <a href="https://pixabay.com/fr/users/openclipart-vectors-30363/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=155838">OpenClipart-Vectors</a> de <a href="https://pixabay.com/fr//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=155838">Pixabay</a>
		</div>
	</main>
  );
}
