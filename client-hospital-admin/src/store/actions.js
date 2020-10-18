export const SET_PATIENTS_LIST = "SET_PATIENTS_LIST"
export const LOGIN = "LOGIN" // in login page
export const FETCH_PATIENTS = "FETCH_PATIENTS"

let url = 'http://localhost:3000/hospitals'

export const setPatientList = (payload) => {
    return {
        type: SET_PATIENTS_LIST,
        payload
    }
}

export const fetchPatients = (hospitalId) => {
    return(dispatch) => {
        fetch(url + `/patient-list/${hospitalId}`)
            .then(res => res.json())
            .then(patientList => {
                console.log(patientList, '<<< list of patients fetched');
                dispatch(setPatientList(patientList.data))
            })
    }
}