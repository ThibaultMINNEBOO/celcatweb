'use client'

import {QueryClient, QueryClientProvider, useQuery} from "@tanstack/react-query";
import Loader from "@/components/Loader";
import {useState} from "react";
import Pagination from "@/components/Pagination";
import WeekSelect from "@/components/WeekSelect";
import DaySelect from "@/components/DaySelect";

const client = new QueryClient();

export default function Root({ params }: { params: { name: string }}) {
    return <QueryClientProvider client={client}>
        <Page params={params} />
    </QueryClientProvider>
}

function Page({ params }: { params: { name: string } }) {

    const [page, setPage] = useState(1)
    const [week, setWeek] = useState(36)
    const [day, setDay] = useState(0)

    const {isPending, error, data} = useQuery({
        queryKey: [page, week, day],
        queryFn: () =>
            fetch(`/api/teachers/${params.name}?week=${week}&day=${day}`).then((res) => res.json()),
    });

    if (isPending) return <Loader />

    const name = decodeURIComponent(params.name)

    return (
        <main className="flex gap-10 items-center mt-5 justify-center flex-col">
            <h1 className="text-3xl font-bold">Cours de <span className="text-primary">{name}</span></h1>
            <div className="flex gap-4 w-full justify-center">
                <WeekSelect onChange={(week: number) => setWeek(week)} week={week} />
                <DaySelect day={day} onChange={(day: number) => setDay(day)} />
            </div>
            {data.maxPages !== 1 && <div className="fixed bottom-5 flex items-center justify-center w-full">
                <Pagination onClick={(numPage: number) => setPage(numPage)} actualPage={data.actualPage}
                            maxPages={data.maxPages}/>
            </div>}
        </main>
    )
}