// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { updateDatabase, initializeNotionClient } from '@lib/notion';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if(req.method === 'POST') {
    const token = req.body.token;
    const databaseId = req.body.databaseId;
    await initializeNotionClient(token);
    await updateDatabase(databaseId);
  }

  res.status(200).json({message: "success"});
}
