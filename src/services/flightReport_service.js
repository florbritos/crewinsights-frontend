import { ACTIVEURL } from "../constants"
import * as TokenService from "./token_service"

async function save(id_user, report) {
    return fetch(`${ACTIVEURL}/api/flight-report`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': await TokenService.getToken(),
            'CrewInsights-User-ID' : id_user,
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