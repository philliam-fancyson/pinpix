import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { getOneImage } from "../../redux/image";

export default function ImageDetails() {
    const dispatch = useDispatch()
    const { imageId } = useParams();
    const image = useSelector(state => state.image.image);

    useEffect(() => {
        dispatch(getOneImage(imageId))
    }, [dispatch])

    if (!image) return <p>Loading</p>
    return (
        <>
            <h1>{image.title} Hello</h1>
            <img src={image.image_url} />
        </>
    )
}
