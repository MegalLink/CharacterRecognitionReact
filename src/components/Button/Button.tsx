import React, { createElement } from 'react'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import buttonSVG from '../../assets/button.svg'

export const MainButton = styled(Button)({
  backgroundImage: `url(${buttonSVG})`,
  borderRadius: '50%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  cursor: 'pointer',
  height: '60px',
  '&:hover': {
    borderColor: '#0062cc',
    border: '2px solid',
    boxShadow: 'none',
  },
})
