import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import { singleUserQuery } from "../../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: "Missing user id" });
    const query = singleUserQuery(id);
    const data = await client.fetch(query);
    return res.status(200).json(data[0]);
  }
}
