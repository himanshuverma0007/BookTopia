import { createSlice } from "@reduxjs/toolkit";

// just created a slice for auth 
// initially we take isloggedin as false and role = user if someone logged in then state will be isloggedin = true

const authSlice = createSlice({
    name: "auth",
    initialState: {isLoggedIn: false, role: "user"},
    reducers: {
        login(state){
            state.isLoggedIn = true;
        },
        logout(state){
            state.isLoggedIn = false;
        },

        // backend se kuch data bhejenge jo ki role change krega 
        changeRole(state, action){   // action bahar se data laane mai help krega 
            const role = action.payload;
            state.role = role;
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;