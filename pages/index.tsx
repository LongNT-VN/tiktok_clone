import { Stack } from '@mantine/core'
import { IconVideoOff } from '@tabler/icons'
import axios from 'axios'
import NoResult from '../components/NoResult'
import VideoCard from '../components/VideoCard'
import { Video } from '../types'
import { BASE_URL } from '../utils'


interface IProps {
  videos: Video[]
}

const Home = ({ videos }: IProps) => {
  return (
    <Stack className="m-0 p-0">
      {videos.length ? videos.map((video, index) => (
        <VideoCard key={index} post={video} />
      )) : <NoResult text="No result found" Icon={IconVideoOff} />}
    </Stack>
  )
}

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let api = `${BASE_URL}/api/post`
  if (topic) {
    api = `${BASE_URL}/api/post/discover/${topic}`
  }
  const { data } = await axios.get(api)
  return {
    props: {
      videos: data
    }
  }

}

export default Home
