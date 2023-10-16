"use client";

import Button from "@/components/Button/Button";
import TodoList from "@/components/TodoList/TodoList";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import "./homepage.scss";

export default function Home() {
	const { data: session } = useSession();
	const userName = session?.user.name ? session.user.name.split(" ")[0] : "";

	if (!session) {
		redirect("/sign-in");
	}

	return (
		<main>
			<h1 className="headline-padding welcome-heading">Welcome {userName}!</h1>
			<TodoList />
			<Button label="Sign Out" buttonType="button" actionFunction={() => signOut()} />
		</main>
	);
}
