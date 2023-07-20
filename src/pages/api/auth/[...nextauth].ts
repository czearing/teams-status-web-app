import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

export default NextAuth({
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID,
      authorization: {
        params: {
          scope: "openid email profile User.Read",
        },
      },
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

    async session({ session, token }) {
      if (session) {
        session = Object.assign({}, session, {
          access_token: token.access_token,
          user_id: token.user_id,
        });
      }
      return session;
    },

    async jwt({ token, account, user }) {
      if (account) {
        token = Object.assign({}, token, {
          access_token: account.access_token,
        });
      }
      if (user) {
        token = Object.assign({}, token, {
          user_id: user.id,
        });
      }
      return token;
    },
  },

  debug: false,
});
