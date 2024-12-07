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
    })
    .catch(function(){
        throw new Error('Oops! An unexpected error happened while trying to send a flight report. Please, try again later.')
    })
}

export {
    save
}