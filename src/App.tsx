import * as React from 'react'

import { ObjectDetector } from './components/ObjectDetector'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'

export interface FormValues {
  documents: string
  query: string
  stopWords?: string
  vocabulary?: string
  documentsSeparator: string
  wordSeparator: string
  vectorialMethod: number
}

export default function App() {
  return (
    <React.Fragment>
      <AppBar component='nav'>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            sx={{ mr: 2, display: { sm: 'none' } }}
          ></IconButton>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Aprende conmigo
          </Typography>
        </Toolbar>
      </AppBar>
      <ObjectDetector />
    </React.Fragment>
  )
}
