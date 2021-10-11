const getTask = async (root, args, context) => {
    return await context.db.loadTaskById(args.id)
}

const getTaskRootByUser = async(root, args, context) => {
    const user = await context.db.findUser(args.userId);
    return await context.db.loadTaskById(user.taskId);
}

export default {getTask, getTaskRootByUser}