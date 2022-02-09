import React from 'react';
import {useAuth} from '../hooks/useAuth';
import {Outlet} from 'react-router-dom';

const AuthRoute = () => {
    const {loading} = useAuth();
    return loading ? <p>Loading ... </p> : <Outlet/>;
};

export default AuthRoute;
