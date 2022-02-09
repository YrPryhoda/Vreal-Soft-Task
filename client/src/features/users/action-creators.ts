import {createAsyncThunk} from '@reduxjs/toolkit';
import {SignInInterface} from '../../interfaces/auth.interfaces';
import {NavigateFunction} from 'react-router-dom';
import {UserInputInterface, UserInterface} from '../../interfaces/user.interfaces';
import {routes} from '../../routes/routes';
import {setHeaders} from '../../utils/setHeaders';
import {TokenService} from '../../utils/token-service';

const apiUrl = 'http://localhost:5000/api';
const module = 'user';

export const signIn = createAsyncThunk(
    `${module}/sign-in`,
    async (payload: { form: SignInInterface, navigate: NavigateFunction }, {rejectWithValue}) => {
        try {
            const response = await fetch(`${apiUrl}/auth/sign-in`, {
                method: 'POST',
                body: JSON.stringify(payload.form),
                headers: setHeaders()
            });
            const data = await response.json();
            if (!response.ok) {
                throw rejectWithValue(data);
            }

            TokenService.setToken(data.access_token);
            payload.navigate(routes.postsPage);
            return data as { access_token: string, profile: UserInterface };
        } catch (e) {
            alert(e.payload.message);
            throw rejectWithValue(e.payload);
        }
    }
);

export const signUp = createAsyncThunk(
    `${module}/sign-up`,
    async (payload: { form: UserInputInterface, navigate: NavigateFunction }, {rejectWithValue}) => {
        try {
            const response = await fetch(`${apiUrl}/auth/sign-up`, {
                method: 'POST',
                body: JSON.stringify(payload.form),
                headers: setHeaders()
            });
            const data = await response.json();
            if (!response.ok) {
                throw rejectWithValue(data);
            }

            payload.navigate(routes.sighIn);
            alert('Account created!');
            return null;
        } catch (e) {
            alert(e.payload.message);
            throw rejectWithValue(e.payload);
        }
    }
);

export const getUsers = createAsyncThunk(
    `${module}/load-all`,
    async (payload, {rejectWithValue}) => {
        try {
            const response = await fetch(`${apiUrl}/users`, {
                method: 'GET',
                headers: setHeaders()
            });
            const data = await response.json();

            if (!response.ok) {
                throw rejectWithValue(data);
            }

            return data as UserInterface[];
        } catch (e) {
            throw rejectWithValue(e.payload);
        }
    }
);

export const getProfile = createAsyncThunk(
    `${module}/profile`,
    async (payload, {rejectWithValue}) => {
        try {
            const response = await fetch(`${apiUrl}/users/profile`, {
                method: 'GET',
                headers: setHeaders()
            });

            const data = await response.json();
            if (!response.ok) {
                throw rejectWithValue(data);
            }

            return data as UserInterface;
        } catch (e) {
            throw rejectWithValue(e.payload);
        }
    }
);

export const updateUser = createAsyncThunk(
    `${module}/update`,
    async (payload: { form: UserInputInterface, id: number }, {rejectWithValue}) => {
        try {
            const response = await fetch(`${apiUrl}/users/${payload.id}`, {
                method: 'PUT',
                body: JSON.stringify(payload.form),
                headers: setHeaders()
            });

            const data = await response.json();
            if (!response.ok) {
                throw rejectWithValue(data);
            }

            return data as UserInterface;
        } catch (e) {
            throw rejectWithValue(e.payload);
        }
    }
);

export const deleteUser = createAsyncThunk(
    `${module}/delete`,
    async (id: number, {rejectWithValue}) => {
        try {
            const response = await fetch(`${apiUrl}/users/${id}`, {
                method: 'DELETE',
                headers: setHeaders()
            });

            const data = await response.json();
            if (!response.ok) {
                throw rejectWithValue(data);
            }

            return data as UserInterface;
        } catch (e) {
            throw rejectWithValue(e.payload);
        }
    }
);
