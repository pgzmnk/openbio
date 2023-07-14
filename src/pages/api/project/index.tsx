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
    // con.all('SHOW TABLES;', function (err, res) {
    //     if (err) {
    //         throw err;
    //     }
    //     console.log(res)
    // });

    if (req.method === "POST") {
        try {
            const data = {
                name: name,
                description: description,
                geometry: geometry,
                published: true,
            };
            con.all(
                `INSERT INTO project(id, name, description, geometry, published) 
        VALUES ('${uuidv4()}', '${data.name}', '${data.description}', '${data.geometry
                }', ${data.published});
            `,
                function (err, response) {
                    if (err) {
                        throw err;
                    }
                    console.log('! response', response);
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
        res.status(200).json({ name: "", description: "", geometry: "" });
    }
}
