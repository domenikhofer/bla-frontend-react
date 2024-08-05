import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: async ({ auth,  request: { nextUrl } }) => {
      if(auth?.user?.email !== 'domenikhofer@gmail.com') {
        return false
      }
      if(nextUrl.pathname.startsWith('/login') && !!auth?.user) {
        console.log(auth)
        return Response.redirect(new URL('/', nextUrl));
      }
      return !!auth
    },
  },
})