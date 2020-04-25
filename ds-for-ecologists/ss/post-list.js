import React from "react"
import { graphql } from "gatsby"
import PostLink from "./post-link"
import getMarkdown from "../querys/md-posts"

/* This function should receive markdown post frontmatter via getMarkdown and 
   map along the data to render a series of links to posts
   I want to use this componont in pages and dropdowns navigate the site

   Currently testing in ../pages/test-post-list.js
*/

export default Postlist = () => {
    const { data } = getMarkdown()
    const Posts = ({
        data: {
            allMarkdownRemark: { edges },
        },
    }) => {
        const Posts = edges
            .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
            .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

        return <div>{Posts}</div>
    }
}

