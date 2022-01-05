import { Note, Action, ActionTypes } from '../actions';

const notesReducer = (
  state: Note[] = [],
  action: Action = {
    type: ActionTypes.fetchNotes | ActionTypes.deleteNote,
    payload: [],
  }
) => {
  switch (action.type) {
    case ActionTypes.fetchNotes:
      return action.payload;
    case ActionTypes.deleteNote:
      return state.filter((note: Note) => note.timestamp !== action.payload);
    default:
      return state;
  }
};

export default notesReducer;
