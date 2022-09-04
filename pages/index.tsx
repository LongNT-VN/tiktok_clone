import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import NoResult from '../components/NoResult'
import VideoCard from '../components/VideoCard'
import styles from '../styles/Home.module.css'
import { Video } from '../types'


interface IProps {
  videos: Video[]
}

const Home = ({ videos }: IProps) => {
  return (
    <div className='flex flex-col gap-10 videos h-full'>
      {videos.length ? videos.map((video: Video) => (
        <VideoCard key={video._id} post={video} />
      )) : <NoResult text="No video" />}
    </div>
  )
}

export const getServerSideProps = async () => {
  const { data } = await axios.get('http://localhost:3000/api/post')
  return {
    props: {
      videos: data
    }
  }
}

export default Home
