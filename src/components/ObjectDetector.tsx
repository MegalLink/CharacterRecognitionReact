// Import dependencies
import React, { FC, useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { Alert, Box, CardMedia, Fab } from '@mui/material'
import { createWorker } from 'tesseract.js'
import ParkIcon from '@mui/icons-material/Park'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import StopIcon from '@mui/icons-material/Stop'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import * as bird from '../assets/animals/bird.png'
import { AnimalsContainer } from './NumbersAnimalsContainer'
const MySwal = withReactContent(Swal)

interface ObjectDetectorProps {
  gameType: string
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
  const [isGameDone, setGameDone] = useState(false)
  const [matched, setMached] = useState<GameState>(GameState.NONE)

  const webcamRef = useRef<Webcam>(null)
  let interval: NodeJS.Timer

  const initDetection = async () => {
    setMached(GameState.NONE)
    let count = 0
    interval = setInterval(() => {
      console.log('try:', count)
      if (actualIndex < values.length) {
        if (count < 5) {
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
        clearInterval(interval)
        setGameDone(true)
        MySwal.fire({
          icon: 'success',
          title: 'Juego Terminado',
          showConfirmButton: false,
          timer: 3000,
        })
        console.log('GAME DOME')
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
    console.log('Text', text)
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
  useEffect(() => {
    if (actualIndex === values.length) {
      MySwal.fire({
        icon: 'success',
        title: 'Juego Terminado',
        showConfirmButton: false,
        timer: 3000,
      })
      setGameDone(true)
      setMached(GameState.NONE)
    }
  }, [actualValue])

  useEffect(() => {
    switch (matched) {
      case GameState.NONE:
        break
      case GameState.SUCCESS:
        MySwal.fire({
          icon: 'success',
          title: 'Respuesta correcta',
          showConfirmButton: false,
          timer: 3000,
        })
        break
      case GameState.FAILED:
        MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          showConfirmButton: false,
          timer: 3000,
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <AnimalsContainer repeat={parseInt(values[actualIndex])} />

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

      <Box sx={{ display: 'flex', gap: '10' }}>
        <Fab color='primary' aria-label='add' onClick={() => initDetection()}>
          <PlayArrowIcon />
        </Fab>
        <Fab color='primary' aria-label='add' onClick={() => clearInterval(interval)}>
          <StopIcon />
        </Fab>
        <Fab color='primary' aria-label='add' onClick={() => clearInterval(interval)}>
          <StopIcon />
        </Fab>
      </Box>
    </div>
  )
}
