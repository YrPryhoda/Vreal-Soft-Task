import {createReducer, SerializedError} from '@reduxjs/toolkit';
import {deleteUser, getProfile, getUsers, signIn, signUp, updateUser} from './action-creators';
import {Selector} from 'react-redux';
import {RootState} from '../../store/store';
import {UserInterface} from '../../interfaces/user.interfaces';

const initialState = {
    loading: true,
    error: {} as SerializedError,
    users: [] as UserInterface[],
    profile: {} as UserInterface
};

export const usersReducer = createReducer(initialState, builder => builder
    .addCase(signIn.pending, (state) => {
        state.loading = true;
    })
    .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.profile;
    })
    .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as SerializedError;
    })
    .addCase(signUp.pending, (state) => {
        state.loading = true;
    })
    .addCase(signUp.fulfilled, (state) => {
        state.loading = false;
    })
    .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as SerializedError;
    })
    .addCase(getUsers.pending, (state) => {
        state.loading = true;
    })
    .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
    })
    .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as SerializedError;
    })
    .addCase(getProfile.pending, (state) => {
        state.loading = true;
    })
    .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
    })
    .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as SerializedError;
    })
    .addCase(updateUser.pending, (state) => {
        state.loading = true;
    })
    .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.users.findIndex(el => el.id === action.payload.id);
        state.users[idx] = action.payload;
    })
    .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as SerializedError;
    })
    .addCase(deleteUser.pending, (state) => {
        state.loading = true;
    })
    .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(el => el.id !== action.payload.id);
        if (action.payload.id === state.profile.id) {
            state.profile = {} as UserInterface;
        }
    })
    .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as SerializedError;
    })
);

export type UsersReducer = ReturnType<typeof usersReducer>;
export const selectUsers: Selector<RootState, UsersReducer> = state => state.user;
