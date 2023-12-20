import { ResponseUser } from '../types/Response'
import { ResponseUpdateUser } from '../types/ResponseUpdateUser'
import { User } from '../types/User'
import { SignInUser } from '../types/SignInUser'
import { getSignInFormData, getUserFormData } from '../utils/getFormData'
import { UpdateUser } from '../types/UpdateUser'
import { ResponseUsers } from '../types/ResponseUsers'

export async function signUp(user: User): Promise<ResponseUser> {
  const formData = await getUserFormData(user)
  if (formData) {
    const response = await fetch('/users/signUp', {
      method: 'POST',
      body: formData
    })
    const result = await response.json()
    if (response.status >= 400) {
      throw new Error(result.error)
    }
    return result
  } else {
    throw new Error('No data')
  }
} 

export async function signIn(user: SignInUser): Promise<ResponseUser> {
  const formData = await getSignInFormData(user)  
  if (formData) {
    const response = await fetch('/users/signIn', {
      method: 'POST',
      body: formData
    })
    const result = await response.json()
    if (response.status >= 400) {
      throw new Error(result.error)
    }
    return result
  } else {
    throw new Error('No data')
  }
}

export async function logout(): Promise<ResponseUser> {
    const response = await fetch('/users/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const result = await response.json()
    if (response.status >= 400) {
      throw new Error(result.error)
    }
    return result
}


export async function updateUser(accessToken: string, updateInput: UpdateUser): Promise<ResponseUpdateUser> {
  const data = {...updateInput, accessToken}
  const formData = await getUserFormData(data)
  if (formData) {
    const response = await fetch('/account/user', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      body: formData
    })
    const result = await response.json()
    if (response.status >= 400) {
      throw new Error(result.error)
    }
    return result
  } else {
    throw new Error('No data')
  }
}

export async function getUsers(accessToken: string): Promise<ResponseUsers> {
    const response = await fetch('/account/users', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    const result = await response.json()
    if (response.status >= 400) {
      throw new Error(result.error)
    }
    return result
}
