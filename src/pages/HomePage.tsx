import React from 'react'
import { Container, Typography } from '@mui/material'
import { MainButton } from '../components/Button/Button'
import HeaderSVG from './../assets/headerBackground.svg'
import { useNavigate } from 'react-router-dom'
export const HomePage = () => {
  const navigate = useNavigate()
  return (
    <Container
      maxWidth={false}
      sx={{
        height: '100vh',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundImage:
          'url(https://raw.githubusercontent.com/AlbertGabdullin/puzzle15/master/src/static/background.svg)',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <div
        style={{
          backgroundImage: `url(${HeaderSVG})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '500px',
        }}
      >
        <div
          style={{
            width: '50vw',
            marginTop: '20vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
          }}
        >
          <Typography variant='h1' color={'#557A46'}>
            {' '}
            Juguemos{' '}
          </Typography>
          <div
            style={{
              width: '50vw',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
            }}
          >
            <MainButton onClick={() => navigate('game/vocals')}> Jugar con vocales</MainButton>
            <MainButton onClick={() => navigate('game/numbers')}> Jugar con Numeros</MainButton>
          </div>
        </div>
      </div>
    </Container>
  )
}
