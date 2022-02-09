import React from 'react';
import {Button, Grid, TextField} from '@mui/material';

import useForm from '../common/hooks/useForm';

interface IProps {
    onReset: () => void;
    onSubmit: (str: string) => void;
}

const UserSearch = ({onReset, onSubmit}: IProps) => {
    const {form, onChange, clearForm} = useForm({search: ''});

    const handlerReset = () => {
        onReset();
        clearForm();
    };

    return (
        <Grid container gap={4} mb={3}>
            <TextField
                label={'Search by email'}
                value={form.search}
                name={'search'}
                onChange={onChange}
                variant="outlined"
            />
            <Button variant={'outlined'} onClick={() => onSubmit(form.search)}>
                Search
            </Button>
            <Button variant={'outlined'} onClick={handlerReset}>
                Reset
            </Button>
        </Grid>
    );
};

export default UserSearch;
