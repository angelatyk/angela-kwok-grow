import PlantCard from "@/components/PlantCard/PlantCard";
import "./catalog.scss";

async function getPlantList() {
	const apiKey = "sk-1R0b65270bce208332427";
	const perenualApiURL = "https://perenual.com/api/species-list?key=";
	const response = await fetch(`${perenualApiURL}${apiKey}&edible=1`);
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const result = await response.json();
	return result?.data as any[];
}

export default async function Catalog() {
	const plantList = await getPlantList();

	return (
		<main>
			<h1 className="headline-padding">Catalog</h1>
			<div className="plant-list">{plantList && plantList.map((plant: any) => <PlantCard key={plant.id} plant={plant} />)}</div>
		</main>
	);
}
