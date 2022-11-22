import { apiPost } from '@/infrastructure/axios';

export type LoginParams = {
    username: string;
    password: string;
    desc?: string;
}

export const login = async (params: LoginParams) => {
    try {
        const { token, user } = await apiPost('auth/login', params);
        return {
            token,
            user,
        };
    } catch (e) {
        console.log('login e:', e);
        return null;
    }
};

export const register = async (params: LoginParams) => {
    try {
        return await apiPost('user/create-user', params);
    } catch (e) {
        console.log('register e:', e);
        return null;
    }
}