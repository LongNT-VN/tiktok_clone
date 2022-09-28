import { Stack, Text, ThemeIcon } from '@mantine/core';
import { TablerIcon } from '@tabler/icons';
import React from 'react'
import { IconType } from 'react-icons';


interface IProps {
    text: string;
    Icon?: IconType | TablerIcon;
}

const NoResult = ({ text, Icon }: IProps) => {
    return (
        <Stack align="center" className="mt-10">
            {Icon && <ThemeIcon variant="outline" radius="xl" size="xl" color="dark">
                <Icon/>
            </ThemeIcon>
            }
            <Text size="xl" weight={700}>{text}</Text>
        </Stack>
    )
}

export default NoResult