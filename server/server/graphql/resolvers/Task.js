import mongoose from 'mongoose';
import Task from '../../api/model/task.model'

const subTask = async (root, args, context) => {
    const task = await context.db.loadTaskById(root.id)
    const promises = task.subTask.map(async(id) => {
        return await context.db.loadTaskById(id)
    })

    const subTasks = await Promise.all(promises);
    return subTasks
}

export default {subTask}