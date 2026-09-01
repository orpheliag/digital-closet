import Link from "next/link";
export default function RegisterPage() {
	return (
		<div className="min-h-screen w-full bg-pink-300">
			<Link href="/" className="underline">
			Home
			</Link>
			<h1 className="pb-3 text-pink-700 text-2xl text-center font-bold">Sign up </h1>
			<form action="post" className="flex flex-col gap-4 p-10">
				<label htmlFor="email">Email</label>
				<input type="email" name="" id="email" />
				<label htmlFor="pseudo"> Pseudo</label>
				<input type="text" name="" id="pseudo" className="p-2 rounded-lg bg-white text-black" />
				<label htmlFor="pseudo"> Password</label>
				<input type="password" name="password" id="" className="p-2 rounded-lg  bg-white text-black" />
				<label htmlFor="confirmPassword"></label>
				<input type="password" name="" id="confirmPassword" className="p-2 rounded-lg  bg-white text-black" />
				<input type="submit" value="Register" className="bg-pink-700 text-white rounded-full p-2" />
			</form>		
		</div>

	);
}