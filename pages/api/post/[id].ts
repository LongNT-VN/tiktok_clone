import { randomUUID } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import { postDetailQuery } from "../../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;
    const query = postDetailQuery(`${id}`);
    const data = await client.fetch(query);
    return res.status(200).json(data[0]);
  }
  if (req.method === "PUT") {
    const { id }: any = req.query;
    const comment = req.body;
    const data = await client
      .patch(id)
      .setIfMissing({ comments: [] })
      .append("comments", [comment])
      .commit({ autoGenerateArrayKeys: true });
    return res.status(200).json(data);
  }
}
