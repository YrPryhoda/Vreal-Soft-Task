import {createReducer, SerializedError} from '@reduxjs/toolkit';
import {createPost, deletePost, loadPosts, updatePost} from './actions-creators';
import {PostInterface} from '../../interfaces/post.interface';
import {Selector} from 'react-redux';
import {RootState} from '../../store/store';

const initialState = {
    loading: true,
    error: {} as SerializedError,
    posts: [] as PostInterface[]
};

export const postsReducer = createReducer(initialState, builder => builder
    .addCase(loadPosts.pending, (state) => {
        state.loading = true;
    })
    .addCase(loadPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
    })
    .addCase(loadPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as SerializedError;
    })
    .addCase(createPost.pending, (state) => {
        state.loading = true;
    })
    .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.unshift(action.payload);
    })
    .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as SerializedError;
    })
    .addCase(updatePost.pending, (state) => {
        state.loading = true;
    })
    .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.posts.findIndex(el => el.id === action.payload.id);
        state.posts[idx] = action.payload;
    })
    .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as SerializedError;
    })
    .addCase(deletePost.pending, (state) => {
        state.loading = true;
    })
    .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter(post => post.id !== action.payload.id);
    })
    .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as SerializedError;
    })
);

export type PostsReducer = ReturnType<typeof postsReducer>;
export const selectPosts: Selector<RootState, PostsReducer> = state => state.posts;
