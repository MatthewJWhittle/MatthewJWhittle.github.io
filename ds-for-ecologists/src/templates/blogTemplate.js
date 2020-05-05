import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PageContent from "../components/page-content"
import TableofContents from "../components/blog-toc"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html, headings } = markdownRemark
  return (
    <div className="blog-post-container">
      <div className="blog-post">
        <Layout>
          <PageContent>
            <div class="row">

              <div class="col-3">
                <TableofContents headings={headings} path={frontmatter.path} />
              </div>
              <div class="col-9">
                <div
                  className="blog-post-content"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              </div>
            </div>
          </PageContent>
        </Layout>
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