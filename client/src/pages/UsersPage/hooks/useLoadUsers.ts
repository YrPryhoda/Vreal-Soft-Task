import {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {getUsers} from '../../../features/users/action-creators';
import {selectUsers} from '../../../features/users/reducer';

export const useLoadUsers = () => {
    const dispatch = useAppDispatch();
    const {loading, users, error} = useAppSelector(selectUsers);
    useEffect(
        () => {
            if (!users.length) {
                dispatch(getUsers());
            }
        },
        []
    );

    return {
        users,
        loading,
        error
    };
};
