"use client"
import StudentAdd from "@/app/components/StudentAdd/StudentAdd";

export default function Page () {
    return (
        <>
        <a href="/students" style={{ marginLeft: "1em"}}>Retour à la liste</a>
        <StudentAdd />
        </>
    )
}