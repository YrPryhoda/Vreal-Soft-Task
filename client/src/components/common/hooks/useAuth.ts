import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {getProfile} from '../../../features/users/action-creators';
import {selectUsers} from '../../../features/users/reducer';

export const useAuth = () => {
    const {loading, profile} = useAppSelector(selectUsers);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!profile.id) {
            dispatch(getProfile());
        }
    }, []);

    return {
        loading,
        profile
    };
};
