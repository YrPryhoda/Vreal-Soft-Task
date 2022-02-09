import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {getProfile} from '../../../features/users/action-creators';
import {selectUsers} from '../../../features/users/reducer';

export const useAuth = () => {
    const {profileLoading, profile} = useAppSelector(selectUsers);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!profile.id) {
            dispatch(getProfile());
        }
    }, [profile]);

    return {
        loading: profileLoading,
        profile
    };
};
