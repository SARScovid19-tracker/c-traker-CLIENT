export const SET_LOGGED_IN_USER = "SET_LOGGED_IN_USER"
export const SET_PATIENTS_LIST = "SET_PATIENTS_LIST"
export const LOGIN = "LOGIN" // in login page
export const FETCH_PATIENTS = "FETCH_PATIENTS"
export const UPDATE_PATIENTS = "UPDATE_PATIENTS"


// let url = 'http://localhost:3000/hospitals'
let url = 'https://c-trackerr.herokuapp.com/hospitals' // deployed

export const setLoggedInUser = (payload) => {
    return {
        type: SET_LOGGED_IN_USER,
        payload
    }
}

export const setPatientList = (payload) => {
    return {
        type: SET_PATIENTS_LIST,
        payload
    }
}

export const fetchHospital = (hospitalId) => {
    return(dispatch) => {
        fetch(url + `/${hospitalId}`)
            .then(res => res.json())
            .then(hospitalData => {
                dispatch(setLoggedInUser(hospitalData.name))
            })
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

export const updatePatientStatus = (patientData) => {
    const {  userId, status, hospitalId, historyId } = patientData
    console.log(patientData, '<<<< ready to be POSTed to DB'); // --> as expected
    return(dispatch) => {
        fetch(url + `/update-status`, {
            method: "PUT",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId, status, hospitalId, historyId
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                dispatch(fetchPatients(hospitalId))
            })
            .catch(err => console.log(err))
    }
}