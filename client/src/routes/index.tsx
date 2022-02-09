import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import PublicRoute from '../components/common/PublicRoute';
import AuthRoute from '../components/common/AuthRoute';

import AppNavBar from '../components/AppNavBar';
import PostsPage from '../pages/PostsPage';
import UsersPage from '../pages/UsersPage';
import {SignUp} from '../pages/SignUp';
import {SignIn} from '../pages/SignIn';
import {routes} from './routes';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppNavBar/>}>
                    <Route element={<AuthRoute/>}>
                        <Route path={routes.postsPage} element={<PostsPage/>}/>
                        <Route path={routes.usersPage} element={<UsersPage/>}/>
                    </Route>
                    <Route element={<PublicRoute/>}>
                        <Route path={routes.sighUp} element={<SignUp/>}/>
                        <Route path={routes.sighIn} element={<SignIn/>}/>
                    </Route>
                    <Route path={routes.notFound} element={<p> Page Not Found</p>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
