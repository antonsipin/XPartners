import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import {accountsReducer } from './accountSlice'
import { userReducer } from './userSlice'
import storage from 'redux-persist/lib/storage' 
import { persistReducer, persistStore } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage,
  }

const rootReducer = combineReducers({
    users: accountsReducer,
    user: userReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export type RootState = ReturnType<typeof store.getState>