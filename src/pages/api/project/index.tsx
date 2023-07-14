import type { NextApiRequest, NextApiResponse } from "next";
import { FormData, FormProps, ApiErrorResponse } from "@/interfaces";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";
import duckdb from "duckdb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<FormData | ApiErrorResponse>,
) {
    const { name, description, geometry } = req.body;
    const session = await getSession({ req }); // make endpoint private
    var db = new duckdb.Database(`md:?motherduck_token=${process.env.NEXT_PUBLIC_MOTHERDUCK_TOKEN}`);
    db.all('SELECT 42 AS fortytwo', function (err, res) {
        if (err) {
            throw err;
        }
        console.log(res[0].fortytwo)
    });


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
