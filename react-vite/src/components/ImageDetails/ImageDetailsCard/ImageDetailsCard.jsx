import { useState, useRef, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import CreateCollectionModal from "../../Collection/Modals/CreateCollectionModal";
import UpdateImageDetailsModal from "../UpdateImageDetailsModal/UpdateImageDetailsModal";
import { thunkAddImageToCollection, thunkGetUserCollections } from "../../../redux/collection";
import Select from 'react-select'
import { components } from 'react-select';
import './ImageDetailsCard.css'
import CommentBox from "../../Comment/CommentBox";

export default function ImageDetailsCard( {image, user} ) {
    const dispatch = useDispatch()
    const ulRef = useRef();
    const [showMenu, setShowMenu] = useState(false);
    const [selectedCollection, setSelectedCollection] = useState("")
    const [saveButton, setSaveButton] = useState("Save")
    const sessionUser = useSelector(state => state.session.user)
    const userCollections = useSelector(state => state.collection.collections)
    const isOwner = sessionUser.id === user.id
    let selectOptions;

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
      dispatch(thunkGetUserCollections())
    }, [dispatch])

    // Select Components
    const SelectMenuButton = (props) => {
      return (
          <components.MenuList  {...props}>
              {props.children}
              <div id="select-button">
              <OpenModalButton
                  buttonText="Create a board"
                  onButtonClick={closeMenu}
                  modalComponent={<CreateCollectionModal selectAdd={true}/>}
                  />
              </div>
          </components.MenuList >
      ) }



    const constructSelectOptions = (userCollections) => {
      const allOptions = Object.keys(userCollections).length
        ? [...Object.values(userCollections)].reduce((acc, collection) => {
            const option = {
              value: collection.id,
              label: `${collection.title}`,
            };
            acc.push(option);
            return acc;
          }, [])
        : [];
      return allOptions;
    };

    const handleSelect = (e) => {
      setSelectedCollection(e.value);
    };

    if (userCollections) {
      selectOptions = constructSelectOptions(userCollections)
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      dispatch(thunkAddImageToCollection(selectedCollection, image.id))
        .then(setSaveButton("Saved!"))
    }


    return (
        <div className="details-card">
            <img src={image.image_url} />
            <div className="card-info">
              <div className="card-info-header">

              <div className="card-info-top">
                {isOwner && (
                  <OpenModalButton
                  buttonText="Edit"
                  onButtonClick={closeMenu}
                  modalComponent={<UpdateImageDetailsModal image={image}/>}
                  />
                )}
                <form onSubmit={handleSubmit} id="save-options">
                  <div id="save-select">
                    <Select
                    options={selectOptions}
                    components={{MenuList: SelectMenuButton}}
                    onChange={(e) => {
                      handleSelect(e);
                    }}
                    />
                  </div>
                  <button type="submit">{saveButton}</button>
                </form>
                </div>
                <div className="card-info-bottom">
                  <h2>{image.title}</h2>
                  {image.description && <p>{image.description}</p>}
                  <p>author: {user.username}</p>
                </div>
                </div>
                <CommentBox imageId={image.id} userId={sessionUser.id}/>
            </div>
        </div>
    )
}
