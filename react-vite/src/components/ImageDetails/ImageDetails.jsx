import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneImage } from "../../redux/image";
import ImageDetailsCard from "./ImageDetailsCard/ImageDetailsCard";
import { getUserInfo } from "../../redux/user";

export default function ImageDetails() {
    const dispatch = useDispatch()
    const { imageId } = useParams();
    const image = useSelector(state => state.image.image);
    const imageUser = useSelector(state => state.user.user)


    useEffect(() => {
        dispatch(getOneImage(imageId))
    }, [dispatch])

    useEffect(() => {
        dispatch(getUserInfo(image.user_id))
    }, [dispatch])

    if (!image) return <p>Loading</p>
    return (
        <>
            <ImageDetailsCard image={image} user={imageUser}/>
        </>
    )
}
