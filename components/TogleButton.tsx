import { ActionIcon, MantineNumberSize } from "@mantine/core";
import React, { useState } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { IconType } from "react-icons/lib";

const TogleButton = ({
  opened,
  setOpened,
  iconBefore,
  iconAfter,
  color,
  size,
}: {
  opened: boolean;
  setOpened: Function;
  iconBefore: IconType;
  iconAfter: IconType;
  color: string;
  size?: MantineNumberSize;
}) => {
  const Icon: IconType = opened ? iconBefore : iconAfter;
  return (
    <ActionIcon
      size={size}
      variant="transparent"
      onClick={() => setOpened(!opened)}
    >
      <Icon color={color} size={size} />
    </ActionIcon>
  );
};

export default TogleButton;
