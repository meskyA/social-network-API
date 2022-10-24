const { Schema, model } = require("mongoose");
const thoughtSchema = require("./thought");

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [ /^([a-z0-9_\.-]+)@[(da-z\.-]+$/, "Please enter valid email address"],
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: "Thought",
        },],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: "User",
        },],
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false,
    }
);
const user = model("User", userSchema);

userSchema.virtual("friendCount").get(function() {
    return this.friends.length;
});

module.exports = user;