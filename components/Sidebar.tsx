import React, { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/router";
import Discover from "./Discover";
import SuggestAccounts from "./SuggestAccounts";
import Footer from "./Footer";
import { ActionIcon } from "@mantine/core";
const Sidebar = () => {
  const { pathname } = useRouter();
  return (
    <div>
      <div className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3 ">
        <div className="xl:border-b-2 border-gray-200 xl:pb-4 flex justify-center xl:justify-start content-center">
          <Link href="/">
            <ActionIcon size="lg">
              <AiFillHome color={pathname === "/" ? "pink" : "dark"} />
            </ActionIcon>
          </Link>
          <p className="my-auto text-gray-500 font-semibold hidden xl:block">
            For you
          </p>
        </div>
        <Discover />
        <SuggestAccounts />
        <Footer />
      </div>
    </div>
  );
};

export default Sidebar;
