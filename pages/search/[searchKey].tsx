import { Group, LoadingOverlay, Tabs } from "@mantine/core";
import { IconUser, IconUserOff, IconVideo, IconVideoOff } from "@tabler/icons";
import axios from "axios";
import React from "react";
import LazyLoad from "react-lazyload";
import AvatarAndName from "../../components/AvatarAndName";
import NoResult from "../../components/NoResult";
import VideoCard from "../../components/VideoCard";
import { IUser, Video } from "../../types";
import { BASE_URL } from "../../utils";

interface IProps {
  videos: Video[];
  users: IUser[];
}

const Search = ({ videos, users }: IProps) => {
  return (
    <Group grow>
      <LazyLoad placeholder={<LoadingOverlay visible overlayBlur={2} />}>
        <Tabs color="teal" variant="outline" radius="md" defaultValue="videos">
          <Tabs.List>
            <Tabs.Tab value="videos" icon={<IconVideo size={20} />}>
              Videos
            </Tabs.Tab>
            <Tabs.Tab value="users" color="blue" icon={<IconUser size={20} />}>
              Users
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="videos" pt="xs">
            {videos.length == 0 ? (
              <NoResult text="No results" Icon={IconVideoOff} />
            ) : (
              videos.map((video, index) =>
                <VideoCard key={index} post={video} />
              ))}
          </Tabs.Panel>
          <Tabs.Panel value="users" pt="xs">
            {users.length == 0 ? (
              <NoResult text="No results" Icon={IconUserOff}></NoResult>
            ) : (
              users.map((user, index) => (

                <AvatarAndName
                  key={index}
                  image={user?.image}
                  name={user?.userName}
                  id={user?._id}
                  size="lg"
                  fontSize={700}
                  className="py-4 border-b-2 border-gray-300"
                />
              ))
            )}
          </Tabs.Panel>
        </Tabs>
      </LazyLoad>
    </Group>
  );
};

export const getServerSideProps = async ({
  params: { searchKey },
}: {
  params: { searchKey: string };
}) => {
  const encodedURI = encodeURI(`${BASE_URL}/api/search/${searchKey}`);

  const { data } = await axios.get(encodedURI);
  return {
    props: {
      videos: data.posts,
      users: data.users,
    },
  };
};

export default Search;
