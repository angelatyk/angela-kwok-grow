export interface Plant {
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
