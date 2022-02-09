import React from 'react';
import {Box, Button, Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';

import {selectUsers} from '../../features/users/reducer';
import {useAppSelector} from '../../store/hooks';
import styles from './styles.module.scss';

interface IProps {
    onSearch: (value: string) => void;
    onReset: () => void;
}

const PostFilter = ({onSearch, onReset}: IProps) => {
    const {users} = useAppSelector(selectUsers);
    const [selector, setSelector] = React.useState('');

    const handleReset = () => {
        setSelector('');
        onReset();
    };

    const handleChange = (event: SelectChangeEvent) => {
        const newValue = event.target.value;
        setSelector(newValue);
        onSearch(newValue);
    };

    return (
        <Container maxWidth={'md'} sx={{ml: 42}} className={styles.filterBlock}>
            <Box sx={{minWidth: 240, maxWidth: 300}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Filter By</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        value={selector}
                        label="Filter By"
                        onChange={handleChange}
                    >
                        {
                            users.map(user => <MenuItem key={user.id} value={user.email}>
                                {`${user.firstName} ${user.lastName}`}
                            </MenuItem>)
                        }
                    </Select>
                </FormControl>
            </Box>
            <Button
                variant={'outlined'}
                onClick={handleReset}
            >
                Reset filter
            </Button>
        </Container>
    );
};

export default PostFilter;
