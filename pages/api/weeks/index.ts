import {PrismaClient} from "@prisma/client";
import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const db = new PrismaClient();

    const weeks = await db.$queryRaw`SELECT DISTINCT week FROM events`;

    res.status(200).json({ weeks })
}
