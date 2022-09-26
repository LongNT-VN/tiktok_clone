import { TextInput, ActionIcon } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons";
import React from "react";

interface Search {
  searchKey: string;
}
interface IProps {
  form: UseFormReturnType<{
    searchKey: string;
  }>;
  onSubmitSearch: (value: Search) => Promise<void>;
}
const Search = ({
  form,
  onSubmitSearch,
}: IProps) => {
  return (
    <form onSubmit={form.onSubmit(onSubmitSearch)}>
      <TextInput
        icon={<IconSearch size={18} stroke={1.5} />}
        radius="xl"
        size="md"
        rightSection={
          <ActionIcon
            size={32}
            radius="xl"
            color="dark"
            variant="filled"
            type="submit"
          >
            <IconArrowRight size={18} stroke={1.5} />
          </ActionIcon>
        }
        placeholder="Search questions"
        rightSectionWidth={42}
        {...form.getInputProps("searchKey")}
        className="hidden md:block"
      />
    </form>
  );
};

export default Search;
