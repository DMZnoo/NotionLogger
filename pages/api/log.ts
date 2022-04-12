// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { insertLogIntoBlock } from '@lib/notion';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if(req.method === 'POST') {
    const data = req.body.data;
    await insertLogIntoBlock(data);
  }

  res.status(200).json({message: "success"});
}
