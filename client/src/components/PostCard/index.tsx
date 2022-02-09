import React from 'react';
import {Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import {UserInterface, UserRoleEnum} from '../../interfaces/user.interfaces';
import {PostInterface} from '../../interfaces/post.interface';
import styles from './styles.module.scss';

interface IProps {
    post: PostInterface;
    profile: UserInterface;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const PostCard = ({post, profile, onDelete, onEdit}: IProps) => {
    const {user, content, title, createdAt} = post;
    const avatar = (user.firstName[0] + user.lastName[0]).toUpperCase();
    const date = new Date(createdAt).toLocaleString();
    const buttonsJSX = profile && (profile.id === user.id || profile.role === UserRoleEnum.ADMIN)
        ? (
            <CardActions disableSpacing className={styles.actionsBlock}>
                <IconButton onClick={() => onEdit(post.id)}>
                    <EditIcon color={'primary'}/>
                </IconButton>
                <IconButton onClick={() => onDelete(post.id)}>
                    <DeleteIcon color={'error'}/>
                </IconButton>
            </CardActions>
        )
        : null;

    return (
        <Card className={styles.card} elevation={4}>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: 'red'}} aria-label="recipe">
                        {avatar}
                    </Avatar>
                }
                title={`${user.firstName} ${user.lastName}`}
                subheader={date}
            />
            <CardContent>
                <Typography variant="body1" className={styles.cardTitle}>
                    {title}
                </Typography>
                <Typography variant="body2">
                    {content}
                </Typography>
            </CardContent>
            {buttonsJSX}
        </Card>
    );
};

export default PostCard;
