import { useSession } from "next-auth/react";

export default function Calculator() {
  const { data: session } = useSession();
  const username = session?.user?.email || "default";
  const gradioAppUrl = new URL(process.env.NEXT_PUBLIC_GRADIO_APP_URL || "");
  gradioAppUrl.searchParams.set("username", username);

  return (
    <div class="flex-vertical h-screen">
      <h1>Bioscore calculator</h1>
      {/* <script
        type="module"
        src="https://gradio.s3-us-west-2.amazonaws.com/3.36.1/gradio.js"
      ></script>

      <gradio-app
        // src={gradioAppUrl.toString()}
        src={gradioAppUrl2}
        theme_mode="light"
        control_page_title="true"
      /> */}

      <iframe src={gradioAppUrl.toString()} width="100%" height="100%"></iframe>
    </div>
  );
}
