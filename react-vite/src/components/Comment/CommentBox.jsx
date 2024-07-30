import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { thunkAddComment, thunkGetImageComments } from "../../redux/comment";
import './CommentBox.css'
import CommentElement from "./CommentElement";
import { IoSend } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { thunkAddLike, thunkRemoveLike } from "../../redux/image";

export default function CommentBox({imageId, userId, likes}) {
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

    const likePin = async () => {
        dispatch(thunkAddLike(imageId))
    }

    const unlikePin = async () => {
        dispatch(thunkRemoveLike(imageId))
    }

    const likeCount = likes?.like_count > 0 ? "like-count" : "like-count-hidden"

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
                <div id="comment-input-header">
                    <h2>{comments?.length > 0 ? `${comments.length} ${comments?.length === 1 ? "comment" : "comments"}` : "What do you think?"}</h2>
                    <div id="image-likes">
                        <p id={likeCount}><GoHeartFill /> {likes?.like_count}</p>
                        {likes?.user_liked ? (
                            <button id="likes-button-liked" onClick={unlikePin}><GoHeartFill /></button>
                            ) : (
                            <button id="likes-button-unliked" onClick={likePin}><GoHeart /></button>
                            )}
                    </div>
                </div>
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
