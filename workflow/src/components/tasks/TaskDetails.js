import React from 'react';
import Task from './Task'

export default class TaskDetails extends React.Component {
    constructor() {
        super();
    }
    render() {
        
        return (
            <React.Fragment>
                <div className="_1fbzlpo">
                    <Task taskId = {this.props.match.params.id} expanded = {true} />
                </div>
            </React.Fragment>
        )
    }
}