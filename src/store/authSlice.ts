import {createSlice} from "@reduxjs/toolkit";
import authService from "../services/authService";

const initialState = {
    username: null,
    email: null,
    userId: null,
    authStatus: null,
};
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (_state, action) => {
            return {
                username: action.payload.username,
                email: action.payload.email,
                userId: action.payload.userId,
                authStatus: action.payload.authStatus,
            };
        },
        removeUser: () => {
            return initialState;
        },
    },
});

export const {setUser, removeUser} = userSlice.actions;

export const login = ({credentials, toast, successCallback, form}: any) => {
    return async (dispatch: any) => {
        try {
            const response = await authService.login(credentials);
            if (response.status === 200) {
                dispatch(
                    setUser({
                        username: response.data.userDetails.name,
                        userId: response.data.userDetails.email,
                        email: response.data.userDetails.email,
                        authStatus: true,
                    })
                );
                form.reset();
                toast({
                    title: "Login Successful",
                });
                successCallback();
            } else {
                form.reset();
                toast({
                    title: "Login Failed",
                    variant: "destructive",
                });
            }
        } catch (error: any) {
            console.error(error);
            toast({
                title: "Login Failed",
                description: error.message,
                variant: "destructive",
            });
        }
    };
};

export const logout = ({toast, successCallback}: any) => {
    return async (dispatch: any) => {
        try {
            await authService.logout();
            dispatch(removeUser());
            toast({
                title: "Logout Successfully",
            });
            successCallback();
        } catch (error: any) {
            console.error(error);
            toast({
                title: "Logout Failed",
                description: error.message,
                variant: "destructive",
            });
        }
    };
};

export default userSlice.reducer;
