import Task from './Task'

export interface ResponseTask {
    result: string
    error: string
    data?: Task
}

type RegUser = {
    id: string
    name: string
    email: string
    photo: string
    gender: string
    birthDate: string
    accessToken: string
    refreshToken: string
}

export interface ResponseUser {
    result: string
    error: string
    data?: RegUser
}