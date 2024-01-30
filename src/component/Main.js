import React, { createContext, useContext, useEffect, useState } from 'react'
import DefaultMessege from './DefaultMessege';
import logo from '../assest/img/logo.png';
import logo2 from '../assest/img/logo2.png';
import InputFooter from './InputFotter';
import { UserContext } from '../pages/Layout';
import { faBars, faMultiply } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export let maincontext = createContext()
export default function Main() {
    const { assistentData, newchat, jwt, showaside, setshowaside } = useContext(UserContext)
    const [message, setMessage] = useState('');
    const[clickdefault,setclickdefault] = useState(false)
    useEffect(() => {
        let aside = document.querySelector(".v-aside")
        if (showaside === true) {
            aside.classList.remove("d-none")
            aside.classList.add("show-aside")
        }
        if (showaside === false) {
            aside.classList.remove("show-aside")
            aside.classList.add("d-none")
        }
    }, [showaside])
    return (
        <maincontext.Provider value={{message,setMessage,clickdefault,setclickdefault}}>
            <div className="v-main col-lg-10 col-sm-12 m-0 p-0 bg-secondary 
            ">
                <div className='cursor-pointer fixed-top d-inline-block' onClick={() => {
                    if (showaside === false) {
                        setshowaside(true)
                    }
                    else {
                        setshowaside(false)
                    }

                }}>
                    <FontAwesomeIcon icon={showaside === false ? faBars : faMultiply} className={` fs-2  ${showaside === true ? "text-danger v-margin mt-1" : "ms-1 text-black"} d-lg-none mt-1`} ></FontAwesomeIcon>
                </div>
                {
                    (jwt ? newchat === true : assistentData.length === 0) && (
                        <div className="w-100 d-flex h-100 justify-content-center flex-column align-items-center">
                            <div className="items-center bg-danger rounded-circle v-img d-flex flex-column justify-content-center align-items-center rounded-full bg-white text-black">
                                <img src={logo} height="50px" alt="Your Logo" />
                            </div>
                            <h3 className="text-white fw-bold mt-2 ">How can I help you today?</h3>
                            <DefaultMessege />
                        </div>
                    )}
                {(jwt ? newchat === false : assistentData.length > 0) && (
                    <div className="container mt-2  v-container overflow-auto" >
                        {assistentData.map((element, index) => (
                            <div key={index}>
                                <div className="d-inline-flex bg-danger justify-content-center v-border sender-image rounded-circle">
                                    <p className="text-white">{jwt ? window.localStorage.getItem("name")[0].toUpperCase() : ""}</p>
                                </div>
                                <h6 className="d-inline fw-bold text-white ms-2">Your message</h6>
                                <div className='v-mess'>
                                    <pre className='fs-6 text-white'>{element.yourmessage}</pre>
                                </div>
                                <img
                                    src={logo2}
                                    height="30px"
                                    className="rounded-circle v-border mt-1"
                                    alt="Assistant Logo"
                                />
                                <h6 className="d-inline fw-bold text-white ms-2">ChatGPT</h6>
                                <div className="v-mess my-chathead">
                                    <pre className='fs-6 text-white'>{element.assistentmessages}</pre>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <InputFooter />
            </div>
        </maincontext.Provider>
    )
}
