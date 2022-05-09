import React from 'react'
//Styled Components Libraries
import styled from 'styled-components';
//Material UI Libraries
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
//React Icons Libraries
import { FaEarlybirds } from "react-icons/fa";


export default function Navbar() {
  return (
    <AppBar position="static" sx={{ bgcolor: "#f44336" }}

    >
      <Container maxWidth="xl">
        <Toolbar disableGutters> <FaEarlybirds size={28} style={{
          marginRight: '5px'
        }} />
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ mr: 2, display: { md: 'flex' } }}
          >
            ᴹᵞJobs
          </Typography>

        </Toolbar>

      </Container>
    </AppBar>
  )
}
