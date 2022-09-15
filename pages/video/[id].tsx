import {
  ActionIcon,
  Avatar,
  Button,
  Container,
  Group,
  Text,
} from "@mantine/core";
import { IconHeart, IconXboxX } from "@tabler/icons";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { FaComment, FaCommentDots } from "react-icons/fa";
import { GoVerified } from "react-icons/go";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import TogleButton from "../../components/TogleButton";
import { Video } from "../../types";

interface IProps {
  post: Video;
}

const DetailPage = ({ post }: IProps) => {
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
      className="flex w-full h-full absolute left-0 top-0 bg-white"
      sx={{ maxWidth: "100%", padding: 0 }}
    >
      <Container
        className="relative h-full md:w-7/12 w-6/12 bg-black flex"
        sx={{ maxWidth: "100%" }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <video
          src={`${post.video.asset.url}`}
          className="cursor-pointer mx-auto"
          ref={videoRef}
        />
        <Link href={"/"}>
          <ActionIcon
            variant="transparent"
            size="xl"
            sx={{ position: "absolute", top: 6, color: "white" }}
          >
            <IconXboxX size={34} />
          </ActionIcon>
        </Link>
        {isHover && (
          <Group className="absolute left-0 bottom-2 w-full" position="center">
            <TogleButton
              opened={isPlaying}
              setOpened={onVideoPlay}
              iconAfter={BsFillPlayFill}
              iconBefore={BsFillPauseFill}
              color="white"
              size="lg"
            />
            <TogleButton
              opened={isMuted}
              setOpened={setIsMuted}
              iconAfter={HiVolumeUp}
              iconBefore={HiVolumeOff}
              color="white"
              size="lg"
            />
          </Group>
        )}
      </Container>
      <Container
        className="relative h-full md:w-5/12 w-6/12"
        sx={{ maxWidth: "100%", padding: "16px" }}
      >
        <Group className="mt-10">
          <Avatar
            size="lg"
            radius="xl"
            className="rounded-full"
            src={post.postedBy.image}
            alt="profile photo"
            component="a"
            href="/"
          />
          <Link href="/">
            <Group>
              <Text size="lg" align="center" weight={700}>
                {post.postedBy.userName}
              </Text>
              <GoVerified className="text-blue-400 text-md" />
            </Group>
          </Link>
        </Group>
        <Text size="lg" className="mt-5">
          {post.caption}
        </Text>
        <Group className="mt-5">
          <ActionIcon variant="transparent">
            <IconHeart />
          </ActionIcon>
          <Text size="sm">{!post.likes ? 0 : post?.likes?.length}</Text>
          <ActionIcon variant="transparent">
            <FaCommentDots />
          </ActionIcon>
          <Text size="sm">{!post.comments ? 0 : post?.comments?.length}</Text>
        </Group>
      </Container>
    </Container>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await axios.get(`http://localhost:3000/api/post/${id}`);
  return {
    props: {
      post: data,
    },
  };
};

export default DetailPage;
