import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPatients } from '../store/actions'
import PatientList from '../components/patientList'

function Home() {
    const [inputSearch, setInputSearch] = useState("")
    const [resultCateogory, setResultCategory] = useState("All")
    const history = useHistory()
    const dispatch = useDispatch()
    const { patientList } = useSelector((state) => state) // how to prevent from loss if its being refreshed?
    console.log(patientList, '<<< list of their patients');
    const { hospitalId } = useParams()
    
    useEffect(() => {
        if(!localStorage.token) {
            history.push('/login')
        } else {
            dispatch(fetchPatients(hospitalId))
        }
    }, [dispatch, history, hospitalId, inputSearch])

    const handleSignOut = () => {
        localStorage.clear() 
        history.push('/login')
    }

    const handleOnChangeSearch = (event) => {
        event.preventDefault()
        setInputSearch(event.target.value)
    }

    const handleOnChangeCategory = (event) => {
        event.preventDefault()
        setResultCategory(event.target.value)
    }

    let filteredPatients = patientList
    if(resultCateogory !== 'All') {
        filteredPatients = patientList.filter(patient => patient.User.status === resultCateogory)
    }
    if(inputSearch) {
        filteredPatients = patientList.filter(patient => patient.User.phone.includes(inputSearch))
    }
  
    // date published will be automatically generated after test result has been published
    // give confirmation button after admin has updated the status

    return (
    <div className="container mt-5">
        <div>
            <div className="col-12 mb-3 d-flex flex-row-reverse mr-0 pr-0">
                <button onClick={handleSignOut} className="pull-right btn btn-danger btn-sm">Sign out</button>
            </div>
            <div className="col-12 text-center mb-5">
                <h1>C-TRACKER LOGO HERE FOR HOME PAGE</h1>
            </div>
            <h3>Our Patients
                <span className="float-right row col-3 pr-0">
                        <input onChange={handleOnChangeSearch} value={inputSearch}
                            className="form-control col-12 mr-0 pr-0 pull-right" type="search" 
                            placeholder="Search by phone number" aria-label="Search"
                        />
                </span>
                <span className="float-right row col-2 pr-0 mr-3">
                        <select className="col-9 form-control" onChange={handleOnChangeCategory}>
                            <option className="col-12" value="All">All</option>
                            <option className="col-12" value="Waiting">Waiting</option>
                            <option className="col-12" value="Negative">Negative</option>
                            <option className="col-12" value="Positive">Positive</option>
                        </select>
                </span>
            </h3>
        </div>
        <div className="justify-content-center mt-5">
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Test Date</th>
                    <th scope="col">Type</th>
                    <th scope="col">Result</th>
                    <th scope="col">Published Date</th>
                </tr>
                </thead>
                <tbody>
                    { filteredPatients.map((patient, index) => {
                        return (
                            <PatientList patient={patient} index={index} key={patient.id}/>
                        )
                    })}
                </tbody>
            </table>
        </div>
    </div>
    )
}

export default Home