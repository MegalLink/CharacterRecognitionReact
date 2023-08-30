import React, { useEffect, useState } from 'react'

import { ObjectDetector } from '../components/ObjectDetector'
import { useLocation } from 'react-router-dom'
import { isEmpty } from 'lodash'
import { MainHeader } from '../components/MainHeader'
export enum GameType {
  VOCALS,
  NUMBERS,
  UNDEFINED,
}

export const GamePage = () => {
  const location = useLocation()
  const vocals: string[] = ['A', 'E', , 'I', 'O', 'U']
  const numbers: string[] = ['1', '2', '3', '4', '5', '6']
  const [list, setList] = useState<string[]>([])
  const [type, setType] = useState(GameType.UNDEFINED)

  useEffect(() => {
    const randomizedListVocals: string[] = vocals.sort(() => Math.random() - 0.5)
    const randomizedListNumbers: string[] = numbers.sort(() => Math.random() - 0.5)
    switch (true) {
      case location.pathname.includes('vocals'):
        setType(GameType.VOCALS)
        setList(randomizedListVocals)
        break
      case location.pathname.includes('numbers'):
        setType(GameType.NUMBERS)
        setList(randomizedListNumbers)
        break
    }
  }, [])

  return (
    <React.Fragment>
      <MainHeader />
      {!isEmpty(list) ? <ObjectDetector gameType={type} values={list} /> : <p>Loading</p>}
    </React.Fragment>
  )
}
