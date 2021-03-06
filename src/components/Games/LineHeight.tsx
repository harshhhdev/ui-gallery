import { FC, Dispatch, SetStateAction, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Fade, FadeContainer, FadeLeft, FadeRight } from '../../utils/anims'

const LineHeight: FC<{
  completed: number
  setCompleted: Dispatch<SetStateAction<number>>
  tries: number
  setTries: Dispatch<SetStateAction<number>>
  fire: () => void
}> = ({ completed, setCompleted, tries, setTries, fire }) => {
  const [lineHeight, setLineHeight] = useState(1)
  const [won, setWon] = useState(false)
  const [replay, setReplay] = useState(true)
  const slider = useRef<HTMLInputElement>(null)
  const [goal, setGoal] = useState(
    Math.round((Math.random() * 2 + 1) * 10) / 10
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
          ? 'Woooo! Right on the dot 🎉'
          : `Adjust the \`line-height\` to ${goal}px`}
      </motion.h1>
      <motion.div className='flex items-center' variants={FadeRight}>
        <p
          className='text-sm md:text-xl text-medium my-10 inline-flex items-center h-72'
          style={{ lineHeight: lineHeight }}
        >
          Eligendi dolorem quos reprehenderit omnis qui. Impedit est dignissimos
          eligendi id facere reprehenderit. Voluptatem voluptates incidunt quas
          exercitationem eligendi quo ea minus. Voluptatem tempore voluptates id
          voluptatibus maxime ut. Est ipsum sit at ipsum voluptate. Temporibus
          ut adipisci quis vitae.
        </p>
      </motion.div>
      <motion.input
        variants={FadeLeft}
        type='range'
        min='0'
        max='3'
        defaultValue={lineHeight.toString()}
        step='0.1'
        disabled={won ? true : false}
        ref={slider}
        onChange={() => setLineHeight(parseFloat(slider.current.value))}
        className={won ? 'disabled' : ''}
        onPointerUp={() => {
          if (!won) {
            setTries(tries + 1)
            if (lineHeight === goal) {
              setReplay(!replay)
              setTimeout(() => setReplay(true), 100)
              setWon(true)
              setCompleted(completed + 1)
              fire()
            }
          }
        }}
      />
    </motion.div>
  )
}

export default LineHeight
