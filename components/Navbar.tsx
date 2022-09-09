import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { createOrGetUser } from "../utils";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  googleLogout,
} from "@react-oauth/google";
import useAuthStore from "../store/authStore";
import { Avatar, Button, Text } from "@mantine/core";
import { IconLogout, IconUpload } from "@tabler/icons";

const Navbar = () => {
  const onFailure = (response: any) => {
    console.log("FAILED", response);
  };
  const { userProfile, addUser, removeUser } = useAuthStore();
  const [userProfileInfo, setuserProfile] = useState(userProfile);
  useEffect(() => {
    setuserProfile(userProfile);
  }, [userProfile]);
  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
    >
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
          {userProfileInfo ? (
            <div className="flex gap-5 md:gap-10">
              <Link href="/upload">
                <Button leftIcon={<IconUpload />} variant="white">
                  Upload
                </Button>
              </Link>
              <div className="flex gap-3 md:gap-5 items-center">
                {userProfileInfo.image && (
                  <Avatar
                    src={`${userProfileInfo.image}`}
                    className="cursor-pointer"
                    alt="it's me"
                  />
                )}
                {userProfileInfo.userName && (
                  <Text size="md"> {userProfileInfo.userName}</Text>
                )}
              </div>
              <Button
                leftIcon={<IconLogout />}
                variant="white"
                color="red"
                onClick={() => {
                  googleLogout();
                  removeUser();
                }}
              />
            </div>
          ) : (
            <GoogleLogin
              onSuccess={(response) => createOrGetUser(response, addUser)}
              onError={() => {}}
            />
          )}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Navbar;
