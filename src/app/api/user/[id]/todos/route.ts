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
		const userTasks = await prisma.todo.findMany({
			where: { userId: params.id },
		});

		return NextResponse.json(userTasks, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: `Error retrieving tasks for ${params.id}: ${error}` }, { status: 404 });
	}
}
