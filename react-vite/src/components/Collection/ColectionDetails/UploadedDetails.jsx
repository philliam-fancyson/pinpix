import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetUserUploadedImages } from "../../../redux/image";
import PinSmall from "../../PinCard/PinSmall";
import PinMedium from "../../PinCard/PinMedium";
import './CollectionDetails.css'

export default function UploadedDetails() {
    const dispatch = useDispatch()
    const userImages = useSelector(state => state.image.userImages)

    useEffect(() => {
        dispatch(thunkGetUserUploadedImages())
    }, [dispatch])

    if (!userImages) return <p>Loading</p>
    return (
        <>
            <h1>Uploaded Images</h1>
            <div id="collection-gallery">
                {userImages && userImages.map((image, index) =>
                    (index + 1) % 2 === 0 ? (
                        <PinMedium image={image} index={index} key={index}/>
                    ) : (
                        <PinSmall image={image} index={index} key={index}/>
                    )
                )}
            </div>
        </>
    )
}
