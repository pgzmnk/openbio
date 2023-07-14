import type { NextApiRequest, NextApiResponse } from "next";
import { FormData, FormProps, ApiErrorResponse } from "@/interfaces";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FormData | ApiErrorResponse>,
) {
  const { name, description, geometry } = req.body;
  const session = await getSession({ req }); // make endpoint private

  if (req.method === "POST") {
    try {
      const result = await prisma.project.create({
        data: {
          name: name,
          description: description,
          geometry: geometry,
          published: true,
        },
      });
      res.status(200).json({
        name: result.name,
        description: result.description,
        geometry: result.geometry,
      });
    } catch (error) {
      res.status(400).send({ message: "Something went wrong." });
    }
  } else {
    res.status(200).json({ name: "", description: "", geometry: "" });
  }
}
