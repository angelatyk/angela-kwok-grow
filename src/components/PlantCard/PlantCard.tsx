"use client";

import IconButton from "@/components/IconButton/IcontButton";
import { useSession } from "next-auth/react";
import Image from "next/image";
import "./PlantCard.scss";

type Props = {
	plant: any;
};

interface Plant {
	id?: string;
	externalId: string;
	name: string;
	description: string;
	imageUrl: string;
	wateringFrequency: string;
	harvestSeason: string;
	daysToGerminate: number;
	daysToHarvest: number;
}

interface Todo {
	title: string;
	dueOn: Date;
	userId: string;
	plantId: string;
}

const getPlantData = async (id: string) => {
	const dbPlantResponse = await fetch(`/api/plant/details/${id}`);
	if (dbPlantResponse.ok) {
		const dbPlantResult = await dbPlantResponse.json();
		let plant: Plant = dbPlantResult;
		return plant;
	} else {
		const apiKey = process.env.NEXT_PUBLIC_PERENUAL_API_KEY;
		const apiResponse = await fetch(`https://perenual.com/api/species/details/${id}?key=${apiKey}`);
		if (!apiResponse.ok) {
			throw new Error(`Error getting plant data: ${apiResponse.status}`);
		}
		const apiPlantResult = await apiResponse.json();

		let newPlant: Plant = {
			externalId: apiPlantResult.id.toString(),
			name: apiPlantResult.common_name,
			description: apiPlantResult.description,
			imageUrl: apiPlantResult.default_image.original_url,
			wateringFrequency: apiPlantResult.watering,
			harvestSeason: apiPlantResult.harvest_season,
			daysToGerminate: Math.floor(Math.random() * (30 - 10 + 1) + 10),
			daysToHarvest: Math.floor(Math.random() * (90 - 30 + 1) + 30),
		};

		const newPantReponse = await fetch("/api/plant", {
			method: "POST",
			body: JSON.stringify(newPlant),
		});
		if (!newPantReponse.ok) {
			throw new Error(`Error adding plant: ${newPantReponse.status}`);
		}
		return newPantReponse.json();
	}
};

const createDefaultUserTasks = async (userId: string, plantData: Plant) => {
	try {
		const today = new Date();
		const germinationDate = new Date();
		germinationDate.setDate(today.getDate() + plantData.daysToGerminate);
		const harvestDate = new Date();
		harvestDate.setDate(today.getDate() + plantData.daysToHarvest);

		const newTodoURL = "/api/todos/new";
		// Add task for seeding
		let seedingTask: Todo = {
			title: `Seeding for ${plantData.name}`,
			dueOn: today,
			userId: userId,
			plantId: plantData.id!,
		};
		await fetch(newTodoURL, {
			method: "POST",
			body: JSON.stringify(seedingTask),
		});
		// Add task for germination
		let germinationTask: Todo = {
			title: `Germination complete for ${plantData.name}`,
			dueOn: germinationDate,
			userId: userId,
			plantId: plantData.id!,
		};
		await fetch(newTodoURL, {
			method: "POST",
			body: JSON.stringify(germinationTask),
		});
		// Add task for harvest
		let harvestTask: Todo = {
			title: `Harvest time for ${plantData.name}`,
			dueOn: harvestDate,
			userId: userId,
			plantId: plantData.id!,
		};
		await fetch(newTodoURL, {
			method: "POST",
			body: JSON.stringify(harvestTask),
		});
	} catch (error) {
		throw new Error(`Error adding tasks: ${error}`);
	}
};

export default function PlantCard({ plant }: Props) {
	const { data: session } = useSession();

	const handleAddPlantToList = async (id: string) => {
		const plantData = await getPlantData(id);
		createDefaultUserTasks(session!.user.id, plantData);
	};

	return (
		<>
			<article className="plant-card">
				<div className="plant-card__image-container">
					<Image className="plant-card__image" src={plant?.default_image?.original_url} alt={plant.common_name + " Image"} width={0} height={0} sizes="100vw" />
				</div>
				<div className="plant-card__details-container">
					<h2>{plant.common_name}</h2>
					<div className="action-buttons">
						<IconButton actionType="favourite" />
						<IconButton actionType="add" actionFunction={() => handleAddPlantToList(plant.id)} />
					</div>
				</div>
			</article>
		</>
	);
}
