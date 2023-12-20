import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { setInfo, setError, getUsers } from '../store/accountSlice'
import { updateUser } from '../store/userSlice'
import { selectUsers, selectUsersError, selectInfo } from '../store/selectors'
import { useAppDispatch } from '../store'
import { UpdateUser } from '../types/UpdateUser'

function getUrl() {
  const host = window.location.hostname
  if (process.env.NODE_ENV === 'production') {
    return `wss://${host}:3100`
  } else {
    return `ws://${host}:3100`
  }
}
const URL = getUrl()

export default function useAccount() {
      const users = useSelector(selectUsers)
      const error = useSelector(selectUsersError)
      const info = useSelector(selectInfo)
      const dispatch = useAppDispatch()

      const handleWebSocket = useCallback((accessToken: string) => {
        const ws = new WebSocket(URL)

        ws.onopen = () => {
          if (accessToken) {
            ws.send(JSON.stringify({ accessToken }))
          } 
        }
        ws.onmessage = async (event) => {
          if (event.data) {
              const { accessToken } = JSON.parse(event.data)
              if (accessToken) {
                handleInfo(false)
                handleError('')
              }
          } 
        }
        ws.onclose = ((event) => {
          ws.send(JSON.stringify('close'))
        })
      }, [])
      

      const handleInfo = useCallback((info: boolean): void => {
        dispatch(setInfo(info))
      }, [dispatch])

      const handleError = useCallback((error: string): void => {
        dispatch(setError(error))
      }, [dispatch])

      const handleUpdateUser = useCallback((accessToken: string, updateInput: UpdateUser) => {
        handleWebSocket(accessToken)
        return dispatch(updateUser({ accessToken, updateInput }))
      }, [dispatch])

      const handleGetUsers= useCallback((accessToken: string) => {
        handleWebSocket(accessToken)
        return dispatch(getUsers(accessToken))
      }, [dispatch])

     return {
        handleUpdateUser,
        handleGetUsers,
        updateUser,
        handleInfo,
        handleError,
        dispatch,
        users,
        error,
        info
     } 
}