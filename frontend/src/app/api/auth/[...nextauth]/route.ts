import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const backendUrl = process.env['NEXT_PUBLIC_BACKEND_URL'];
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(
          `${backendUrl}/signin`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = await res.json();
        //arreglar los errores de validadcion 
        console.log(user.error)
        if (user.error) throw user;


        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: "/authentication/log-in",
  },
});

export { handler as GET, handler as POST };
