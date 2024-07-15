import { useState, useEffect, useRef } from "react"
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import UpdateImageDetailsModal from "../UpdateImageDetails/UpdateImageDetailsModal"

export default function DeleteImageModal( {image} ) {
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

    return (
        <div className="delete-modal">
            <h1>Are you sure?</h1>
            <OpenModalButton
            buttonText="Cancel"
            onButtonClick={closeMenu}
            modalComponent={<UpdateImageDetailsModal image={image}/>}
            />
            <button>Delete</button>
        </div>
    )
}
