import React, {useEffect, useState} from 'react';
import {Alert, Container} from '@mui/material';

import {deletePost} from '../../features/posts/actions-creators';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {PostInterface} from '../../interfaces/post.interface';
import PostCardsList from '../../components/PostCardsList';
import {selectUsers} from '../../features/users/reducer';
import AddEditPost from '../../components/AddEditPost';
import DeleteModal from '../../components/DeleteModal';
import PostFilter from '../../components/PostFilter';
import {useLoadPosts} from './hooks/useLoadPosts';
import {BasicModal} from '../../components/Modal';
import styles from './styles.module.scss';

const PostsPage = () => {
    const {loading, error, posts} = useLoadPosts();
    const {profile} = useAppSelector(selectUsers);
    const [post, setPost] = useState<null | PostInterface>(null);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [filteredPosts, setFilteredPosts] = useState(posts);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setFilteredPosts(posts);
    }, [posts]);

    const handlerPostsFilter = (email: string) => {
        if (!email) {
            return;
        }

        const filtered = posts.filter(post => post.user.email === email);
        setFilteredPosts(filtered);
    };

    const handlerSearchReset = () => setFilteredPosts(posts);

    const handlerPostEdit = (id: number) => {
        const post = posts.find(el => el.id === id);
        if (!post) {
            return null;
        }

        setPost(post);
        setEditModal(true);
    };

    const handlerPostDelete = (id: number) => {
        const post = posts.find(el => el.id === id);
        if (!post) {
            return null;
        }

        setPost(post);
        setDeleteModal(true);
    };

    const handlerPostDeleteSubmit = () => {
        dispatch(deletePost(post!.id));
        handlerModalClose();
    };

    const handlerModalClose = () => {
        setEditModal(false);
        setDeleteModal(false);
        setPost(null);
    };

    const authAddPostJSX = profile.id
        ? <AddEditPost/>
        : <Alert className={styles.stackWarning} severity="warning">Only authorized users can create posts</Alert>;

    if (loading) {
        return <p> Loading ...</p>;
    }

    if (error.message) {
        alert(error.message);
        return null;
    }

    return (
        <Container maxWidth={'xl'} sx={{mt: 4}}>
            <PostFilter onSearch={handlerPostsFilter} onReset={handlerSearchReset}/>
            {authAddPostJSX}
            <PostCardsList
                posts={filteredPosts}
                onEdit={handlerPostEdit}
                onDelete={handlerPostDelete}
            />
            <BasicModal onClose={handlerModalClose} open={deleteModal}>
                <DeleteModal onSubmit={handlerPostDeleteSubmit} onClose={handlerModalClose} entity={post!}/>
            </BasicModal>
            <BasicModal onClose={handlerModalClose} open={editModal}>
                <AddEditPost post={post!} onClose={handlerModalClose}/>
            </BasicModal>
        </Container>
    );
};

export default PostsPage;
