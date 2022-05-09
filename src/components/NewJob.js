import React from 'react'
//Styled Components Libraries
import styled from 'styled-components';
//Material UI Libraries
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
//Contextjs Libraries
import { MainContext, useContext } from '../context';
export default function NewJob() {


  //Context state'lerinin component içerisinden çağrılması
  const { jobName, setJobName } = useContext(MainContext)
  const { jobList, setJoblist } = useContext(MainContext)
  const { addNewJobPriority, setaddNewJobPriority } = useContext(MainContext)

  const uniqid = require('uniqid');

  const changePriority = (e) => {
    setaddNewJobPriority(e.target.value);
  };


  const addJob = () => {
    if (jobName != '' && addNewJobPriority != '') {

      //Eski değerleri alırız ve yeni objeyi atarız
      setJoblist((oldArray) => [...oldArray, { jobID: uniqid(), jobName: jobName, priorityName: addNewJobPriority }]);
      //Her kayıttan sonra input'u sıfırlarız
      document.getElementById("jobName").value = "";
      //Her kayıttan sonra değerleri sıfırlarız
      setJobName('');
      setaddNewJobPriority('');

    }
    else {
      alert("Boş yerleri doldurun")
    }
  };
  return (
    <ListJobContent>

      <Typography color="steelblue" variant="h6" gutterBottom component="div">
        Create New Job
      </Typography>
      <br />
      <TextField
        inputProps={{ maxLength: 255 }}
        multiline
        maxRows={4}
        size="small"
        sx={{ minWidth: 300, maxWidth: 300 }} onChange={(e) => setJobName(e.target.value)} color="warning" id="jobName" label="Job Name" variant="outlined" />
      <br />
      <FormControl
        size="small"
        sx={{ minWidth: 300, maxWidth: 300 }} color="warning">
        <InputLabel id="label">Job Priority</InputLabel>
        <Select
          labelId="selectLabel"
          id="priorityName"
          value={addNewJobPriority}
          label="Job Priority"
          onChange={changePriority}
        >
          <MenuItem value="Urgent">Urgent</MenuItem>
          <MenuItem value="Regular">Regular</MenuItem>
          <MenuItem value="Trivial">Trivial</MenuItem>
        </Select>
      </FormControl>
      <br />
      <Button sx={{ minWidth: 300, maxWidth: 300 }} color="success" onClick={addJob} variant="contained">+ Create</Button>


      <Divider />
      <br />
    </ListJobContent>
  )
}

const ListJobContent = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
text-align:center;
 
margin-top:30px;

 
`

