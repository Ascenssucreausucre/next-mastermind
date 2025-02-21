import { Student } from "@/types/student";
import { readFile, writeFile } from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
      const { name, age, description } = await req.json();

      const students: Student[] = JSON.parse(await readFile('students.json', 'utf-8'))
      students.push({
        id: uuidv4(),
        name: name,
        age: age,
        description: description
      })
      await writeFile('students.json', JSON.stringify(students))

      
  
      return NextResponse.json({ message: `Étudiant ${name} ajouté` }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
  }

