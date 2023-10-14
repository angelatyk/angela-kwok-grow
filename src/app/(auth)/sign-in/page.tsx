"use client";

import Button from "@/components/Button/Button";
import Logo from "@/components/Logo/Logo";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import "./sign-in.scss";

export default function SignIn() {
	const { data: session } = useSession();

	if (session) {
		redirect("/");
	}

	return (
		<main className="sign-in">
			<div className="heading-padding">
				<Logo />
			</div>
			<Button label="Sign in" className="sign-in-button" buttonType="button" actionFunction={() => signIn()} />
		</main>
	);
}
