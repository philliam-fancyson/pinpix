import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addNewImage } from "../../redux/image";


function CreateImage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [title, setTitle] = useState("")
    const sessionUser = useSelector(state => state.session.user);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);

        const userData = {
            title,
            user_id: sessionUser.id
        }
        formData.append("user", userData)
        console.log(formData)
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);
        await dispatch(addNewImage(formData));
        // navigate("/")
        ;
    }

    return (
        <>
            <h1>Test</h1>
            <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            >
                <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                />
                <button type="submit">Submit</button>
            {(imageLoading)&& <p>Loading...</p>}
            </form>
        </>
    )
}

export default CreateImage;
