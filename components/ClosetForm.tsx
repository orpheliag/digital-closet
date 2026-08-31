"use client"
export default function ClosetForm(){
	return (
		<div className="min-h-screen w-full items-center justify-center bg-pink-300">
			<form action="" method="post" className="justify-center">
				<label htmlFor="clothePic">Select a picture:</label>
				<br />
				<input type="file" 
					   accept="image/*" 
					   onChange={(e) => console.log(e.target.files?.[0])}
					   name="" id="clothePic" /> 
				<br />
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
				<input type="submit" value="Upload" className="bg-pink-700 text-white rounded-full p-2"/>
			</form>
		</div>
	);
}