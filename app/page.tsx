import Link from "next/link";

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
		<div className="w-full h-12 bg-pink-700">
			<h1 className="text-xl font-semibold text-center">
				Digital Closet
			</h1>
			<Link href="/login"
			 className="absolute top-0 right-0  rounded-full p-2  bg-red-300 hover:bg-red-800 font-semibold text-white">
				Login
			</Link>
		</div>

		<div className="w-full h-120 top-12 bg-purple-200">
			<h2 className="font-bold text-center text-5xl pb-2"> 
				Wardrobe planner
			</h2>
			<div className="grid grid-rows-1 grid-cols-3 gap-4 pb-5">
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
			<Link href="/closet" className="bg-black text-white text-base rounded-full p-2 animate-bounce hover:bg-white hover:text-black">
				Upload new clothes
			</Link>
			<Link href="/outfit" className="ml-3 rounded-full bg-pink-700 px-4 py-2 text-base text-white hover:bg-pink-900">
				Generate an outfit
			</Link>
			{/* test register page			 */}
			<Link href="/register"> Sign up</Link>
		</div>
		<div className="absolute bottom-0 inset-x-0 pt-3 bg-pink-800 text-center text-amber-50">
			Made in 2026 - Image par <a href="https://pixabay.com/fr/users/openclipart-vectors-30363/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=155838">OpenClipart-Vectors</a> de <a href="https://pixabay.com/fr//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=155838">Pixabay</a>
		</div>
	</main>
  );
}
