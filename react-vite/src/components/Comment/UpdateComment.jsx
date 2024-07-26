import { useState, useEffect } from "react";
import { useDispatch } from "react-redux"
import { thunkUpdateComment } from "../../redux/comment";
import './CommentBox.css'

export default function UpdateComment({comment, closeEdit}) {
    const dispatch = useDispatch()
    const [text, setText] = useState(comment.text)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            text
        }
        dispatch(thunkUpdateComment(comment.id, payload))
        closeEdit()
    }
    return (
        <div className="update-comment-wrapper">
                <form id="update-comment" onSubmit={handleSubmit}>
                    <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    />
                <div className="update-comment-buttons">
                    <button onClick={closeEdit}>Cancel</button>
                    <button type="submit" disabled={text.length === 0 || text === comment.text}>Save</button>
                </div>
                </form>
        </div>
    )
}
