import { NewUser } from './user'
import { Validator, ErrorValidator } from '../validator'

export const validator: Validator<NewUser> = (fieldName, values) => {

    const errors: ErrorValidator = {}
    const { fullname, username, password, confirmPassword } = values

    if (fieldName === 'fullname') {
        validateFullname(fullname, errors)
    }

    if (fieldName === 'username') {
        validateUsername(username, errors)
    }

    if (fieldName === 'password') {
        validatePassword(password, errors)
    }

    if (fieldName === 'confirmPassword') {
        validateConfirmPassword(confirmPassword, password, errors)
    }

    return errors

} 

const validateFullname = (fullname: string, errors: ErrorValidator) => {

    if(!fullname || fullname.length === 0) {
        errors.fullname = "Fullname is required."
        return false
    }

    if(!/^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]{6,40}$/.test(fullname)) {
        errors.fullname = "Fullname must have between 6 and 40 alphabetic characters."
        return false
    }

    if(/[ ]{2,}/.test(fullname)) {
        errors.fullname = "Fullname must not have 2 or more white space in a row."
        return false
    }

    return true

}

const validateUsername = (username: string, errors: ErrorValidator) => {

    if(!username || username.length === 0) {
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

    if(!password || password.length === 0) {
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

const validateConfirmPassword = (confirm: string, password: string, errors: ErrorValidator) => {

    if(!confirm || confirm !== password) {
        errors.confirmPassword = "It must be equal than the password."
        return false
    }

    return true

}