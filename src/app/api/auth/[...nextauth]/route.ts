import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

const handler = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			if (account) {
				// Check if the user has successfully signed in with Google
				if (account.provider === "google") {
					if (!user.email) {
						return false; // Reject user
					}

					// Check if the user already exists in database
					const existingUser = await prisma.user.findUnique({
						where: { email: user.email },
					});

					if (!existingUser) {
						// Create a user if they don't exist
						await prisma.user.create({
							data: {
								name: user.name,
								email: user.email,
								image: user.image,
							},
						});
					}
					return true; // Return true to allow the sign-in
				}
			}
			return false; // Reject user
		},
	},
});

export { handler as GET, handler as POST };
