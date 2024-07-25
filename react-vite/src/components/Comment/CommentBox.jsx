import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { thunkGetImageComments } from "../../redux/comment";

export default function CommentBox({imageId}) {
    const comments = useSelector(state => state.comment.comments);

    useEffect(() => {
        dispatch(thunkGetImageComments(imageId))
    },[dispatch, imageId])

    console.log(comments)
}
