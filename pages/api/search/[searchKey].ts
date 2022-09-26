import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import { searchPostsQuery, searchUsersQuery } from "../../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const searchKey = req.query.searchKey;
    if (!searchKey) return res.status(400).json("Missing search key");
    const queryPost = searchPostsQuery(searchKey);
    const queryUser = searchUsersQuery(searchKey);
    const posts = await client.fetch(queryPost);
    const users = await client.fetch(queryUser);
    return res.status(200).json({ posts: posts, users: users });
  }
}
