import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import './SimpleDialog.css';

export default function SimpleDialog({ open, handleClose, title, text }) {

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className='simple-dialog-container'
            fullWidth
        >
            <DialogTitle id="alert-dialog-title" color='primary'>
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {text}
                </DialogContentText>
            </DialogContent>
            {/* <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleClose} autoFocus>
                    Agree
                </Button>
            </DialogActions> */}
        </Dialog>
    );
}