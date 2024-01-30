import React, { useContext, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { headers, url } from "../component/Helper"
import Swal from 'sweetalert2'
import { UserContext } from './Layout'
export default function Login({ modelvalue }) {
    const {setjwt,setModalShow,setuserid,logchange,setlogchange}= useContext(UserContext);
    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const [name, setname] = useState()
    const [showpassword, setshowpassword] = useState(false)
    let [firstshow, setfirstshow] = useState(modelvalue)
    let signupnapi = () => {
        fetch(url + "auth/local/register", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(
                {
                    "username": name,
                    "email": email,
                    "password": password
                }
            )
        })
            .then(res => res.json())
            .then(data => {
                if (data.data !== null) {
                    setModalShow(false)
                    window.localStorage.setItem("token", data.jwt)
                    window.localStorage.setItem("id",data.user.id)
                    setjwt(window.localStorage.getItem("token"))
                    setuserid(window.localStorage.getItem("id"))
                    Swal.fire({
                        title: "your account created Successfully!",
                        text: `press ok to go HOME`,
                        icon: "success"
                    }).then((result) => {
                        if (result.isConfirmed === true) {
                            window.localStorage.setItem("name", name)
                        }
                    })
                }
                else if (data.data === null) {
                    Swal.fire({
                        title: data.error.message,
                        text: "",
                        icon: "error"
                    });
                }
            })
            .catch(err => console.log(err))
    }
    let loginapi = () => {
        console.log("this is login");
        fetch(url + "auth/local", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                "identifier": name,
                "password": password,
            })
        }).then(res => res.json())
            .then(data => {
                window.localStorage.setItem("token", data.jwt)
                window.localStorage.setItem("id",data.user.id)
                console.log(data);
                if (data.data !== null) {
                    setModalShow(false)
                    Swal.fire({
                        title: "you login successfully",
                        text: `click ok to go HOME`,
                        icon: "success",
                    }).then((result) => {
                        if (result.isConfirmed === true) {
                            window.localStorage.setItem("name", name)
                            setjwt(window.localStorage.getItem("token"))
                            setuserid(window.localStorage.getItem("id"))
                            setlogchange(!logchange)
                        }
                    })
                }
                else {
                    Swal.fire({
                        title: data.error.message,
                        text: "",
                        icon: "error"
                    });
                }
            })
            .catch(err => console.log(err))
    }
    let logsignobj = [{
        api: loginapi,
        text: "Login",
        component: ["usename", "password"]

    }, {
        api: signupnapi,
        text: "Sign up",
        component: ["usename", "email", "password"]
    }]
    let toggleeye = () => {
        let pass = document.querySelectorAll(".v-password")[0]
        setshowpassword(!showpassword)
        if (pass.type === "password") {
            pass.type = "text"
        }
        else if (pass.type === "text") {
            pass.type = "password"
        }
    }
    useEffect(() => {
        let allform = document.querySelectorAll("v-formcontrol")
        allform.forEach((element) => {
            element.value = ""
        })
    }, [firstshow])
    return (
        <>
            <div className='d-flex justify-content-end'>
                <div className='d-flex justify-content-between width-fixer'>
                    <h1 className="d-inline fw-bold text-danger">{logsignobj[firstshow].text}</h1>
                    <button className='btn fs-4' onClick={() => {
                        setModalShow(false)
                    }}>❌</button>
                </div>
            </div>
            <Form className='d-flex justify-content-center  flex-column align-items-center'>
                <Form.Group className="mb-3" controlId="formBasicname">
                    <Form.Label className='text-primary'>Username</Form.Label>
                    <Form.Control type="text" className='border-black v-logwidth v-formcontrol' onChange={(e) => {
                        setname(e.target.value)
                    }} placeholder="Enter username" />
                </Form.Group>
                {firstshow === 1 &&
                    <>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className='text-primary'>Email address</Form.Label>
                            <Form.Control type="email" className='border-black v-logwidth v-formcontrol' onChange={(e) => {
                                setemail(e.target.value)
                            }} placeholder="Enter email" />
                        </Form.Group>
                    </>
                }
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className='text-primary'>Password</Form.Label>
                    <div className='border-black v-logwidth d-flex form-control m-0 p-0 '>
                        <Form.Control className='v-password v-formcontrol' onChange={(e) => {
                            setpassword(e.target.value)
                        }} type="password" placeholder="Password" />
                        <FontAwesomeIcon icon={(showpassword) ? faEyeSlash : faEye} className='d-inline mt-2 me-3 ' onClick={(e) => {
                            toggleeye(e);
                        }} />
                    </div>
                </Form.Group>
                <div className=' me-auto log-btn mb-3'>
                    <button className='btn bg-danger text-white btn-log' onClick={(e) => {
                        e.preventDefault();
                        if (firstshow === 0)
                            loginapi()
                        if(firstshow===1)
                           signupnapi()
                    }}>{logsignobj[firstshow].text}</button>
                </div>
            </Form>
            <p className='d-inline log-btn'>{firstshow === 0 ? "If does not have an account then" : "if you have an already account then"}<a href="#" className='text-danger text-decoration-none cursor-pointer ' onClick={() => {
                if (firstshow === 0) {
                    setfirstshow(1)
                }
                else {
                    setfirstshow(0)
                }
            }}>{firstshow === 0 ? " signup" : " login"}</a></p>
        </>
    )
}
