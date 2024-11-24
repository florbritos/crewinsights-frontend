import { ACTIVEURL } from "../constants"
import * as TokenService from "./token_service"

async function initChat(id_user, message) {
    return fetch(`${ACTIVEURL}/api/crewbot/chat/init`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': await TokenService.getToken(),
            'CrewInsights-User-ID' : id_user,
        },
        body: JSON.stringify(message),
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

async function handleChat(id_user, message) {
    return fetch(`${ACTIVEURL}/api/crewbot/chat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': await TokenService.getToken(),
            'CrewInsights-User-ID' : id_user,
        },
        body: JSON.stringify(message),
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

async function getAllChatsByUserId(id_user) {
    return fetch(`${ACTIVEURL}/api/crewbot/user/${id_user}`, {
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
    .catch(function(){
        throw new Error('Oops! An unexpected error happened while trying to send a message. Please, try again later.')
    })
}

async function deleteChat(id_user, id_chat) {
    return fetch(`${ACTIVEURL}/api/crewbot/user/${id_user}/chat/${id_chat}`, {
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
    .catch(function(){
        throw new Error('Oops! An unexpected error happened while trying to delete a chat. Please, try again later.')
    })
}


export {
    initChat,
    handleChat,
    getAllChatsByUserId,
    deleteChat
}