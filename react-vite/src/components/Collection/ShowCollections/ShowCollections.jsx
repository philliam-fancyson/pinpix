import { useState, useEffect, useRef } from "react"
import { useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetUserCollections } from "../../../redux/collection";
import { thunkGetUserUploadedImages } from "../../../redux/image";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import CollectionCard from "../CollectionCard/CollectionCard";
import './ShowCollection.css'
import CreateCollectionModal from "../Modals/CreateCollectionModal";

export default function ShowCollections() {
    const dispatch = useDispatch()
    const { username } = useParams()
    // TODO Modify to get any user's collection maybe?
    const userCollections = useSelector(state => state.collection.collections)
    const userImages = useSelector(state => state.image.userImages)
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const uploadedCollection = {
        title:"All Uploads",
        images: userImages
    }

    // * Modal Components
    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
        if (!ulRef.current.contains(e.target)) {
            setShowMenu(false);
        }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);
    // * Modal Components End

    useEffect(() => {
        dispatch(thunkGetUserCollections())
    },[dispatch])

    useEffect(() => {
        dispatch(thunkGetUserUploadedImages())
    }, [dispatch])

    if (!userCollections) return <div>Loading...</div>

    return (
        <div id="show-collection">
            <h1>{username} Boards</h1>
            <OpenModalButton
            buttonText="Create"
            onButtonClick={closeMenu}
            modalComponent={<CreateCollectionModal />}
            />
            <div id="board-gallery">
                <CollectionCard collection={uploadedCollection} username={username} />
                {userCollections && userCollections.map((collection, index) =>
                    <CollectionCard collection={collection} username={username} key={index}/>
                )}
            </div>
        </div>
    )
}
