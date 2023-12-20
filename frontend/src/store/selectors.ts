import RootState from '../types/RootState'

export const selectUsers = (store: RootState) => store.users.users

export const selectError = (store: RootState) => store.user.error

export const selectInfo = (store: RootState) => store.users.info

export const selectUsersError = (store: RootState) => store.users.error

export const selectUser = (store: RootState) => store.user.user

export const selectAccessToken = (store: RootState) => store.user.user.accessToken

export const selectRefreshToken = (store: RootState) => store.user.user.refreshToken