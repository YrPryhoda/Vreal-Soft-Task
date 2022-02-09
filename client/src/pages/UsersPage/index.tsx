import React, {useState} from 'react';
import {Container} from '@mui/material';

import {deleteUser} from '../../features/users/action-creators';
import {UserInterface} from '../../interfaces/user.interfaces';
import DeleteModal from '../../components/DeleteModal';
import UserSearch from '../../components/UsersSearch';
import UsersList from '../../components/UsersList';
import {useLoadUsers} from './hooks/useLoadUsers';
import {BasicModal} from '../../components/Modal';
import EditUser from '../../components/EditUser';
import {useAppDispatch} from '../../store/hooks';

const UsersPage = () => {
    const {loading, users} = useLoadUsers();
    const [selectedUser, setSelectedUser] = useState<null | UserInterface>(null);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState(users);
    const dispatch = useAppDispatch();
    const getUser = (id: number) => users.find(el => el.id === id);

    const handlerSearchReset = () => setFilteredUsers(users);
    const handlerSearch = (str: string) => {
        if (!str.trim()) {
            return alert('Search field is empty');
        }

        const filtered = users.filter(user => user.email.includes(str));
        setFilteredUsers(filtered);
    };

    const handlerUserEdit = (id: number) => {
        const user = getUser(id);
        if (user) {
            setSelectedUser(user);
            setEditModal(true);
        }
    };

    const handlerUserDelete = (id: number) => {
        const user = getUser(id);
        if (user) {
            setSelectedUser(user);
            setDeleteModal(true);
        }
    };

    const handlerUserDeleteSubmit = () => {
        dispatch(deleteUser(selectedUser!.id));
        handlerModalClose();
    };

    const handlerModalClose = () => {
        setEditModal(false);
        setDeleteModal(false);
        setSelectedUser(null);
    };

    if (loading) {
        return <p>Loading ...</p>;
    }

    return (
        <Container maxWidth={'xl'} sx={{mt: 4}}>
            <UserSearch onReset={handlerSearchReset} onSubmit={handlerSearch}/>
            <UsersList users={filteredUsers} onEdit={handlerUserEdit} onDelete={handlerUserDelete}/>
            <BasicModal onClose={handlerModalClose} open={editModal}>
                <EditUser user={selectedUser!} onClose={handlerModalClose}/>
            </BasicModal>
            <BasicModal onClose={handlerModalClose} open={deleteModal}>
                <DeleteModal onSubmit={handlerUserDeleteSubmit} onClose={handlerModalClose} entity={selectedUser!}/>
            </BasicModal>
        </Container>
    );
};

export default UsersPage;
