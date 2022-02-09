import React from 'react';
import {AppBar, Box, Toolbar, Container, Button, CssBaseline} from '@mui/material';
import {NavLink, Outlet} from 'react-router-dom';

import {routes} from '../../routes/routes';
import {useAppSelector} from '../../store/hooks';
import {selectUsers} from '../../features/users/reducer';

const AppNavBar = () => {
    const {profile} = useAppSelector(selectUsers);

    const settingsJSX = !profile.id
        ? <>
            <NavLink to={routes.sighIn}>
                <Button sx={{my: 2, color: 'white', display: 'block'}}>
                    Sign In
                </Button>
            </NavLink>
            <NavLink to={routes.sighUp}>
                <Button sx={{my: 2, color: 'white', display: 'block'}}>
                    Sign Up
                </Button>
            </NavLink>
        </>
        : null;

    return (
        <>
            <AppBar position="static">
                <CssBaseline/>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box sx={{flexGrow: 1, display: {xs: 'flex'}}}>
                            <NavLink to={routes.usersPage}>
                                <Button sx={{my: 2, color: 'white', display: 'block'}}>
                                    Users
                                </Button>
                            </NavLink>
                            <NavLink to={routes.postsPage}>
                                <Button sx={{my: 2, color: 'white', display: 'block'}}>
                                    Posts
                                </Button>
                            </NavLink>
                        </Box>
                        <Box sx={{display: {xs: 'flex'}}}>
                            {settingsJSX}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Outlet/>
        </>
    );
};

export default AppNavBar;
