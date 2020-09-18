import React from "react"
import Layout from "../components/layout"
import SiteBanner from "../components/site-banner"
import PageContent from "../components/page-content"
import FillerP from "../components/filler-text"
import { graphql } from "gatsby"
import MissionStatement from "../components/mission-statement"
import NavButtonBig from "../components/nav-button-big"

export default () => (
    <div>
        <Layout>
            <SiteBanner />
            <PageContent>
                <p><MissionStatement /></p>
                <div class="row">
                    <div class="col-6">
                        <p><FillerP /><FillerP /><FillerP /><FillerP /></p>
                        <div class="row">
                            <div class="col-sm">
                                <NavButtonBig linkTo="/blog" displayText="Blog" />
                            </div>
                            <div class="col-sm">
                                <NavButtonBig linkTo="/tutorials" displayText="Tutorials" />
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="container-index-img"><img class="index-img" src={require("../images/mission-beach.jpg")}></img></div>
                    </div>
                </div>
            </PageContent>
        </Layout>
    </div>
)