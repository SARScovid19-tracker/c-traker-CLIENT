import { SET_PATIENTS_LIST } from './actions'

const initialState = {
    patientList: []
}

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case SET_PATIENTS_LIST:
            return {
                ...state,
                patientList: action.payload
            }
        default:
            return state;
    }
}