import { Validator, ErrorValidator } from '../validator'
import { Auth } from './auth'

export const validator: Validator<Auth> = (fieldName, values) => {
    const errors: ErrorValidator = {}
    const { username, password } = values

    if (fieldName === 'username') {
        validateUsername(username, errors)
    }

    if (fieldName === 'password') {
        validatePassword(password, errors)
    }

    return errors
}

const validateUsername = (username: string, errors: ErrorValidator) => {

    if(!username) {
        errors.username = "Username is required."
        return false
    }

    if(!/^[\w.]{8,20}$/.test(username)) {
        errors.username = "Username must have between 8 and 20 alphanumeric characters, including special characters: ._"
        return false
    }

    if(!/^[^_.].*[^_.]$/.test(username)) {
        errors.username = "Username must not start or finish with a special character."
        return false
    }

    if(/[_.]{2}/.test(username)) {
        errors.username = "Username must not have 2 or more special characters in a row."
        return false
    }

    return true

}

const validatePassword = (password: string, errors: ErrorValidator) => {

    if(!password) {
        errors.password = "Password is required."
        return false
    }

    if(!/^[A-Za-z0-9_.@$!%*?&]{8,20}$/.test(password)) {
        errors.password = "Password must have between 8 and 20 characters."
        return false
    }

    if(!/[_.@$!%*?&]+/.test(password)) {
        errors.password = "Password must include at least 1 special character _.@$!%*?&"
        return false
    }

    if(!/[A-Z]+/.test(password)) {
        errors.password = "Password must include at least 1 uppercase."
        return false
    }

    if(!/[0-9]+/.test(password)) {
        errors.password = "Password must include at least 1 number."
        return false
    }

    return true

}