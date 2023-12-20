import { RegUser } from './RegUser'
import { UpdateUser } from '../types/UpdateUser'
import { UserData } from '../types/UserData'

type Action = 
| { type: 'user/updateUser', payload: { updateInput: UpdateUser} }
| { type: 'user/createUser', payload: RegUser } 
| { type: 'users/getUsers', payload: UserData[] } 

export default Action