import { Button, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { topics } from "../utils/constants";
const Discover = () => {
  const router = useRouter();
  const { topic } = router.query;
  const largeScreen = useMediaQuery("(min-width: 900px)");
  return (
    <Stack align="center">
      <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
        Popular Topics
      </p>
      <div className="flex gap-3 flex-wrap">
        {topics?.map((item) => (
          <Link href={`/?topic=${item.name}`} key={item.name}>
            <Button
              variant={largeScreen ? "outline" : "subtle"}
              radius="md"
              size="md"
              color={item.name === topic ? "pink" : "dark"}
              leftIcon={largeScreen && item.icon}
            >
              {largeScreen ? item.name : item.icon}
            </Button>
          </Link>
        ))}
      </div>
    </Stack>
  );
};

export default Discover;
