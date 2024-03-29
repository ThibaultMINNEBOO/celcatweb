'use client'

import {QueryClient, QueryClientProvider, useQuery} from "@tanstack/react-query";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import {Suspense, useState} from "react";
import {ReadonlyURLSearchParams, useSearchParams} from "next/navigation";
import Teacher from "@/components/Teacher";

const queryClient = new QueryClient();

export default function Root() {
    return (
        <QueryClientProvider client={queryClient}>
            <Suspense fallback={<Loader/>}>
                <Teachers/>
            </Suspense>
        </QueryClientProvider>
    );
}

function Teachers() {
  const searchParams = useSearchParams() as ReadonlyURLSearchParams;

  let pageParam;

  if (searchParams) {
      pageParam = searchParams.get('page') ?? 1;
  }

  const [page, setPage] = useState(pageParam)

    const {isPending, error, data} = useQuery({
        queryKey: [page],
        refetchOnMount: true,
        queryFn: () => fetch(`/api/teachers?page=${page}&limit=10`).then((res) => res.json())
    });

  if (isPending) return <Loader />

  return (
      <main className="flex gap-10 items-center justify-center">
          <div className="flex flex-row flex-wrap gap-5 items-center justify-center mb-20 mt-16">
              {data && data.teachers.map((res: { teacher: string }, i: number) => {
                  return (<Teacher teacher={res.teacher} key={res.teacher}/>)
              })}
          </div>

          <div className="fixed bottom-5 flex items-center justify-center w-full">
              <Pagination onClick={(numPage: number) => setPage(numPage)} actualPage={data.actualPage} maxPages={data.maxPages} />
          </div>
      </main>
  );
}
