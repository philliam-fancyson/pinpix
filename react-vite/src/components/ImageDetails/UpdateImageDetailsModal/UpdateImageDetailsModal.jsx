import { useState, useEffect, useRef } from "react"
import { useDispatch } from "react-redux";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import DeleteImageModal from "../DeleteImageModal/DeleteImageModal";
import { useModal } from "../../../context/Modal";
import { updateImageInfo } from "../../../redux/image";
import "./UpdateImageDetailsModal.css"

export default function UpdateImageDetailsModal({image}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [title, setTitle] = useState(image.title ? image.title : "")
    const [description, setDescription] = useState(image.description ? image.description : "")
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
        if (title.length > 50) errors.title = "Title is too long!"
        if (description.length > 2000) errors.description = "Description too long!"

        setValidationErrors(errors)
    }, [title, description])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (Object.values(validationErrors).length) return;
        const payload = {
            title,
            description
        }

        dispatch(updateImageInfo(image.id, payload))
        .then(closeModal)
    }

    return (
        <div className="update-modal">
            <h1>Edit Pin</h1>
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
                    placeholder="Write a detailed description for your Pin"
                    />
                </label>
                <div className="form-errors">{hasSubmitted && validationErrors.description}</div>
                <div id="update-button">
                    <OpenModalButton
                    buttonText="Delete"
                    onButtonClick={closeMenu}
                    modalComponent={<DeleteImageModal image={image}/>}
                    />
                    <div id="update-safe">
                        <button type="button" onClick={closeModal}>Cancel</button>
                        <button type="submit">Save</button>
                    </div>
            </div>
            </form>
        </div>
    )
}
