import mongoose, { mongo } from 'mongoose';

const userSchema = new mongoose.Schema({
    email : String,
    created: {
        type: Date,
        default: Date.now
      },
    taskId : {type : mongoose.Schema.Types.ObjectId, ref : "Task"}
});

export default mongoose.model('User', userSchema);