import React, { useEffect, useState } from 'react'

import { ObjectDetector } from '../components/ObjectDetector'
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useLocation, useNavigate } from 'react-router-dom'
import { isEmpty } from 'lodash'

export const GamePage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const vocals: string[] = ['A', 'E', 'I', 'O', 'U']
  const numbers: string[] = ['1', '2', '3', '4', '5', '6']
  const [list, setList] = useState<string[]>([])
  const [type, setType] = useState('')

  useEffect(() => {
    const randomizedListVocals: string[] = vocals.sort(() => Math.random() - 0.5)
    const randomizedListNumbers: string[] = numbers.sort(() => Math.random() - 0.5)
    switch (true) {
      case location.pathname.includes('vocals'):
        setType('vocals')
        setList(randomizedListVocals)
        break
      case location.pathname.includes('numbers'):
        setType('numbers')
        setList(randomizedListNumbers)
        break
    }
  }, [])
  return (
    <React.Fragment>
      <AppBar sx={{ backgroundColor: '#557A46' }} component='nav'>
        <Toolbar>
          <Button variant='contained' startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
            Regresar
          </Button>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, marginLeft: '10px', display: { xs: 'none', sm: 'block' } }}
          >
            Aprende conmigo {list}
          </Typography>
        </Toolbar>
      </AppBar>
      {!isEmpty(list) ? <ObjectDetector gameType={type} values={list} /> : <p>Loading</p>}
    </React.Fragment>
  )
}
