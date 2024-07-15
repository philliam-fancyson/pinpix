import { useState, useEffect, useRef } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import UpdateImageDetailsModal from "../UpdateImageDetails/UpdateImageDetailsModal"
import { useModal } from "../../../context/Modal";
import { removeImage } from "../../../redux/image";

export default function DeleteImageModal( {image} ) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const { closeModal } = useModal();
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

    const onClick = () => {
        return dispatch(removeImage(image.id))
            .then(navigate("/"))
            .then(closeModal)
    }

    return (
        <div className="delete-modal">
            <h1>Are you sure?</h1>
            <OpenModalButton
            buttonText="Cancel"
            onButtonClick={closeMenu}
            modalComponent={<UpdateImageDetailsModal image={image}/>}
            />
            <button onClick={onClick}>Delete</button>
        </div>
    )
}
