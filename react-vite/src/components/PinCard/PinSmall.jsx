import { Link } from "react-router-dom";
import './PinCard.css'

export default function PinSmall({image, index}) {
    return (
        <div className="pin-card card-small" key={index}>
        <Link to={`/pin/${image.id}`}>
            <img src={image.image_url} />
        </Link>
        </div>
    )
}
