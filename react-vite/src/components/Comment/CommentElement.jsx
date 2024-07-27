import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux"
import { FaEllipsisH } from "react-icons/fa";
import './CommentBox.css'
import UpdateComment from "./UpdateComment";
import { thunkDeleteComment } from "../../redux/comment";

export default function CommentElement({comment, isOwner}) {
    const [showMenu, setShowMenu] = useState(false);
    const [showEdit, setShowEdit] = useState(false)
    const dispatch = useDispatch()
    const divRef = useRef();

    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        setShowMenu(!showMenu);
      };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (divRef.current && !divRef.current.contains(e.target)) {
            setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const clickEdit = () => {
        setShowMenu(!showMenu)
        setShowEdit(!showEdit)
    }

    const clickDelete = () => {
        dispatch(thunkDeleteComment(comment.id))
    }

    return (
        <div className="comment-element">
            {!showEdit ? (
                <>
                    <p><strong>{comment.user.username}</strong> {comment.text}</p>
                    {isOwner && (
                <div className="comment-ellipsis-wrapper">
                    <FaEllipsisH className="comment-ellipsis" onClick={toggleMenu}/>
                    {showMenu && (
                        <div className={"comment-dropdown"} ref={divRef}>
                            <button onClick={clickEdit}>Edit</button>
                            <button onClick={clickDelete}>Delete</button>
                        </div>
                    )}
                </div>
                )}
                </>

            ) : (
                <UpdateComment comment={comment} closeEdit={() => setShowEdit(false)}/>
            )}
        </div>
    )
}
