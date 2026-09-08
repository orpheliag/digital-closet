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
		return <main className="app-shell flex min-h-screen items-center justify-center text-pink-900">Checking your session...</main>;
	}

	return (
		<div className="app-shell min-h-screen p-6 sm:p-10">
			<div className="mx-auto max-w-2xl">
				<div className="mb-8">
					<p className="text-sm font-bold uppercase tracking-[0.2em] text-pink-700">Your wardrobe</p>
					<h1 className="mt-2 text-4xl font-bold text-pink-950">Add a clothing piece</h1>
					<p className="mt-2 max-w-lg text-pink-900/70">Give your closet a little more range. Add a photo, name it, and place it in a category.</p>
				</div>
				<form onSubmit={handleSubmit} className="app-panel p-6 sm:p-8">
					<label htmlFor="clothePic" className="app-label">Picture</label>
				<input 
					type="file" 
					accept="image/*" 
					onChange={handleFileChange}
					name="clothePic" id="clothePic" className="mt-2 block w-full text-sm text-pink-900 file:mr-4 file:rounded-full file:border-0 file:bg-pink-100 file:px-4 file:py-2 file:font-semibold file:text-pink-800 hover:file:bg-pink-200"
				/> 
				{selectedImage && (
					<div className="mt-5 overflow-hidden rounded-2xl bg-pink-50 p-3">
						<img
							src={selectedImage}
							alt="Selected outfit"
							className="h-64 w-full rounded-xl object-cover"
						/>
						<button
							type="button"
							onClick={handleRemoveImage}
							className="app-button-quiet mt-3 text-sm"
						>
						Remove picture
						</button>
					</div>
        		)}
				<label htmlFor="clotheName" className="app-label mt-6 block">Name</label>
				<input type="text" name="clotheName" id="clotheName" value={name} onChange={(event) => setName(event.target.value)} className="app-input mt-2" />
				<fieldset className="mt-6">
					<legend className="app-label">Category</legend>
					<div className="mt-3 grid gap-3 sm:grid-cols-3">
						<label className="flex cursor-pointer items-center gap-2 rounded-xl border border-pink-200 bg-pink-50 p-3 text-sm font-semibold has-checked:border-pink-700 has-checked:bg-pink-100">
					<input type="radio" name="category" id="top" value="top" checked={category === "top"} onChange={() => setCategory("top")} />
						<span>Top</span>
						</label>
						<label className="flex cursor-pointer items-center gap-2 rounded-xl border border-pink-200 bg-pink-50 p-3 text-sm font-semibold has-checked:border-pink-700 has-checked:bg-pink-100">
					<input type="radio" name="category" id="bottom" value="bottom" checked={category === "bottom"} onChange={() => setCategory("bottom")} />
						<span>Bottom</span>
						</label>
						<label className="flex cursor-pointer items-center gap-2 rounded-xl border border-pink-200 bg-pink-50 p-3 text-sm font-semibold has-checked:border-pink-700 has-checked:bg-pink-100">
					<input type="radio" name="category" id="shoes" value="shoes" checked={category === "shoes"} onChange={() => setCategory("shoes")} />
						<span>Shoes</span>
						</label>
					</div>
				</fieldset>
				<div className="mt-7 flex justify-end">
					<input type="submit" value={isSubmitting ? "Uploading..." : "Upload piece"} disabled={isSubmitting} className="app-button-primary w-full sm:w-auto"/>
				</div>
				{message && <p className="app-message-success mt-4">{message}</p>}
				{errorMessage && <p className="app-message-error mt-4">{errorMessage}</p>}
				</form>
			</div>
		</div>
	);
}