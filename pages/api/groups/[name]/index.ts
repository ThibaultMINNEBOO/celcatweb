import {NextApiRequest, NextApiResponse} from "next";
import {db} from "@/src/lib/prisma";

export default async function hander(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {name, week = 36, day = 0, page = 1} = req.query as {name: string, week: string|undefined, day: string|undefined, page: string|undefined};

    // @ts-ignore
    if (isNaN(page)) res.status(422).json({ message: "Please provides a number for page or limit" });

    const numberGroup = name[5];
    const tdNumber = name.length === 12 ? name[10] : name[9];


    const likeTP = `INF-S${numberGroup}-TP-${tdNumber}_`
    const likeCM = `INF-S${numberGroup}-CM`;
    const actualPage = parseInt(page.toString());
    const resultPerPages = 3;
    const offset = actualPage === 1 ? 0 : (resultPerPages*(actualPage-1))

    const maxResults = await db.$queryRaw`SELECT COUNT(module) as nbModules FROM events WHERE (\`group\` LIKE ${name} OR \`group\` LIKE ${likeCM} OR \`group\` LIKE ${likeTP} )  AND week = ${week} AND day = ${day} AND teacher NOT LIKE 'INF%'` as { nbModules: bigint }[]

    const nbModules = parseInt(maxResults[0].nbModules.toString())

    const maxPages = Math.ceil(nbModules/resultPerPages);

    const events = await db.$queryRaw`
    SELECT * FROM events
    WHERE (\`group\` LIKE ${name} OR \`group\` LIKE ${likeTP} OR \`group\` LIKE ${likeCM}) 
    AND day = ${parseInt(day as string)} AND week = ${parseInt(week as string)}
    AND teacher NOT LIKE 'INF%'
    ORDER BY hDeb
    LIMIT ${resultPerPages}
    OFFSET ${offset}
    `

    res.status(200).json({ events, maxPages, actualPage })
}
