'use client'

import {QueryClient, QueryClientProvider, useQuery} from "@tanstack/react-query";
import Loader from "@/components/Loader";
import {useState} from "react";
import Pagination from "@/components/Pagination";

const client = new QueryClient();

export default function Root({ week, onChange }: { week: number, onChange: Function }) {
    return <QueryClientProvider client={client}>
        <Page week={week} onChange={onChange} />
    </QueryClientProvider>
}

function Page({ week, onChange }:{ week: number, onChange: Function }) {

    const [page, setPage] = useState(1)

    const {isPending, error, data} = useQuery({
        queryKey: [page],
        queryFn: () =>
            fetch(`/api/weeks`).then((res) => res.json()),
    });

    if (isPending) return <Loader />

    return (
        <select onChange={(e) => onChange(e.target.value)} value={week} className="select select-secondary w-full max-w-xs">
            {data && data.weeks.map((w: { week: number }) => <option key={w.week} value={w.week}>Semaine {w.week}</option>)}
        </select>
    )
}
