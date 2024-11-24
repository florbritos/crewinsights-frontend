export function save(name, data){
    localStorage.setItem(name ,JSON.stringify(data))
}

export function erase(name){
    localStorage.removeItem(name)
}

export function get(name){
    return JSON.parse(localStorage.getItem(name))
}