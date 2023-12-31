"use client";

import Avatar from "@/components/Avatar/Avatar";
import Button from "@/components/Button/Button";
import Logo from "@/components/Logo/Logo";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
						<Link href="/">
							<Button label="Todo" buttonType="button" className={pathname == "/" ? "--active" : ""} />
						</Link>
						<Link href="/catalog">
							<Button label="Catalog" buttonType="button" className={pathname.includes("/catalog") ? "--active" : ""} />
						</Link>
						<Link href="/api/auth/signout">
							<Button label="Sign Out" buttonType="button" />
						</Link>
					</nav>
					<Avatar avatarImage={session.user.image} avatarAlt={session.user.name + " Profile Picture"} />
				</>
			)}
		</header>
	);
}
