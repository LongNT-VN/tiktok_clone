import {
  Button,
  Container,
  Group,
  Input,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IconBrandTwitter, IconMessageOff } from "@tabler/icons";
import React from "react";
import { IUser } from "../types";
import AvatarAndName from "./AvatarAndName";
import LoginDialog from "./LoginDialog";
import NoResult from "./NoResult";

interface IProps {
  isPostingComment: Boolean;
  form: UseFormReturnType<{
    comment: string;
  }>;
  onSubmitComment: (value: Comment) => Promise<void>;
  comments: IComment[];
  userProfile: IUser | undefined | null;
  loggedin: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogin: () => void;
}
interface Comment {
  comment: string;
}
interface IComment {
  comment: string;
  _key: string;
  postedBy: {
    _id: string;
    userName: string;
    image: string;
  };
}

const Comments = ({
  form,
  onSubmitComment,
  isPostingComment,
  comments = [],
  userProfile,
  loggedin,
  setLoggedIn,
  handleLogin,
}: IProps) => {
  return (
    <Stack
      justify="space-between"
      sx={{ marginTop: 20 }}
      className="grow flex flex-col"
    >
      <ScrollArea
        style={{ height: 100 }}
        type="scroll"
        className="border-y-2 border-slate-700 grow"
      >
        <Container sx={{ margin: 0 }}>
          {comments && comments?.length >= 0 ? (
            comments.map((comment, index) => (
              <Container key={index}>
                <AvatarAndName
                  image={comment?.postedBy?.image}
                  name={comment?.postedBy?.userName}
                  id={comment?.postedBy?._id}
                  size="md"
                  fontSize={500}
                  className="mt-8"
                />
                <Group grow spacing="xl" className="bg-slate-50 rounded p-3 md:mx-4 xl:mx-8 my-2">
                  <Text>{comment.comment}</Text>
                </Group>
              </Container>
            ))
          ) : (
            <NoResult text={"No comment"} Icon={IconMessageOff} />
          )}
        </Container>
      </ScrollArea>
      {userProfile ? (
        <form onSubmit={form.onSubmit(onSubmitComment)}>
          <Container className="flex">
            <Input
              icon={<IconBrandTwitter size={16} />}
              placeholder="Add comment..."
              className="w-9/12 mr-2"
              {...form.getInputProps("comment")}
            />
            <Button type="submit" disabled={!!isPostingComment}>
              {isPostingComment ? `Commenting` : `Comment`}
            </Button>
          </Container>
        </form>
      ) : (
        <>
          <Group position="center">
            <Text weight={700} onClick={handleLogin} className="cursor-pointer">
              Please log in to comment
            </Text>
          </Group>
          <LoginDialog opened={loggedin} setOpened={setLoggedIn} />
        </>
      )}
    </Stack>
  );
};

export default Comments;
