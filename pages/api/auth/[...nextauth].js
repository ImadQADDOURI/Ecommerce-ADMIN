import NextAuth, {getServerSession} from 'next-auth'
import EmailProvider from "next-auth/providers/email"
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter"
import GitHubProvider from "next-auth/providers/github";
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

const adminEmails = ['imad999qaddouri@gmail.com'];

export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    EmailProvider({}),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    FacebookProvider({}),
    TwitterProvider({}),
    GitHubProvider({})
    
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({session,token,user}) => {
      if (adminEmails.includes(session?.user?.email) || true) {
        return session;
      } else {
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);

export async function isAdminRequest(req,res) {
  const session = await getServerSession(req,res,authOptions);
  if ( !adminEmails.includes(session?.user?.email) && false ) {
    res.status(401);
    res.end();
    throw 'not an admin';
  }
}