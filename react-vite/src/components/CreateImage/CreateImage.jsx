import { useState } from "react";


function CreateImage() {
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        // TODO Change this to key data in backend
        formData.append("image", image);
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);
        // TODO Change this to thunk
        await dispatch(createPost(formData));
        history.push("/");
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
