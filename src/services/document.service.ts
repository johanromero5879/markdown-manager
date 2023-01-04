import { Document } from 'models/document'

export const documentService = {

    async fetchById(id: string) {
        const response = await fetch('data/documents.json', { headers: { 'Content-Type': 'application/json' } })
        const documents: Document[] = await response.json()

        return documents.find(document => document.id === id)

    }

}