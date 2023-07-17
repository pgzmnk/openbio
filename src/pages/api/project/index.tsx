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
  const { name, description, geometry, authorId } = req.body;
  // const session = await getSession({ req }); // make endpoint private
  var db = new duckdb.Database(
    `md:?motherduck_token=${process.env.NEXT_PUBLIC_MOTHERDUCK_TOKEN}`,
  );
  var con = db.connect();
  con.run("USE climatebase;");
  if (req.method === "POST") {
    try {
      const data = {
        name: name,
        description: description,
        geometry: geometry,
        published: true,
        authorId: authorId
      };
      con.all(
        `INSERT INTO project(id, name, description, geometry, published, authorId) 
        VALUES ('${uuidv4()}', '${data.name}', '${data.description}', '${data.geometry
        }', ${data.published}, '${data.authorId}');
            `,
        function (err, response) {
          if (err) {
            console.log("Error: writing project to db failed.");
            console.log(err);
            throw err;
          }
        },
      );

      // const result = await prisma.project.create({
      //     data
      // });
      res.status(200).send({ message: "Success." });
    } catch (error) {
      res.status(400).send({ message: "Something went wrong." });
    }
  } else {
    res.status(400).send({ message: "Method not allowed." });
  }
}
