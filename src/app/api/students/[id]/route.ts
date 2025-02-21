import { Student } from "@/types/student";
import { readFile, writeFile } from "fs/promises";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params } : { params: { id: string }}) {
    try {
        const { id } = params; // ⚡️ Le `await` ici

        if (!id) {
            return NextResponse.json({ error: "ID non fourni" }, { status: 400 });
        }
        const students: Student[] = JSON.parse(await readFile('students.json', 'utf-8'))

        await writeFile('students.json', JSON.stringify(students.filter((elm) => elm.id !== id)))



        return NextResponse.json({ message: `Étudiant supprimé` }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}

