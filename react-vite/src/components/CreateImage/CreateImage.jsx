import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addNewImage } from "../../redux/image";
import './CreateImage.css'

// const TAGS = ["Cyberpunk", "Vaporwave", "Solarpunk", "Cottagecore", "Vintage-Anime", "2000s", 'Skater"', "Beach", "7 Eleven ", "StreetWear"]

function CreateImage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [previewImg, setPreviewImg] = useState("")
    const [validationErrors, setValidationErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const sessionUser = useSelector(state => state.session.user);

    // * Show Image Preview
    useEffect(() => {
        if (!image) {
            setPreviewImg("")
            return
        }

        const objectUrl = URL.createObjectURL(image)
        setPreviewImg(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [image])

    useEffect(() => {
        const errors = {}
        if (!image) errors.image = "Please provide an image"
        if (!title) errors.title = "Please provide a name for your image"
        if (title.length > 50) errors.title = "Title is too long!"
        if (description.length > 2000) errors.description = "Description too long!"

        setValidationErrors(errors)
    }, [image, title, description])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)
        if (Object.values(validationErrors).length) return;
        const formData = new FormData();
        formData.append("image", image);

        formData.append("title", title)
        formData.append("user_id", sessionUser.id)
        formData.append("description", description)
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);
        let createdImage;
        createdImage = await dispatch(addNewImage(formData));
        navigate(`/pin/${createdImage.id}`);
    }

    return (
        <div id="create-form">
            <h1>Create Pin</h1>
            <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            >
                    <input type="button" id="file-button" value="Upload your image" onClick={() => document.getElementById('file-button-hidden').click()} />
                    <input
                    type="file"
                    id="file-button-hidden"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    style={{"display":"none"}}
                    />
                    { image && <img src={previewImg}/> }
                <label>
                    Title
                </label>
                    <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    />
                <label>
                   Description
                </label>
                    <textarea
                    type="textarea"
                    value={description}
                    onChange={(e)=> setDescription(e.target.value)}
                    />

                <button type="submit">Submit</button>
                <div id="create-form-errors">
                    {hasSubmitted && <p>{validationErrors.image}</p>}
                    {hasSubmitted &&<p>{validationErrors.title}</p>}
                    {hasSubmitted && <p>{validationErrors.description}</p>}
                </div>
                {(imageLoading)&& <p>Loading...</p>}
            </form>
        </div>
    )
}

export default CreateImage;
