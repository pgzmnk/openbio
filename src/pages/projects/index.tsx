import React from "react";
import type { GetStaticProps } from "next";
import Layout from "@/components/Layout";
import Post, { PostProps } from "@/components/Post";
import prisma from "@/lib/prisma";

export const getStaticProps: GetStaticProps = async () => {
    const feed = await prisma.project.findMany({
        where: { published: true },
        include: {
            author: {
                select: { name: true },
            },
        },
    })
    return {
        props: { feed },
        revalidate: 10,
    }
};

type Props = {
    feed: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
    console.log('!', process.env.NEXTAUTH_URL)

    return (
        <>
            <Layout>
                <div class="container page mx-auto  px-4">
                    <div class="container">
                        <h1>Create New Project</h1>
                        <div class="flex flex-col ">
                            <input type="email" class="form-input px-4 py-3 rounded-full" />
                            <div class="flex flex-row">
                                <div>04</div>
                                <div>02</div>
                                <div>03</div>
                            </div>
                            <div class="flex flex-row">
                                <div>01</div>
                                <div>02</div>
                                <div>03</div>
                            </div>
                            <div class="flex flex-row">
                                <div>01</div>
                                <div>02</div>
                                <div>03</div>
                            </div>
                            <div>01</div>
                            <div>02</div>
                            <div>03</div>
                        </div>
                        <main>
                            {props.feed.map((post) => (
                                <div key={post.id} className="post">
                                    {/* <Post post={post} /> */}
                                    {post.geometry}
                                </div>
                            ))}
                        </main>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Blog;
