import { readFile } from "fs/promises";

type Student = {
    id: string;
    name: string;
    age: number;
    description: string;
}

export async function GET () {
    const students : { students: Student[]} = JSON.parse(await readFile('./students.json', 'utf8'))
    return new Response(JSON.stringify(students))
}

