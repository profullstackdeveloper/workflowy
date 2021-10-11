import Task from './model/task.model';
import User from './model/user.model'


const loadTaskById = async (id) => {
    const task = await Task.findById(id)
    return task;
}

const createSubTask = async (content, parentId) => {
    // create new Task;
    const newTask = new Task({title :content});
    if (parentId) newTask.parentId = parentId;
    await newTask.save()
    //if parent exists, add to it
    if(parentId) {
        const parentTask = await Task.findById(parentId)
        parentTask.subTask.push(newTask._id)
        await parentTask.save()
    }
    return newTask

}

const updateTask = async (id, content) => {
    const task = await Task.findById(id);
    task.title = content;
    const savedTask = await task.save();
    return savedTask
}

const updateParentId = async (id, parentId) => {

    Task.findById(id).exec((err, currentTask) => {
        if(err) {
            return ;
        }
        if(currentTask.parentId){
            const parentId = currentTask.parentId
            
            Task.findById(parentId).exec((err, parentTask) => {
                if(err) {
                    return ;
                }
                parentTask.subTask.forEach((child, index) => {
                    if(child == id && index == 0 ) {
                        console.log("this is first child")
                    }
                    else if(child == id && index > 0) {
                        currentTask.parentId = parentTask.subTask[index-1];
                        currentTask.save()
                        parentTask.subTask.splice(id, 1);
                        parentTask.save();
                        Task.findById(currentTask.parentId).exec((err, newParent) => {
                            newParent.subTask.push(currentTask.id);
                            newParent.save()
                        })
                    }
                })
            })
        }
    })
}

const beParent = async (id, parentId) => {
    Task.findById(id).exec((err, currentTask) => {
        if(err) {
            return ;
        }
        if(currentTask.parentId) {
            Task.findById(currentTask.parentId).exec((err, parentTask) => {
                if(err){
                    return ;
                }
                if(parentTask.parentId) {
                    Task.findById(parentTask.parentId).exec((err, greatParentTask) => {
                        if(err) {
                            return ;
                        }
                        if(greatParentTask) {
                            greatParentTask.subTask.push(currentTask.id);
                            greatParentTask.save();
                            parentTask.subTask.splice(currentTask.id, 1);
                            parentTask.save()
                            currentTask.parentId = greatParentTask.id;
                            currentTask.save()
                        }
                    })
                }
            })
        }
    })
}

const findUser = async(id) => {
    return await User.findById(id);
}

const deleteTask = async (id) => {
    console.log("deleteTask has been called : ", id)
    Task.findById(id).exec((err, data) => {
        if(err) {
            return ;
        }
        if(data) {
            console.log("selected task : ", data.parentId)
            data.parentId && Task.findById(data.parentId).exec((err, parentTask) => {
                if(err) {
                    return ;
                }
                if(parentTask) {
                    console.log("parent Task is : ", parentTask)
                    parentTask.subTask.splice(id, 1);
                    parentTask.save()
                }
                else {
                    Task.update({id}, {$pull : { id : id }});
                }
            })
        }
    })
}

export default {
    loadTaskById,
    createSubTask,
    updateTask,
    updateParentId,
    findUser,
    beParent,
    deleteTask
}