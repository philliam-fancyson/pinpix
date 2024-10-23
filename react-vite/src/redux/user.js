const GET_USER = 'user/getUser'

const getUser = (user) => ({
    type: GET_USER,
    user
})

// * Thunks
export const getUserInfo = (userId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/users/${userId}`)
        if (response.ok) {
            const user = await response.json();
            dispatch(getUser(user))
        } else {
            throw new Error("failed to load user")
        }
    } catch (err) {
        return err
    }
}

export const getUserByUsername = (username) => async (dispatch) => {
    try {
        const response = await fetch(`/api/users/username/${username}`)
        if (response.ok) {
            const user = await response.json();
            dispatch(getUser(user))
        } else {
            throw new Error("failed to load user")
        }
    } catch (err) {
        return err
    }
}


// * Reducer
const initialState = { user: {}}
const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_USER:
            return {...state, user: action.user}
        default:
            return state
    }
}

export default userReducer
