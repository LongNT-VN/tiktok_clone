import { randomUUID } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../../utils/client";
import { topicPostsQuery } from "../../../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { topic } = req.query;
    if (!topic) return res.status(400).json({ error: "Missing topic query" });
    const query = topicPostsQuery(topic);
    const data = await client.fetch(query);
    return res.status(200).json(data);
  }
}
