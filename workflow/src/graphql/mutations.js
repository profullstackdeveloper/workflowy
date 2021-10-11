export const mutations = {
    createSubTask : `
        mutation ($content : String, $parentId : ID) {
            createSubTask(content : $content, parentId : $parentId) {
                id
                title
            }
        }
    `,
    updateTask : `
        mutation ($id : ID, $content : String) {
            updateTask (id : $id, content : $content) {
                id
                title
            }
        }
    `,
    updateParentId : `
        mutation ($id : ID!, $parentId : ID) {
            updateParentId (id : $id, parentId : $parentId) {
                id
                title
            }
        }
    `,
    beParent : `
        mutation ($id : ID!, $parentId : ID!) {
            beParent (id : $id, parentId : $parentId) {
                id
                title
            }
        }
    `,
    deleteTask : `
        mutation ($id : ID!) {
            deleteTask (id : $id) {
                id
                title
            }
        }
    `
}