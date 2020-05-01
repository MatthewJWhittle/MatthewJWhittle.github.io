import Gatsby from "gatsby"
import React from "react"
import Fillerp from "./filler-text"

const  ContentRow = ({ post }) => (
    <div class="row linkrow">
        <div class="container">
            <div class="row pt-4">
                <div class="col-4 link-image-container">
                    <img src={require("../images/IMG_3031.jpg")} class="linkrow" ></img>
                </div>
                <div class="col-8">
                    <div class="link-description-container">
                        <div class="row">
                            <p class="link-category">{post.frontmatter.category}</p>
                        </div>
                        <div class="row">
                            <h1 class="link-title"><a class = "link-title" href = {post.frontmatter.path}>{post.frontmatter.title}</a></h1>
                        </div>
                        <div class="row">
                            <div>
                                <p class="link-description">
                                    {post.excerpt}
                                </p>
                            </div>
                        </div>
                        <div class="row">
                            <p class="link-details">
                                By {post.frontmatter.author} on {post.frontmatter.date}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div >
)
export default ContentRow