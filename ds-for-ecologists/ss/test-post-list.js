import React from "react"
import { graphql } from "gatsby"
import Layout from "../src/components/layout"
//import PostLink from "../../ss/post-list"
import ContentRow from "../src/components/content-link-row"
import { Link } from "gatsby"

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <ContentRow key={edge.node.id} post={edge.node} />)

  return (
    <Layout>
      <h1 class="page-title">Tutorials</h1>
      <div class="col">
        {Posts}
      </div>
    </Layout>
  )
}

export default IndexPage

// Filter the posts and order them by descending date
export const pageQuery = graphql`
  query {
    allMarkdownRemark(filter: {frontmatter: {category: {eq: "tutorial"}}}, 
    sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
            category
            author
          }
        }
      }
    }
  }
`