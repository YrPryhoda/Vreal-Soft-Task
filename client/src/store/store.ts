import {configureStore} from '@reduxjs/toolkit';
import {postsReducer} from '../features/posts/reducer';
import {usersReducer} from '../features/users/reducer';

export const store = configureStore({
    reducer: {
        user: usersReducer,
        posts: postsReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
