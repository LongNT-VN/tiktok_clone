import {
  ActionIcon,
  Container,
  Group,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconHeart, IconXboxX } from "@tabler/icons";
import axios from "axios";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { FaCommentDots } from "react-icons/fa";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import AvatarAndName from "../../components/AvatarAndName";
import TogleButton from "../../components/TogleButton";
import useAuthStore from "../../store/authStore";
import { Video } from "../../types";
import { BASE_URL } from "../../utils";
const Comments = dynamic(() => import("../../components/Comments"), { ssr: false });

interface IProps {
  postDetail: Video;
}

const DetailPage = ({ postDetail }: IProps) => {
  const [post, setPost] = useState(postDetail);
  const [quantityLiked, setQuantityLiked] = useState(post.likes.length)
  const [isHover, setIsHover] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPostingComment, setIsPostingComment] = useState(false);
  const { userProfile } = useAuthStore();
  const [liked, setLiked] = useState(!!postDetail?.likes?.filter(like => like?.postedBy?._id == userProfile?._id));
  const [loggedin, setLoggedIn] = useState(!!userProfile)
  const onVideoPlay = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsPlaying(true);
    }
  };
  const handleLike = async () => {
    const document = {
      userId: userProfile?._id,
      like: !liked
    }
    liked == true ? setQuantityLiked(quantityLiked - 1) : setQuantityLiked(quantityLiked + 1)
    setLiked(!liked);
    await axios.put(`${BASE_URL}/api/post/${post._id}/like`, document)
  };
  const handleLogin = () => setLoggedIn((open) => !open)
  const form = useForm({
    initialValues: {
      comment: ""
    },
    validate: {
      comment: (value) => (value ? null : "Missing comment")
    },
  });
  interface Comment {
    comment: string;
  }
  const onSubmitComment = async (value: Comment) => {
    setIsPostingComment(true);
    const document = {
      comment: value.comment,
      postedBy: {
        _type: 'postedBy',
        _ref: userProfile?._id,
      },
    }
    await axios.put(`${BASE_URL}/api/post/${post._id}`, document)
    const { data } = await axios.get(`/api/post/${post._id}`);
    setPost(data);
    value.comment = ''
    setIsPostingComment(false);
  }
  return (
    post && <Container
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
          src={`${post?.video?.asset?.url}`}
          className="cursor-pointer mx-auto"
          ref={videoRef}
          muted={isMuted}
          loop
          onClick={() => {
            onVideoPlay();
          }}
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
              size={26}
            />
            <TogleButton
              opened={isMuted}
              setOpened={setIsMuted}
              iconAfter={HiVolumeUp}
              iconBefore={HiVolumeOff}
              color="white"
              size={26}
            />
          </Group>
        )}
      </Container>
      <Container
        className="flex flex-col h-full md:w-5/12 w-6/12"
        sx={{ maxWidth: "100%", padding: "16px" }}
      >
        <Container sx={{ margin: 0 }}>
          <AvatarAndName
            image={post?.postedBy?.image}
            name={post?.postedBy?.userName}
            id={post?.postedBy?._id}
            size="lg"
            fontSize={700}
            className="mt-8" />
          <Text size="lg" className="mt-5">
            {post.caption}
          </Text>
          <Group className="mt-5">
            <TogleButton
              opened={liked}
              setOpened={userProfile ? handleLike : handleLogin}
              iconAfter={IconHeart}
              iconBefore={IconHeart}
              color={!liked ? "black" : "red"}
              size={26}
            />
            <Text size="sm">{quantityLiked}</Text>
            <ActionIcon variant="transparent">
              <FaCommentDots />
            </ActionIcon>
            <Text size="sm">{!post.comments ? 0 : post?.comments?.length}</Text>
          </Group>
        </Container>

        <Comments
          form={form}
          onSubmitComment={onSubmitComment}
          isPostingComment={isPostingComment}
          comments={post.comments}
          userProfile={userProfile}
          loggedin={loggedin}
          setLoggedIn={setLoggedIn}
          handleLogin={handleLogin} />
      </Container >
    </Container >
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);
  return {
    props: {
      postDetail: data,
    },
  };
};

export default DetailPage;
