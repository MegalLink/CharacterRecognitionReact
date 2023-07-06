// Import dependencies
import React, { useRef, useState } from 'react'
import Webcam from 'react-webcam'
// eslint-disable-next-line
import { Alert, Box, Button, Container } from '@mui/material'
import { createWorker } from 'tesseract.js'
import ParkIcon from '@mui/icons-material/Park'

export function ObjectDetector() {
  const actualChar = 'A'
  const actualNumber = 5
  const array = Array(5).fill(1)

  const imageURL = 'https://cdn.pixabay.com/photo/2016/09/08/13/58/desert-1654439_1280.jpg'
  const webcamRef = useRef<Webcam>(null)
  const [matched, setMached] = useState(false)

  let interval: NodeJS.Timer

  const initDetection = async () => {
    setMached(false)
    let count = 0
    interval = setInterval(() => {
      console.log(count)
      if (count < 3) {
        count++
        detected()
      } else {
        clearInterval(interval)
        console.log('Not detecting anymore')
      }
    }, 3000)
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
    console.log('Detecting')
    await (await worker).terminate()
    if (text.indexOf(actualChar) !== -1) {
      console.log('Detected', actualChar)
      setMached(true)
      clearInterval(interval)
      return true
    }
    return false
  }

  return (
    <Container
      className='App'
      sx={{
        mt: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Box className=''>
        <Webcam
          ref={webcamRef}
          muted={true}
          width={400}
          height={400}
          style={{
            textAlign: 'center',
            zIndex: -1,
          }}
        />
      </Box>

      <Box
        sx={{
          width: 400,
          height: 400,
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
        {array.map((value, index) => (
          <ParkIcon color='success' key={index} fontSize='large' />
        ))}
      </Box>
      {matched && <Alert severity='success'>Detected {actualChar} successfully</Alert>}
      <Box sx={{ mt: 2 }}>
        <Button sx={{ mx: 2 }} variant='contained' onClick={() => initDetection()}>
          Start Detection
        </Button>
        <Button sx={{ mx: 2 }} variant='outlined' onClick={() => clearInterval(interval)}>
          Stop Detection
        </Button>
      </Box>
    </Container>
  )
}
