import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Modal from 'react-modal'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import { updatePatientStatus } from '../store/actions'
import Swal from 'sweetalert2'


const modalStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : '50%',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
  
Modal.setAppElement('#root')

export default function PatientList (props) {
    const [isShowing, setIsShowing] = useState(false)
    const [inputStatus, setInputStatus] = useState('')
    const { patient, index } = props
    const { hospitalId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        patient && setInputStatus(patient.User.status)
    }, [patient])

    const openModalHandler = () => {
        setIsShowing(true)
    }
    
    const closeModalHandler = () => {
        setIsShowing(false)
    }

    const handleOnChangeInputStatus = (event) => {
        event.preventDefault()
        setInputStatus(event.target.value)
    }

    const handleOnSubmit = (event) => {
        event.preventDefault()
        const payload = {
            userId: patient.User.id,
            status: inputStatus,
            hospitalId,
            historyId: patient.id,
        }
        Swal.fire({
            title: `Are you sure the result is ${inputStatus} for ${patient.User.name}?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Publish it!'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(payload);
                dispatch(updatePatientStatus(payload))
                setIsShowing(false)
                Swal.fire({
                    text: 'Status Changed!',
                    title: inputStatus === 'Positive' ? `${patient.User.name} will be notified soon` :
                    `${patient.User.name} test result is Negative`,
                    icon: 'success'
                })
            }
        })
    }

    return(
    <>
        <tr>
                    <th scope="row" className="align-middle">{index + 1}</th>
                    <td className="align-middle">{patient.User.name}</td>
                    <td className="align-middle">{patient.User.phone}</td>
                    <td className="align-middle">{moment(patient.createdAt).format('LL')}</td>
                    <td className="align-middle">{patient.testingType}</td> 
                    {
                            patient.isWaitingResult ? 
                            <td className="badge p-1" style={{margin: "22px 0 0 12px", color:"#F9C851", backgroundColor:"#F9C8512E"}}>Waiting</td> :
                            patient.User.status === "Negative" ?
                            <td className="badge p-1" style={{margin: "22px 0 0 12px", color:"#10C469", backgroundColor:"#10C4692E"}}>Negative</td> :
                            <td className="badge p-1" style={{margin: "22px 0 0 12px", color:"#FF5B5B", backgroundColor:"#FF5B5B2E"}}>Positive</td>
                    }
                    {
                        patient.publishedAt ?
                        <td className="align-middle">{moment(patient.publishedAt).format('LL')}</td> :
                        <td className="align-middle" style={{paddingLeft: "70px"}}>-</td>
                    }
                    <td className="px-0"><button className="btn btn-link" onClick={openModalHandler}> 
                    <svg width="1.25em" height="1.25em" viewBox="0 0 16 16" className="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg></button>
                    </td>
        </tr>
        <Modal
            isOpen={isShowing}
            onRequestClose={closeModalHandler}
            style={modalStyles}
            contentLabel="yeah this is a cool modal example"
        >
        <h3 className="mt-3">Patient Details</h3>
        <form onSubmit={handleOnSubmit} className="mt-4">
            <div className="row">
                <div className="form-group col-6">
                    <label >Name</label>
                    <input value={patient.User.name}
                    type="text" className="form-control" aria-describedby="emailHelp" readOnly/>
                </div>
                <div className="form-group col-6">
                    <label>Phone Number</label>
                    <input value={patient.User.phone}
                    type="text" className="form-control" aria-describedby="emailHelp" readOnly/>
                </div>
            </div>
            <div className="row">
                <div className="form-group col-6">
                    <label>Test Date</label>
                    <input value="September, 12 2020"
                    type="text" className="form-control" readOnly/>
                </div>
                <div className="form-group col-6">
                    <label>Type</label>
                    <input value={patient.testingType}
                    type="text" className="form-control" readOnly/>
                </div>
            </div>
            <div className="form-group dropdown">
                <label>Result</label>
                <select className="col-12 form-control" value={inputStatus} onChange={handleOnChangeInputStatus}>
                    <option value="Waiting" disabled>Waiting</option>
                    <option value="Negative">Negative</option>
                    <option value="Positive">Positive</option>
                </select>
            </div>
            <button type="submit" className="btn btn-primary mt-3 btn-block">Change Patient Details</button>
        </form>
        </Modal>
    </>
    )
}