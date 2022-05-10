import { FC } from 'react'
import { motion } from 'framer-motion'
import { Fade, FadeContainer } from '../../utils/anims'
import WavyText from '../WavyText'

const Intro: FC = () => {
  return (
    <motion.div
      className='w-full h-screen flex flex-col justify-center'
      variants={FadeContainer}
      initial='hidden'
      animate='visible'
    >
      <WavyText text="Harsh Singh's" />
      <motion.h1
        className='text-5xl md:text-max font-bold my-5 text-center bg-gradient-to-r from-gradient-100 to-gradient-200 bg-clip-text text-transparent'
        variants={Fade}
      >
        UI Games
      </motion.h1>
      <WavyText text='Leaderboard' />
    </motion.div>
  )
}

export default Intro
