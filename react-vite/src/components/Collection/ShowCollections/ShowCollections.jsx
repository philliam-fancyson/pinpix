import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetUserCollections } from "../../../redux/collection";

export default function ShowCollections() {
    const dispatch = useDispatch()
    const userCollections = useSelector(state => state.collection.collections)

    useEffect(() => {
        dispatch(thunkGetUserCollections())
    },[dispatch])

    return (
        <>
        <h1>Test</h1>
        {userCollections && userCollections.map((collection, index) =>
            <div key={index}>
                {collection.title}
                {collection.images.map((image, index) =>
                    <img src={image.image_url} key={index}/>
                )}
            </div>
        )}
        </>
    )
}
