const GET_COMMENTS = `comment/getComments`

const getComments = (comments) => ({
    type: GET_COMMENTS,
    comments
})

export const thunkGetImageComments = (id) => async(dispatch) => {
    try {
        const response = await fetch(`/api/comments/image/${id}`);
        if (response.ok) {
            const comments = await response.json()
            return dispatch(getComments(comments))
        } else {
            throw new Error("failed to load comments")
        }
    } catch (err) {
        return err
    }
}


// * Reducer
const initialState = { comments: []}
const commentReducer = (state = initialState, action) => {
    let newState = {}
    switch(action.type) {
        case GET_COMMENTS:
            newState = {
                ...state,
                comments: action.comments
            }
            return newState
        default:
            return state
    }
}

export default commentReducer
