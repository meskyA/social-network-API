const { Schema, model } = require("mongoose");
const reactionSchema = require("./reaction");
const dateFormat = requre("../utils/dateFormat");

const thoughtSchema = new Schema(
    {
        thougtText: {
            type: String,
            required: "Please leave a thought.",
            minlenght: 1,
            maxlength: 200,

        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);
thoughtSchema.virtual("ractionsCount").get(function () {
    return this.reactions.length;
});
const Thought = model("Thought", thoughtSchema);

module.exports = Thought;