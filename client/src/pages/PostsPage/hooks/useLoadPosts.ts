import {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {loadPosts} from '../../../features/posts/actions-creators';
import {selectPosts} from '../../../features/posts/reducer';

export const useLoadPosts = () => {
    const dispatch = useAppDispatch();
    const {posts, loading, error} = useAppSelector(selectPosts);
    useEffect(
        () => {
            if (!posts.length) {
                dispatch(loadPosts());
            }
        },
        []
    );

    return {
        posts,
        loading,
        error
    };
};
