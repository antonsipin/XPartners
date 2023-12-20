import { SignInUser } from './../types/SignInUser'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { SIGN_IN, LOGOUT, SIGN_UP, UPDATE_USER } from './types'
import * as api from '../api'
import { UserState } from '../types/UserState'
import { User } from '../types/User'
import { ResponseUser } from '../types/ResponseUser'
import { UpdateUser } from '../types/UpdateUser'

export const initialUserState: UserState = {
    user: {
        name: '',
        photo: '',
        gender: '',
        birthDate: '',
        accessToken: '',
        refreshToken: ''
    },
    error: '',
}

export const login = createAsyncThunk(SIGN_IN, async (user: SignInUser) => await api.signIn(user))

export const logout = createAsyncThunk(LOGOUT, async () => await api.logout())

export const register = createAsyncThunk(SIGN_UP, async (user: User) => await api.signUp(user))

export const updateUser = createAsyncThunk(UPDATE_USER, async ({
    accessToken, 
    updateInput
}: {
    accessToken: string, 
    updateInput: UpdateUser
}) => await api.updateUser(accessToken, updateInput))

export const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setUser(state: UserState, action: PayloadAction<ResponseUser>) {
            state.user = action.payload
        },
        setError(state: UserState, action: PayloadAction<string>) {
            state.error = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                register.fulfilled,
                (state, action) => {
                    if (action.payload.data) {
                        state.user = initialUserState.user
                        state.error = initialUserState.error
                    }
                }
            )
            .addCase(
                register.rejected,
                (state, action) => {
                    state.error = action.error.message || 'Something went wrong'
                }
            )
            .addCase(
                login.fulfilled,
                (state, action) => {
                    if (action.payload.data) {
                        state.user = action.payload.data
                        state.error = initialUserState.error
                    }
                    
                }
            )
            .addCase(
                login.rejected,
                (state, action) => {
                    state.error = action.error.message || 'Something went wrong'
                }
            )
            .addCase(
                logout.fulfilled,
                (state) => {
                    state.user = initialUserState.user
                    state.error = initialUserState.error
                }
            )
            .addCase(
                logout.rejected,
                (state, action) => {
                    state.error = action.error.message || 'Something went wrong'
                    
                }
            )
            .addCase(
                updateUser.fulfilled,
                (state, action) => {
                    if (action.payload.result === 'Error' && action.payload.error) {
                        if (action.payload.error === 'Token Expired') {
                            state.error = 'Please Log In!'
                        } else {
                            state.error = action.payload.error
                        }
                    } else if (action.payload.result === 'Successfully' && action.payload.data) {
                        const { name, photo } = action.payload.data
                        state.user = {
                            ...state.user,
                            name,
                            photo,
                        }
                    } else {
                        state.error = 'Something went wrong'
                    }
                }
            )
            .addCase(
                updateUser.rejected,
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
    },
})

export const { setUser, setError } = userSlice.actions
export const userReducer = userSlice.reducer