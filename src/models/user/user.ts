interface RawUser {
    username: string
}

export interface BaseUser extends RawUser{
    fullname: string
}

export interface Auth extends RawUser {
    password: string
}

export interface NewUser extends Auth, BaseUser {
    confirmPassword: string
}

export interface User extends BaseUser {
    id: string
}