import React from "react"
import navbarStyles from "./navbar-styles.css"
import SiteNameShort from "../components/site-name-abbr"
export default () => (
    <div class="row pt-4">
        <div class="col w-100">
            <div class="sticky">
                <div class="topnav">
                    <div class="navlink-container">
                        <a class="header" href="/"><SiteNameShort /></a>
                        <a class="header" href="/blog">Blog</a>
                        <a class="header" href="/tutorials">Tutorials</a>
                        <a class="header" href="/contact">Contact</a>
                        <a class="header" href="/about">About</a>
                        <a class="header" href="https://www.linkedin.com/in/matthewjwhittle/">LinkedIn</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
)