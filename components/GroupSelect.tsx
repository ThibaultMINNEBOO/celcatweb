'use client'

import {QueryClient, QueryClientProvider, useQuery} from "@tanstack/react-query";
import Loader from "@/components/Loader";
import {useState} from "react";
import Pagination from "@/components/Pagination";

const client = new QueryClient();

export default function Root({ group, onChange }: { group: string, onChange: Function }) {
    return <QueryClientProvider client={client}>
        <Page group={group} onChange={onChange} />
    </QueryClientProvider>
}

function Page({ group, onChange }:{ group: string, onChange: Function }) {

    const {isPending, error, data} = useQuery({
        queryKey: [],
        queryFn: () =>
            fetch(`/api/groups`).then((res) => res.json()),
    });

    if (isPending) return <Loader />

    return (
        <select onChange={(e) => onChange(e.target.value)} value={group} className="select select-secondary w-full max-w-xs">
            {data && data.groups.map((g: { group: number }) => <option key={g.group} value={g.group}>{g.group}</option>)}
        </select>
    )
}
