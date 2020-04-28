import React from "react"
import Layout from "../components/layout"
import Header from "../components/site-title"
import Fillerp from "../components/filler-text"
import SiteTitle from "../components/site-title"

export default () => (
    <div>
        <Layout>
            <div class="row">
                <div class="banner-container">
                    <img src={require("../images/Bombus pascorum-9352.png")} class="title-banner" />
                    <div class="title-banner-overlay">
                        <h1 class="title-banner-overlay"><SiteTitle /></h1>
                    </div>
                </div>
            </div>
        </Layout>
    </div>
)