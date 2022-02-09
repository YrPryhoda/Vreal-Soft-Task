import {createAsyncThunk} from '@reduxjs/toolkit';
import {setHeaders} from '../../utils/setHeaders';
import {PostInputInterface, PostInterface} from '../../interfaces/post.interface';

const apiUrl = 'http://localhost:5000/api';
const module = 'posts';

export const loadPosts = createAsyncThunk(
    `${module}/load-all`,
    async (payload, {rejectWithValue}) => {
        try {
            const response = await fetch(`${apiUrl}/posts`, {
                method: 'GET',
                headers: setHeaders()
            });
            const data = await response.json();
            if (!response.ok) {
                throw rejectWithValue(data);
            }

            return data as PostInterface[];
        } catch (e) {
            alert(e.payload.message);
            throw rejectWithValue(e.payload);
        }
    }
);

export const createPost = createAsyncThunk(
    `${module}/create`,
    async (form: PostInputInterface, {rejectWithValue}) => {
        try {
            const response = await fetch(`${apiUrl}/posts`, {
                method: 'POST',
                body: JSON.stringify(form),
                headers: setHeaders()
            });
            const data = await response.json();
            if (!response.ok) {
                throw rejectWithValue(data);
            }

            return data as PostInterface;
        } catch (e) {
            alert(e.payload.message);
            throw rejectWithValue(e.payload);
        }
    }
);

export const updatePost = createAsyncThunk(
    `${module}/update`,
    async (payload: { form: PostInputInterface, id: number }, {rejectWithValue}) => {
        try {
            const response = await fetch(`${apiUrl}/posts/${payload.id}`, {
                method: 'PUT',
                body: JSON.stringify(payload.form),
                headers: setHeaders()
            });
            const data = await response.json();
            if (!response.ok) {
                throw rejectWithValue(data);
            }

            return data as PostInterface;
        } catch (e) {
            alert(e.payload.message);
            throw rejectWithValue(e.payload);
        }
    }
);

export const deletePost = createAsyncThunk(
    `${module}/delete`,
    async (id: number, {rejectWithValue}) => {
        try {
            const response = await fetch(`${apiUrl}/posts/${id}`, {
                method: 'DELETE',
                headers: setHeaders()
            });
            const data = await response.json();
            if (!response.ok) {
                throw rejectWithValue(data);
            }

            return data as PostInterface;
        } catch (e) {
            alert(e.payload.message);
            throw rejectWithValue(e.payload);
        }
    }
);
