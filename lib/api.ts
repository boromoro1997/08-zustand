import axios from "axios";
import type { Note, NewNote} from "../types/note";
const url = "https://notehub-public.goit.study/api/notes";
const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
interface Response {
  notes: Note[],
  totalPages:number,
}
export default async function fetchNotes(page:number,search:string="",tag?:string):Promise<Response> {
    const response = await axios.get<Response>(url, {
          headers: { Authorization: `Bearer ${myKey}` },
          params: {
          search,
          tag,
          page,
          perPage:10,
          }
    })
    return response.data;
}
export  async function fetchNoteById(id:string):Promise<Note> {
    const response = await axios.get<Note>(url+`/${id}`, {
          headers: { Authorization: `Bearer ${myKey}` },
    })
    return response.data;
}
export async function createNote(newNote:NewNote) {
    const res = await axios.post<Note>(url, newNote, {
    headers: { Authorization: `Bearer ${myKey}` },
    });
  console.log(res.data);
    return res.data;
}
export async function deleteNote(id:string) {
    const res = await axios.delete<Note>(`${url}/${id}`, {
    headers: { Authorization: `Bearer ${myKey}` },
    });
  console.log(res.data)
    return res.data;
}