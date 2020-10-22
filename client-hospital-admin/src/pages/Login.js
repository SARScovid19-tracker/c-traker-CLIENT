import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import hospitalImg from '../assets/hospital_preview_rev_1.png'
import Swal from 'sweetalert2'
import cLogo from '../assets/logo-removebg-preview-trimmed.png'

let url = 'http://localhost:3000/hospitals'

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

function Login() {
    const [inputEmail, setInputEmail] = useState("")
    const [inputPassword, setInputPassword] = useState("")
    const [loginError, setLoginError] = useState(null)

    const history = useHistory()

    const handleOnSubmit = (event) => {
        event.preventDefault()
        if(!inputEmail || !inputPassword) {
            setLoginError(true)
        } else {
            const payload = {
                email: inputEmail, password: inputPassword
            }
            fetch(url + '/login', {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: payload.email, password: payload.password
                })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data, '<< token after login');
                    localStorage.setItem('token', data.token)
                    history.push(`/${data.hospitalId}`)
                    Toast.fire({
                        icon: 'success',
                        title: `Signed in as: ${payload.email}`
                      })
                })
                .catch(err => console.log(err, '<< login action error'))
        }
    }

    const handleOnChangeEmail = (event) => {
        setInputEmail(event.target.value)
    }
    const handleOnChangePassword = (event) => {
        setInputPassword(event.target.value)
    }

    return (
        <div className="d-flex flex-row justify-content-center flex-wrap mt-3 pt-5">
            <div className="col-12 text-center mb-3">
                <img className="w-25" src={cLogo} alt="c-tracker logo" />
            </div>
            <div className="left-login-page">
                <div className="shadow px-4 pt-5 pb-3 my-5 bg-white rounded" style={{width: "325px", height: "325px"}}>
                <h2 className="font-weight-bold mb-4">Hospital Admin</h2>
                {loginError && <p className="text-danger">Please recheck your input! Must be all filled in</p>}
                <form onSubmit={handleOnSubmit}>
                    <div className="form-group m-0">
                        <input onChange={handleOnChangeEmail} value={inputEmail}
                        className="form-control"
                        type="email"
                        placeholder=" Email"
                        required
                        />
                    </div>
                    <div className="form-group m-0">
                        <input onChange={handleOnChangePassword} value={inputPassword}
                        className="form-control mt-0"
                        type="password"
                        placeholder=" Password"
                        required
                        />
                    </div>
                    <button className="mb-3" type="submit">Login</button>
                </form>
                </div>
            </div>
            <div className="right-login-page">
                <img src={hospitalImg} alt="hospital" />
            </div>
        </div>
    )
}

export default Login