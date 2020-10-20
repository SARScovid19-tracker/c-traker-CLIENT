import React from 'react'
import cLogo from '../assets/logo-removebg-preview-trimmed.png'


function Welcome() {
    return (
        <div className="d-flex flex-row justify-content-center flex-wrap mt-5 pt-5">            
            <div className="col-12 text-center mb-3">
                <img src={cLogo} alt="c-tracker logo" />
            </div>
            <div className="col-12 text-center mt-3 mb-3">
                <h2 className="text-gray-900 text-2x1 font-semibold">Is</h2>
            </div>
            <h5 className="text-gray-900 text-2x1 font-semibold pt-3 col-12 text-center">Made with passion and lots of laughter by</h5>
            <h5 className="text-gray-900 text-2x1 font-semibold pt-1 font-weight-bold">Wisma, Satriko, Budi, Surya and Rifky ;)</h5>
        </div>
    )
}

export default Welcome