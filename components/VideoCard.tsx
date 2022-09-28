import Link from "next/link";
import React, { useRef, useState } from "react";
import { Video } from "../types";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import { Container, Group, Text } from "@mantine/core";
import TogleButton from "./TogleButton";
import AvatarAndName from "./AvatarAndName";

interface IProps {
  post: Video;
  isProfilePage?: boolean;
}

const VideoCard = ({ post, isProfilePage }: IProps) => {
  const [isHover, setIsHover] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoPlay = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsPlaying(true);
    }
  };

  return (
    <Container
      className={`${!isProfilePage && "border-b-2 border-gray-200 pb-6"} flex flex-col`}
      sx={{ margin: 0 }}
    >
      {!isProfilePage && <AvatarAndName
        image={post?.postedBy?.image}
        name={post?.postedBy?.userName}
        id={post?.postedBy?._id}
        size="lg"
        fontSize={700}
        className="mt-8"
      />}
      <Text size="lg" className="my-2">
        {post.caption}
      </Text>
      <Container className={`${!isProfilePage && "xl:ml-20 gap-4"} flex m-0 p-0`}>
        <Container
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="relative m-0 p-0"
        >
          <Link href={`/video/${post._id}`}>
            <video
              loop
              ref={videoRef}
              className={`${!isProfilePage && "xl:w-[400px] xl:h-[500px] lg:w-[350px] lg:h-[450px]"} h-[300px] w-[200px] rounded-3xl cursor-pointer bg-gray-100`}
              src={post.video.asset.url}
              muted={isMuted}
            ></video>
          </Link>

          {isHover && (
            <Group
              className="absolute bottom-2 w-full m-0 p-0"
              position="center"
            >
              <TogleButton
                opened={isPlaying}
                setOpened={onVideoPlay}
                iconAfter={BsFillPlayFill}
                iconBefore={BsFillPauseFill}
                color="black"
                size={26}
              />
              <TogleButton
                opened={isMuted}
                setOpened={setIsMuted}
                iconAfter={HiVolumeUp}
                iconBefore={HiVolumeOff}
                color="black"
                size={26}
              />
            </Group>
          )}
        </Container>
      </Container>
    </Container >
  );
};

export default VideoCard;
