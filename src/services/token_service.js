import { Capacitor } from '@capacitor/core'
import { Preferences } from '@capacitor/preferences';
import Cookies from 'js-cookie'

const saveToken = async (token) => {
    if (Capacitor.isNativePlatform()) {
        await Preferences.set({ key: 'auth_token', value: token })
    } else {
        Cookies.set('auth_token', token, {
            path: '/',
            sameSite: 'Lax',
            secure: false // Cambiar a true en producción (HTTPS)
        })
    }
}

const getToken = async () => {
    if (Capacitor.isNativePlatform()) {
        const { value } = await Preferences.get({ key: 'auth_token' })
        return value
    } else {
        return Cookies.get('auth_token')
    }
};

const deleteToken = async () => {
    if (Capacitor.isNativePlatform()) {
        await Preferences.remove({ key: 'auth_token' })
    } else {
        Cookies.remove('auth_token', { path: '/' })
    }
}

export {
    saveToken,
    getToken,
    deleteToken
}
