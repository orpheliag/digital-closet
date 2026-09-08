"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import {useState} from "react";
import {signIn} from "../lib/user";
export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
  	const [errorMessage, setErrorMessage] = useState("");
	async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    try {
			await signIn({ email: email.trim(), password });
			router.push("/account");
    } catch (error) {
			setErrorMessage(
				error instanceof Error ? error.message : "Unable to log in",
			);
    }
  }
	return (
		<div className="min-h-screen w-full bg-pink-300">
			<Link href="/" className="underline">
			Home
			</Link>
			<h1 className="pb-3 text-pink-700 text-2xl text-center font-bold">Log in </h1>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4 p-10">
				<label htmlFor="email"> Email</label>
				<input 
					type="email"  
					id="email" 
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					className="p-2 rounded-lg bg-white text-black"
					required />
				<label htmlFor="password"> Password</label>
				<input 
					type="password" 
					id="password"
					value={password}
					onChange={(event) => setPassword(event.target.value)} 
					className="p-2 rounded-lg  bg-white text-black"
					required />
				<button 
					type="submit" 
					className="bg-pink-700 text-white rounded-full p-2"
				>
					Login
				</button>
				{errorMessage && (
          			<p className="text-sm text-red-600">{errorMessage}</p>
        		)}
				<p className="text-sm text-pink-800">
					No account yet? <Link href="/register" className="font-semibold underline">Sign up</Link>
				</p>
			</form>			
		</div>

	);
}