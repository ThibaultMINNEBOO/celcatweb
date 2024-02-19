import Link from "next/link";

export default function Teacher({ module, fullname }: { module: string, fullname: string }) {
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body flex items-center gap-5">
                <h2 className="card-title">{module}</h2>
                <h4 className="text-lg font-extralight">{fullname}</h4>
                <div className="card-actions justify-center">
                    <Link href={'/modules/' + module} className="btn btn-primary">Voir les cours</Link>
                </div>
            </div>
        </div>
    )
}
