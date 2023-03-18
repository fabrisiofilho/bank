import jwtDecode, { JwtPayload } from "jwt-decode";
import { backend } from "./url-service";
import { RefreshToken } from "../models/refresh-token";


export const isLoggedIn = () => {
    return localStorage.getItem('token') != null ? true: false;
}

export const logout = () => {
    localStorage.clear();
}

export const reRefreshToken = (refresh: RefreshToken) => {
    backend.post<RefreshToken>("/auth/refreshToken", refresh).then(it => {
        localStorage.setItem("user_email", it.data.email);
        localStorage.setItem("token", it.data.token);
        localStorage.setItem("refresh_token", it.data.refreshToken);
    })
}

export const isValidAcesso = () => {
    const token = localStorage.getItem("token")!;
    const refreshToken = localStorage.getItem("refresh_token")!;
    const email = localStorage.getItem("user_email")!;
    if(!verifyExpireToken(token)) {
        return;
    }
    if (verifyExpireToken(refreshToken)) {
        logout();
        return;
    }
    const refresh: RefreshToken = {
        token: token,
        refreshToken: refreshToken,
        email:email
    }
    reRefreshToken(refresh);
    return;
}

export const verifyExpireToken = (token: string) => {
    const decodedToken = jwtDecode<JwtPayload>(token);
    if (decodedToken.exp) {
        return decodedToken.exp <= new Date().getTime() / 1000;
    }
    return false;
}