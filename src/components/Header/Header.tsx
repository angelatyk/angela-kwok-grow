"use client";

import Button from "@/components/Button/Button";
import Logo from "@/components/Logo/Logo";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Avatar from "../Avatar/Avatar";
import "./Header.scss";

export default function Header() {
	const { data: session } = useSession();
	const pathname = usePathname();

	return (
		<header className="header">
			<Logo />
			{session && (
				<>
					<nav className="nav-bar">
						<Link href="/todo">
							<Button label="Todo" buttonType="button" className={pathname.includes("/todo") ? "--active" : ""} />
						</Link>
						<Link href="/catalog">
							<Button label="Catalog" buttonType="button" className={pathname.includes("/catalog") ? "--active" : ""} />
						</Link>
					</nav>
					<Avatar avatarImage={session.user.image} avatarAlt={session.user.name + " Profile Picture"} />
				</>
			)}
		</header>
	);
}
