export interface ErrorValidator {
    [field: string]: string
}

export interface Validator<M> {
    (fieldName: string, values: M): ErrorValidator
}