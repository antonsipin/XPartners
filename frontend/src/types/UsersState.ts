import { UserData } from './UserData'

export type UsersState = {
    users: UserData[],
    info: boolean,
    error: string
}