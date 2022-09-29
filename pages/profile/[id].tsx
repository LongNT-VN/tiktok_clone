import { SimpleGrid, Stack } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks';
import axios from 'axios';
import React from 'react'
import AvatarAndName from '../../components/AvatarAndName'
import VideoCard from '../../components/VideoCard';
import { IUser, Video } from '../../types';
import { BASE_URL } from '../../utils';

interface IProps {
    profile: IUser;
    videos: Video[];
}

const UserProfile = ({ profile, videos }: IProps) => {
    const mediumScreen = useMediaQuery("(min-width: 1024px)");
    return (
        <Stack>
            <AvatarAndName
                image={profile?.image}
                name={profile?.userName}
                id={profile?._id}
                size="xl"
                fontSize={700}
                className="mt-8"
            />
            <SimpleGrid cols={mediumScreen ? 3 : 1}>
                {videos.map((video, index) => (<VideoCard key={index} post={video} isProfilePage />))}
            </SimpleGrid>
        </Stack>
    )
}

export const getServerSideProps = async ({
    params: { id },
}: {
    params: { id: string };
}) => {
    const resUser = await axios.get(`${BASE_URL}/api/user/${id}`);
    const resVideos = await axios.get(`${BASE_URL}/api/post/user/${id}`);
    return {
        props: {
            profile: resUser.data,
            videos: resVideos.data,
        },
    };
};


export default UserProfile