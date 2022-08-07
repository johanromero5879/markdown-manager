interface UserDocument {
    username: string,
    fullname: string
}

export default interface Document {
    title: string,
    content: string,
    created_by: UserDocument,
    modified_by: UserDocument,
    created_at: Date,
    modified_at: Date
}