import { createSessionClient } from "@/appwrite/config";
import { cookies } from "next/headers";

import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const sessionCookie = cookies().get("session");

    if (!sessionCookie) {
        return Response.json("Session cookie not found", {
            status: 401,
        });
    }

    try {
        const { databases } = await createSessionClient(sessionCookie.value);
        const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID;
        const collectionId = process.env.NEXT_PUBLIC_COLLECTION_ORDERS;

        if (!databaseId || !collectionId) {
            throw new Error("Environment variables for database or collection are not set");
        }

        const { documents: orders, total } = await databases.listDocuments(
            databaseId,
            collectionId
        );
        return Response.json({ orders, total });
    } catch (error) {
        console.error("ERROR", error);
        return Response.json("Access DENIED!", {
            status: 403,
        });
    }
}