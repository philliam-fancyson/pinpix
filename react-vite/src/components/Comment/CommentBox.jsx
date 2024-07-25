import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { thunkGetImageComments } from "../../redux/comment";

export default function CommentBox({imageId}) {
    const dispatch = useDispatch()
    const comments = useSelector(state => state.comment.comments);
    const [text, setText] = useState("")

    useEffect(() => {
        dispatch(thunkGetImageComments(imageId))
    },[dispatch, imageId])

    return (
        <div id="comment-box">
            <h2>Comments</h2>
            <div id="comment-thread">
            {comments?.length ? (comments.map(comment =>
                <p key={comment.id}>{comment.text}</p>
            )) : <p>No comments yet! Add one to start the conversation.</p>}
            </div>
            <div id="comment-input">
                <form>
                    <h2>What do you think?</h2>
                    <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Add a comment"
                    />
                    <button type="submit">POST(change to icon)</button>
                </form>

            </div>
        </div>
    )
}
