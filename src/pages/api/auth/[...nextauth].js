import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

export default NextAuth({
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_TENANT_ID,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },

  pages: {
    signIn: "/error",
    error: "/error",
    newUser: "/error",
  },

  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl;
    },

    async session({ session }) {
      return session;
    },

    async jwt({ token }) {
      return token;
    },
  },

  debug: false,
});
