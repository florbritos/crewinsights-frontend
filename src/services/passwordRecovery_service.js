import { ACTIVEURL } from "../constants"

async function sendOTP(email, otp) {
    return fetch(`${ACTIVEURL}/api/password-recovery`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'email': email, 'otp': otp}),
    })
    .then(function(response){
        if (response){
            return response.json()
        } 
    })
    .catch(function(){
        throw new Error('Oops! An unexpected error happened while trying to log you in. Please, try again later.')
    })
}

async function resetPassword(email, password) {
    return fetch(`${ACTIVEURL}/api/password-recovery`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'email': email, 'password': password}),
    })
    .then(function(response){
        if (response){
            return response.json()
        } 
    })
    .catch(function(){
        throw new Error('Oops! An unexpected error happened while trying to log you in. Please, try again later.')
    })
}

export {
    sendOTP,
    resetPassword
}