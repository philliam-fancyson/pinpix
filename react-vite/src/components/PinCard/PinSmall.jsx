import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import './PinCard.css'
import { thunkRemoveImageFromCollection } from "../../redux/collection";

export default function PinSmall({image, index, collectionView, collectionId}) {
    const dispatch = useDispatch()
    const pinClassName = collectionView ? "pin-card collection-card-small" : "pin-card card-small"

    const handleDelete = async() => {
        dispatch(thunkRemoveImageFromCollection(collectionId, image.id))
    }

    return (
        <div className={pinClassName} key={index}>
        <Link to={`/pin/${image.id}`}>
            <img src={image.image_url} />
        </Link>
        {collectionView &&
            <div className="card-bottom">
                <p>{image.title}</p>
                <button onClick={handleDelete}>X</button>
            </div>
        }
        </div>
    )
}
