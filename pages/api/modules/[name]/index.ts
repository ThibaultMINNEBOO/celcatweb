import {NextApiRequest, NextApiResponse} from "next";
import {db} from "@/src/lib/prisma";

export default async function hander(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {name, week = 36, day = 0, page = 1} = req.query;

    // @ts-ignore
    if (isNaN(page)) res.status(422).json({ message: "Please provides a number for page or limit" });

    const actualPage = parseInt(page.toString());
    const resultPerPages = 3;
    const offset = actualPage === 1 ? 0 : (resultPerPages*(actualPage-1))

    const maxResults = await db.$queryRaw`SELECT COUNT(module) as nbModules FROM events WHERE teacher NOT LIKE 'INF%' AND module LIKE ${name} AND week = ${week} AND day = ${day}` as { nbModules: bigint }[]

    const nbModules = parseInt(maxResults[0].nbModules.toString())

    const maxPages = Math.ceil(nbModules/resultPerPages);

    const events= await db.events.findMany({
        where: {
            module: {
                equals: name as string,
            },
            AND: {
                NOT: {
                    teacher: {
                        contains: 'INF%'
                    }
                },
                week: {
                    equals: parseInt(week as string)
                },
                day: {
                    equals: parseInt(day as string)
                }
            }
        },
        take: resultPerPages,
        skip: offset,
        orderBy: [
            {
                hDeb: 'asc'
            }
        ]
    });

    res.status(200).json({ events, maxPages, actualPage })
}
