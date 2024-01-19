import clientPromise from "@/libs/mongoConnect";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { User } from "@/app/models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from 'bcrypt';
import mongoose from "mongoose";

export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      id: 'credentials',
      type: 'credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log('credentials', {credentials});
        const email = credentials?.email;
        const password = credentials?.password;

        // Connect to MongoDB
        mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

        try {
          let user = await User.findOne({ email });

          if (!user) {
            console.log('no user', user)
            // If user not found, return null
            return Promise.resolve(null);
          }

          console.log('Original Password:', credentials.password);
          console.log('Hashed Password in Database:', user.password);
      
          const passwordOk = await bcrypt.compare(credentials.password, user.password);
      
          console.log('Password Comparison Result:', passwordOk);

          // If no error and we have user data, return it
          if (passwordOk) {
            return Promise.resolve(user);
          }

          // Return null if user data could not be retrieved
          return Promise.resolve(null);
        } catch (error) {
          console.error('Error during authentication:', error);
          return Promise.resolve(null);
        }
      }
    })
  ]
}

const handler = NextAuth(authOptions);

// export default handler;


export { handler as GET, handler as POST }