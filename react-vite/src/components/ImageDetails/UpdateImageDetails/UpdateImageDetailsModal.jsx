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
    const [title, setTitle] = useState(image.title)
    const [description, setDescription] = useState(image.description)
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

    const handleSubmit = async (e) => {
        e.preventDefault();
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
                </label>
                <label>
                    <h2>Description</h2>
                    <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Write a detailed decsription for your Pin"
                    />
                </label>
                <OpenModalButton
                buttonText="Delete"
                onButtonClick={closeMenu}
                modalComponent={<DeleteImageModal image={image}/>}
                />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}
