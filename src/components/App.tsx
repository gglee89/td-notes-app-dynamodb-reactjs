import React from 'react';
import { connect } from 'react-redux';
import { Note, fetchNotes, deleteNote } from '../actions';
import { StoreState } from '../reducers';

interface AppProps {
    notes: Note[];
    fetchNotes: Function;
    deleteNote: Function;
}

interface AppState {
    fetching: boolean
}

class _App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props)

        this.state = {
            fetching: false
        }
    }

    componentDidUpdate(prevProps: AppProps) {
        if (!prevProps.notes.length && this.props.notes.length) {
            this.setState({ fetching: false })
        }
    }

    onButtonClick = (): void => {
        this.props.fetchNotes()
        this.setState({
            fetching: true
        })
    }

    onNoteClick = (timestamp: number): void => {
        this.props.deleteNote(timestamp)
    }

    renderList = (): JSX.Element[] => {
        return this.props.notes.map((note: Note) => {
            return <div onClick={() => this.onNoteClick(note.timestamp)} key={note.timestamp}>{`${note.title} | ${note.timestamp}`}</div>
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.onButtonClick}>Fetch Notes</button>
                {this.state.fetching && 'LOADING...'}
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

export const App = connect(mapStateToProps, { fetchNotes, deleteNote })(_App)