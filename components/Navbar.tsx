import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { googleLogout } from "@react-oauth/google";
import useAuthStore from "../store/authStore";
import { Button, Group } from "@mantine/core";
import { IconLogout, IconUpload } from "@tabler/icons";
import LoginDialog from "./LoginDialog";
import AvatarAndName from "./AvatarAndName";
import SearchBar from "./SearchBar";
import router from "next/router";
import { useForm } from "@mantine/form";
import { BASE_URL } from "../utils";

const Navbar = () => {
  const { userProfile, removeUser } = useAuthStore();
  useEffect(() => {
    userProfile;
  }, [userProfile]);
  const [loggedin, setLoggedIn] = useState(!!userProfile);
  const handleLogin = () => setLoggedIn((open) => !open);
  const form = useForm({
    initialValues: {
      searchKey: "",
    },
  });
  interface Search {
    searchKey: string;
  }
  const onSubmitSearch = async (value: Search) => {
    if (value.searchKey) {
      await router.push(`${BASE_URL}/search/${value.searchKey}`);
    }
    value.searchKey = "";
  };
  return (
    <div className="w-full justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <div className="xl:w-[1200px] flex justify-between items-center m-auto">
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
        <SearchBar form={form} onSubmitSearch={onSubmitSearch} />
        <div>
          {userProfile ? (
            <div className="flex gap-5 md:gap-10">
              <Link href="/upload">
                <Button leftIcon={<IconUpload />} variant="white">
                  Upload
                </Button>
              </Link>
              <AvatarAndName
                image={userProfile?.image}
                name={userProfile?.userName}
                id={userProfile?._id}
                hasResponsive
                size="md"
                fontSize={500}
              />
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
    </div>
  );
};

export default Navbar;
