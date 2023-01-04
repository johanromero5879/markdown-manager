import { Validator, ErrorValidation } from '../validator'
import { NewUser, Auth } from './user'

// eslint-disable-next-line
type UserUnion = NewUser | Auth 

export class UserValidator<UserUnion> extends Validator<UserUnion> {

    validateAll(values: UserUnion) {
        
        const fields = values as unknown as NewUser

        if ('confirmPassword' in fields) {
            const confirmPasswordError = this.validateField(
                'confirmPassword' as keyof UserUnion, 
                fields.confirmPassword, 
                fields.password
            )

            if (confirmPasswordError)  {
                const errors = super.validateAll(values) as unknown as ErrorValidation<NewUser>
                errors.confirmPassword = confirmPasswordError
                
                return errors as ErrorValidation<UserUnion>
            }
        }
        
        return super.validateAll(values)

    }

    validateField(name: keyof UserUnion, value: string, compareTo?: string) {
        
        if (name === 'fullname') return this.validateFullname(value)
    
        if (name === 'username') return this.validateUsername(value)

        if (name === 'password') return this.validatePassword(value)

        if (name === 'confirmPassword' && compareTo) return this.validateConfirmPassword(value, compareTo)

    }

    private validateFullname(fullname: string) {

        if(!fullname || fullname.length === 0) return "Fullname is required."
    
        if(!/^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]{6,40}$/.test(fullname)) return "Fullname must have between 6 and 40 alphabetic characters."
    
        if(/[ ]{2,}/.test(fullname)) return "Fullname must not have 2 or more white space in a row."
    
    }

    private validateUsername(username: string) {

        if(!username || username.length === 0) return "Username is required."
    
        if(!/^[\w.]{8,20}$/.test(username)) return "Username must have between 8 and 20 alphanumeric characters, including special characters: ._"
    
        if(!/^[^_.].*[^_.]$/.test(username)) return "Username must not start or finish with a special character."
    
        if(/[_.]{2}/.test(username)) return "Username must not have 2 or more special characters in a row."
    
    }

    private validatePassword(password: string) {

        if(!password || password.length === 0) return "Password is required."
    
        if(!/^[A-Za-z0-9_.@$!%*?&]{8,20}$/.test(password)) return "Password must have between 8 and 20 characters."
    
        if(!/[_.@$!%*?&]+/.test(password)) return "Password must include at least 1 special character _.@$!%*?&"
    
        if(!/[A-Z]+/.test(password)) return "Password must include at least 1 uppercase."
    
        if(!/[0-9]+/.test(password)) return "Password must include at least 1 number."
    
    }

    private validateConfirmPassword(confirm: string, password: string) {

        if(confirm !== password) return "It must be equal than the password."
    
    }
}