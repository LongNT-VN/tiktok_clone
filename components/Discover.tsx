import { Button, Container, Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { topics } from "../utils/constants";
const Discover = () => {
  const router = useRouter();
  const { topic } = router.query;
  const largeScreen = useMediaQuery("(min-width: 1280px)");
  return (
    <Stack align={largeScreen ? "left" : "center"}>
      <Text className="border-t-2 border-slate-200 w-9/12 m-auto mb-2"></Text>
      <Text weight={700} className="hidden xl:block">
        Popular Topics
      </Text>
      <Container
        className={`flex gap-3 flex-wrap ${!largeScreen && "justify-around"
          } px-0 m-0`}
      >
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
      </Container>
      <Text className="border-b-2  border-slate-200 w-9/12 m-auto mt-2"></Text>
    </Stack>
  );
};

export default Discover;
