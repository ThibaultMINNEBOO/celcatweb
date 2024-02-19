import {NextApiRequest, NextApiResponse} from "next";
import {db} from "@/src/lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {page = 1, limit = 10, search = ''} = req.query;

    // @ts-ignore
    if (isNaN(page) || isNaN(limit)) res.status(422).json({ message: "Please provides a number for page or limit" });

    const resultPerPages = parseInt(limit.toString());
    const actualPage = parseInt(page.toString());

    const offset = actualPage === 1 ? 0 : (resultPerPages*(actualPage-1))

    const exprModule = `%${search}%`

    const maxResults = await db.$queryRaw`SELECT COUNT(DISTINCT module) as nbModules FROM events WHERE teacher NOT LIKE 'INF%' AND (module LIKE ${exprModule} OR fullname LIKE ${exprModule})` as {nbModules: number}[];
    const nbModules = parseInt(maxResults[0].nbModules.toString())

    const data = await db.$queryRaw`SELECT DISTINCT module, fullname FROM events WHERE teacher NOT LIKE 'INF%' AND (module LIKE ${exprModule} OR fullname LIKE ${exprModule}) ORDER BY 1 LIMIT ${resultPerPages} OFFSET ${offset}`;

    // @ts-ignore
    const maxPages = Math.ceil(nbModules/resultPerPages);

    res.status(200).json({ modules: data, maxPages, actualPage });
}
