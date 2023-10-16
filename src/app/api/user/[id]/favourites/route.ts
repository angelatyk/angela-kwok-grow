import { Plant, PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
	const session = await getServerSession();

	if (!session) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const userFavourites = await prisma.favourites.findMany({
			select: {
				plantExternalId: true,
			},
			where: { userId: params.id },
		});

		return NextResponse.json(userFavourites, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: `Error retrieving tasks for ${params.id}: ${error}` }, { status: 404 });
	}
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
	const session = await getServerSession();

	if (!session) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const plantData = await request.json();
		const newFavourite = await prisma.favourites.create({
			data: {
				userId: params.id,
				plantId: plantData.id,
				plantExternalId: plantData.externalId,
			},
		});

		return NextResponse.json(newFavourite, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: `Error adding user favourites: ${error}` }, { status: 400 });
	}
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
	const session = await getServerSession();

	if (!session) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const plantData: Plant = await request.json();
		const deleteTask = await prisma.favourites.delete({ where: { userId_plantId: { userId: params.id, plantId: plantData.id } } });

		return NextResponse.json({ status: 204 });
	} catch (error) {
		return NextResponse.json({ message: `Error deleting todo for ${params.id}: ${error}` }, { status: 404 });
	}
}
