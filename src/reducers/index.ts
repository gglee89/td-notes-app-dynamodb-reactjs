import { combineReducers } from "redux";
import { notesReducer } from "./notes";
import { Note } from '../actions';

export interface StoreState {
    notes: Note[]
}

export const reducers = combineReducers<StoreState>({
    notes: notesReducer
})