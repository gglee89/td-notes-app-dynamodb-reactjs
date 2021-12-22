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

interface Response {
    Items: Note[]
}

export interface FetchNotesAction {
    type: ActionTypes.fetchNotes,
    payload: Note[]
}

export const fetchNotes = () => async (dispatch: Dispatch) => {
    const url = 'http://localhost:3001/api/notes'
    
    const { data } = await axios.get<Response>(url);

    dispatch<FetchNotesAction>({
        type: ActionTypes.fetchNotes,
        payload: data.Items
    })
}