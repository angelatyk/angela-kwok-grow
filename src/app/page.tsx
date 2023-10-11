"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
	return (
		<main>
			<h1>Home</h1>
			<button onClick={() => signIn()}>Sign in</button>
		</main>
	);
}
