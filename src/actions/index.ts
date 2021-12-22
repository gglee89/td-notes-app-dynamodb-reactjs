import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';

export interface Note {
    id: number,
    title: string,
    completed: boolean
}

export interface FetchNotesAction {
    type: ActionTypes.fetchNotes,
    payload: Note[]
}

export const fetch = () => async (dispatch: Dispatch) => {
    const url = 'localhost:3000/api/notes'
    
    const { data } = await axios.get<Note[]>(url);

    dispatch<FetchNotesAction>({
        type: ActionTypes.fetchNotes,
        payload: data
    })
}