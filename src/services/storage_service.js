export function save(name, data){
    localStorage.setItem(name ,JSON.stringify(data))
}

export function erase(name){
    localStorage.removeItem(name)
}

export function get(name){
    return JSON.parse(localStorage.getItem(name))
}

export function saveToken(name, value, days){
    //document.cookie = `token=${token}; path=/; Secure; HttpOnly`;
    let expires = ""
    if (days) {
        const date = new Date()
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
        expires = "; expires=" + date.toUTCString()
    }
    document.cookie = name + "=" + value + expires + "; path=/; SameSite=Lax"
}

export function eraseToken(name){
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

export function getToken(name){
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) {
        return parts.pop().split(';').shift()
    }
    return null
}