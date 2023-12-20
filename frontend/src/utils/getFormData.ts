import { User }from '../types/User'
import { SignInUser }from '../types/SignInUser'
import { UpdateUser }from '../types/UpdateUser'

export async function getUserFormData(user: User | UpdateUser) {
  const formData = new FormData()
  const userDataArr = Object.entries(user)
  for (let i = 0; i < userDataArr.length; i++) {
    if (userDataArr[i][0] === 'photo') {
      formData.append(userDataArr[i][0], user['photo'], user?.photo?.name)
    } else {
      formData.append(...userDataArr[i])
    }
  }
  return formData
}

export async function getSignInFormData(user: SignInUser) {
  const formData = new FormData()
  const userDataArr = Object.entries(user)
  for (let i = 0; i < userDataArr.length; i++) {
    formData.append(...userDataArr[i])
  }
  return formData
}
