import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import { allUsersQuery } from "../../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const query = allUsersQuery();
    const users = await client.fetch(query);
    return res.status(200).json(users);
  }
}
