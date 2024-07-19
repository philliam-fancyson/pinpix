import { useState, useEffect, useRef } from "react"
import { useDispatch } from "react-redux";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import DeleteCollectionModals from "./DeleteCollectionModal";
import { useModal } from "../../../context/Modal";
import { thunkUpdateCollectionDetails } from "../../../redux/collection";
import './CollectionModal.css'

export default function UpdateCollectionModal ({collection}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [title, setTitle] = useState(collection.title)
    const [description, setDescription] = useState(collection.description ? collection.description : "")
    const [validationErrors, setValidationErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

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
        const errors = {};
        if (!title.length) errors.title = "Title is required"

        setValidationErrors(errors)
    }, [title])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (Object.values(validationErrors).length) return;
        const payload = {
            title,
            description
        }
        dispatch(thunkUpdateCollectionDetails(collection.id, payload))
            .then(closeModal)
    }

    return (
        <div className="update-modal">
            <h1>Edit Board</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <h2>Title</h2>
                    <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Add a title"
                    />
                    <div className="form-errors">{hasSubmitted && validationErrors.title}</div>
                </label>
                <label>
                    <h2>Description</h2>
                    <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What's your board about?"
                    />
                </label>
                <OpenModalButton
                buttonText="Delete"
                onButtonClick={closeMenu}
                modalComponent={<DeleteCollectionModals collection={collection}/>}
                />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}
