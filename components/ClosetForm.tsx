"use client"
import { useState } from "react";

export default function ClosetForm(){
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	    const file = event.target.files?.[0];

		if (!file) {
		setSelectedImage(null);
		return;
		}

		const previewUrl = URL.createObjectURL(file);
		setSelectedImage(previewUrl);
  	};

	const handleRemoveImage = () => {
		setSelectedImage(null);
		const input = document.getElementById("clothePic") as HTMLInputElement;
		if (input) input.value = "";		
	};
	return (
		<div className="flex min-h-screen items-center justify-center bg-pink-300 p-6">
			<h1 className="absolute top-5 text-pink-800 text-center text-2xl font-semibold">
				Upload a piece of clothing
			</h1>
			<br />
			<form action="" method="post" className="w-full max-w-md rounded-2xl border-pink-800 border-2 p-6">
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
				<input type="text" name="" id="clotheName" className="bg-white rounded-lg" />
				<br />
				<p>Category</p>
				<div>
					<input type="radio" name="category" id="top" value="top" />
					<label htmlFor="top">Top</label>					
				</div>
				<div>
					<input type="radio" name="category" id="bottom" value="bottom" />
					<label htmlFor="bottom"> Bottom </label>					
				</div>
				<div>
					<input type="radio" name="category" id="shoes" value="shoes"/>
					<label htmlFor="shoes"> Shoes </label>					
				</div>
				<div className="flex justify-center">
					<input type="submit" value="Upload" className="flex justify-center w-full max-w-xs rounded-full bg-pink-700 p-2 text-white"/>

				</div>
			</form>
		</div>
	);
}