import { useState, useRef, useEffect} from "react";
import { useSelector } from "react-redux";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import UpdateImageDetailsModal from "../UpdateImageDetails/UpdateImageDetailsModal";
import './ImageDetailsCard.css'

export default function ImageDetailsCard( {image, user} ) {
    const sessionUser = useSelector(state => state.session.user)
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const isOwner = sessionUser.id === user.id

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
        <div className="details-card">
            <img src={image.image_url} />
            <div className="card-info">
                {isOwner && (
                    <OpenModalButton
                    buttonText="Edit"
                    onButtonClick={closeMenu}
                    modalComponent={<UpdateImageDetailsModal image={image}/>}
                    />
                )}
                <h1>{image.title}</h1>
                <p>{image.description}</p>
                <h2>{user.username}</h2>
                <div>Comments go here</div>
                <div>Comment and likes go here</div>
            </div>
        </div>
    )
}
