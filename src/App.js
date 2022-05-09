import React, { useState } from 'react'
//Styled Components Libraries
import styled from 'styled-components';
//Material UI Libraries
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
//React Icons Libraries
import { FaEarlybirds } from "react-icons/fa";
//Custom Components
import Navbar from './components/Navbar/Navbar';
import NewJob from './components/NewJob';
import ListJob from './components/ListJob';
//Contextjs Library
import { MainContext } from './context';
import Footer from './components/Footer/Footer';

export default function App() {

  //Context için global state'ler oluşturulur
  const [jobID, setJobID] = useState(0);
  const [deleteJobID, setDeleteJobID] = useState('');
  const [addNewJobPriority, setaddNewJobPriority] = useState('');
  const [searchPriority, setsearchPriority] = useState('');
  const [searchJobName, setsearchJobName] = useState('');
  const [dialogJobName, setDialogJobName] = useState('');
  const [dialogPriority, setDialogPriority] = useState('');
  const [openDeleteDialogVar, setOpenDeleteDialogVar] = useState(false);
  const [openEditDialogVar, setOpenEditDialogVar] = useState(false);
  const [jobName, setJobName] = useState('');
  const [editJobID, setEditJobID] = useState('');
  const [priority, setPriority] = useState('');
  const [jobList, setJoblist] = useState([]);



  //Context'te kullanılacak state'ler buraya yazılacak
  const data = {

    jobID,
    setJobID,
    deleteJobID,
    setDeleteJobID,
    jobName,
    setJobName,
    priority,
    setPriority,
    jobList,
    setJoblist,
    openDeleteDialogVar,
    setOpenDeleteDialogVar,
    dialogJobName,
    setDialogJobName,
    openEditDialogVar,
    setOpenEditDialogVar,
    dialogPriority,
    setDialogPriority,
    editJobID,
    setEditJobID,
    addNewJobPriority,
    setaddNewJobPriority,
    searchPriority,
    setsearchPriority,
    searchJobName,
    setsearchJobName
  }


  return (
    <MainContext.Provider value={data}>
      <General>
        <Navbar />
        <NewJob />
        <ListJob />
      </General>
      <Footer />
    </MainContext.Provider>
  )
}

const General = styled.div`
 height:120vh;
background: wheat;
display:flex;
flex-direction:column;
@media (max-width: 768px) {
  height:150vh;
background: wheat;
display:flex;
flex-direction:column;
}
`





