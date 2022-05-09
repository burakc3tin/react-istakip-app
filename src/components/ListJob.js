import React, { useEffect, useState } from 'react'
//Styled Components Libraries
import styled from 'styled-components';
//Custom Components
import EditDialog from './Dialogs/EditDialog';
import DeleteDialog from './Dialogs/DeleteDialog';
//Material UI Libraries
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slide from '@mui/material/Slide';

//React Icons Libraries
import { FaEarlybirds } from "react-icons/fa";
//Contextjs Libraries
import { MainContext, useContext } from '../context';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function ListJob() {

  const { jobList, setJoblist } = useContext(MainContext)
  const { deleteJobID, setDeleteJobID } = useContext(MainContext)
  const { openDeleteDialogVar, setOpenDeleteDialogVar } = useContext(MainContext)
  const { openEditDialogVar, setOpenEditDialogVar } = useContext(MainContext)
  const { dialogJobName, setDialogJobName } = useContext(MainContext)
  const { dialogPriority, setDialogPriority } = useContext(MainContext)
  const { editJobID, setEditJobID } = useContext(MainContext)
  const { priority, setPriority } = useContext(MainContext)
  const { searchPriority, setsearchPriority } = useContext(MainContext)
  const { searchJobName, setsearchJobName } = useContext(MainContext)

  const openDeleteDialog = (e, jobNameVar) => {
    setOpenDeleteDialogVar(true);
    setDeleteJobID(e);
    setDialogJobName(jobNameVar);
  };

  const openEditDialog = (e, priorityEditDialog, editJobIDdialog) => {

    setOpenEditDialogVar(true);
    setDialogJobName(e);
    setDialogPriority(priorityEditDialog);
    setEditJobID(editJobIDdialog);
    setPriority(priorityEditDialog);
  };

  const changeSearchPriority = (e) => {

    setsearchPriority(e.target.value);
  };



  //search kısmını buarada yaparız. eğer input boş ise 
  //normal değerleri döneriz ama değilse include ile içermesine göre
  //arattırma yaparız.
  const filteredJobListData = jobList.filter((el) => {

    if (searchJobName === '') {
      return el;
    }

    else {
      return el.jobName.toLowerCase().includes(searchJobName)
    }
  })

  //Acillik durumu önemliden az önemliye sıralaması için yaparız. includes ile 
  //kontrol edip urgent içeriyorsa priority name en üste alırız


  const dataArray = []
    .concat(

      filteredJobListData.map(e => e.priorityName.includes('Urgent') && e),
      filteredJobListData.map(e => e.priorityName.includes('Regular') && e),
      filteredJobListData.map(e => e.priorityName.includes('Trivial') && e)


    )
    .filter(e => e)




  return (
    <ListJobContent   ><Typography color="steelblue" variant="h6" gutterBottom component="div">
      List Job
    </Typography>

      <TextField
        size="small"
        sx={{ minWidth: 300, maxWidth: 300 }}
        id="filled-basic"
        fullWidth
        label="Job Name"
        color="warning"
        onChange={(e) => setsearchJobName(e.target.value)}

        variant="filled" />
      <FormControl
        size="small"
        sx={{ minWidth: 300, maxWidth: 300, mt: 3, mb: 2 }}
        color="warning">
        <InputLabel id="demo-simple-select-label">Priority(All)</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={searchPriority}
          label="Job Priority"
          onChange={changeSearchPriority}

        >
          <MenuItem value="All Priority">All Priority</MenuItem>
          <MenuItem value="Urgent">Urgent</MenuItem>
          <MenuItem value="Regular">Regular</MenuItem>
          <MenuItem value="Trivial">Trivial</MenuItem>
        </Select>
      </FormControl>
      <Paper autoWidth sx={{ overflow: 'hidden' }}>
        <TableContainerStyle

          sx={{ maxHeight: 300, maxWidth: 300 }}   >
          <Table size="small" aria-label="simple table">
            <TableHead style={{ background: '#F44336' }}>
              <TableRow>
                <TableCell colSpan={1}>


                </TableCell>
                <TableCell align="center" colSpan={2}>

                </TableCell>

              </TableRow>
            </TableHead>
            <TableHead>

            </TableHead>
            <TableBody>

              {

                searchPriority === 'All Priority' || searchPriority === '' ? dataArray.map(repo =>


                  <TableRow

                    key={repo.jobID}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >

                    <TableCell
                      style={{ padding: 20 }}
                      component="th" scope="row">

                      {repo.priorityName === 'Urgent' ? <span style={{ background: '#C62828', color: 'white', fontWeight: 'bold', padding: 3, borderRadius: 5 }} align="center">{repo.priorityName}</span> : null}
                      {repo.priorityName === 'Regular' ? <span style={{ background: 'orange', color: 'white', fontWeight: 'bold', padding: 3, borderRadius: 5 }} align="center">{repo.priorityName}</span> : null}
                      {repo.priorityName === 'Trivial' ? <span style={{ background: 'darkslateblue', color: 'white', fontWeight: 'bold', padding: 3, borderRadius: 5 }} align="center">{repo.priorityName}</span> : null}
                      <br />  <Span> {repo.jobName} </Span>
                      <br />
                      <Button sx={{ mt: 1 }} onClick={() => openEditDialog(repo.jobName, repo.priorityName, repo.jobID)} variant="contained" size="small">✎</Button>
                      <Button sx={{ ml: 2, mt: 1 }} onClick={() => openDeleteDialog(repo.jobID, repo.jobName)} color="error" variant="contained" size="small">✕</Button>
                    </TableCell>



                    <DeleteDialog deleteDialogJobName={dialogJobName} />
                    <EditDialog editDialogJobName={dialogJobName} priorityDialog={dialogPriority} />
                  </TableRow>

                ) :
                  filteredJobListData.filter(item => item.priorityName === searchPriority).map(repo =>

                    <TableRow

                      key={repo.jobID}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >

                      <TableCell
                        style={{ padding: 20 }}
                        component="th" scope="row">

                        {repo.priorityName === 'Urgent' ? <span style={{ background: '#C62828', color: 'white', fontWeight: 'bold', padding: 3, borderRadius: 5 }} align="center">{repo.priorityName}</span> : null}
                        {repo.priorityName === 'Regular' ? <span style={{ background: 'orange', color: 'white', fontWeight: 'bold', padding: 3, borderRadius: 5 }} align="center">{repo.priorityName}</span> : null}
                        {repo.priorityName === 'Trivial' ? <span style={{ background: 'darkslateblue', color: 'white', fontWeight: 'bold', padding: 3, borderRadius: 5 }} align="center">{repo.priorityName}</span> : null}
                        <br /><Span> {repo.jobName}</Span>
                        <br />
                        <Button sx={{ mt: 1 }} onClick={() => openEditDialog(repo.jobName, repo.priorityName, repo.jobID)} variant="contained" size="small">✎</Button>
                        <Button sx={{ ml: 2, mt: 1 }} onClick={() => openDeleteDialog(repo.jobID, repo.jobName)} color="error" variant="contained" size="small">✕</Button>
                      </TableCell>



                      <DeleteDialog deleteDialogJobName={dialogJobName} />
                      <EditDialog editDialogJobName={dialogJobName} priorityDialog={dialogPriority} />
                    </TableRow>

                  )
              }
            </TableBody>
          </Table>
        </TableContainerStyle>
      </Paper>
    </ListJobContent>
  )
}


const ListJobContent = styled.div`
text-align:center;
justify-content:center;
flex-direction:column;
align-items:center;
display:flex;
`

const TableContainerStyle = styled(TableContainer)`
 
 @media (min-width: 768px) {
  min-width:600px
}
 @media (max-width: 768px) {
  min-width:300px
}
`

const TextFieldStyle = styled(TextField)`
 
 @media (min-width: 768px) {
  min-width:800px
}
 @media (max-width: 768px) {
  min-width:300px
}
`

const Span = styled.span`
 
font-family: 'Work Sans', sans-serif;
font-size:18px;
font-weight:bold;
color:darkslategray;
 
`


