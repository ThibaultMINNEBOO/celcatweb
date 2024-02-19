import {NextApiRequest, NextApiResponse} from "next";
import {db} from "@/src/lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const groups = await db.$queryRaw`SELECT DISTINCT \`group\` FROM events WHERE \`group\` LIKE 'INF-S_-TD_' ORDER BY 1`;

    res.status(200).json({ groups })
}
