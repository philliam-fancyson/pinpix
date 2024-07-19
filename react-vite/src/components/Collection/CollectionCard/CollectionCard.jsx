import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom";
import './CollectionCard.css'

export default function CollectionCard({collection, username}) {
    const [imagePreview, setImagePreview] = useState(false)
    const [topImage, setTopImage] = useState(false)
    const [bottomImage, setBottomImage] = useState(false)

    const imageCount = collection.images.length

    useEffect(() =>{
        if (collection.images.length >= 1) {
            setImagePreview(true)
        }
        if (collection.images.length >= 2) {
            setTopImage(true)
        }
        if (collection.images.length >= 3) {
            setBottomImage(true)
        }
    },[collection.images.length])

    return (
        <div className="collection-card">
            <NavLink to={`/boards/${username}/${collection.title.replaceAll(" ", "-").toLowerCase()}`}>
            <div className="collection-image-gallery">
                <div className="image-preview">
                    {imagePreview &&
                        <img src={collection.images[0]?.image_url}/>
                    }
                </div>
                <div className="image-top">
                {topImage &&
                        <img src={collection.images[1]?.image_url}/>
                    }
                </div>
                <div className="image-bottom">
                {bottomImage &&
                        <img src={collection.images[2]?.image_url}/>
                    }
                </div>
            </div>
            <div className="collection-info">
                <h2>{collection.title}</h2>
                <span>{imageCount} Pins</span>
            </div>
            </NavLink>
        </div>
    )
}
