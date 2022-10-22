const { Schema, model } = require("mongoose");

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
            match: [ /^([a-z0-9_\.-]+)@[(da-z\.-]+)$/, "Please enter valid email address.", ],
        },
        thought: [{
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
const User = model("User", userSchema);

userSchema.virtual("friendCount").get(function() {
    return this.friends.length;
});

module.exports = User;