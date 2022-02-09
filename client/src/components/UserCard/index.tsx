import React, {useMemo} from 'react';
import {CardActions, IconButton, TableCell, TableRow} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import {UserInterface, UserRoleEnum} from '../../interfaces/user.interfaces';
import styles from '../PostCard/styles.module.scss';

interface IProps {
    user: UserInterface;
    profile: UserInterface;
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
}

const UserCard = ({user, profile, onEdit, onDelete}: IProps) => {
    const date = useMemo(() => new Date(user.createdAt).toLocaleString(), [user.createdAt]);

    const buttonsJSX = profile && (profile.id === user.id || profile.role === UserRoleEnum.ADMIN)
        ? (
            <CardActions disableSpacing className={styles.actionsBlock}>
                <IconButton onClick={() => onEdit(user.id)}>
                    <EditIcon color={'primary'}/>
                </IconButton>
                <IconButton onClick={() => onDelete(user.id)}>
                    <DeleteIcon color={'error'}/>
                </IconButton>
            </CardActions>
        )
        : null;

    return (
        <TableRow>
            <TableCell component="th" scope="row">{user.id}</TableCell>
            <TableCell>{user.firstName}</TableCell>
            <TableCell>{user.lastName}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{date}</TableCell>
            <TableCell>{buttonsJSX}</TableCell>
        </TableRow>
    );
};

export default UserCard;
