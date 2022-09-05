import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../utils/client";
import { allPostsQuery } from "../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const user = req.body;
    await client.createIfNotExists(user);
    return res.status(200).json("Login success");
  }
}
