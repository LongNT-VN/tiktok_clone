import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { createOrGetUser } from "../utils";
import {
  googleLogout,
} from "@react-oauth/google";
import useAuthStore from "../store/authStore";
import { Avatar, Button, Group, Text } from "@mantine/core";
import { IconLogout, IconUpload } from "@tabler/icons";
import LoginDialog from "./LoginDialog";
import AvatarAndName from "./AvatarAndName";

const Navbar = () => {
  const { userProfile, removeUser } = useAuthStore();
  useEffect(() => {
    userProfile
  }, [userProfile]);
  const [loggedin, setLoggedIn] = useState(!!userProfile)
  const handleLogin = () => setLoggedIn((open) => !open)
  return (

    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="w-[100px] md:w-[130px]">
          <Image
            className="cursor-pointer"
            src="/tiktok-logo.png"
            alt="TikTik"
            layout="responsive"
            width="100px"
            height="30px"
          />
        </div>
      </Link>
      <div>Search</div>
      <div>
        {userProfile ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <Button leftIcon={<IconUpload />} variant="white">
                Upload
              </Button>
            </Link>
            <AvatarAndName image={userProfile?.image} name={userProfile?.userName} size="md" fontSize={500} />
            <Button
              leftIcon={<IconLogout />}
              variant="white"
              color="red"
              onClick={() => {
                googleLogout();
                removeUser();
                handleLogin();
              }}
            />
          </div>
        ) : (
          <>
            <Group position="center">
              <Button onClick={handleLogin}>Login</Button>
            </Group>
            <LoginDialog opened={loggedin} setOpened={setLoggedIn} />
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
