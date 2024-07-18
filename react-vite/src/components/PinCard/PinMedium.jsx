import { Link } from "react-router-dom";
import './PinCard.css'

export default function PinMedium({image, index}) {
    return (
        <div className="pin-card card-medium" key={index}>
        <Link to={`/pin/${image.id}`}>
            <img src={image.image_url} />
        </Link>
        </div>
    )
}
