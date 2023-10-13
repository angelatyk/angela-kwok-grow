import logoImage from "@/assets/logos/Grow-logo.svg";
import Image from "next/image";
import Link from "next/link";
import "./Logo.scss";

export default function Logo() {
	return (
		<div className="logo">
			<Link href="/">
				<Image className="logo__image" src={logoImage} alt="Grow Logo" width={150} />
			</Link>
		</div>
	);
}
