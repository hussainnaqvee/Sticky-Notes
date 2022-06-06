import axios from "axios";
import INote from "../interfaces/note.interface";
import { API_URL_NOTES } from "./constants/api";
export const getNotes = async () => {
    try {
      const response = await axios.get(
        API_URL_NOTES
        );
      return(response.data.Notes);
    } catch (error) {
      console.error(error);
    }
};
  
export const createNote = async (note:Partial<INote>) => { 
    try {
        const response = await axios.post(API_URL_NOTES, note);
        return(response.data.note);
    }
    catch (error) {
        console.error(error);
    }
};

export  const deleteNote = async (id:string) => { 
    try {
        const response = await axios.delete(`${API_URL_NOTES}/${id}`);
        return response.data.note;
    }
    catch(error) {
        console.log(error);
    }
};

export const updateNote = async (id: string, note: INote) => { 
    try {
        const response = await axios.put(`${API_URL_NOTES}/${id}`, note);
    }
    catch (error) {
        console.log(error)
    }
    };

// module.exports = {
//     getNotes,
//     addNote,
//     deleteNote
// }