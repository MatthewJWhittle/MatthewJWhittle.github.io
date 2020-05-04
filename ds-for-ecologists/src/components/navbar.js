import React from "react"
import SiteNameShort from "../components/site-name-abbr"

export default () => (
        <div class="col w-100">
            <div class="row">
                <div class="sticky">
                    <div class="background-white">
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
        </div>
)