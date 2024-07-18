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
              <div className="card-info-top">
                {isOwner && (
                  <OpenModalButton
                  buttonText="Edit"
                  onButtonClick={closeMenu}
                  modalComponent={<UpdateImageDetailsModal image={image}/>}
                  />
                )}
                <button>Save</button>
                </div>
                <h2>{image.title}</h2>
                {image.description && <p>{image.description}</p>}
                <p>author: {user.username}</p>
                {/* <div>COMMENTS PLACEHOLDER</div>
                <div>COMMENT AND LIKES PLACEHOLDER</div> */}
            </div>
        </div>
    )
}
