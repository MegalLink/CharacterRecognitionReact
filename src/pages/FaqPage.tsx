import React from 'react'

import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Container } from '@mui/material'
import { MainHeader } from '../components/MainHeader'
import { theme } from '../theme/theme'
export const FaqPage = () => {
  return (
    <div
      className='App'
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage:
          'url(https://as1.ftcdn.net/v2/jpg/02/07/18/42/1000_F_207184271_KGYtC1btjugpk0O6CVJSKnDI7BZ8PXkZ.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100vw',
        height: '100vh',
        flexDirection: 'column',
      }}
    >
      <MainHeader />
      <Container>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
            sx={{ backgroundColor: theme.palette.secondary.main }}
          >
            <Typography sx={{ color: 'white' }}>¿Cómo conseguir nuestro cubo?</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: theme.palette.info.main }}>
            <Typography>Puedes solicitarlo al administrador.</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel2a-content'
            id='panel2a-header'
            sx={{ backgroundColor: theme.palette.secondary.main }}
          >
            <Typography sx={{ color: 'white' }}>
              ¿Cuál es la edad recomendada para jugar este juego?
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: theme.palette.info.main }}>
            <Typography>Recomendado para niños de entre 8 y 12 años.</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel2a-content'
            id='panel2a-header'
            sx={{ backgroundColor: theme.palette.secondary.main }}
          >
            <Typography sx={{ color: 'white' }}>
              ¿Cómo implementar nuestro cubo en tu institución?
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: theme.palette.info.main }}>
            <Typography>Puede solicitar soporte a los administradores.</Typography>
          </AccordionDetails>
        </Accordion>
      </Container>
    </div>
  )
}
