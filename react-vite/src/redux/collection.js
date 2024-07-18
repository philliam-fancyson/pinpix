const GET_COLLECTIONS = `collection/getCollections`
const GET_COLLECTION = `collection/getCollection`
const ADD_COLLECTION = `collection/addCollection`
const UPDATE_COLLECTION = `collection/updateCollection`
const DELETE_COLLECTION = `collection/deleteCollection`

const getCollections = (collections) => ({
    type: GET_COLLECTIONS,
    collections
})

const getOneCollection = (collection) => ({
    type: GET_COLLECTION,
    collection
})

const createCollection = (collection) => ({
    type: ADD_COLLECTION,
    collection
})

const updateCollection = (collection) => ({
    type: UPDATE_COLLECTION,
    collection
})

const deleteCollection = (collectionId) => ({
    type: DELETE_COLLECTION,
    collectionId
})

// * Thunks
export const thunkGetUserCollections = () => async (dispatch) => {
    try {
        const response = await fetch(`/api/collections/current`);
        if (response.ok) {
            const collections = await response.json()
            for (let collection of collections) {
                const imagesResponse = await dispatch(helperThunkGetCollectionImages(collection.title))
                collection.images = imagesResponse
            }

            dispatch(getCollections(collections))
        } else {
            throw new Error("failed to load collection")
        }
    } catch (err) {
        return err;
    }
}

const helperThunkGetCollectionImages = (title) => async () => {
    title = title.replaceAll(" ", "-")
    const response = await fetch(`/api/collections/boards/${title}/images`);
    if (response.ok) {
        const images = await response.json()
        return images
    } else {
        throw new Error("failed to load collection images")
    }
}

export const thunkGetCollectionDetails = (title) => async (dispatch) => {
    try {
        title = title.replaceAll(" ", "-")
        const response = await fetch(`/api/collections/boards/${title}`);
        if (response.ok) {
            const collection = await response.json()
            const images = await dispatch(helperThunkGetCollectionImages(collection.title))
            collection.images = images
            dispatch(getOneCollection(collection))
        } else {
            throw new Error("failed to load collection details")
        }
    } catch (err) {
        return err;
    }
}

export const thunkCreateCollection = (payload) => async (dispatch) => {
    try {
        const response = await fetch("/api/collections/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          if (response.ok) {
            const collection = await response.json();
            collection.images = [];
            return dispatch(createCollection(collection));
          } else if (response.status < 500) {
            const errorMessages = await response.json();
            return errorMessages;
          } else {
            return { server: "Something went wrong. Please try again" };
          }
    } catch (err) {
        return err
    }
}

export const thunkUpdateCollectionDetails = (id, payload) => async (dispatch) => {
    const response = await fetch(`/api/collections/boards/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        const collection = await response.json();
        return dispatch(updateCollection(collection))
      } else {
      throw new Error("failed to update collection");
    }
}

export const removeCollection = (id) => async (dispatch) => {
    const response = await fetch(`/api/collections/boards/${id}`, {
      method: "DELETE",
    })

    if (response.ok) {
      dispatch(deleteCollection(id))
    } else {
      throw new Error("failed to delete collection")
    }
  }

// * Reducer
const initialState = { collections: [], collection: {}}
const collectionReducer = (state = initialState, action) => {
    let newState = {}
    switch(action.type) {
        case GET_COLLECTIONS:
            return {...state, collections: action.collections}
        case GET_COLLECTION:
            return {...state, collection: action.collection}
        case ADD_COLLECTION:
            newState = {
                ...state,
                collections: [action.collection, ...state.collections],
                collection: action.collection
            }
            return newState;
        case UPDATE_COLLECTION:
            newState = {
                ...state,
                collection: action.collection
            }
            return newState
        case DELETE_COLLECTION:
            newState = {
                ...state,
                collections: state.collections.filter(collection => collection.id !== action.collectionId),
                collection: {}
            }
            return newState
        default:
            return state
    }
}

export default collectionReducer