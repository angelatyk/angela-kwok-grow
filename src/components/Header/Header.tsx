import Logo from "@/components/Logo/Logo";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Button from "../Button/Button";
import "./Header.scss";

export default async function Header() {
	const session = await getServerSession();

	return (
		<header className="header">
			<Logo />
			{session && (
				<nav className="nav-bar">
					<Link href="/todo">
						<Button label="Todo" buttonType="button" />
					</Link>
					<Link href="/catalog">
						<Button label="Catalog" buttonType="button" />
					</Link>
				</nav>
			)}
		</header>
	);
}
