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
    <Stack className="xl:w-400 w-20 border-r-2 border-gray-100 xl:border-0 h-full" spacing={0}>
      <Group position={largeScreen ? "left" : "center"} className="my-6">
        <Link href="/">
          <ActionIcon size="lg">
            <AiFillHome color={pathname === "/" ? "pink" : "dark"} size={24} />
          </ActionIcon>
        </Link>
        <Text weight={700} size="lg" className="hidden xl:block">
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
