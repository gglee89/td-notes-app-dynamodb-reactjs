import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';

export interface Note {    
    user_id: string,
    timestamp: number,
    cat: string,
    content: string,
    expires: number,
    note_id: number,
    title: string,
    user_name: string    
}

interface FetchNotesResponse {
    Items: Note[]
}

interface DeleteNoteResponse {}

export interface FetchNotesAction {
    type: ActionTypes.fetchNotes,
    payload: Note[]
}

export interface DeleteNoteAction {
    type: ActionTypes.deleteNote,
    payload: number
}

export const fetchNotes = () => async (dispatch: Dispatch) => {
    const url = 'http://localhost:3001/api/notes'
    
    const { data } = await axios.get<FetchNotesResponse>(url);

    dispatch<FetchNotesAction>({
        type: ActionTypes.fetchNotes,
        payload: data.Items
    })
}

export const deleteNote = (timestamp: number) => async (dispatch: Dispatch) => {
    const url = `http://localhost:3001/api/note/${timestamp}`

    await axios.delete<DeleteNoteResponse>(url);
    
    dispatch({
        type: ActionTypes.deleteNote,
        payload: timestamp
    })
}