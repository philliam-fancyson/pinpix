import { getUserInfo } from "./user"

const GET_IMAGE = `image/getImage`
const GET_IMAGES = 'image/getImages'
const GET_USER_IMAGES= `image/getUserImage`
const ADD_IMAGE = 'image/addImage'
const UPDATE_IMAGE = 'image/updateImage'
const DELETE_IMAGE = 'image/deleteImage'

const getImage = (image) => ({
  type: GET_IMAGE,
  image
})

const getImages = (images) => ({
    type: GET_IMAGES,
    images
})

const getUserImages = (images) => ({
  type: GET_USER_IMAGES,
  images
})

const addImage = (image) => ({
  type: ADD_IMAGE,
  image
})

const updateImage = (image) => ({
  type: UPDATE_IMAGE,
  image
})

export const deleteImage = (imageId) => ({
  type: DELETE_IMAGE,
  imageId
})

// * Thunks
export const getOneImage = (imageId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/images/${imageId}`)
    if (response.ok) {
      const image = await response.json();
      dispatch(getUserInfo(image.user_id))
      dispatch(getImage(image))
    } else {
      throw new Error("failed to load image")
    }
  } catch (err) {
    return err;
  }
}

export const getLatestImages = () => async (dispatch) => {
    try {
      const response = await fetch(`/api/images/`);
      if (response.ok) {
        const images = await response.json();
        dispatch(getImages(images));
      } else {
        throw new Error("failed to load images");
      }
    } catch (err) {
      return err;
    }
  };

export const thunkGetUserUploadedImages = () => async (dispatch) => {
  try {
    const response = await fetch(`/api/images/user-uploaded`)
    if (response.ok) {
      const images = await response.json();
      dispatch(getUserImages(images))
    } else {
      throw new Error("failed to load user images");
    }
  } catch (err) {
    return err
  }
}

export const thunkGetCollectionImages = (title) => async (dispatch) => {
    title = title.replaceAll(" ", "-")
    const response = await fetch(`/api/collections/boards/${title}/images`);
    if (response.ok) {
        const images = await response.json()
        dispatch(getImages(images));
    } else {
        throw new Error("failed to load images")
    }
}

export const addNewImage = (image) => async (dispatch) => {
  const response = await fetch(`/api/images/new`, {
    method: "POST",
  //   headers: {
  //     'Accept': 'application/json',
  //     "Content-Type": "application/json",
  //   },
    body: image
  });

  if (response.ok) {
    const image = await response.json();
    dispatch(addImage(image));
    return image.image
  } else {
  throw new Error("failed to add image");
  }
}

export const updateImageInfo = (id, payload) => async (dispatch) => {
  const response = await fetch(`/api/images/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (response.ok) {
    const image = await response.json();
    return dispatch(updateImage(image))
  } else {
    throw new Error("failed to update image");
  }
}

export const removeImage = (id) => async (dispatch) => {
  const response = await fetch(`/api/images/${id}`, {
    method: "DELETE",
  })

  if (response.ok) {
    dispatch(deleteImage(id))
  } else {
    throw new Error("failed to delete image")
  }
}

// * Reducer
const initialState = { images: [], image: {}, userImages: [] }
const imageReducer = (state = initialState, action) => {
    let newState = {}
    switch(action.type) {
        case GET_IMAGE:
          return {...state, image: action.image}
        case GET_IMAGES:
          return { ...state, images: action.images}
        case GET_USER_IMAGES:
          return {...state, userImages: action.images}
        case ADD_IMAGE:
          newState = {
            ...state,
            images: [...state.images, action.image],
            image: action.image
            }
          return newState
        case UPDATE_IMAGE:
          newState = {
            ...state,
            image: action.image
          }
          return newState
        case DELETE_IMAGE:
          newState = {
            ...state,
            images: state.images.filter(image => image.id !== action.imageId),
            image: {}
          }
          return newState
        default:
            return state
    }
};

export default imageReducer
