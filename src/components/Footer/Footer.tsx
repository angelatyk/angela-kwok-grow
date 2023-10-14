import { getServerSession } from "next-auth";
import "./Footer.scss";

export default async function Footer() {
	const session = await getServerSession();

	return <footer className={"footer " + (!session ? "not-signed-in" : "")}>© Grow Inc. All Rights Reserved.</footer>;
}
