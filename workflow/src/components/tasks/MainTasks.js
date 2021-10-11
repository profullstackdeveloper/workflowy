import React from 'react';
import Task from './Task';


export default class MainTasks extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <React.Fragment>
                <div className="page active  showCompleted _1fbzlpo">
                    <Task taskId = {sessionStorage.getItem("taskId")} expanded = {true}  className="_1fbzlpo"/>
                </div>
            </React.Fragment>
        )
    }
}
