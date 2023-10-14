import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
	const session = await getServerSession();

	if (!session) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const dbPlant = await prisma.plant.findUnique({
			where: { externalId: params.id },
		});
		if (dbPlant) {
			return NextResponse.json(dbPlant, { status: 200 });
		} else {
			return NextResponse.json({ message: "Plant Not Found" }, { status: 404 });
		}
	} catch (error) {
		return NextResponse.json({ message: `Error retrieving Plant: ${error}` }, { status: 404 });
	}
}
