import { Client } from "@microsoft/microsoft-graph-client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req: req, secret: secret });

  console.log(token);
  if (token) {
    const accessToken = token.access_token;

    const client = Client.init({
      authProvider: (done) => done(null, accessToken as string),
    });

    try {
      const presence = await client.api(`/me/presence`).get();
      res.status(200).json(presence);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }
};
