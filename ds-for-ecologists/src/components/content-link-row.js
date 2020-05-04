import React from "react"

const  ContentRow = ({ post }) => (
    <div class="row linkrow">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="link-description-container">
                        <div class="row">
                            <h1 class="link-title"><a class = "clean" href = {post.frontmatter.path}>{post.frontmatter.title}</a></h1>
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
                                By <a href = "/about" class = "clean highlight-text-minor">{post.frontmatter.author}</a> on {post.frontmatter.date}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div >
)
export default ContentRow