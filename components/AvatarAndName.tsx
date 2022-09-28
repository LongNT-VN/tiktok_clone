import { Avatar, Group, MantineNumberSize, Text } from "@mantine/core";
import Link from "next/link";
import React from "react";

interface IProps {
  image: string;
  name: string;
  id: string;
  hasResponsive?: boolean;
  size: MantineNumberSize;
  fontSize?: number;
  className?: string;
}
const AvatarAndName = ({
  image,
  name,
  id,
  size,
  hasResponsive = false,
  fontSize = 400,
  className = "",
}: IProps) => {
  return (
    <Link href={`/profile/${id}`}>
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
        <Text
          size={size}
          align="center"
          weight={fontSize}
          className={`${hasResponsive ? "hidden xl:block" : ""} cursor-pointer`}
        >
          {name}
        </Text>
      </Group>
    </Link>
  );
};

export default AvatarAndName;
