import Link from "next/link";
export default function LoginPage() {
	return (
		<div className="min-h-screen w-full bg-pink-300">
			<Link href="/" className="underline">
			Home
			</Link>
			<h1 className="pb-3 text-pink-700 text-2xl text-center font-bold">Log in </h1>
			<form action="post" className="flex flex-col gap-4 p-10">
				<label htmlFor="pseudo"> Pseudo</label>
				<input type="text" name="" id="pseudo" className="p-2 rounded-lg bg-white text-black" />
				<label htmlFor="password"> Password</label>
				<input type="password" name="" id="password" className="p-2 rounded-lg  bg-white text-black" />
				<input type="submit" value="Login" className="bg-pink-700 text-white rounded-full p-2" />
			</form>			
		</div>

	);
}