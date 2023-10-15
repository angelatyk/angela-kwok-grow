import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
	const session = await getServerSession();

	if (!session) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const completed = await request.json();
		const updateComplete = await prisma.todo.update({ where: { id: params.id }, data: { completed: completed } });

		return NextResponse.json(updateComplete, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: `Error updating todo for ${params.id}: ${error}` }, { status: 404 });
	}
}
