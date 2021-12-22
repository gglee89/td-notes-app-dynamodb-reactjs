import React from 'react';
import { connect } from 'react-redux';
import { Note, fetchNotes } from '../actions';
import { StoreState } from '../reducers';

interface AppProps {
    notes: Note[];
    fetchNotes(): any;

}

class _App extends React.Component<AppProps> {
    onButtonClick = (): void => {
        this.props.fetchNotes()
    }

    renderList = (): JSX.Element[] => {
        return this.props.notes.map((note: Note) => {
            return <div key={note.timestamp}>{note.title}</div>
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.onButtonClick}>Fetch Notes</button>
                {this.renderList()}
            </div>
        )
    }
}

const mapStateToProps = (state: StoreState): { notes: Note[] } => {
    return {
        notes: state.notes
    }
}

export const App = connect(mapStateToProps, { fetchNotes })(_App)