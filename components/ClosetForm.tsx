"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { uploadClothing } from "../lib/closet";
import { getCurrentUser } from "../lib/user";
import type { ClothingItem } from "../lib/types";

export default function ClosetForm(){
	const router = useRouter();
	const [isCheckingAuth, setIsCheckingAuth] = useState(true);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [name, setName] = useState("");
	const [category, setCategory] = useState<ClothingItem["category"] | "">("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [message, setMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		async function checkAuthentication() {
			const user = await getCurrentUser();

			if (!user) {
				router.replace("/login?next=/closet");
				return;
			}

			setIsCheckingAuth(false);
		}

		checkAuthentication();
	}, [router]);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	    const file = event.target.files?.[0];

		if (!file) {
		setSelectedFile(null);
		setSelectedImage(null);
		return;
		}

		setSelectedFile(file);
		const previewUrl = URL.createObjectURL(file);
		setSelectedImage(previewUrl);
  	};

	const handleRemoveImage = () => {
		setSelectedImage(null);
		const input = document.getElementById("clothePic") as HTMLInputElement;
		if (input) input.value = "";		
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setMessage("");
		setErrorMessage("");

		if (!selectedFile || !name.trim() || !category) {
			setErrorMessage("Select an image, enter a name, and choose a category.");
			return;
		}

		setIsSubmitting(true);
		try {
			await uploadClothing({ file: selectedFile, name: name.trim(), category });
			setSelectedFile(null);
			setSelectedImage(null);
			setName("");
			setCategory("");
			const input = document.getElementById("clothePic") as HTMLInputElement;
			if (input) input.value = "";
			setMessage("Clothing item uploaded.");
		} catch (error) {
			setErrorMessage(
				error instanceof Error ? error.message : "Unable to upload clothing item.",
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	if (isCheckingAuth) {
		return <main className="flex min-h-screen items-center justify-center bg-pink-300">Checking your session...</main>;
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-pink-300 p-6">
			<h1 className="absolute top-5 text-pink-800 text-center text-2xl font-semibold">
				Upload a piece of clothing
			</h1>
			<br />
			<form onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl border-pink-800 border-2 p-6">
				<label htmlFor="clothePic">Select a picture:</label>
				<br />
				<input 
					type="file" 
					accept="image/*" 
					onChange={handleFileChange}
					name="" id="clothePic"
				/> 
				<br />
				{selectedImage && (
					<div className="mb-4">
						<img
							src={selectedImage}
							alt="Selected outfit"
							className="h-48 w-base rounded-xl object-cover"
						/>
						<button
							type="button"
							onClick={handleRemoveImage}
							className="mt-2 rounded-full bg-red-500 px-3 py-1 text-sm text-white"
						>
						Remove picture
						</button>
					</div>
        		)}
				<label htmlFor="clotheName"> Name </label> 
				<br />
				<input type="text" name="clotheName" id="clotheName" value={name} onChange={(event) => setName(event.target.value)} className="bg-white rounded-lg" />
				<br />
				<p>Category</p>
				<div>
					<input type="radio" name="category" id="top" value="top" checked={category === "top"} onChange={() => setCategory("top")} />
					<label htmlFor="top">Top</label>					
				</div>
				<div>
					<input type="radio" name="category" id="bottom" value="bottom" checked={category === "bottom"} onChange={() => setCategory("bottom")} />
					<label htmlFor="bottom"> Bottom </label>					
				</div>
				<div>
					<input type="radio" name="category" id="shoes" value="shoes" checked={category === "shoes"} onChange={() => setCategory("shoes")} />
					<label htmlFor="shoes"> Shoes </label>					
				</div>
				<div className="flex justify-center">
					<input type="submit" value={isSubmitting ? "Uploading..." : "Upload"} disabled={isSubmitting} className="flex justify-center w-full max-w-xs rounded-full bg-pink-700 p-2 text-white disabled:opacity-50"/>

				</div>
				{message && <p className="mt-3 text-green-700">{message}</p>}
				{errorMessage && <p className="mt-3 text-red-700">{errorMessage}</p>}
			</form>
		</div>
	);
}