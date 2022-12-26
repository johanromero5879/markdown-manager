
export interface NewUser {
    fullname: string,
    username: string,
    password: string,
    confirmPassword: string
}

export interface User {
    id: string,
    fullname: string,
    username: string
}