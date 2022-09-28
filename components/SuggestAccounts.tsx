import { Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";
import { IUser } from "../types";
import AvatarAndName from "./AvatarAndName";

interface IProps {
  suggestAccounts: IUser[];
}

const SuggestAccounts = ({ suggestAccounts }: IProps) => {
  const largeScreen = useMediaQuery("(min-width: 1280px)");
  return (
    <Stack
      align={largeScreen ? "start" : "center"}
      justify="stretch"
      className="my-6"
    >
      <Text weight={700} className="hidden xl:block">
        Suggestion account
      </Text>
      {suggestAccounts.length &&
        suggestAccounts.map((suggestAccount, index) => (
          <AvatarAndName
            key={index}
            image={suggestAccount?.image}
            name={suggestAccount?.userName}
            id={suggestAccount?._id}
            size="md"
            hasResponsive
            fontSize={500}
          />
        ))}
    </Stack>
  );
};

export default SuggestAccounts;
