import { LOCALHOSTURL } from "../constants"

async function getMetrics(id_user) {
    return fetch(`${LOCALHOSTURL}/api/dashboard/user/${id_user}`, {
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

async function deleteMetric(id_user, id_metric) {
    return fetch(`${LOCALHOSTURL}/api/dashboard/user/${id_user}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
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

export {
    getMetrics,
    deleteMetric
}