import { Validator } from '../validator'
import { BaseDocument } from './document'

export class DocumentValidator extends Validator<BaseDocument> {

    validateField(name: keyof BaseDocument, value: string) {

        if (name === 'title') return this.validateTitle(value)
    
        if (name === 'content') return this.validateContent(value)
        
    }

    private validateTitle(title: string) {

        if (!title || title.length === 0)  return 'Title is required'
    
        if (title.length < 5 || title.length > 50) return 'Title must be between 5 and 50 characters'
    
    }

    private validateContent(content: string) {

        if (!content || content.length === 0) return 'Content is required'
    
        if (content.length < 5 || content.length > 1500) return 'Content must be between 5 and 1500 characters'
    
    }

}