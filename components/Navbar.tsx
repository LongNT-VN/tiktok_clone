import Image from "next/image";
import Link from "next/link";
import React from "react";
import { createOrGetUser } from "../utils";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
const Navbar = () => {
  const onFailure = (response: any) => {
    console.log("FAILED", response);
  };
  const user = false;
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
          {user ? (
            <div>Logged In</div>
          ) : (
            <GoogleLogin
              onSuccess={(response) => createOrGetUser(response)}
              onError={() => {}}
            />
          )}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Navbar;
