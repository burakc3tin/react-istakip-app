import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

//Contextjs Libraries
import { MainContext, useContext } from '../../context';


export default function EditDialog({ editDialogJobName, priorityDialog }) {

  const uniqid = require('uniqid');
  const { openEditDialogVar, setOpenEditDialogVar } = useContext(MainContext)
  const { priority, setPriority } = useContext(MainContext)
  const { jobList, setJoblist } = useContext(MainContext)
  const { editJobID, setEditJobID } = useContext(MainContext)

  const closeEditDialog = () => {
    setOpenEditDialogVar(false);
  };
  const changePriority = (e) => {
    setPriority(e.target.value);
  };

  useEffect(() => {

    const index = jobList.filter(item => item.jobID !== editJobID)
    setJoblist(index);
  }, [])

  const editDialog = () => {

    setOpenEditDialogVar(false);
    jobList.map(item => {
      if (item.jobID === editJobID) {

        // setJoblist([...jobList-jobList[0],{jobID:item.jobID+'e',jobName:item.jobName,priorityName:'Regular'}])
        setJoblist((oldArray) => [{ jobID: uniqid(), jobName: item.jobName, priorityName: priority }, ...oldArray]);
      }
    })
  }
  return (
    <Dialog open={openEditDialogVar} onClose={closeEditDialog}>
      <DialogTitle>Edit Job</DialogTitle>
      <DialogContent>

        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Job Name"
          disabled
          defaultValue={editDialogJobName}
          type="text"
          fullWidth
          variant="standard"
        />
        <FormControl sx={{ mt: 2, width: 140 }} color="warning">
          <InputLabel id="label">Job Priority</InputLabel>
          <Select
            labelId="selectLabel"
            id="priorityName"
            defaultValue={priorityDialog}
            label="Job Priority"
            onChange={changePriority}
          >
            <MenuItem value="Urgent">Urgent</MenuItem>
            <MenuItem value="Regular">Regular</MenuItem>
            <MenuItem value="Trivial">Trivial</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeEditDialog}>Cancel</Button>
        <Button color="success" onClick={editDialog}>Edit</Button>
      </DialogActions>
    </Dialog>
  )
}
