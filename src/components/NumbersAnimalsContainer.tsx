import { Box } from '@mui/material'
import React, { FC } from 'react'
import bird from '../assets/animals/bird.png'
import butterfly from '../assets/animals/butterfly.png'
import cat from '../assets/animals/cat.png'
import dog from '../assets/animals/dog.png'
import elephant from '../assets/animals/elephant.png'
import pig from '../assets/animals/pig.png'

interface AnimalsContainerProps {
  repeat: number
}

const animalImages = [bird, butterfly, cat, dog, elephant, pig]

export const AnimalsContainer: FC<AnimalsContainerProps> = ({ repeat }) => {
  const imageURL =
    'https://media.istockphoto.com/id/1326389468/es/vector/hermoso-bosque-iluminado-por-el-sol.jpg?s=612x612&w=0&k=20&c=Gd5_u48n673URKlF7b8SQKEcX1Q7Ck3mnuLt-PGuywA='
  const width = 800
  const height = 500

  const randomPosition = () => {
    const x = Math.floor(Math.random() * 100) - 100
    const y = Math.floor(Math.random() * 250) - 100
    return { x, y }
  }

  const renderComponents = () => {
    const randomImage: string = animalImages[Math.floor(Math.random() * 5)]
    return Array.from(Array(repeat), (_, index) => index).map((_, index) => {
      const position = randomPosition()
      return (
        <Box
          key={index}
          sx={{
            width: 100,
            height: 100,
            position: 'relative',
            top: position.y,
            left: position.x,
          }}
        >
          {<img src={randomImage} width='100px' className='App-logo' alt='logo' />}
        </Box>
      )
    })
  }
  if (!Number.isNaN(repeat)) {
    return (
      <Box
        sx={{
          flex: 3,
          width: width,
          height: height,
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
        {renderComponents()}
      </Box>
    )
  }

  return <div></div>
}
