import React from 'react';
import {Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {NavLink, useNavigate} from 'react-router-dom';

import {signUp} from '../../features/users/action-creators';
import useForm from '../../components/common/hooks/useForm';
import {useAppDispatch} from '../../store/hooks';
import {routes} from '../../routes/routes';
import styles from './styles.module.scss';

export const SignUp = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {form, onChange} = useForm({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (Object.values(form).some(el => !el.trim())) {
            return alert('Fill in all fields!');
        }

        dispatch(signUp({form, navigate}));
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box className={styles.signInBox}>
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
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
                        <Grid item xs={12} sm={6}>
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
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                value={form.password}
                                onChange={onChange}
                                name="password"
                                label="Password"
                                type="password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            Already have an account?
                            <NavLink to={routes.sighIn} className={styles.navLink}>
                                Sign In
                            </NavLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};
