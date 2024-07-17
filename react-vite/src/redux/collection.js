const GET_COLLECTIONS = `collection/getCollections`

const getCollection = (collections) => ({
    type: GET_COLLECTIONS,
    collections
})

// * Thunks
export const thunkGetUserCollections = () => async (dispatch) => {
    try {
        const response = await fetch(`/api/collections/current`);
        if (response.ok) {
            const collections = await response.json()
            for (let collection of collections) {
                const imagesResponse = await dispatch(thunkGetCollectionImages(collection.title))
                collection.images = imagesResponse
            }

            dispatch(getCollection(collections))
        } else {
            throw new Error("failed to load collection")
        }
    } catch (err) {
        return err;
    }
}

export const thunkGetCollectionImages = (title) => async () => {
    title = title.replaceAll(" ", "-")
    const response = await fetch(`/api/collections/boards/${title}`);
    if (response.ok) {
        const images = await response.json()
        return images
    } else {
        throw new Error("failed to load images")
    }
}

// * Reducer
const initialState = { collections: [] }
const collectionReducer = (state = initialState, action) => {
    let newState = {}
    switch(action.type) {
        case GET_COLLECTIONS:
            return {...state, collections: action.collections}
        default:
            return state
    }
}

export default collectionReducer
