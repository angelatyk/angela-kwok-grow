"use client";

import Button from "@/components/Button/Button";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
	const { data: session } = useSession();

	if (!session) {
		redirect("/sign-in");
	}

	return (
		<main>
			<h1>Welcome {session?.user?.name}!</h1>
			<Button label="Sign Out" buttonType="button" actionFunction={() => signOut()} />
		</main>
	);
}
