import React, { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/router";
import Discover from "./Discover";
import SuggestAccounts from "./SuggestAccounts";
import Footer from "./Footer";
import { ActionIcon, Group, Stack, Text } from "@mantine/core";
import axios from "axios";
import { IUser } from "../types";
import { useMediaQuery } from "@mantine/hooks";
const Sidebar = () => {
  const { pathname } = useRouter();
  const [suggestAccounts, setSuggestAccounts] = useState<IUser[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("http://localhost:3000/api/user/");
      setSuggestAccounts(data);
    })();
  }, []);
  const largeScreen = useMediaQuery("(min-width: 1280px)");
  return (
    // className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-0 p-3 border-gray-100 xl:border-0 p-3 "
    // className="xl:border-b-2 border-gray-200 xl:pb-4 flex justify-center xl:justify-start content-center"
    <Stack className="xl:w-400 w-20 border-r-2 border-gray-100 xl:border-0 h-full">
      <Group position={largeScreen ? "left" : "center"} className="mt-2">
        <ActionIcon size="lg">
          <AiFillHome color={pathname === "/" ? "pink" : "dark"} size={24}/>
        </ActionIcon>
        <Text weight={700} className="hidden xl:block">
          For you
        </Text>
      </Group>
      <Discover />
      <SuggestAccounts suggestAccounts={suggestAccounts} />
      <Footer />
    </Stack>
  );
};

export default Sidebar;
