export const queries = {
    getTask : `query ( $id : ID!) {
            getTask(id : $id) {
                id,
                title,
                subTask{
                    id,
                    subTask {
                        id
                    }
                }
            }
        }`,
    getTaskRootByUser : `query ($userId : ID!) {
            getTaskRootByUser (userId : $userId) {
                id,
                title,
                subTask {
                    title
                }
            }
        }`
}