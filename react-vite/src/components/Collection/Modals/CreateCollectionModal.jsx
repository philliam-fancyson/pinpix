import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { thunkCreateCollection } from "../../../redux/collection";
import './CollectionModal.css'

export default function CreateCollectionModal({selectAdd}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [validationErrors, setValidationErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const sessionUser = useSelector(state => state.session.user)

    useEffect(() => {
        const errors = {};
        if (!title.length) errors.title = "Name is required"
        if (title.length > 50)  errors.title = "Name is too long!"
        if (description.length > 2000) errors.description = "Description too long!"

        setValidationErrors(errors)
    }, [title, description])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (Object.values(validationErrors).length) return;
        const payload = {
            title,
            description,
            tag_id: null
        }
        dispatch(thunkCreateCollection(payload))
            .then(closeModal)
        if (!selectAdd) {
            navigate(`/boards/${sessionUser.username}/${title}`)
        }
    }

    return (
        <div id="create-board-modal">
            <h1>Create board</h1>
            <form
            onSubmit={handleSubmit}
            >
                <label>
                    <h2>Name</h2>
                    <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Give your board a name!"
                    />
                    <div className="form-errors">{hasSubmitted && validationErrors.title}</div>
                </label>
                <label>
                    <h2>Description</h2>
                    <textarea
                    type="textarea"
                    value={description}
                    onChange={(e)=> setDescription(e.target.value)}
                    placeholder="Write something to remember this by"
                    />
                </label>
                <div className="form-errors">{hasSubmitted && validationErrors.description}</div>
                <div id="create-buttons">
                    <button type="submit">Save</button>
                    <button type="button" onClick={closeModal}>Cancel</button>
                </div>
            </form>
        </ div>
    )
}
