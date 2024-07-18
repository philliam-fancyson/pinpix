import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { thunkCreateCollection } from "../../../redux/collection";

export default function CreateCollectionModal() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [showMenu, setShowMenu] = useState(false);
    const sessionUser = useSelector(state => state.session.user)

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
            description,
            tag_id: null
        }
        dispatch(thunkCreateCollection(payload))
            .then(closeModal)
        navigate(`/boards/${sessionUser.username}/${title}`)
    }

    return (
        <>
            <h1>Create board</h1>
            <form
            onSubmit={handleSubmit}
            >
                <label>
                    Name
                    <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <label>
                    Description
                    <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <button type="submit">Save</button>
            </form>
        </>
    )
}
