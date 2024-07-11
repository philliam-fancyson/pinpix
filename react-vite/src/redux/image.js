const GET_IMAGES = 'image/getImages'

const getImages = (images) => ({
    type: GET_IMAGES,
    images
})

// * Thunks
export const getLatestImages = () => async (dispatch) => {
    try {
      const response = await fetch("/api/images/");
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


// * Reducer
const initialState = { images: [] }
const imageReducer = (state = initialState, action) => {
    let newState = {}
    switch(action.type) {
        case GET_IMAGES:
            return { ...state, images: action.images}
        default:
            return state
    }
};

export default imageReducer
