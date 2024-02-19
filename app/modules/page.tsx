'use client'

import {QueryClient, QueryClientProvider, useQuery} from "@tanstack/react-query";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import {Suspense, useState} from "react";
import {ReadonlyURLSearchParams, useSearchParams} from "next/navigation";
import Module from "@/components/Module";
import ResultsNotFound from "@/components/ResultsNotFound";
import {useDebounce} from "use-debounce";

const queryClient = new QueryClient();

export default function Root() {
    return (
        <QueryClientProvider client={queryClient}>
            <Suspense fallback={<Loader/>}>
                <Modules />
            </Suspense>
        </QueryClientProvider>
    );
}

function Modules() {
    const searchParams = useSearchParams() as ReadonlyURLSearchParams;

    let pageParam;

    if (searchParams) {
        pageParam = searchParams.get('page') ?? 1;
    }

    const [page, setPage] = useState(pageParam)
    const [search, setSearch] = useState('')
    const [value] = useDebounce(search, 500);

    // @ts-ignore
    const urlSearchParams = new URLSearchParams({ page, search: value, limit: 20 });

    const {isPending, error, data} = useQuery({
        queryKey: [page, value],
        queryFn: () => fetch(`/api/modules?${urlSearchParams.toString()}`).then((res) => res.json())
    });

    if (isPending) return <Loader />

    return (
        <main className="flex gap-10 items-center justify-center flex-col">

            <label className="input input-bordered flex items-center gap-2">
                <input type="text" autoFocus={true} className="grow" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search"/>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                     className="w-4 h-4 opacity-70">
                    <path fillRule="evenodd"
                          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                          clipRule="evenodd"/>
                </svg>
            </label>

            <div className="flex flex-row flex-wrap gap-5 items-center justify-center mb-20">
                {data && data.modules.map((res: { module: string, fullname: string }) => {
                    return (<Module fullname={res.fullname} module={res.module} key={res.module}/>)
                })}
                {data.modules.length === 0 && <ResultsNotFound />}
            </div>

            {data.maxPages !== 1 && <div className="fixed bottom-5 flex items-center justify-center w-full">
                <Pagination onClick={(numPage: number) => setPage(numPage)} actualPage={data.actualPage} maxPages={data.maxPages} />
            </div>}
        </main>
    );
}
