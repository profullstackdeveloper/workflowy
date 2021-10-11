const createSubTask = async (root, args, context) => {
    return await context.db.createSubTask(args.content, args.parentId);
}

const updateTask = async (root, args, context) => {
    return await context.db.updateTask(args.id,args.content)
}

const updateParentId = async (root, args, context) => {
    return await context.db.updateParentId(args.id, args.parentId)
}

const beParent = async (root, args,context) => {
    return await context.db.beParent(args.id, args.parentId)
}

const deleteTask = async (root, args, context) => {
    return await context.db.deleteTask(args.id)
}


export default {
    createSubTask,
    updateTask, 
    updateParentId,
    beParent,
    deleteTask
}