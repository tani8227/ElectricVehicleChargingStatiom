import { configureStore,  } from '@reduxjs/toolkit'
import { authReducer } from '../reducers/user/Auth/authSlice'
import { EVBunkReducer } from '../reducers/user/EVBunk/evBunkSlice';

const store= configureStore(
    {
        reducer:
        {
            Auth:authReducer,
            EVBunk:EVBunkReducer
        }
    })



    export default store;