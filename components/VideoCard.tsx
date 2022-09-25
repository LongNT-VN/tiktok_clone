import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { Video } from "../types";
import { GoVerified } from "react-icons/go";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import { Avatar, Container, Group, Text } from "@mantine/core";
import TogleButton from "./TogleButton";

interface IProps {
  post: Video;
}

const VideoCard = ({ post }: IProps) => {
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
      className="flex flex-col border-b-2 border-gray-200 pb-6"
      sx={{ margin: 0 }}
    >
      <Group className="p-2 mt-5">
        <Avatar
          size={62}
          className="rounded-full"
          src={post.postedBy.image}
          alt="profile photo"
          component="a"
          href="/"
        />
        <Group>
          <Link href="/">
            <Text
              size="lg"
              align="center"
              weight={700}
              className="cursor-pointer"
            >
              {post.postedBy.userName}
            </Text>
          </Link>
          <GoVerified className="text-blue-400 text-md" />
        </Group>
      </Group>
      <Text size="lg" className="my-2">
        {post.caption}
      </Text>
      <Container className="lg:ml-20 flex gap-4" sx={{ margin: 0 }}>
        <Container
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="relative"
          sx={{ margin: 0 }}
        >
          <Link href={`video/${post._id}`}>
            <video
              loop
              ref={videoRef}
              className="lg:w-[600px] h-[300px] lg:h-[530px] w-[200px] rounded-3xl cursor-pointer bg-gray-100"
              src={post.video.asset.url}
              muted={isMuted}
            ></video>
          </Link>

          {isHover && (
            <Group
              className="absolute left-0 bottom-2 w-full"
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
    </Container>
  );
};

export default VideoCard;
