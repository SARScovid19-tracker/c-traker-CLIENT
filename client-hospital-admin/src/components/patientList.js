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
        <tr onClick={openModalHandler}>
                    <th scope="row">{index + 1}</th>
                    <td>{patient.User.name}</td>
                    <td>{patient.User.phone}</td>
                    <td>{moment(patient.createdAt).format('LL')}</td>
                    <td>{patient.testingType}</td>
                    <td>{
                            patient.isWaitingResult ? "Waiting" :
                            patient.User.status
                        }
                    </td>
                    <td>{
                            patient.isWaitingResult ? "-" :
                            moment(patient.publishedAt).format('LL')
                        }
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