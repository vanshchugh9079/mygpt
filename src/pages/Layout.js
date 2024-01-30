import React, { createContext, useEffect, useState } from 'react';
import MyModel from '../component/MyModel';
import MyAside from '../component/MyAside';
import Main from '../component/Main';
import { gethistory, postHistory, postcontent } from '../component/Helper';
export const UserContext = createContext()
const Layout = () => {
    let signlogbtn = ["Login", "Sign up"]
    let [showaside, setshowaside] = useState(false)
    const [jwt, setjwt] = useState(null)
    const [userid, setuserid] = useState(null)
    const [newchat, setnewchat] = useState(true)
    const [chatName, setChatName] = useState()
    const [assistentData, setAssistentData] = useState([])
    const [loader, setLoader] = useState(false)
    const [modalShow, setModalShow] = useState(false);
    const [sendvaluetomodel, setsendvaluetomodel] = useState(null);
    const [historyid, sethistoryid] = useState(null)
    let [logchange, setlogchange] = useState(false)
    let [chat, setChat] = useState();
    const senddatafromchild = (assistentmessages, message, load, chatname) => {
        let content = assistentmessages.message.content;
        if (jwt) {
            console.log(assistentmessages);
            console.log(message);
            console.log(content);
            if (newchat === false) {
                postcontent(message, content, historyid)
                setAssistentData([
                    ...assistentData,
                    {
                        yourmessage: message,
                        assistentmessages: content,
                    },
                ])
            }
            else {
                setnewchat(false)
                postHistory(chatname).then((data) => {
                    sethistoryid(data.data.id)
                    postcontent(message, content, data.data.id)
                })
                setChatName(chatname)
                setAssistentData([
                    {
                        yourmessage: message,
                        assistentmessages: content,
                    },
                ]);
            }
        }
        else {
            setAssistentData([
                ...assistentData,
                {
                    yourmessage: message,
                    assistentmessages: content,
                },
            ])
        }
    };
    useEffect(() => {
        if(jwt)
        {
            let data = gethistory(userid,jwt);
            data.then((res) => {
                console.log(res);
                setChat(res.data)
            });
        }
    }, [userid,historyid])
 
    useEffect(() => {
        let token = window.localStorage.getItem("token")
        if (token) {
            setjwt(token)
        }
        let id = window.localStorage.getItem("id")
        if (id)
            setuserid(id)
    }, [historyid])
    useEffect(() => {
        if (loader) {
            setLoader(false);
        }
    }, [loader]);
    return (
        <UserContext.Provider value={{ setModalShow, setjwt, jwt, signlogbtn, setsendvaluetomodel, assistentData, senddatafromchild, userid, setuserid, setnewchat, newchat, chatName, setChatName, setAssistentData, sethistoryid, historyid, logchange, setlogchange, chat, setChat , showaside,setshowaside }}>
            <div className="v-layout row m-0 p-0 w-100">
                <MyAside />
                <Main />
                <MyModel
                    show={modalShow}
                    modelvalue={sendvaluetomodel}
                    onHide={() => setModalShow(false)}
                />
            </div>
        </UserContext.Provider>
    );
};

export default Layout;