"use client"
import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";
import { getCurrentUser,signOut } from "../lib/user";

type User = {
  id: string;
  email?: string;
  user_metadata?: {
    username?: string;
  };
};

export default function AccountPage(){
	const router = useRouter();

	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");
	useEffect(() => {
	async function loadUser() {
		try {
		const currentUser = await getCurrentUser();
		setUser(currentUser);
		} catch (error) {
		setErrorMessage(
			error instanceof Error ? error.message : "Unable to load user",
		);
		} finally {
		setLoading(false);
		}
	}

	loadUser();
	}, []);
	async function handleSignOut(){
		try {
			await signOut();
			router.push("/");
		} catch (error) {
			setErrorMessage(
			error instanceof Error ? error.message : "Unable to log out",
		);
		}
	}	
	if (loading) {
		return <p>Loading account...</p>;
	}

	if (errorMessage) {
		return <p>{errorMessage}</p>;
	}

	if (!user) {
		return <p>No user is logged in.</p>;
	}

	return(
		<main className="min-h-screen w-full bg-pink-300 text-white">
			<h1>My account</h1>
			<p>Email: {user.email}</p>
			<p>Pseudo: {user.user_metadata?.username}</p>
			<p>My closet</p>
			<button 
			onClick={handleSignOut} 
			className="bg-pink-700 text-white rounded-full p-2">
				Sign out
			</button>
		</main>
	);
}