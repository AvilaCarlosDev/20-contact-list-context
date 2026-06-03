import rigoImageUrl from "../assets/img/rigo-baby.jpg";

export const Home = () => {
	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!!</h1>
			<p>
				<img src={rigoImageUrl} alt="Rigo baby" />
			</p>
		</div>
	);
}; 
