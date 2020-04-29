import React from "react"
import { graphql } from "gatsby"

/* This is not pulling through leaflet maps because they need to be wrapped in some code
    the wrapping can be added using a knitr hook when knitting the markdown document
    developing solution in: "R/data-science-for-ecologists-R/knitr hook function.R"

    It is also neccessary to add relevant dependencies into html header for leaflet

*/

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <div className="blog-post-container">
      <div className="blog-post">
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      headings {
          depth
          value
        }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        category
      }
    }
  }
`