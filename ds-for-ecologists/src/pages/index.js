import React from "react"
import Layout from "../components/layout"
import Header from "../components/site-title"
import Fillerp from "../components/filler-text"
import SiteTitle from "../components/site-title"

export default () => (
    <div>
        <Layout>
            <div class="row title-banner">
                <h1 class="title-banner"><SiteTitle /></h1>
                <p>Data science tutorials and blogging with a focus on ecology</p>
            </div>
            <Fillerp /><Fillerp /><Fillerp /><Fillerp /><Fillerp /><Fillerp /><Fillerp /><Fillerp /><Fillerp />
        </Layout>
    </div>
)