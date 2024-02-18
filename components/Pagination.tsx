type PaginationProps = {
    actualPage: number;
    maxPages: number;
    onClick: Function;
}

export default function Pagination({ actualPage, maxPages, onClick }: PaginationProps) {

    const pages = [];

    for (let i = 0; i < maxPages; i++) {
        pages.push(i+1);
    }

    return (
        <div className="join">
            {pages.map((page) => {
                return <input key={page} onChange={() => onClick(page)} className="join-item btn btn-square" type="radio" name="options" aria-label={page.toString()} checked={actualPage === page} />
            })}
        </div>
    )
}
