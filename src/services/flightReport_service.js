import { LOCALHOSTURL } from "../constants"

async function save(report) {
    return fetch(`${LOCALHOSTURL}/api/flight-report`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(report),
        credentials: "include"
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

export {
    save
}