import GoogleProvider from "next-auth/providers/google";
import { getServerSession } from "next-auth";
import clientPromise from "./mongoAdapter";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import User from "@/schemaModels/user";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
};

export const getAuthSession = () => getServerSession(authOptions);
