import { carReducer, directoryReducer } from "./slices";
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    cars: carReducer,
    directories: directoryReducer,
})

const setupStore = () => configureStore({
    reducer: rootReducer
})

export {setupStore}