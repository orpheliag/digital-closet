import Home from "@/app/page";
import Link from "next/link";
export default function LoginPage() {
	return (
		<div className="min-h-screen w-full bg-pink-300">
			<Link href="/">
			Home
			</Link>
			<form action="post" className="flex flex-col gap-4 p-10">
				<input type="text" name="Pseudo" id="" className="p-2 rounded-lg bg-white text-black" />
				<input type="password" name="Password" id="" className="p-2 rounded-lg  bg-white text-black" />
				<input type="submit" value="Login" className="bg-pink-700 text-white rounded-full p-2" />
			</form>			
		</div>

	);
}