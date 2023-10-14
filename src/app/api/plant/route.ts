import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
	const session = await getServerSession();

	if (!session) {
		return new NextResponse("Unauthorized", { status: 401 });
	}

	try {
		const plantData = await request.json();

		const newPlant = await prisma.plant.create({
			data: {
				externalId: plantData.externalId,
				name: plantData.name,
				description: plantData.description,
				imageUrl: plantData.imageUrl,
				wateringFrequency: plantData.wateringFrequency,
				harvestSeason: plantData.harvestSeason,
				daysToGerminate: plantData.daysToGerminate,
				daysToHarvest: plantData.daysToHarvest,
			},
		});

		return NextResponse.json(newPlant, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: `Error adding Plant: ${error}` }, { status: 400 });
	}
}
