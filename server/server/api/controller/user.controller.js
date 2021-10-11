import User from '../model/user.model';

import dbControl from '../dbControl'

const addUser = (req, res) => {
    var result = {};
    User.findOne({ email: req.body.email }).exec((err, data) => {
        if (err) {
            return;
        }
        if (data) {
            //make task
            // dbControl.createSubTask('', 0).then(task => {
            //     //assign taskid
            //     data.taskId = task._id;

            //     data.save((err, user) => {
            //         dbControl.createSubTask(req.body.content, task._id).then(subTask => {
            //             const taskId = task._id
            //             const email = user.email
            //             result = { subTask, taskId, email }
            //             res.json(result)
            //         })
            //     });

            // })
            result = {email : data.email, taskId : data.taskId}
            res.json(result)
        }
        else {
            const newUser = new User({ email: req.body.email });
            //make task
            dbControl.createSubTask('', 0).then(task => {
                //assign taskid
                newUser.taskId = task._id;

                newUser.save((err, user) => {
                    dbControl.createSubTask(req.body.content, task._id).then(subTask => {
                        const taskId = task._id
                        const email = user.email
                        result = { subTask, taskId, email }
                        res.json(result)
                    })
                });

            })
        }
    })
}

export default {
    addUser
}