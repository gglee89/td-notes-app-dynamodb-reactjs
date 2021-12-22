import { Note, Action, ActionTypes } from '../actions';

export const notesReducer = (
    state: Note[] = [], 
    action: Action
) => {
    switch(action.type) {
        case ActionTypes.fetchNotes:
            return action.payload;
        case ActionTypes.deleteNote:
            return state.filter((note: Note) => note.timestamp !== action.payload)
        default:
            return state;
    }
}