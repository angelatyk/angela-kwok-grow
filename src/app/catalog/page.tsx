"use client";

import Button from "@/components/Button/Button";
import PlantCard from "@/components/PlantCard/PlantCard";
import { useEffect, useState } from "react";
import "./catalog.scss";

export default function Catalog() {
	const [plantList, setPlantList] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [count, setCount] = useState(1);

	useEffect(() => {
		const getPlantList = () => {
			setLoading(true);
			const apiKey = process.env.NEXT_PUBLIC_PERENUAL_API_KEY;
			const perenualApiURL = "https://perenual.com/api/species-list?key=";
			fetch(`${perenualApiURL}${apiKey}&edible=1&page=${count}`)
				.then((res) => res.json())
				.then((json) => {
					setPlantList((plantList) => [...plantList, ...json.data]);
					setLoading(false);
				})
				.catch((error) => {
					throw new Error(`There was an issue retriving data from the API: ${error}`);
				});
		};

		getPlantList();
	}, [count]);

	return (
		<main>
			<h1 className="headline-padding">Catalog</h1>
			<div className="plant-list">{plantList && plantList.map((plant: any, index: number) => <PlantCard key={index} plant={plant} />)}</div>
			{count <= 100 && <Button label={loading ? "Loading..." : "Load More"} buttonType="button" className="load-more-button" actionFunction={() => setCount(count + 1)} />}
		</main>
	);
}
