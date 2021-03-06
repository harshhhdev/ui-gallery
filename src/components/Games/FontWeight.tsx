import { FC, Dispatch, SetStateAction, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Fade, FadeBottom, FadeContainer } from '../../utils/anims'

const FontWeight: FC<{
  completed: number
  setCompleted: Dispatch<SetStateAction<number>>
  tries: number
  setTries: Dispatch<SetStateAction<number>>
  fire: () => void
}> = ({ completed, setCompleted, tries, setTries, fire }) => {
  const [fontWeight, setFontWeight] = useState(200)
  const [won, setWon] = useState(false)
  const [replay, setReplay] = useState(true)
  const slider = useRef<HTMLInputElement>(null)
  const [goal, setGoal] = useState(
    Math.round((Math.random() * 800 + 100) / 100) * 100 
  )

  return (
    <motion.div
      className='my-32'
      variants={FadeContainer}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true }}
    >
      <motion.h1
        className='text-2xl font-bold'
        variants={Fade}
        initial='hidden'
        animate={replay ? 'visible' : 'hidden'}
      >
        {won
          ? 'You are an eyeballing champion! 😻'
          : `Adjust the \`font-weight\` to ${goal}`}
      </motion.h1>
      <motion.h1
        variants={FadeBottom}
        className='text-4xl text-center w-full my-10 inline-block'
        style={{ fontWeight: fontWeight }}
      >
        Lorem ipsum dolor sit amet
      </motion.h1>
      <motion.input
        variants={Fade}
        type='range'
        min='100'
        max='800'
        defaultValue={fontWeight}
        step='100'
        ref={slider}
        className={won ? 'disabled' : ''}
        disabled={won ? true : false}
        onChange={() => setFontWeight(parseInt(slider.current.value))}
        onPointerUp={() => {
          if (!won) {
            setTries(tries + 1)
            if (fontWeight === goal) {
              setCompleted(completed + 1)
              setReplay(!replay)
              setTimeout(() => setReplay(true), 100)
              setWon(true)
              fire()
            }
          }
        }}
      />
    </motion.div>
  )
}

export default FontWeight
