import {TokenService} from './token-service';

export const setHeaders = () => {
    const token = TokenService.getToken();
    return {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json; charset=utf-8'
    };
};
