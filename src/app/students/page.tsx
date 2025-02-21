"use client"
import { Student } from "@/types/student";
import fetcher from "@/utils/fetcher";
import { useEffect, useState } from "react";
import useSWR from "swr";
import StudentList from "../components/StudentList/StudentList";
import Link from "next/link";
import { Button } from "@mantine/core";


export default function Page () {

    const [studentList, setStudentList] = useState<Student[]>([])
    const { data, error, isLoading } = useSWR('/api/students', fetcher);

    useEffect(() => {
        if(data) setStudentList(data.payload)
    }, [data])

    return (
        <div style={{textAlign: "center"}}>
            <h1 style={{ marginBottom: "1em"}}>Liste des étudiants en Dev</h1>
            <Link href={"/students/add"} >
                <Button variant="outline">Ajouter un étudiant</Button>
            </Link>
            { !isLoading ? <StudentList studentList={studentList} setStudentList={setStudentList} /> : <p>Chargement...</p> }
        </div>
    )
}