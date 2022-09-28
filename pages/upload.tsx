import {
  Button,
  Card,
  FileButton,
  Group,
  Select,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCloudUpload } from "@tabler/icons";
import React, { useState, useRef } from "react";
import { SanityAssetDocument } from "@sanity/client";
import { client } from "../utils/client";
import { topics } from "../utils/constants";
import useAuthStore from "../store/authStore";
import axios from "axios";
import Router from "next/router";

const Upload = () => {
  const { userProfile } = useAuthStore();
  const [file, setFiles] = useState<File | null>(null);
  const resetRef = useRef<() => void>(null);
  const [fileUploaded, setFileUploaded] = useState<SanityAssetDocument | null>(null);
  const [isUploaded, setIsUploaded] = useState(false)
  const clearFile = () => {
    setFiles(null);
    setFileUploaded(null);
    resetRef.current?.();
    form.setFieldValue("video", null);
  };
  interface Post {
    caption: string;
    video: SanityAssetDocument | null;
    topic: string;
  }
  const form = useForm({
    initialValues: {
      caption: "",
      video: fileUploaded,
      topic: "",
    },
    validate: {
      caption: (value) => (value ? null : "Missing caption"),
      video: (value: SanityAssetDocument) => (value ? null : "Missing video"),
      topic: (value) => (value ? null : "Missing topic"),
    },
  });
  const onSubmitPost = async (value: Post) => {
    const document = {
      _type: "post",
      caption: value.caption,
      video: {
        _type: 'file',
        asset: {
          _type: 'reference',
          _ref: value.video?._id
        }
      },
      userId: userProfile?._id,
      postedBy: {
        _type: 'postedBy',
        _ref: userProfile?._id,
      },
      topic: value.topic
    }
    await axios.post('http://localhost:3000/api/post', document);
    Router.push('/')
  }
  return (
    <Stack>
      <Stack>
        <Text weight={700} size={28}>
          Upload
        </Text>
        <Text size="xl">Upload your video to Tiktok</Text>
      </Stack>
      <form onSubmit={form.onSubmit(onSubmitPost)}>
        <Group spacing="xl" align="flex-start">
          <Card
            shadow="sm"
            p="lg"
            radius="md"
            className="border-dashed border-2 border-sky-500 hover:border-red-500"
          >
            <Stack align="center" justify="space-around">
              <ThemeIcon
                variant="outline"
                size={50}
                sx={{ "border-color": "transparent" }}
              >
                <IconCloudUpload size={50} />
              </ThemeIcon>
              <Stack>
                <Text size="sm" color="dimmed" align="center">
                  MP4 hoặc WebM
                </Text>
                <Text size="sm" color="dimmed" align="center">
                  Độ phân giải 720x1280 trở lên
                </Text>
                <Text size="sm" color="dimmed" align="center">
                  Tối đa 10 phút
                </Text>
                <Text size="sm" color="dimmed" align="center">
                  Ít hơn 2 GB
                </Text>
              </Stack>
              <Group position="center">
                <FileButton
                  resetRef={resetRef}
                  onChange={(file) => {
                    setIsUploaded(true)
                    let temp: SanityAssetDocument;
                    file && client.assets.upload('file', file, {
                      contentType: file?.type,
                      filename: file?.name
                    }).then(data => {
                      form.setFieldValue("video", data)
                      setFileUploaded(data);
                      setIsUploaded(false)
                    })
                    setFiles(file);
                  }}
                  accept="video/mpeg, video/mp4"
                >
                  {(props) => <Button {...props}>Upload image</Button>}
                </FileButton>
                <Button
                  disabled={!file}
                  color="red"
                  onClick={() => {
                    clearFile();
                    form.setFieldValue("video", null);
                  }}
                >
                  Reset
                </Button>
              </Group>
              {
                isUploaded ? <Text>Uploading</Text> :
                  fileUploaded && (
                    <Stack align="center">
                      <Text size="sm" mt="sm">
                        Picked files:
                      </Text>
                      <video
                        className="xl:w[300px] h-[150px] md:h-[260px] w-[130px] rouded-2xl cursor-pointer bg-gray-100"
                        src={`${fileUploaded.url}`}
                        key={`${fileUploaded.url}`}
                        loop
                        controls
                      />
                    </Stack>
                  )
              }
            </Stack>
          </Card>
          <Stack justify="space-around">
            <TextInput
              label="Caption"
              placeholder="My video"
              {...form.getInputProps("caption")}
            />
            <Select
              label="Choose your video topic"
              placeholder="Pick one"
              data={topics.map((topic) => topic.name)}
              {...form.getInputProps("topic")}
            />
            <Group position="center">
              <Button color="red">Cancel</Button>
              <Button type="submit">Post</Button>
            </Group>
          </Stack>
        </Group >
      </form >
    </Stack >
  );
};

export default Upload;
