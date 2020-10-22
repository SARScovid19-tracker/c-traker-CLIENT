import { SET_PATIENTS_LIST, SET_LOGGED_IN_USER } from './actions'

const initialState = {
    patientList: [],
    loggedInUser: ''
}

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case SET_PATIENTS_LIST:
            return {
                ...state,
                patientList: action.payload
            }
        case SET_LOGGED_IN_USER:
            return {
                ...state,
                loggedInUser: action.payload
            }
        default:
            return state;
    }
}