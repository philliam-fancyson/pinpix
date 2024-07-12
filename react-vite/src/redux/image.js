const GET_IMAGES = 'image/getImages'
const ADD_IMAGE = 'image/addImage'

const getImages = (images) => ({
    type: GET_IMAGES,
    images
})

const addImage = (image) => ({
  type: ADD_IMAGE,
  image
})

// * Thunks
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
      console.log(err);
      return err;
    }
  };

export const addNewImage = (image) => async (dispatch) => {
  const response = await fetch(`/api/images/`, {
    method: "POST",
  //   headers: {
  //     'Accept': 'application/json',
  //     "Content-Type": "application/json",
  //   },
    body: image
  });

  if (response.ok) {
    const { resPost } = await response.json();
    console.log(resPost)
    dispatch(addImage(resPost));
  } else {
  throw new Error("failed to add image");
}
}


// * Reducer
const initialState = { images: [], image: {} }
const imageReducer = (state = initialState, action) => {
    let newState = {}
    switch(action.type) {
        case GET_IMAGES:
            return { ...state, images: action.images}
          case ADD_IMAGE:
            newState = {
              ...state,
              images: [...state.images, action.image],
              image: action.image
            }
            return newState
        default:
            return state
    }
};

export default imageReducer
