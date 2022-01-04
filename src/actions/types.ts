import { FetchNotesAction, DeleteNoteAction } from './notes';

export enum ActionTypes {
  fetchNotes,
  deleteNote
}

export type Action = FetchNotesAction | DeleteNoteAction;
