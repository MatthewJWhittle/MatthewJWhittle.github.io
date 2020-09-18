import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const GetBlogPosts = () => {
    const { posts } = useStaticQuery(
        graphql`
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
)
return(posts)
} 