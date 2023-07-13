import React from "react";
import type { GetStaticProps } from "next";
import Layout from "@/components/Layout";
import ProjectCardRow, {
  ProjectCardRowProps,
} from "@/components/ProjectCardRow";
import prisma from "@/lib/prisma";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.project.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { feed },
    revalidate: 10,
  };
};

type Props = {
  projects: ProjectCardRowProps[];
};

const ProjectCatalog: React.FC<ProjectCardRowProps> = (props) => {
  return (
    <>
      <Layout>
        <div class="container page mx-auto  px-4">
          <div class="container">
            <h1>Projects Catalog</h1>
            <div class="flex flex-col ">
              <div>
                {props.feed.map((project: ProjectCardRowProps) => (
                  <div key={project.id} className="project p-1">
                    <ProjectCardRow project={project} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ProjectCatalog;
