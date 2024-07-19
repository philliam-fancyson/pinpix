import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import UpdateCollectionModal from "../Modals/UpdateCollectionModal";
import { getUserInfo } from "../../../redux/user";
import { thunkGetCollectionDetails } from "../../../redux/collection";
import { thunkGetCollectionImages } from "../../../redux/image";
import PinSmall from "../../PinCard/PinSmall";
import PinMedium from "../../PinCard/PinMedium";
import './CollectionDetails.css'

export default function CollectionDetails() {
    const dispatch = useDispatch()
    const { title } = useParams();
    const collection = useSelector(state => state.collection.collection);
    const collectionImages = useSelector(state => state.image.images)
    const collectionUser = useSelector(state => state.user.user)
    const sessionUser = useSelector(state => state.session.user)
    const [showMenu, setShowMenu] = useState(false);
    const isOwner = sessionUser.id === collectionUser.id
    const ulRef = useRef();

    useEffect(() => {
        dispatch(thunkGetCollectionDetails(title))
    }, [dispatch, title])

    useEffect(() => {
        dispatch(getUserInfo(collection.user_id))
    }, [dispatch, collection.user_id])

    useEffect(() => {
        dispatch(thunkGetCollectionImages(title))
    }, [dispatch, title])

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

    if (!collection) return <p>Loading</p>
    return (
        <>
            <h1>{collection.title}</h1>
            <p>{collection.description}</p>
            {isOwner && (
                    <OpenModalButton
                    buttonText="Edit"
                    onButtonClick={closeMenu}
                    modalComponent={<UpdateCollectionModal collection={collection}/>}
                    />
                )}
            <div id="collection-gallery">
                {collectionImages && collectionImages.map((image, index) =>
                    (index + 1) % 2 === 0 ? (
                        <PinMedium image={image} index={index} key={index} collectionView={true} collectionId={collection.id}/>
                    ) : (
                        <PinSmall image={image} index={index} key={index} collectionView={true} collectionId={collection.id}/>
                    )
                )}
            </div>
        </>
    )
}
