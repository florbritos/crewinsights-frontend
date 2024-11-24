import { ACTIVEURL } from "../constants"
import * as TokenService from "./token_service"

async function getMetrics(id_user) {
    return fetch(`${ACTIVEURL}/api/dashboard/user/${id_user}`, {
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
        throw new Error('Oops! An unexpected error happened while trying to get the metrics. Please, try again later.')
    })
}

async function deleteMetric(id_user, id_metric) {
    return fetch(`${ACTIVEURL}/api/dashboard/user/${id_user}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': await TokenService.getToken(),
            'CrewInsights-User-ID' : id_user,
        },
        body: JSON.stringify({id_metric: id_metric}),
        credentials: "include"
    })
    .then(function(response){
        if (response){
            return response.json()
        } 
    })
    .catch(function(){
        throw new Error('Oops! An unexpected error happened while trying to delete a metric. Please, try again later.')
    })
}

async function addMetric(id_user, id_metric, metric) {
    return fetch(`${ACTIVEURL}/api/dashboard/user/${id_user}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': await TokenService.getToken(),
            'CrewInsights-User-ID' : id_user,
        },
        body: JSON.stringify({id_metric: id_metric, metric: metric}),
        credentials: "include"
    })
    .then(function(response){
        if (response){
            return response.json()
        } 
    })
    .catch(function(){
        throw new Error('Oops! An unexpected error happened while trying to add a metric. Please, try again later.')
    })
}

export {
    getMetrics,
    deleteMetric,
    addMetric
}