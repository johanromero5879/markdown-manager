import Document from './document'
import { Validator, ErrorValidator } from '../validator'

export const validator: Validator<Document> = (fieldName, values) => {

    const errors: ErrorValidator = {}
    const { title, content } = values

    if (fieldName === 'title') {
        validateTitle(title, errors)
    }

    if (fieldName === 'content') {
        validateContent(content, errors)
    }

    return errors

}

const validateTitle = (title: string, errors: ErrorValidator) => {
    return false
}

const validateContent = (content: string, errors: ErrorValidator) => {
    return false
}