interface UserDocument {
    username: string,
    fullname: string
}

export interface NewDocument {
    title: string,
    content: string
}

export interface Document {
    id: string,
    title: string,
    content: string,
    created_by: UserDocument,
    modified_by: UserDocument,
    created_at: Date,
    modified_at: Date
}