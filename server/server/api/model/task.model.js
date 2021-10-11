import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title : String,
    created: {
        type: Date,
        default: Date.now
      },
    subTask : [{type : mongoose.Schema.Types.ObjectId}],
    parentId : String
})

export default mongoose.model('Task', taskSchema);