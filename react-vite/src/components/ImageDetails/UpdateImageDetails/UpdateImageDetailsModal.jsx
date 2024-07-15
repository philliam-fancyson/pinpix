import { useState, useEffect, useRef } from "react"
import "./UpdateImageDetailsModal.css"
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import DeleteImageModal from "../DeleteImageModal/DeleteImageModal";

export default function UpdateImageDetailsModal({image}) {
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
                    />
                </label>
                <label>
                    <h2>Description</h2>
                    <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
