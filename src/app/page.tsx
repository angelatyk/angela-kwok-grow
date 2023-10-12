"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
	const { data: session } = useSession();

	return (
		<main>
			<h1>Home</h1>
			{session ? <button onClick={() => signOut()}>Sign Out</button> : <button onClick={() => signIn()}>Sign in</button>}
		</main>
	);
}
