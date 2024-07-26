import { useState, useEffect, useRef } from "react";
import { FaEllipsisH } from "react-icons/fa";
import './CommentBox.css'
import UpdateComment from "./UpdateComment";

export default function CommentElement({comment, isOwner}) {
    const [showMenu, setShowMenu] = useState(false);
    const [showEdit, setShowEdit] = useState(false)
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

    return (
        <div className="comment-element">
            {!showEdit ? (
                <>
                    <p><strong>{comment.user.username}</strong> {comment.text}</p>
                    {isOwner && (
                <>
                    <FaEllipsisH className="comment-ellipsis" onClick={toggleMenu}/>
                    {showMenu && (
                        <div className={"comment-dropdown"} ref={divRef}>
                            <button onClick={clickEdit}>Edit</button>
                            <button>Delete</button>
                        </div>
                    )}
                </>
                )}
                </>

            ) : (
                <UpdateComment comment={comment} closeEdit={() => setShowEdit(false)}/>
            )}
        </div>
    )
}
