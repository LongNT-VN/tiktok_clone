import { Dialog, Stack, Text } from '@mantine/core';
import { GoogleLogin } from '@react-oauth/google';
import React from 'react'
import useAuthStore from '../store/authStore';
import { createOrGetUser } from '../utils';

interface IProps {
    opened: boolean;
    setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginDialog = ({ opened, setOpened }: IProps) => {
    const { addUser } = useAuthStore();
    return (
        <Dialog
            opened={opened}
            withCloseButton
            onClose={() => setOpened(false)}
            size="lg"
            radius="md"
            shadow="xl"
            p={30}
            position={{ top: "50%", left: "50%" }}
            sx={{
                translate: "-50% -50%",
            }}
        >
            <Stack align="center" justify="space-between">
                <Text size="xl" weight={700}>Login to TikTok</Text>
                <GoogleLogin
                    onSuccess={(response) => createOrGetUser(response, addUser)}
                    onError={() => { }}
                />
            </Stack>
        </Dialog >
    )
}

export default LoginDialog