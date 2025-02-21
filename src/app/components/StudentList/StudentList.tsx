import { deleteStudent } from "@/app/triggers/students";
import { Student } from "@/types/student";
import { ActionIcon } from "@mantine/core";
import { IconTrashFilled } from '@tabler/icons-react';
import useSWRMutation from "swr/mutation";

export default function StudentList ({ studentList, setStudentList} : { studentList:Student[], setStudentList: Function}) {

    const { trigger, isMutating } = useSWRMutation(
        "/api/students",
        deleteStudent
      );

    const handleDelete = async (id: string) =>  {
        await trigger(id)
    }

    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}> 
        {
                    <table>
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentList?.map((elm: Student, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>{elm.name}</td>
                                        <td>
                                        <ActionIcon variant="light" aria-label="Supprimer" onClick={()=> handleDelete(elm.id)}>
                                            <IconTrashFilled style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                        </ActionIcon>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
            }
        </div>
    )
}