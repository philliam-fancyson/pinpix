import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Main.css";
// import LoginFormPage from "../LoginFormPage";
import SignupFormPage from "../SignupFormPage";
import { getLatestImages } from "../../redux/image";

function Main() {
    const dispatch = useDispatch();
    const latestImages = useSelector(state => state.image.images)
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getLatestImages())
    }, [dispatch])


    if (!user?.id) return (
        <>
            <div>
                LandingPageComponent
            </div>
            <SignupFormPage />
        </>
    )

    return (
        <>
            <div className="landing-grid">
                {latestImages && latestImages.map((image, index) =>
                    <div key={index}>
                        <Link to={`/pin/${image.id}`}>
                            <img src={image.image_url} />
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}

export default Main;
