import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { thunkAddComment, thunkGetImageComments } from "../../redux/comment";
import './CommentBox.css'
import CommentElement from "./CommentElement";
import { IoSend } from "react-icons/io5";

export default function CommentBox({imageId, userId}) {
    const dispatch = useDispatch()
    const comments = useSelector(state => state.comment.comments);
    const [text, setText] = useState("")
    const [showSend, setShowSend] = useState(false)

    useEffect(() => {
        dispatch(thunkGetImageComments(imageId))
    },[dispatch, imageId])

    useEffect(() => {
        if (text.length >= 1) setShowSend(true)
        else setShowSend(false)
    }, [text])

    const sendIdName = showSend ? "comment-submit" : "comment-submit-hidden"

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (text.length < 1) return;
        const payload = {
            text
        }
        dispatch(thunkAddComment(imageId, payload))
        setText("")
    }

    return (
        <div id="comment-box">
            <h2>Comments</h2>
            <div id="comment-thread">
            {comments?.length ? (comments.map(comment =>
                <CommentElement
                comment={comment}
                isOwner={comment.user.id === userId}
                key={comment.id}
                />
            )) : <p>No comments yet! Add one to start the conversation.</p>}
            </div>
            <div id="comment-input">
                <h2>{comments?.length > 0 ? `${comments.length} ${comments?.length === 1 ? "comment" : "comments"}` : "What do you think?"}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Add a comment"
                    />
                        <IoSend id={sendIdName} onClick={handleSubmit}/>
                </form>

            </div>
        </div>
    )
}
