import User from './User'

export const validator = (fieldName: string, values: User) => {
    const errors = {}
    switch(fieldName) {
        case 'fullname':
            validateFullname(values.fullname, errors)
            break
        case 'username':
            validateUsername(values.username, errors)
            break
        case 'password':
            validatePassword(values.password, errors)
            break
        case 'confirmPassword':
            validateConfirmPassword(values.confirmPassword, values.password, errors)
            break
    }
    return errors
} 

const validateFullname = (fullname: string, errors: any) => {
    if(!fullname) {
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

const validateUsername = (username: string, errors: any) => {
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

const validatePassword = (password: string, errors: any) => {
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

const validateConfirmPassword = (confirm: string, password: string, errors: any) => {
    if(!confirm || confirm !== password) {
        errors.confirmPassword = "It must be equal than password."
        return false
    }

    return true
}