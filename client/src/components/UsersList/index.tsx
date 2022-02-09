import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';

import {useAppSelector} from '../../store/hooks';
import {selectUsers} from '../../features/users/reducer';
import UserCard from '../UserCard';
import {UserInterface} from '../../interfaces/user.interfaces';

interface IProps {
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
    users: UserInterface[];
}

const UsersList = (props: IProps) => {
    const {profile} = useAppSelector(selectUsers);
    const {users, ...restProps} = props;

    const usersJSX = (
        <TableBody>
            {users.map(user => <UserCard key={user.id} {...restProps} user={user} profile={profile}/>)}
        </TableBody>
    );

    return users.length
        ? (
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>CreatedAt</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    {usersJSX}
                </Table>
            </TableContainer>
        )
        : <h4>Users list is empty</h4>;
};

export default UsersList;
