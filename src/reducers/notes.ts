import { Note, FetchNotesAction } from '../actions';
import { ActionTypes } from '../actions/types';

export const notesReducer = (state: Note[] = [], action: FetchNotesAction) => {
    switch(action.type) {
        case ActionTypes.fetchNotes:
            return action.payload;
        default:
            return state;
    }
}