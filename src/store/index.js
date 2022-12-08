import { createSlice, configureStore } from "@reduxjs/toolkit";

const signupSlice = createSlice ({
    name: 'register',
    initialState: {users:[], user:[], info:[]
},
    reducers: {
        signup: (state, action) => {
            state.users = [...state.users, action.payload]
    },
    login: (state, action) => {
        state.user = action.payload
    },
    info: (state, action) => {
        state.info = action.payload
    }
    
}
})



const store = configureStore({
    reducer:{signup: signupSlice.reducer, login: signupSlice.reducer, info:signupSlice.reducer}
})

export const signupActions = signupSlice.actions;
export default store;



