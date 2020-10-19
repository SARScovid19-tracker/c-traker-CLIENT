import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import hospitalImg from '../assets/hospital.jpg'
import '../assets/style.css'
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
        <div className="d-flex flex-row justify-content-center flex-wrap mt-5 pt-5">
            <div className="col-12 text-center mb-3">
                <img src={cLogo} alt="c-tracker logo" />
            </div>
            <div className="left-login-page">
                <div className="shadow px-4 pt-4 pb-3 my-5 bg-white rounded" style={{width: "325px", height: "275px"}}>
                <h3>Hospital Admin</h3>
                {loginError && <p className="text-danger">Please recheck your input! Must be all filled in</p>}
                <form onSubmit={handleOnSubmit}>
                    <input onChange={handleOnChangeEmail} value={inputEmail}
                    className="input-form"
                    type="email"
                    placeholder=" Email"
                    required
                    />
                    <input onChange={handleOnChangePassword} value={inputPassword}
                    className="input-form"
                    type="password"
                    placeholder=" Password"
                    required
                    />
                    <button type="submit">Login</button>
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