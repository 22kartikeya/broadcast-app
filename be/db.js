import mongoose, { Mongoose } from 'mongoose';
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
});

const broadcastSchema = new mongoose.Schema({
    role: { type: String, enum: ['admin', 'employee', 'user'], required: true},
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})

const userModel = mongoose.model('user', userSchema);
const broadcastModel = mongoose.model('broadcast', broadcastSchema);
export { userModel, broadcastModel };