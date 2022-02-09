import React from 'react';
import {useAuth} from '../hooks/useAuth';
import {Outlet, useNavigate} from 'react-router-dom';
import {routes} from '../../../routes/routes';

const PublicRoute = () => {
    const {loading, profile} = useAuth();
    const navigate = useNavigate();

    if (loading) {
        return <p>Loading ... </p>;
    }

    if (profile.id) {
        navigate(routes.postsPage);
        return null;
    }

    return <Outlet/>;
};

export default PublicRoute;
