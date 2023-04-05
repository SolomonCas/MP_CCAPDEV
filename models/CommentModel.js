import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    postid: {
        type: String,
        required: true
    },
    postTitle: {
        type: String,
        required: true
    },
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;