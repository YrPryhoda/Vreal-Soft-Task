import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styles from './styles.module.scss';

interface IProps {
    onClose: () => void;
    open: boolean;
    children: React.ReactChild;
}

export const BasicModal = ({onClose, open, children}: IProps) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className={styles.modalWindow}>
                {children}
            </Box>
        </Modal>
    );
};
