// Import dependencies
import React, { FC, useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { Box, Fab, Typography } from '@mui/material'
import { createWorker } from 'tesseract.js'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import StopIcon from '@mui/icons-material/Stop'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { AnimalsContainer } from './NumbersAnimalsContainer'
import { GameType } from '../pages/GamePage'
import { VocalsContainer } from './VocalsContainer'
import { useNavigate } from 'react-router-dom'
import { theme } from '../theme/theme'

const MySwal = withReactContent(Swal)

interface ObjectDetectorProps {
  gameType: GameType
  values: string[]
}

enum GameState {
  NONE,
  SUCCESS,
  FAILED,
}

export const ObjectDetector: FC<ObjectDetectorProps> = ({ gameType, values }) => {
  const [actualValue, setActualValue] = useState<string>(values[0])
  const [actualIndex, setActualIndex] = useState(0)
  const [matched, setMached] = useState<GameState>(GameState.NONE)
  const [isGameDone, setIsGameDone] = useState(false)
  const navigate = useNavigate()
  const maxSnapshot = 6
  const sucessDelay = 3000
  const webcamRef = useRef<Webcam>(null)
  let interval: NodeJS.Timer

  const initDetection = async () => {
    setMached(GameState.NONE)
    let count = 0
    interval = setInterval(() => {
      console.log('try:', count)
      if (actualIndex < values.length) {
        if (count < maxSnapshot) {
          count++
          detected().then((isDetected: boolean) => {
            if (isDetected) {
              console.log('isDetected', isDetected)
              setActualIndex(actualIndex + 1)
              setActualValue(values[actualIndex + 1])
            }
          })
        } else {
          clearInterval(interval)
          console.log('Not detecting anymore')
          setMached(GameState.FAILED)
        }
      } else {
        // TODO THIS IS JUST A SAFE CASE BUT THE GAME SHOULD NOT GET IN HERE
        console.log('GAME DOME ON INTERVAL')
        clearInterval(interval)
        setIsGameDone(true)
      }
    }, 1000)
  }

  // Main function
  const detected = async (): Promise<boolean> => {
    const webcam = webcamRef.current
    const imageSrc = webcam!.getScreenshot()

    const worker: Promise<Tesseract.Worker> = createWorker()
    await (await worker).load()
    await (await worker).loadLanguage('eng')
    await (await worker).initialize('eng')
    const {
      data: { text },
    } = await (await worker).recognize(imageSrc!)
    // console.log('Text', text)
    console.log('Detecting', actualValue)
    await (await worker).terminate()
    if (text.toLowerCase().indexOf(actualValue.toLowerCase()) !== -1) {
      console.log('Detected', actualValue)
      setMached(GameState.SUCCESS)
      clearInterval(interval)

      return true
    }
    return false
  }

  const setGameComponent = (gameType: GameType) => {
    switch (gameType) {
      case GameType.VOCALS:
        return <VocalsContainer vocal={values[actualIndex]} />
      case GameType.NUMBERS:
        return <AnimalsContainer repeat={parseInt(values[actualIndex])} />
      case GameType.UNDEFINED:
        ;<></>
    }
  }

  const getGameText = (gameType: GameType): string => {
    switch (gameType) {
      case GameType.VOCALS:
        return '¿Con que vocal comienza el animal o objeto en el bosque?'
      case GameType.NUMBERS:
        return '¿Cuántos animales hay en el bosque?'
      case GameType.UNDEFINED:
        return ''
    }
  }

  useEffect(() => {
    if (actualIndex === values.length) {
      setIsGameDone(true)
      console.log('GAME DOME BY INDEX')

      setMached(GameState.NONE)
    }
  }, [actualValue])

  useEffect(() => {
    if (isGameDone) {
      setTimeout(() => {
        MySwal.fire({
          title: 'JUEGO TERMINADO',
          text: 'Quiere jugar denuevo?',
          icon: 'success',
          showCancelButton: true,
          confirmButtonColor: `${theme.palette.primary.main}`,
          cancelButtonColor: `${theme.palette.secondary.main}`,
          confirmButtonText: 'Si, jugar denuevo',
          cancelButtonText: 'No, ir al menu principal',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(0)
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            navigate('/')
          }
        })
      }, sucessDelay + 10)
    }
  }, [isGameDone])

  useEffect(() => {
    switch (matched) {
      case GameState.NONE:
        break
      case GameState.SUCCESS:
        MySwal.fire({
          icon: 'success',
          title: 'Respuesta correcta',
          imageUrl: 'https://www.pngmart.com/files/15/Happy-Face-Emoji-PNG.png',
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: 'Happy face success',
          showConfirmButton: false,
          timer: sucessDelay,
        })
        break
      case GameState.FAILED:
        MySwal.fire({
          icon: 'error',
          title: 'Intentalo denuevo',
          showConfirmButton: false,
          timer: sucessDelay,
        })
        break
    }
  }, [matched])

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
      <Box sx={{ marginBottom: '5%', opacity: [0.9, 0.8, 0.7] }}>
        {' '}
        <Typography variant='h3' color={'secondary'}>
          {getGameText(gameType)}{' '}
        </Typography>
      </Box>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {setGameComponent(gameType)}

        <Box>
          <Webcam
            ref={webcamRef}
            muted={true}
            width={500}
            height={500}
            style={{
              textAlign: 'center',
              position: 'relative',
              right: '30px',
              bottom: '20px',
            }}
          />
        </Box>
      </div>

      <Box sx={{ display: 'flex', gap: '10', justifyContent: 'space-evenly', width: '200px' }}>
        <Fab color='primary' aria-label='add' onClick={() => initDetection()}>
          <PlayArrowIcon />
        </Fab>
        <Fab color='primary' aria-label='add' onClick={() => clearInterval(interval)}>
          <StopIcon />
        </Fab>
      </Box>
    </div>
  )
}
