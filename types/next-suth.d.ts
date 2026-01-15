import { DefaultSession } from "next-auth"

declare module 'next-auth' {
    interface Session {
        user: User & DefaultSession['user']

    }
}

interface user {
    id: string;
    name: string;
    email: string;
    emailVerified?: Boolean | string| null;
    image?: string;
    stripe_customer_id?: string 
    times: string[];
    adress?: string;
    phone?: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
}
