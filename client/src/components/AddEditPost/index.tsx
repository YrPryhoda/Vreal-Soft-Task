import React from 'react';
import {Box, Button, Grid, TextField} from '@mui/material';

import {PostInterface} from '../../interfaces/post.interface';
import useForm from '../common/hooks/useForm';
import styles from './styles.module.scss';
import {useAppDispatch} from '../../store/hooks';
import {createPost, updatePost} from '../../features/posts/actions-creators';

interface IProps {
    post?: PostInterface;
    onClose?: () => void;
}

const AddEditPost = ({post, onClose}: IProps) => {
    const dispatch = useAppDispatch();
    const {form, onChange, clearForm} = useForm(post || {
        title: '',
        content: ''
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!form.title || !form.content) {
            return alert('Fill in required fields');
        }

        if (post && onClose) {
            dispatch(updatePost({id: post.id, form}));
            return onClose();
        }

        dispatch(createPost(form));
        clearForm();
    };

    return (
        <Grid container item xs={12} className={styles.formBlock}>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}} className={styles.form}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Title"
                    name="title"
                    value={form.title}
                    onChange={onChange}
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    value={form.content}
                    onChange={onChange}
                    multiline
                    minRows={4}
                    name="content"
                    label="Content"
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{mt: 3, mb: 2, width: 200}}
                >
                    Publish
                </Button>
            </Box>
        </Grid>
    );
};

export default AddEditPost;
