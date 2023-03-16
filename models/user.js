const { Schema, model, SchemaTypes } = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = Schema({
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: String,
    owner: {
        type: SchemaTypes.ObjectId,
        ref: 'user',
    },
});
userSchema.pre('save', async function () {
    if (this.isNew) {
        this.password = await await bcrypt.hash(this.password, 10)
    }
})
const User = model('user', userSchema)

module.exports = {
    User
}