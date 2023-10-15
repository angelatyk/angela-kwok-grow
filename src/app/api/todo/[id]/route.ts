import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
	const session = await getServerSession();

	if (!session) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const deleteTask = await prisma.todo.delete({ where: { id: params.id } });

		return NextResponse.json({ status: 204 });
	} catch (error) {
		return NextResponse.json({ message: `Error deleting todo for ${params.id}: ${error}` }, { status: 404 });
	}
}
