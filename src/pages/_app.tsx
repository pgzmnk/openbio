import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Context from "@/context/context";
import Layout from "@/components/Layout";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Context>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Context>
    </SessionProvider>
  );
}
