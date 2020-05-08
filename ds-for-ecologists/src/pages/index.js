import React from "react"
import Layout from "../components/layout"
import SiteBanner from "../components/site-banner"
import PageContent from "../components/page-content"
import FillerP from "../components/filler-text"

export default () => (
    <div>
        <Layout>
            <SiteBanner/>
            <PageContent>
                <p><FillerP/><FillerP/><FillerP/><FillerP/></p>
            </PageContent>
        </Layout>
    </div>
)