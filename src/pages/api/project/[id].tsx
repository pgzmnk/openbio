import type { NextApiRequest, NextApiResponse } from "next";
import { FormDataType, FormProps, ApiMessageResponse } from "@/interfaces";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";
import duckdb from "duckdb";
import { v4 as uuidv4 } from "uuid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FormDataType | ApiMessageResponse>,
) {
  const { name, description, geometry } = req.body;
  // const session = await getSession({ req }); // make endpoint private
  var db = new duckdb.Database(
    `md:?motherduck_token=${process.env.NEXT_PUBLIC_MOTHERDUCK_TOKEN}`,
  );
  var con = db.connect();
  con.run("USE climatebase;");

  if (req.method === "GET") {
    try {
      con.all(
        `FROM project WHERE id = '${req.query.id}'`,
        function (err, response) {
          if (err) {
            throw err;
          }
          if (response.length === 0) {
            res.status(404).json({ message: "Project not found." });
          } else {
            res.status(200).json({ ...(response[0] as FormDataType) });
          }
        },
      );
    } catch (error) {
      res.status(400).send({ message: "Something went wrong." });
    }
  } else if (req.method === "DELETE") {
    try {
      con.all(
        `DELETE FROM project WHERE id = '${req.query.id}'`,
        function (err, response) {
          if (err) {
            throw err;
          }
          if (response.length === 0) {
            res.status(404).json({ message: "Project not found." });
          } else {
            res.status(200).json({ message: "Project deleted successfully." });
          }
        },
      );
    } catch (error) {
      res.status(400).send({ message: "Something went wrong." });
    }
  } else {
    res.status(400).send({ message: "Method not allowed." });
  }
}
