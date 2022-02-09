import React from 'react';
import {Grid} from '@mui/material';

import {useAppSelector} from '../../store/hooks';
import {selectPosts} from '../../features/posts/reducer';
import styles from './styles.module.scss';
import PostCard from '../PostCard';
import {selectUsers} from '../../features/users/reducer';
import {PostInterface} from '../../interfaces/post.interface';

interface IProps {
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    posts: PostInterface[];
}

const PostCardsList = (props: IProps) => {
    const {profile} = useAppSelector(selectUsers);
    const {posts, ...restProps} = props;

    return (
        <Grid container item xs={12} className={styles.postsBlock}>
            {
                posts.length
                    ? posts.map(post => <PostCard
                        key={post.id}
                        post={post}
                        profile={profile}
                        {...restProps}
                    />)
                    : <h3> Posts thread is empty</h3>
            }
        </Grid>
    );
};

export default PostCardsList;
