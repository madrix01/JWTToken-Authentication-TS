import * as mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 20
    },
    email: {
        type: String,
        required: true,
        min: 6,
    },
    password: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('User', userSchema);
