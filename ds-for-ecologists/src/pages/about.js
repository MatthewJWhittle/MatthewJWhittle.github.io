import React from "react"
import { Link } from "gatsby"
import Header from "../components/header"
import Layout from "../components/layout"
import FillerP from "../components/filler-text"

export default () => (
    <Layout>
        <h1 class="page-title">About</h1>
        <div class="container-center">
            <div class="about-blurb">
                <h5 class = "about-blurb">Hi, I'm Matthew Whittle.</h5>
                <br/>
                    <p>
                    I'm an ecologist with a passion for data science and programming. 
                    I've been writing code to analyse data since 2013 and this website is where I share the knowledge I've developed with fellow ecologists.</p>
                    <p>
                    Often resources about data analysis for ecologists focus on advanced statistical modelling. 
                    Whilst important, this can be daunting and overlooks the day to day challenges of working with data. </p>
                    <p>How do I combine multiple spreadsheets? How can I build a map of my survey results?
                    These are questions I hope to answer...
                    </p>
                </div>
        </div>
    </Layout>
)