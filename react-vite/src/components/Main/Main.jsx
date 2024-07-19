import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import "./Main.css";
// import LoginFormPage from "../LoginFormPage";
import SignupFormPage from "../SignupFormPage";
import { getLatestImages } from "../../redux/image";
import PinSmall from "../PinCard/PinSmall";
import PinMedium from "../PinCard/PinMedium";
// import PinLarge from "../PinCard/PinLarge";


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
                (index + 1) % 2 === 0 ? (
                    <PinMedium image={image} index={index} key={index}/>
                ) : (
                    <PinSmall image={image} index={index} key={index}/>
                )
                )}
            </div>
        </>
    );
}

export default Main;

// if (index % 3 === 0) {
//     <div className="pin-card card-large" key={index}>
//     <Link to={`/pin/${image.id}`}>
//         <img src={image.image_url} />
//     </Link>
// // </div>
// } else if (index % 2 ===0) {
    // <div className="pin-card card-medium" key={index}>
    // <Link to={`/pin/${image.id}`}>
    //     <img src={image.image_url} />
    // </Link>
// </div>
// } else {
//     <div className="pin-card card-small" key={index}>
//     <Link to={`/pin/${image.id}`}>
//         <img src={image.image_url} />
//     </Link>
//     </div>
// }
