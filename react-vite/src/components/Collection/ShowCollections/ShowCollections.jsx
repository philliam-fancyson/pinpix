import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetUserCollections } from "../../../redux/collection";
import CollectionCard from "../CollectionCard/CollectionCard";
import './ShowCollection.css'

export default function ShowCollections() {
    const dispatch = useDispatch()
    const { username } = useParams()
    // TODO Modify to get any user's collection maybe?
    const userCollections = useSelector(state => state.collection.collections)

    useEffect(() => {
        dispatch(thunkGetUserCollections())
    },[dispatch])

    if (!userCollections) return <div>Loading...</div>

    return (
        <div id="show-collection">
            <h1>{username} Collections</h1>
            <button>Create</button>
            <div id="collection-gallery">
                {userCollections && userCollections.map((collection, index) =>
                    <CollectionCard collection={collection} username={username} key={index}/>
                )}
            </div>
        </div>
    )
}
