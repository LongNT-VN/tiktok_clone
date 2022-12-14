import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import { allPostsQuery } from "../../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const query = allPostsQuery();
    const data = await client.fetch(query);
    return res.status(200).json(data);
  }
  if (req.method === "POST") {
    const post = req.body;
    await client.create(post);
    return res.status(200).json({ info: "Video created" });
  }
}
