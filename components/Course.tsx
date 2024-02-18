import {Course} from "@/components/Courses";
import Image from "next/image";

export default function Course({ course }: { course: Course }) {
    const splitTeacherName = course.teacher.split(" ");

    const initials = (splitTeacherName[0][0] + splitTeacherName[1][0]).toUpperCase();

    return <div className="card w-96 bg-base-100 shadow-xl image-full ">
        <figure>
            <img src="https://img.freepik.com/photos-gratuite/chapeau-graduation-etudiant-3d-pile-livres_107791-15667.jpg?size=626&ext=jpg&ga=GA1.1.632798143.1708128000&semt=sph" alt="Shoes"/>
        </figure>
        <div className="card-body flex items-center justify-center relative">
            <h2 className="card-title">{course.module} - {course.fullname}</h2>
            <p>
                <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-12">
                        <span className="text-xl">{initials}</span>
                    </div>
                </div>
                <span className="ml-4">{course.teacher}</span>
            </p>

            <button className="btn mb-5">
                Groupe
                <div className="badge badge-info">{course.group}</div>
            </button>

            <button className="btn mb-5">
                Salle
                <div className="badge badge-secondary">{course.room}</div>
            </button>

            <span className="flex gap-2 bottom-5">
                <button className="btn">
                    Début
                    <div className="badge">{course.hDeb}</div>
                </button>
                <button className="btn">
                    Fin
                    <div className="badge">{course.hFin}</div>
                </button>
            </span>

        </div>
    </div>
}
