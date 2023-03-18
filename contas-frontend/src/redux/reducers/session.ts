import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backend } from "../../services/url-service";
import { UserAuth } from "../../models/user-auth";
import { User } from "../../models/user";
import { Login } from "../../models/login";

export const login = createAsyncThunk(
    'session/login',
    async (login: Login) => {
        const result = await backend.post<UserAuth>(
            `login`, login);
        return result.data;
    }
);

export const register = createAsyncThunk(
    'session/register',
    async (user: User) => {
        const result = await backend.post<User>(
            `auth/register`, user);
        return result.data;
    },
);


type StateProps = {
    currentUser: User | undefined;
    status: 'pending' | 'accept' | 'rejected';
    token: string;
    refreshToken: string;
};

const initialState: StateProps = {
    currentUser: undefined,
    status: 'pending',
    token: '',
    refreshToken: ''
};

export const sessionSlice = createSlice({
    initialState,
    name: 'session',
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(login.pending, (state, action) => {
            state.status = 'pending';
        })
        .addCase(login.fulfilled, (state, action) => {
            state.currentUser = action.payload.user;
            state.refreshToken = action.payload.refreshToken;
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('refreshToken', action.payload.refreshToken);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            state.status = 'accept';
        })
        .addCase(login.rejected, (state, action) => {
            throw Error(action.error.message);
            state.status = 'rejected';
        })
        .addCase(register.pending, (state, action) => {
            state.status = 'pending';
        })
        .addCase(register.rejected, (state, action) => {
            state.status = 'rejected';
        })
    },
});


export const {} = sessionSlice.reducer;