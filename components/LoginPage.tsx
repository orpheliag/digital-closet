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
		<div className="app-shell flex min-h-screen items-center justify-center p-6">
			<div className="w-full max-w-md">
				<Link href="/" className="app-brand text-lg font-bold">Digital Closet</Link>
				<form onSubmit={handleSubmit} className="app-panel mt-6 flex flex-col gap-5 p-7 sm:p-9">
					<div>
						<p className="text-sm font-bold uppercase tracking-[0.2em] text-pink-700">Welcome back</p>
						<h1 className="mt-2 text-3xl font-bold text-pink-950">Log in</h1>
					</div>
					<label htmlFor="email" className="app-label">Email</label>
				<input 
					type="email"  
					id="email" 
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					className="app-input -mt-3"
					required />
				<label htmlFor="password" className="app-label">Password</label>
				<input 
					type="password" 
					id="password"
					value={password}
					onChange={(event) => setPassword(event.target.value)} 
					className="app-input -mt-3"
					required />
				<button 
					type="submit" 
					className="app-button-primary mt-2 w-full"
				>
					Login
				</button>
				{errorMessage && (
          					<p className="app-message-error">{errorMessage}</p>
        		)}
				<p className="text-sm text-pink-900/70">
					No account yet? <Link href="/register" className="font-semibold underline">Sign up</Link>
				</p>
				</form>
			</div>
		</div>

	);
}