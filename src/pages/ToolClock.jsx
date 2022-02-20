import React, { Component } from 'react'

import 'react-table-6/react-table.css'

class ToolClock extends Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div>
                <p>Hello, world! Current time is {this.state.date.toLocaleTimeString()}.</p>
            </div>
        );
    }
}

export default ToolClock
