// Import dependencies
import React, { FC, useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
// eslint-disable-next-line
import { Alert, Box, Button, Container, Fab, IconButton } from '@mui/material'
import { createWorker } from 'tesseract.js'
import ParkIcon from '@mui/icons-material/Park'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import StopIcon from '@mui/icons-material/Stop'

interface ObjectDetectorProps {
  type: string
  values: string[]
}

export const ObjectDetector: FC<ObjectDetectorProps> = ({ type, values }) => {
  const [actualValue, setActualValue] = useState<string>(values[0])
  const [actualIndex, setActualIndex] = useState(0)
  const [isGameDone, setGameDone] = useState(false)

  const imageURL =
    'https://thumbs.dreamstime.com/b/textura-incons%C3%BAtil-de-la-tela-del-fondo-color-turquesa-119902970.jpg'
  const webcamRef = useRef<Webcam>(null)
  const [matched, setMached] = useState(false)
  let interval: NodeJS.Timer

  const initDetection = async () => {
    setMached(false)
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
        }
      } else {
        clearInterval(interval)
        setGameDone(true)
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
      setMached(true)
      clearInterval(interval)

      return true
    }
    return false
  }
  useEffect(() => {
    if (actualIndex === values.length) {
      setGameDone(true)
      setMached(false)
    }
  }, [actualValue])

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
        <Box
          sx={{
            flex: 3,
            width: 800,
            height: 500,
            backgroundImage: `url(${imageURL})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

            mb: 2,
          }}
        >
          {/* {array.map((value, index) => (
          <ParkIcon color='success' key={index} fontSize='large' />
       ))}*/}
        </Box>

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
      {matched && <Alert severity='success'>Detected {values[actualIndex - 1]} successfully</Alert>}
      {isGameDone && <Alert severity='success'>Game Done</Alert>}
      <Box sx={{ display: 'flex', gap: '10' }}>
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
