import { ACTIVEURL } from "../constants"
import * as TokenService from "./token_service"

async function search(id_user, query) {
    return fetch(`${ACTIVEURL}/api/searchbot`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': await TokenService.getToken(),
            'CrewInsights-User-ID' : id_user,
        },
        body: JSON.stringify(query),
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
    search
}