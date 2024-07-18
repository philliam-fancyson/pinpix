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

    const handleSubmit = async (e) => {
        e.preventDefault();
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
        console.log(createdImage)
        navigate(`/pin/${createdImage.id}`);
    }

    return (
        <div id="create-form">
            <h1>Create Pin</h1>
            <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            >
                    <input type="button" id="file-button" value="Upload your file" onClick={() => document.getElementById('file-button-hidden').click()} />
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
            {(imageLoading)&& <p>Loading...</p>}
            </form>
        </div>
    )
}

export default CreateImage;
