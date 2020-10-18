import React, { useState } from 'react'
import Modal from 'react-modal'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import moment from 'moment'

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
    const { patient, index } = props

    const openModalHandler = () => {
        setIsShowing(true)
    }
    
    const closeModalHandler = () => {
        setIsShowing(false)
    }

    const options = [
        'Waiting', 'Negative', 'Positive'
    ];
    const defaultOption = options[0];

    return(
    <>
        <tr onClick={openModalHandler}>
                    <th scope="row">{index + 1}</th>
                    <td>{patient.User.name}</td>
                    <td>{patient.User.phone}</td>
                    <td>{moment(patient.createdAt).format('LL')}</td>
                    <td>{patient.testingType}</td>
                    <td>{patient.User.status}</td>
                    <td>{
                            !patient.publishedAt ? "-" :
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
        <form className="mt-4">
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
                <Dropdown options={options} value={defaultOption} />
            </div>
            <button type="submit" className="btn btn-primary mt-3 btn-block">Save patient details</button>
        </form>
        </Modal>
    </>
    )
}