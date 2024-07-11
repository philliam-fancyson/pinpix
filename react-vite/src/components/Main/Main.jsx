import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
            <h1>Test H1</h1>
            <div className="landing-grid">
                {latestImages && latestImages.map((image, index) =>
                    <div key={index}>
                        <h1>Image Placeholder {index}</h1>
                    </div>
                )}
            </div>
        </>
    );
}

export default Main;
