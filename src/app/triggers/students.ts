import fetcher from "@/utils/fetcher";

export async function addStudent(url: string, { arg } : { arg: any }) {
    await fetcher(url, {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify(arg)
    })
   
}

export async function deleteStudent(url: string, { arg: id } : { arg: string }) {
    await fetcher(`${url}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type" : "application/json" }
    })
   
}