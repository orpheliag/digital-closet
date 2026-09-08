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
		if (password !== passwordConfirmation) {
			setErrorMessage("Passwords do not match.");
			return;
		}

		try {
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
		<div className="app-shell flex min-h-screen items-center justify-center p-6">
			<div className="w-full max-w-md">
				<Link href="/" className="app-brand text-lg font-bold">Digital Closet</Link>
				<form onSubmit={handleSubmit} className="app-panel mt-6 flex flex-col gap-5 p-7 sm:p-9">
					<div>
						<p className="text-sm font-bold uppercase tracking-[0.2em] text-pink-700">Start your wardrobe</p>
						<h1 className="mt-2 text-3xl font-bold text-pink-950">Create an account</h1>
					</div>
					<label htmlFor="email" className="app-label">Email</label>
				<input 
				type="email" 
				id="email"
				value={email}
				onChange={(event) => setEmail(event.target.value)}
				className="app-input -mt-3"
				required
				/>
				<label htmlFor="pseudo" className="app-label">Pseudo</label>
				<input 
				type="text"
				id="pseudo"
				value={username}
				onChange={(event) => setUsername(event.target.value)} 
				className="app-input -mt-3"
				required 
				/>
				<label htmlFor="password" className="app-label">Password</label>
				<input 
				type="password" 
				id="password"
				value={password}
				onChange={(event) => setPassword(event.target.value)} 
				className="app-input -mt-3"
				required 
				/>
				<label htmlFor="confirmPassword" className="app-label">Confirm password</label>
				<input 
				type="password" 
				id="confirmPassword"
				value={passwordConfirmation}
				onChange={(event) => setPasswordConfirmation(event.target.value)} 
				className="app-input -mt-3"
				required
				/>
				<button 
					type="submit" 
					className="app-button-primary mt-2 w-full"
				>
					Register
				</button>
				{errorMessage && (
          					<p className="app-message-error">{errorMessage}</p>
        		)}
					<p className="text-sm text-pink-900/70">
						Already have an account? <Link href="/login" className="font-semibold underline">Log in</Link>
					</p>
				</form>
			</div>
		</div>

	);
}