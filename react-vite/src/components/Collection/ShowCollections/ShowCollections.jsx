import { useState, useEffect, useRef } from "react"
import { useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetUserCollections } from "../../../redux/collection";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import { useModal } from "../../../context/Modal";
import CollectionCard from "../CollectionCard/CollectionCard";
import './ShowCollection.css'
import CreateCollectionModal from "../Modals/CreateCollectionModal";

export default function ShowCollections() {
    const dispatch = useDispatch()
    const { username } = useParams()
    // TODO Modify to get any user's collection maybe?
    const userCollections = useSelector(state => state.collection.collections)
    const [showMenu, setShowMenu] = useState(false);

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

    if (!userCollections) return <div>Loading...</div>

    return (
        <div id="show-collection">
            <h1>{username} Boards</h1>
            <OpenModalButton
            buttonText="Create"
            onButtonClick={closeMenu}
            modalComponent={<CreateCollectionModal />}
            />
            <div id="collection-gallery">
                {userCollections && userCollections.map((collection, index) =>
                    <CollectionCard collection={collection} username={username} key={index}/>
                )}
            </div>
        </div>
    )
}
