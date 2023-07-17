
export default function Calculator() {

    const username = 'testuser';
    const gradioAppUrl = new URL(process.env.NEXT_PUBLIC_GRADIO_APP_URL || "")
    gradioAppUrl.searchParams.set('username', username)

    return (
        <div>
            <h1>Bioscore calculator</h1>
            <script
                type="module"
                src="https://gradio.s3-us-west-2.amazonaws.com/3.36.1/gradio.js"
            ></script>

            <gradio-app
                data="{user: 'testuser'}"
                src={gradioAppUrl.toString()}
                theme_mode='light'
                control_page_title='true'
            />

        </div >
    )

}