import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import UpdateCollectionModal from "./UpdateCollectionModal";
import { useModal } from "../../../context/Modal";
import { removeCollection } from "../../../redux/collection";

export default function DeleteCollectionModals(  {collection} ) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const [showMenu, setShowMenu] = useState(false);
    const { closeModal } = useModal();
    const ulRef = useRef();

    console.log(collection)

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

    const onClick = () => {
        return dispatch(removeCollection(collection.id))
            .then(navigate(`/boards/${sessionUser.username}`))
            .then(closeModal)
    }

    return (
        <div className="delete-modal">
            <h1>Delete this board?</h1>
            <p>This board and {collection.images.length} Pins will be removed from your profile.</p>
            <div id="delete-button">
                <OpenModalButton
                buttonText="Cancel"
                onButtonClick={closeMenu}
                modalComponent={<UpdateCollectionModal collection={collection}/>}
                />
                <button onClick={onClick}>Delete</button>
            </div>
        </div>
    )
}
