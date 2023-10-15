import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import SessionProvider from "@/components/SessionProvider";
import ToastProvider from "@/components/ToastProvider";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import "./layout.scss";

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
					{session && <Header />}
					{children}
					<ToastProvider />
					<Footer />
				</SessionProvider>
			</body>
		</html>
	);
}
