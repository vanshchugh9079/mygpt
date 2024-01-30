export let url = "http://localhost:1337/api/"
export let id = window.localStorage.getItem("id")
export let headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json'
}
export let postHistory = (chatname) => {
    let sendhistory = fetch(url + "histories", {
        method: "POST",
        headers: {
            'accept': 'application/json',
            Authorization: "Bearer " + window.localStorage.getItem("token"),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data: {
                Name: `${!chatname ? "New Chat" : chatname}`,
                "users_permissions_user": `${id}`
            }
        })

    }).then((res) => res.json())
    return sendhistory
}
export let gethistory = (id,jwt) => {
    let getdata = fetch(url + `histories?filters[users_permissions_user][id][$eq]=${id}`, {
        method: "GET",
        headers: {
            'accept': 'application/json',
            Authorization: "Bearer " + jwt,
            'Content-Type': 'application/json'
        },
    }).then(res => res.json())
    return getdata
}
export let gethistorycontent = (historyid) => {
    let getdata = fetch(url + `contents?filters[history][id][$eq]=${historyid}`, {
        method: "GET",
        headers: {
            'accept': 'application/json',
            Authorization: "Bearer " + window.localStorage.getItem("token"),
            'Content-Type': 'application/json'
        },
    }).then(res => res.json()).then((data) => {
        return data
    })
    return getdata
}
export let postcontent=(user,assistent,historyid)=>{
     fetch(url + "contents", {
        method: "POST",
        headers: {
            'accept': 'application/json',
            Authorization: "Bearer " + window.localStorage.getItem("token"),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data: {
                "user": user,
                "assistent": assistent,
                "history": `${historyid}`
            }
        })

    }).then((res) => res.json()).then((data)=>{
        console.log(data);
    })
}