// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest, // An instance of http.IncomingMessage, plus some pre-built middlewares
  res: NextApiResponse<Data>, // An instance of http.ServerResponse, plus some helper functions
) {
  console.log("req.cookies", req.cookies);
  console.log("req.query", req.query);

  if (req.method === "POST") {
    // Process a POST request
    console.log("POST");
  } else {
    res.status(200).json({ name: "John Doe" });
  }
}
