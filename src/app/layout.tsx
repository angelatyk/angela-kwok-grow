import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./layout.scss";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import SessionProvider from "@/components/SessionProvider";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Grow",
	description: "An app to help make your garden a successful one.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession();

	return (
		<html lang="en">
			<body className={inter.className}>
				<SessionProvider session={session}>
					<Header />
					{children}
					<Footer />
				</SessionProvider>
			</body>
		</html>
	);
}
