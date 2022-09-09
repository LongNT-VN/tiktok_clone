import {
  Button,
  Card,
  FileButton,
  Group,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCloudUpload } from "@tabler/icons";
import React, { useState, useRef } from "react";

const Upload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const resetRef = useRef<() => void>(null);
  const clearFile = () => {
    setFiles([]);
    resetRef.current?.();
    form.setFieldValue("videos", []);
  };
  const form = useForm({
    initialValues: {
      caption: "",
      thumbnail: "",
      videos: files,
      access: "",
    },
    validate: {
      caption: (value) => (value ? null : "Invalid email"),
      thumbnail: (value) => (value ? null : "Invalid thumbnail"),
      videos: (value) => (value ? null : "Invalid video"),
      access: (value) => (value ? null : "Invalid access"),
    },
  });

  return (
    <Stack>
      <Stack>
        <Text weight={700} size={28}>
          Upload
        </Text>
        <Text size="xl">Upload your video to Tiktok</Text>
      </Stack>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
                  onChange={(files) => {
                    console.log(files);
                    setFiles(files);
                    form.setFieldValue("videos", files);
                  }}
                  accept="video/mpeg, video/mp4"
                  multiple
                >
                  {(props) => <Button {...props}>Upload image</Button>}
                </FileButton>
                <Button
                  disabled={!files.length}
                  color="red"
                  onClick={() => {
                    clearFile();
                    form.setFieldValue("videos", []);
                  }}
                >
                  Reset
                </Button>
              </Group>
              {files.length > 0 && (
                <Text size="sm" mt="sm">
                  Picked files:
                </Text>
              )}
              <SimpleGrid cols={2}>
                {files.map((file) => (
                  <video
                    className="lg:w[300px] h-[150px] md:h-[260px] w-[130px] rouded-2xl cursor-pointer bg-gray-100"
                    src={`${file.name}`}
                    key={`${file.name}`}
                    loop
                  />
                ))}
              </SimpleGrid>
            </Stack>
          </Card>
          <Stack justify="space-around">
            <TextInput
              label="Caption"
              placeholder="My video"
              {...form.getInputProps("caption")}
            />
            <TextInput
              label="Thumbnail"
              placeholder="Thumbnail"
              {...form.getInputProps("thumbnail")}
            />
            <Select
              label="Who will watching this video?"
              placeholder="Pick one"
              data={[
                { value: "private", label: "Privite" },
                { value: "friend", label: "Friend" },
                { value: "public", label: "Public" },
              ]}
              {...form.getInputProps("access")}
            />
            <Group position="center">
              <Button color="red">Cancel</Button>
              <Button type="submit">Post</Button>
            </Group>
          </Stack>
        </Group>
      </form>
    </Stack>
  );
};

export default Upload;
