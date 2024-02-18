'use client'

import {QueryClient, QueryClientProvider, useQuery} from "@tanstack/react-query";
import Loader from "@/components/Loader";
import {useState} from "react";
import Pagination from "@/components/Pagination";
import WeekSelect from "@/components/WeekSelect";
import DaySelect from "@/components/DaySelect";
import GroupSelect from '@/components/GroupSelect';
import Courses from "@/components/Courses";

const client = new QueryClient();

export default function Root() {
    return <QueryClientProvider client={client}>
        <Page />
    </QueryClientProvider>
}

function Page() {

    const [page, setPage] = useState(1);
    const [week, setWeek] = useState(36);
    const [day, setDay] = useState(0);
    const [group, setGroup] = useState('INF-S1-TD1');

    const {isPending, error, data} = useQuery({
        queryKey: [page, week, day, group],
        queryFn: () =>
            fetch(`/api/groups/${group}?week=${week}&day=${day}&page=${page}`).then((res) => res.json()),
    });

    if (isPending) return <Loader />

    if (data.maxPages === 1 && page !== 1) {
        setPage(1);
    }

    return (
        <main className="flex gap-10 items-center mt-5 justify-center flex-col">
            <h1 className="text-3xl font-bold">Cours du groupe <span className="text-primary">{group}</span></h1>
            <div className="flex gap-4 w-full justify-center">
                <GroupSelect group={group} onChange={(group: string) => setGroup(group)} />
                <WeekSelect onChange={(week: number) => setWeek(week)} week={week} />
                <DaySelect day={day} onChange={(day: number) => setDay(day)} />
            </div>

            <Courses courses={data.events} />

            {data.maxPages !== 1 && <div className="fixed bottom-5 flex items-center justify-center w-full">
                <Pagination onClick={(numPage: number) => setPage(numPage)} actualPage={data.actualPage}
                            maxPages={data.maxPages}/>
            </div>}
        </main>
    )
}
