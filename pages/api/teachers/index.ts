import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";

const db = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {page = 1, limit = 10} = req.query;

    // @ts-ignore
    if (isNaN(page) || isNaN(limit)) res.status(422).json({ message: "Please provides a number for page or limit" });

    const resultPerPages = parseInt(limit.toString());
    const actualPage = parseInt(page.toString());

    const offset = (resultPerPages*(actualPage-1))+1

    const maxResults = await db.$queryRaw`SELECT COUNT(DISTINCT teacher) as nbTeachers FROM events WHERE teacher NOT LIKE 'INF%'` as {nbTeachers: number}[];
    const nbTeachers = parseInt(maxResults[0].nbTeachers.toString())

    const maxPages = Math.ceil(nbTeachers/resultPerPages);

    const data = await db.$queryRaw`SELECT DISTINCT teacher FROM events WHERE teacher NOT LIKE 'INF%' LIMIT ${resultPerPages} OFFSET ${offset}`;

    res.status(200).json({ teachers: data, maxPages, actualPage });
}
