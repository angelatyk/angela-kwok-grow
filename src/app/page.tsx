import TodoList from "@/components/TodoList/TodoList";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import "./homepage.scss";

export default async function Home() {
	const session = await getServerSession();
	const userName = session?.user.name ? session.user.name.split(" ")[0] : "";

	if (!session) {
		redirect("/sign-in");
	}

	return (
		<main>
			<h1 className="headline-padding welcome-heading">Welcome {userName}!</h1>
			<TodoList />
		</main>
	);
}
