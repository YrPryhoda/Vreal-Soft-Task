import React from 'react';
import {Box, Button, Grid, TextField, Typography} from '@mui/material';

import {updateUser} from '../../features/users/action-creators';
import {UserInterface} from '../../interfaces/user.interfaces';
import {useAppDispatch} from '../../store/hooks';
import useForm from '../common/hooks/useForm';

interface IProps {
    user: UserInterface;
    onClose: () => void;
}

const EditUser = ({user, onClose}: IProps) => {
    const dispatch = useAppDispatch();
    const {form, onChange} = useForm(user);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (Object.values(form).some(el => !el.toString().trim())) {
            return alert('Fill in all fields!');
        }

        dispatch(updateUser({form, id: user.id}));
        onClose();
    };
    return (
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
            <Grid container spacing={2}>
                <Grid container item xs={12} justifyContent={'center'}>
                    <Typography variant={'h5'} component={'h6'}>Update user data</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        autoComplete="given-name"
                        name="firstName"
                        value={form.firstName}
                        onChange={onChange}
                        required
                        fullWidth
                        label="First Name"
                        autoFocus
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        value={form.lastName}
                        onChange={onChange}
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        value={form.email}
                        onChange={onChange}
                        fullWidth
                        label="Email Address"
                        name="email"
                    />
                </Grid>
            </Grid>
            <Grid container item xs={12} sx={{justifyContent: 'space-around'}}>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    Update
                </Button>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    color={'error'}
                    sx={{mt: 3, mb: 2}}
                >
                    Cancel
                </Button>
            </Grid>
        </Box>
    );
};

export default EditUser;
