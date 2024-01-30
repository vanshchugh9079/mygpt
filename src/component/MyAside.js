import React, { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { UserContext } from '../pages/Layout';
import logo from '../assest/img/logo.png';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { gethistory, gethistorycontent } from './Helper';

export default function MyAside() {
    const { signlogbtn, setModalShow, setsendvaluetomodel, jwt, setnewchat, newchat, setAssistentData, sethistoryid, historyid, setjwt, logchange, userid, chat, setChat, setshowaside } = useContext(UserContext);
    return (
        <aside className="v-aside col-lg-2 d-lg-flex flex-column m-0 p-0 v-border d-none">
            {
                !jwt ? (
                    <div className='d-flex justify-content-center align-items-center flex-column mt-auto h-100 gap-3'>
                        {
                            signlogbtn.map((element, id) => (
                                <Button
                                    className={`bg-secondary rounded-circle v-btn ${element} fw-bold fs-5`}
                                    key={id}
                                    onMouseEnter={(e) => {
                                        let aside = document.querySelector(".v-aside");
                                        aside.classList.remove("bg-dark");
                                        aside.classList.add("bg-secondary");
                                        e.target.classList.remove("bg-secondary");
                                        e.target.classList.add("bg-dark");
                                    }}
                                    onMouseLeave={(e) => {
                                        let aside = document.querySelector(".v-aside");
                                        aside.classList.add("bg-dark");
                                        aside.classList.remove("bg-secondary");
                                        e.target.classList.add("bg-secondary");
                                        e.target.classList.remove("bg-dark");
                                    }}
                                    onClick={() => {
                                        if (id === 0) {
                                            setModalShow(true);
                                            setsendvaluetomodel(0);
                                            console.log("This is login modal");
                                        }
                                        if (id === 1) {
                                            setModalShow(true);
                                            setsendvaluetomodel(1);
                                        }
                                    }}
                                >
                                    {element}
                                </Button>
                            ))
                        }
                    </div>
                ) : (
                    <div id='history-cont d-flex' className='m-0 mt-3 p-0'>
                        <div
                            className=' d-flex justify-content-center fixed-top  mt-2 v-asidecont'
                        >
                            <div className='cursor-pointer d-flex me-auto ms-4 ms-lg-2 justify-content-between   p-1 rounded-4' onClick={() => {
                                setshowaside(false)
                                if (newchat === false) {
                                    setnewchat(true);
                                }
                            }}>
                                <div className='d-flex justify-content-between gap-lg-5 gap-sm-4'>
                                    <div className='ms-lg-1 d-flex'>
                                        <div className='bg-light d-lg-inline-block rounded-circle d-sm-none '>
                                            <img src={logo} height={"35px"} alt="Logo"></img>
                                        </div>
                                        <p className="text-white  fw-bold p-0 m-0">New Chat</p>
                                    </div>
                                    <span className=''>
                                        <FontAwesomeIcon
                                            className='d-inline'
                                            icon={faPenToSquare}
                                            style={{ color: "white" }}
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='m-0 p-0 mt-5'>
                            <div className='container  v-chatheadcontainer '>
                                {chat &&
                                    chat.map((element, id) => (
                                        <div className='mt-2 w-100 v-chathead d-inline-block p-1 v-border ' key={id} onClick={() => {
                                            sethistoryid(element.id)
                                            let getcontent = gethistorycontent(element.id)
                                            getcontent.then((data) => {
                                                console.log(data)
                                                let arr = []
                                                data.data.forEach((element) => {
                                                    arr.push(
                                                        {
                                                            yourmessage: element.attributes.user,
                                                            assistentmessages: element.attributes.assistent,
                                                        }
                                                    );
                                                })
                                                setAssistentData(arr)
                                                setnewchat(false)
                                                setshowaside(false)
                                            })
                                        }}>
                                            <p key={id} className="text-white">{element.attributes.Name}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div
                            className='fixed-bottom mt-4 v-asidecont'
                        >
                            <Dropdown as={ButtonGroup} className=' rounded-4'>
                                <Button variant="black" onMouseEnter={(e) => {
                                    e.preventDefault()
                                    return;
                                }}>
                                    <div className='v-circle bg-white rounded-circle fw-bold  justify-content-center align-items-center d-flex fs-3 text-success'>{window.localStorage.getItem("name").charAt(0).toUpperCase()}</div>
                                </Button>

                                <Dropdown.Toggle split variant="black" id="dropdown-split-basic" className='fw-bold text-white' />
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => {
                                        setjwt(null)
                                        window.localStorage.clear()
                                    }}>Log out</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                )
            }
        </aside>
    );
}
