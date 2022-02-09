import React from 'react';
import {Button, Grid, Typography} from '@mui/material';
import {UserInterface} from '../../interfaces/user.interfaces';
import {PostInterface} from '../../interfaces/post.interface';
import styles from './styles.module.scss';

interface IProps {
    onSubmit: () => void;
    onClose: () => void;
    entity: PostInterface | UserInterface;
}

const DeleteModal = ({onSubmit, onClose, entity}: IProps) => {
    const header = () => {
        if ('title' in entity) {
            return entity.title;
        }
        return `${entity.firstName} ${entity.firstName}`;
    };

    return (
        <Grid item xs={12} className={styles.content}>
            <Typography variant="h5" align={'center'}>
                Are you sure about deleting &quot;{header()}&quot;?
            </Typography>
            <Grid container item className={styles.btnBlock}>
                <Button
                    onClick={onSubmit}
                    color={'error'}
                    variant={'outlined'}
                >
                    Confirm
                </Button>
                <Button
                    variant={'outlined'}
                    onClick={onClose}
                >
                    Cancel
                </Button>
            </Grid>
        </Grid>
    );
};

export default DeleteModal;
