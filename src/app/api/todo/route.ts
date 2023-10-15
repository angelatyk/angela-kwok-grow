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
		const taskData = await request.json();
		const newTask = await prisma.todo.create({
			data: {
				title: taskData.title,
				completed: false,
				dueOn: taskData.dueOn,
				userId: taskData.userId,
				plantId: taskData.plantId,
			},
		});

		return NextResponse.json(newTask, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: `Error adding Task: ${error}` }, { status: 400 });
	}
}
