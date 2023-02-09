import { combineReducers, configureStore } from '@reduxjs/toolkit'
          import appReducer from "./appReducer";
          
          const rootReducer = combineReducers({
              appState: appReducer
              // If u have more reducers, place it here
          })
          
          export const store = configureStore({ reducer: rootReducer })