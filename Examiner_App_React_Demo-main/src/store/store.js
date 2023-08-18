import {configureStore} from '@reduxjs/toolkit'

import authSlice from './authSlice';
import questionSlice from './questionSlice';
import remainTimeSlice from './remainTimeSlice';

const store = configureStore({
	reducer : {auth : authSlice, question : questionSlice,remainTime: remainTimeSlice}
})

export default store;