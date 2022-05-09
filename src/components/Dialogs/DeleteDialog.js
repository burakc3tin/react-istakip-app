import React, { useEffect, useState } from 'react'
//Material UI Components
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
//Contextjs Libraries
import { MainContext, useContext } from '../../context';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteDialog({ deleteDialogJobName }) {

    const { jobList, setJoblist } = useContext(MainContext)
    const { deleteJobID, setDeleteJobID } = useContext(MainContext)
    const { openDeleteDialogVar, setOpenDeleteDialogVar } = useContext(MainContext)

    const closeDeleteDialog = () => {
        setOpenDeleteDialogVar(false);
    };
    const deleteJob = () => {
        const index = jobList.filter(item => item.jobID !== deleteJobID)
        setJoblist(index);
        setOpenDeleteDialogVar(false);
    };

    return (
        <Dialog
            open={openDeleteDialogVar}
            TransitionComponent={Transition}
            keepMounted
            onClose={closeDeleteDialog}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Are you sure you want to delete this job?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {deleteDialogJobName}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDeleteDialog}>Cancel</Button>
                <Button color="error" onClick={deleteJob}>Delete</Button>
            </DialogActions>
        </Dialog>
    )
}
