import React from 'react';

interface AppProps {
    color?: string
}

export class App extends React.Component<AppProps> {
    render() {
        return (
            <div>Hi, there</div>
        )
    }
}