import React from "react";

export function getAllProjectIds() {
  return [
    {
      params: {
        id: "05db09ff-dcb3-4cb2-ac9b-f9337aaa6d35",
      },
    },
    {
      params: {
        id: "bf3101d2-a8b4-499b-b692-f2f3c52ee498",
      },
    },
  ];
}

export async function getStaticPaths() {
  // return array of possible values for id
  const paths = getAllProjectIds();
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // fetch necessary data based on id
  const project = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/project/${params.id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    },
  );
}

export default function Project() {
  return (
    <div>
      <h1>Project</h1>
    </div>
  );
}
