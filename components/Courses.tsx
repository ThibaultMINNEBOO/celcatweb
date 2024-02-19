import Course from "@/components/Course";
import ResultsNotFound from "@/components/ResultsNotFound";

export type Course = {
    id: number,
    teacher: string;
    type: string;
    module: string;
    fullname: string;
    room: string;
    week: number;
    day: number;
    hDeb: string;
    hFin: string;
    group: string;
}

type ModuleProps = {
    courses: Course[]
}

export default function Courses({ courses }: ModuleProps) {
    return (
        <div className="flex flex-row flex-wrap justify-center items-center gap-5">
            {courses.map((course) => {
                return <Course key={course.id} course={course} />
            })}
            {courses.length === 0 && <ResultsNotFound />}
        </div>
    )
}
