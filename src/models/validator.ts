export type ErrorValidation<T> = Record<keyof T, string>

export interface IValidator<T> {
    validateAll: (values: T) => ErrorValidation<T>,
    validateField: (name: keyof T, value: string, compareTo?: string) => string | undefined
}

export abstract class Validator<T> implements IValidator<T> {

    abstract validateField(name: keyof T, value: string, compareTo?: string): string | undefined
    
    validateAll(values: T) {

        const errors = {} as ErrorValidation<T>
        
        for (const key in values) {
            
            const error = this.validateField(key, values[key]+'')
            if (error) errors[key] = error

        }

        return errors

    }

}