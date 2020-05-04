import React from "react"
import Layout from "../components/layout"
import PageContent from "../components/page-content"

export default () => (
    <Layout>
        <PageContent>
            <h1 class="page-title">Contact</h1>
            <div class="container-center">
                <div class="contact">
                    <ul class="clean">
                        <li class="clean"><a class="clean" href="mailto:matthewjwhittle@gmail.com">matthewjwhittle@gmail.com</a></li>
                        <li class="clean"><a class="clean" href="https://www.linkedin.com/in/matthewjwhittle">LinkedIn</a></li>
                    </ul>
                </div>
            </div>
        </PageContent>
    </Layout>
)