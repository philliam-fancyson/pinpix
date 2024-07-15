import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addNewImage } from "../../redux/image";

const TAGS = ["Cyberpunk", "Vaporwave", "Solarpunk", "Cottagecore", "Vintage-Anime", "2000s", 'Skater"', "Beach", "7 Eleven ", "StreetWear"]

function CreateImage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const sessionUser = useSelector(state => state.session.user);


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
        navigate(`/pin/${createdImage.id}`)
        ;
    }

    return (
        <>
            <h1>Test</h1>
            <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            >
                <label>
                    file
                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    />
                </label>
                <label>
                    title
                    <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    />
                </label>
                <label>
                    description
                    <textarea
                    type="textarea"
                    value={description}
                    onChange={(e)=> setDescription(e.target.value)}
                    />
                </label>
                <button type="submit">Submit</button>
            {(imageLoading)&& <p>Loading...</p>}
            </form>
        </>
    )
}

export default CreateImage;
