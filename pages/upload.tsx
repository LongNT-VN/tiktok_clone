import { Button, Card, FileButton, FileInput, Group, Image, List, SimpleGrid, Stack, Text, ThemeIcon } from '@mantine/core'
import { IconCloudUpload } from '@tabler/icons';
import React, { useState, useRef } from 'react'

const Upload = () => {
    const [files, setFiles] = useState<File[]>([]);
    const resetRef = useRef<() => void>(null);
    console.log(files)
    const clearFile = () => {
        setFiles([]);
        resetRef.current?.();
    };
    return (
        <div className="flex w-full h-full">
            <Stack>
                <Stack>
                    <Text weight={700} size={32}>Upload</Text>
                    <Text size={20}>Upload your video to Tiktok</Text>
                </Stack>
                <Group>
                    <Card shadow="sm" p="lg" radius="md" className="border-dashed border-2 border-sky-500 hover:border-red-500">
                        <Stack align="center" justify="space-around">
                            <ThemeIcon variant="outline" size={50} sx={{ "border-color": "transparent" }}>
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
                                <FileButton resetRef={resetRef} onChange={setFiles} accept="image/png,image/jpeg" multiple>
                                    {(props) => <Button {...props}>Upload image</Button>}
                                </FileButton>
                                <Button disabled={!files.length} color="red" onClick={clearFile}>Reset</Button>
                            </Group>
                            {files.length > 0 && (
                                <Text size="sm" mt="sm">
                                    Picked files:
                                </Text>
                            )}
                            <SimpleGrid cols={2}>
                                {files.map((file) => (
                                    <Image src={`${file}`} key={`${file}`} alt={`${file}`} radius="sm" />
                                ))}
                            </SimpleGrid>
                        </Stack>
                    </Card>
                </Group>
            </Stack>
        </div >
    )
}

export default Upload 