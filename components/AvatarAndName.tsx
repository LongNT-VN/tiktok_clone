import { Avatar, Group, MantineNumberSize, Text } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import { GoVerified } from 'react-icons/go'

interface IProps {
    image: string;
    name: string;
    size: MantineNumberSize;
    fontSize?: number
    className?: string
}
const AvatarAndName = ({ image, name, size, fontSize = 400, className = '' }: IProps) => {
    return (
        <Group className={className}>
            <Avatar
                size={size}
                radius="xl"
                className="rounded-full"
                src={image}
                alt="profile photo"
                component="a"
                href="/"
            />
            <Link href="/">
                <Group>
                    <Text size={size} align="center" weight={fontSize}>
                        {name}
                    </Text>
                    <GoVerified className="text-blue-400" />
                </Group>
            </Link>
        </Group>
    )
}

export default AvatarAndName