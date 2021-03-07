const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            min: 4,
            max: 20,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            min: 4,
            max: 20,
        },
        username: {
            type: String,
            required: true,
            trim: true,
            min: 4,
            max: 20,
            index: true,
            lowercase: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            min: 9,
            max: 40,
            unique: true,
        },

        hash_password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },

        phoneNumber: {
            type: String,
            // required: true,
            min: 6,
            max: 15,
        },
        profilePicture: {
            type: String,
        },
    },
    { timestamps: true }
);
///this is virtual password of the user
userSchema.virtual('password').set(function (password) {
    this.hash_password = bcrypt.hashSync(password, 10);
});

//this is convetring the hash_password of in database
userSchema.methods = {
    authenticate: function (password) {
        return bcrypt.compareSync(password, this.hash_password);
    },
};
userSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model('User', userSchema);
