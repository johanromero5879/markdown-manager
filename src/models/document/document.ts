import { BaseUser } from '../user/user'

export interface BaseDocument {
    title: string,
    content: string
}

export interface Document extends BaseDocument {
    id: string,
    created_by: BaseUser,
    modified_by: BaseUser,
    created_at: Date,
    modified_at: Date
}