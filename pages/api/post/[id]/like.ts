import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../../utils/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { id }: any = req.query;
    const { userId, like } = req.body;
    const data = like
      ? await client
          .patch(id)
          .setIfMissing({ likes: [] })
          .append("likes", [
            {
              _ref: userId,
            },
          ])
          .commit({ autoGenerateArrayKeys: true })
      : await client
          .patch(id)
          .unset([`likes[_ref=="${userId}"]`])
          .commit();

    res.status(200).json(data);
  }
}
