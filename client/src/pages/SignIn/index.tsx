import React from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Grid,
    Box,
    Typography,
    Container
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import useForm from '../../components/common/hooks/useForm';
import {signIn} from '../../features/users/action-creators';
import {useAppDispatch} from '../../store/hooks';
import {routes} from '../../routes/routes';
import styles from './styles.module.scss';

export const SignIn = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {form, onChange} = useForm({
        email: '',
        password: ''
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!form.email || !form.password) {
            return alert('Fill in all fields!');
        }

        dispatch(signIn({form, navigate}));
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box className={styles.signInBox}>
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        name="email"
                        value={form.email}
                        onChange={onChange}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        value={form.password}
                        onChange={onChange}
                        name="password"
                        label="Password"
                        type="password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            Do not have account yet?
                            <NavLink to={routes.sighUp} className={styles.navLink}>
                                Sign Up
                            </NavLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};
