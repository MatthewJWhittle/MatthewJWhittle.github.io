import React from "react"
import Layout from "../components/layout"
import ContentRow from "../components/content-link-row"

export default () => (
    <Layout>
        <h1 class = "page-title">Blog</h1>
        <div class="col">
            <ContentRow/>
            <ContentRow/>
            <ContentRow/>
            <ContentRow/>
            <ContentRow/>
            <ContentRow/>
            <ContentRow/>
            <ContentRow/>
        </div>
    </Layout>
)