import { Box } from '@mui/material'
import React, { FC } from 'react'
import zero from '../assets/vocals/zero.jpeg'
import a from '../assets/vocals/a.jpeg'
import e from '../assets/vocals/e.jpeg'
import i from '../assets/vocals/i.jpeg'
import o from '../assets/vocals/o.jpeg'
import u from '../assets/vocals/u.jpeg'

interface VocalsContainer {
  vocal: string | undefined
}

const getImageFromVowel = (vowel: string | undefined) => {
  if (vowel === undefined) return zero

  switch (vowel.toLowerCase()) {
    case 'a':
      return a
    case 'e':
      return e
    case 'i':
      return i
    case 'o':
      return o
    case 'u':
      return u
    default:
      return zero
  }
}

export const VocalsContainer: FC<VocalsContainer> = ({ vocal }) => {
  const width = 800
  const height = 500

  return (
    <Box
      sx={{
        flex: 3,
        width: width,
        height: height,
        backgroundImage: `url(${getImageFromVowel(vocal)})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mb: 2,
      }}
    ></Box>
  )
}
