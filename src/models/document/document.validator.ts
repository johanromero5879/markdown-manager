import { NewDocument } from './document'
import { Validator, ErrorValidator } from '../validator'

export const validator: Validator<NewDocument> = (fieldName, values) => {

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
    if (!title || title.length === 0) {
        errors.title = 'Title is required'
        return false
    }

    if (title.length < 5 || title.length > 50) {
        errors.title = 'Title must be between 5 and 50 characters'
        return false
    }
    
    return true
}

const validateContent = (content: string, errors: ErrorValidator) => {
    if (!content || content.length === 0) {
        errors.content = 'Content is required'
        return false
    }

    if (content.length < 5 || content.length > 1500) {
        errors.content = 'Content must be between 5 and 1500 characters'
        return false
    }

    return true
}