"use client"
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/user";
export default function RegisterPage() {
	const router = useRouter();
	const [email,setEmail] = useState("");
	const [username,setUsername] = useState("");
	const [password,setPassword] = useState("");
	const [passwordConfirmation,setPasswordConfirmation] = useState("");
	const [errorMessage,setErrorMessage] = useState("");	
	async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {

		event.preventDefault();
    	setErrorMessage("");
		try {
			password!== passwordConfirmation ? setErrorMessage('Password and Password Confirmation must be the same') :
			await signUp({
				email:email.trim(), 
				password, 
				username: username.trim()
			});
			router.push("/account");

		} catch (error) {
			setErrorMessage(
        		error instanceof Error ? error.message : "Unable to register",
      		);
		}

	}
	return (
		<div className="min-h-screen w-full bg-pink-300">
			<Link href="/" className="underline">
			Home
			</Link>
			<h1 className="pb-3 text-pink-700 text-2xl text-center font-bold">Sign up </h1>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4 p-10">
				<label htmlFor="email">Email</label>
				<input 
				type="email" 
				id="email"
				value={email}
				onChange={(event) => setEmail(event.target.value)}
				required
				/>
				<label htmlFor="pseudo"> Pseudo</label>
				<input 
				type="text"
				id="pseudo"
				value={username}
				onChange={(event) => setUsername(event.target.value)} 
				className="p-2 rounded-lg bg-white text-black"
				required 
				/>
				<label htmlFor="password"> Password</label>
				<input 
				type="password" 
				id="password"
				value={password}
				onChange={(event) => setPassword(event.target.value)} 
				className="p-2 rounded-lg  bg-white text-black"
				required 
				/>
				<label htmlFor="confirmPassword"></label>
				<input 
				type="password" 
				id="confirmPassword"
				value={passwordConfirmation}
				onChange={(event) => setPasswordConfirmation(event.target.value)} 
				className="p-2 rounded-lg  bg-white text-black"
				required
				/>
				<button 
					type="submit" 
					className="bg-pink-700 text-white rounded-full p-2"
				>
					Register
				</button>
				{errorMessage && (
          			<p className="text-sm text-red-600">{errorMessage}</p>
        		)}
			</form>		
		</div>

	);
}