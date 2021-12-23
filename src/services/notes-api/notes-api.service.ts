import React from 'react'
import { Observable } from 'redux'

export class NotesApiService {
    constructor() {
        this.setOptions()
    }

    /**
     * @description Get the `id_token` from the AuthService,    
     *              and set the HTTP header options with
     *              the Authorization token.
     * 
     *              For production grade applications, 
     *              all communications must happen within a 
     *              secure communication (i.e. SSL)
     * 
     *              We call setOptions() in all methods
     *              that requires Authentication.
     */
    setOptions = (): void => {}

    addNote = (item: any): void => {
        this.setOptions()
    }

    updateNote = (item: any): void => {
        this.setOptions();
    }

    deleteNote = (timestamp: number): void => {
        this.setOptions();
    }

    getNotes = (start?: number): void => {
        this.setOptions();
    }
}