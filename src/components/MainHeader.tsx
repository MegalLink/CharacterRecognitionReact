import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'

export const MainHeader = () => {
  const navigate = useNavigate()

  return (
    <AppBar color='secondary' component='nav'>
      <Toolbar>
        <Button variant='contained' startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
          Regresar
        </Button>
        <Typography
          variant='h6'
          component='div'
          sx={{ flexGrow: 1, marginLeft: '10px', display: { xs: 'none', sm: 'block' } }}
        >
          Aprende conmigo
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
