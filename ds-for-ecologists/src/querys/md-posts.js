import React from "react"
import { useStaticQuery, graphql } from "gatsby"

/* I am attempting to define a  function to query data using graphql.
   The function should then be used in ../pages/test-page.js to insert data
   and into the function which renders a compenent containing a list of links to queried posts*/

const getMarkdown = () => {
    const data = useStaticQuery(
      graphql`
      query allMarkdownRemark {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
          }
        }
      }
    }
    `
    )
    return data
  }