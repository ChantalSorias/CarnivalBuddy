import * as React from 'react';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

interface State extends SnackbarOrigin {
    open: boolean;
}

export default function SnackbarAlert({ message, open, handleClose, severity }) {
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
        >
            <Alert severity={severity} onClose={handleClose}>
                {message}
            </Alert>
        </Snackbar>
    );
}