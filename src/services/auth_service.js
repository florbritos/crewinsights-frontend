import { LOCALHOSTURL } from "../constants"

async function login(login_info) {
    return fetch(`${LOCALHOSTURL}/api/account/session`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(login_info),
        //credentials: "include"
    })
    .then(function(response){
        if (response){
            return response.json()
        } 
        // else {
        //     throw new Error('Oops! An unexpected error happened while trying to log you in. Please, try again later.')
        // }
    })
    .catch(function(){
        throw new Error('Oops! An unexpected error happened while trying to log you in. Please, try again later.')
    })
}

async function logout(id_user) {
    return fetch(`${LOCALHOSTURL}/api/account/session`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id_user: id_user}),
        //credentials: "include"
    })
    .then(function(response){
        if (response){
            return response.json()
        } 
    })
    .catch(()=>{
        throw new Error('Oops! An unexpected error happened while trying to log you out. Please, try again later.')
    })
}

export {
    login,
    logout
}