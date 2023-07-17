import React from "react";
import { useRouter } from "next/router";

export async function getAllProjectIds() {
  const projects = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    },
  ).then((res) => res.json());

  return projects.map((project: any) => ({
    params: {
      id: project.id,
    },
  }));
}

// tells Next.js what static routes (paths) of the website exist
export async function getStaticPaths() {
  // return array of possible values for id
  const paths = await getAllProjectIds();
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  // fetch necessary data based on id
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/project/${params.id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    },
  );

  const project = await response.json();
  return { props: project };
}

export default function Project() {
  return (
    <div>
      <h1>Project</h1>
    </div>
  );
}
