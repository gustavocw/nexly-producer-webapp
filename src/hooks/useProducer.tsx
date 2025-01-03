import { ProducerContext } from 'contexts/ProducerContext'
import { useContext } from 'react'

export function useProducer() {
  return useContext(ProducerContext)
}