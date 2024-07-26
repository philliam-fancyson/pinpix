const GET_COMMENTS = `comment/getComments`
const ADD_COMMENT = `comment/addComment`

const getComments = (comments) => ({
    type: GET_COMMENTS,
    comments
})

const addComment = (comment) => ({
    type: ADD_COMMENT,
    comment
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

export const thunkAddComment = (id, data) => async(dispatch) => {
    try {
        const response = await fetch(`/api/comments/image/${id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        if (response.ok) {
            const comment = await response.json();
            dispatch(addComment(comment))
        } else {
            return { server: "Something went wrong. Please try again" };
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
            return newState;
        case ADD_COMMENT:
            newState = {
                ...state,
                comments: [action.comment, ...state.comments]
            }
            return newState;
        default:
            return state
    }
}

export default commentReducer
