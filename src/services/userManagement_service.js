import { ACTIVEURL } from "../constants"
import * as TokenService from "./token_service"

async function getList(id_user) {
    return fetch(`${ACTIVEURL}/api/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': await TokenService.getToken(),
            'CrewInsights-User-ID' : id_user,
        },
        credentials: "include"
    })
    .then(function(response){
        if (response){
            return response.json()
        } 
    })
    .catch(()=>{
        throw new Error('Oops! An unexpected error happened while trying to get an user list. Please, try again later.')
    })
}

async function updateUser(id_user, id_user_change, changes) {
    return fetch(`${ACTIVEURL}/api/users/${id_user_change}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': await TokenService.getToken(),
            'CrewInsights-User-ID' : id_user,
        },
        body: JSON.stringify(changes),
        credentials: "include"
    })
    .then(function(response){
        if (response){
            return response.json()
        } 
    })
    .catch(()=>{
        throw new Error('Oops! An unexpected error happened while trying to update an user. Please, try again later.')
    })
}

async function createUser(id_user, data) {
    return fetch(`${ACTIVEURL}/api/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': await TokenService.getToken(),
            'CrewInsights-User-ID' : id_user,
        },
        body: JSON.stringify(data),
        credentials: "include"
    })
    .then(function(response){
        if (response){
            return response.json()
        } 
    })
    .catch(()=>{
        throw new Error('Oops! An unexpected error happened while trying to create an user. Please, try again later.')
    })
}

async function deleteUser(id_user, delete_id_user){
    return fetch(`${ACTIVEURL}/api/users/${delete_id_user}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': await TokenService.getToken(),
            'CrewInsights-User-ID' : id_user,
        },
        credentials: "include"
    })
    .then(function(response){
        if (response){
            return response.json()
        } 
    })
    .catch(()=>{
        throw new Error('Oops! An unexpected error happened while trying to delete an user. Please, try again later.')
    })
}

export {
    getList,
    updateUser,
    createUser,
    deleteUser
}