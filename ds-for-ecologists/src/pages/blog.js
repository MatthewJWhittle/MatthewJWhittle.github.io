import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ContentRow from "../components/content-link-row"
import PageContent from "../components/page-content"


const BlogIndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <ContentRow key={edge.node.id} post={edge.node} />)

  return (
    <Layout>
      <PageContent>
        <div class="page-container">
          <div class="col-3 page-left">
            <h2 class="page-title highlight-text-major">Blog</h2>
          </div>
          <div class="col-9 page-right">
            {Posts}
          </div>
        </div>
      </PageContent>
    </Layout>
  )
}

export default BlogIndexPage

// Filter the posts and order them by descending date
export const pageQuery = graphql`
  query {
    allMarkdownRemark(filter: {frontmatter: {category: {eq: "blog"}}}, 
    sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 150)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
            subtitle
            category
            author
          }
        }
      }
    }
  }
`