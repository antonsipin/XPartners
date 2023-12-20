import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { UsersState } from '../types/UsersState'
import * as api from '../api'
import { GET_USERS } from './types'

export const initialUsersState: UsersState = {
    users: [],
    info: false,
    error: ''
}

export const getUsers = createAsyncThunk(GET_USERS, async (accessToken: string) => await api.getUsers(accessToken))

export const accountSlice = createSlice({
    name: 'users',
    initialState: initialUsersState,
    reducers: {
        setError(state: UsersState, action: PayloadAction<string>) {
            state.error = action.payload || ''
        },
        setInfo(state: UsersState, action: PayloadAction<boolean>) {
            state.info = action.payload || false
        },
        setUsers(state: UsersState, action: PayloadAction<boolean>) {
            state.info = action.payload || false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                getUsers.fulfilled,
                (state, action) => {
                    if (action.payload?.result === 'Error' && action.payload?.error) {
                        if (action.payload?.error === 'Token Expired') {
                            state.error = 'Please Log In!'
                        } else {
                            state.error = action.payload?.error
                        }
                    } else if (action.payload?.result === 'Successfully' && action.payload?.data) {
                        state.users = action.payload?.data
                    } else {
                        state.error = 'Something went wrong'
                    }
                }
            )
            .addCase(
                getUsers.rejected,
                (state, action) => {
                    if (action.error && action.error?.message) {
                        if (action.error?.message === 'Token Expired') {
                            state.error = 'Please Log In!'
                        } else {
                            state.error = 'Something went wrong'
                        }
                    }
                }
            )
    }
})

export const { setInfo, setError } = accountSlice.actions
export const accountsReducer = accountSlice.reducer