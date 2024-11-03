import { LOCALHOSTURL } from "../constants"

async function getMetrics(id_user) {
    return fetch(`${LOCALHOSTURL}/api/dashboard/${id_user}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    })
    .then(function(response){
        if (response){
            return response.json()
        } 
    })
    .catch(function(){
        throw new Error('Oops! An unexpected error happened while trying to send a message. Please, try again later.')
    })
}

export {
    getMetrics
}