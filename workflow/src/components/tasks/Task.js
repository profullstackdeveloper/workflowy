import React, { useState } from 'react';
import { queries } from '../../graphql/queries';
import {mutations} from '../../graphql/mutations';
import { withRouter } from 'react-router';

import {gql,useQuery, useMutation} from '@apollo/client'
import {ApolloConsumer} from '@apollo/client'

const Task = (props) => {
    var pressedKeys = []; 
    const [expand, setExpand] = useState(false)
    const getTask = gql(queries.getTask);
    const updateTask = gql(mutations.updateTask);
    const createSubTask = gql(mutations.createSubTask);
    const updateParentId = gql(mutations.updateParentId);
    const beParent = gql(mutations.beParent);
    const deleteTask = gql(mutations.deleteTask);
    var title = "";
    var targetId = "";
    const {loading, error, data} = useQuery(getTask, {variables : {id : props.taskId}});
    const [performUpdateTask] = useMutation(updateTask); // do mutation for the task string change.(because it is input, so doesn't need cache update.)
    const [performCreateSubTask] = useMutation(createSubTask, {
        update(cache, mutationResult) {  //update cache, so doesn't make a request to server and get update the tasks...
            const readResult = cache.readQuery({
                query : getTask,
                variables : {id : props.taskId}
            })
            var originalSub = readResult.getTask.subTask
            const id = mutationResult.data.createSubTask.id;
            originalSub=[...originalSub,{__typename : 'Task', id : id, subTask : []}]
            const data2 = cache.writeQuery ({
                query : getTask,
                data : {
                    getTask : {
                    __typename : 'Task',
                    id : readResult.getTask.id,
                    title : readResult.getTask.title,
                    subTask : originalSub
                }},
                variables : {
                    id : readResult.getTask.parentId
                }
            })
        }
    });
    const [performUpdateParentId] = useMutation(updateParentId, {
        refetchQueries : [
            getTask
        ]
    });

    const [performBeParent] = useMutation(beParent, {
        refetchQueries : [
            getTask
        ]
    })

    const [performDeleteTask] = useMutation(deleteTask, {
        refetchQueries : [
            getTask
        ]
    })
    const onChangeHandler = (event, taskId, content) => {
        targetId = taskId;
        performUpdateTask({variables : {id : taskId, content : event.target.value}})
    }
    
    const onExpandClickHandler = () => {
        setExpand(!expand)
    }
    if(loading) return <div style={{ fontSize: "48px", color: "blue" }}>
            Loading...
        </div>
    
    return (<React.Fragment>
                <div className="_1ys4k1" >
                    {
                        data.getTask.title || data.getTask.title == "" ?
                            (title = data.getTask.title,
                                <input 
                                    style={{margin : "5px", borderStyle : "none", outline:"none"}} 
                                    placeholder="Untitled" 
                                    value={title}

                                    onChange = {
                                        (e) => onChangeHandler(e, data.getTask.id, title)
                                    }
                                    onClick = {
                                        pressedKeys.forEach((key) => {
                                            pressedKeys[key] = false
                                        })
                                    }
                                    onKeyDown={
                                        (event) => {
                                            if(event.key == "Enter" && !pressedKeys[16]) { // Press Enter key, so make subtask in selected task
                                                setExpand(true);
                                                console.log("state of expand : ", expand)
                                                performCreateSubTask({variables : {content : "", parentId : props.taskId}})
                                            }
                                            if(event.key == "Tab" && !pressedKeys[16]){ // Press Tab key, so make selected task to be child task for another task(in other words, move backward)
                                                performUpdateParentId({variables : {id : data.getTask.id, parentId : props.taskId}})
                                            }
                                            // You could also use an array
                                            pressedKeys[event.keyCode] = event.type == 'keydown';
                                            if(pressedKeys[16] && pressedKeys[9]){ // press Shift and Tab keys at the same time, so make selected task move forward
                                                performBeParent({variables : {id : data.getTask.id, parentId : props.taskId}})
                                            }
                                            if(event.key == "Backspace") {
                                                console.log('Backspace')
                                                if(title.length == 0) {
                                                    console.log("remove task");
                                                    performDeleteTask({variables : {id : data.getTask.id}})
                                                }
                                            }
                                        }
                                    }
                                    onKeyUp={
                                        (event) => {
                                            pressedKeys[event.keyCode] = false

                                        }
                                    }
                                    
                                />)
                        : ''
                    }
                    {props.expanded && data.getTask.subTask.length > 0 ?
                        (
                            data.getTask.subTask.map((item, index) => {
                                return (
                                        <div key={index} style={{ display: 'flex', flexDirection: 'row'}}>
                                            {
                                                item.subTask.length > 0 ? <a className="expand _1t0xrxb" style={{zIndex : 100}}>
                                                <div className=" _3hmsj" onClick={onExpandClickHandler}>
                                                    <svg width="20" height="20" viewBox="0 0 20 20" className=" _4zcx4s" >
                                                        <path d="M13.75 9.56879C14.0833 9.76124 14.0833 10.2424 13.75 10.4348L8.5 13.4659C8.16667 13.6584 7.75 13.4178 7.75 13.0329L7.75 6.97072C7.75 6.58582 8.16667 6.34525 8.5 6.5377L13.75 9.56879Z" stroke="none" fill="currentColor">
                                                        </path>
                                                    </svg>
                                                </div>
                                                </a>
                                                : <a className="expand _1t0xrxb" style={{zIndex : 100}}>
                                                <div className=" _3hmsj">
                                                    <svg width="20" height="20" viewBox="0 0 20 20" className=" _4zcx4s" style={{color : "transparent"}}>
                                                        <path d="M13.75 9.56879C14.0833 9.76124 14.0833 10.2424 13.75 10.4348L8.5 13.4659C8.16667 13.6584 7.75 13.4178 7.75 13.0329L7.75 6.97072C7.75 6.58582 8.16667 6.34525 8.5 6.5377L13.75 9.56879Z" stroke="none" fill="currentColor">
                                                        </path>
                                                    </svg>
                                                </div>
                                                </a>
                                            }
                                            <svg width="20" height="20" style={{zIndex :10}} onClick={() => {
                                                props.history.push('/subTask/' + item.id)
                                            }}>
                                                <circle cx="10" cy="10" r="5" fill="#aeaeae" />
                                                
                                            </svg>
                                            
                                            {
                                                <TaskWitRouter taskId={item.id} expanded={expand}  style={{zIndex:0}}/>
                                            }
                                        </div >
                                )
                            })
                        ) : ''
                    }
                </div>
               
        </React.Fragment>
    )


}

const TaskWitRouter =  withRouter(Task)
export default TaskWitRouter