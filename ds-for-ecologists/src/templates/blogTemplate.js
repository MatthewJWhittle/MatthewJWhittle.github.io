import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PageContent from "../components/page-content"
import Img from "gatsby-image"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html, headings } = markdownRemark
  //const {ImageSharpFluid} = frontmatter.featuredImage.childImageSharp.fluid

  return (
    <div className="blog-post-container">
      <div className="blog-post">
        <Layout>
          <PageContent>
            <div class="row">
              <div class="blog-post-title">
                <h1 class="blog-header-title">{frontmatter.title}</h1>
                <p class="blog-header-subtitle">{frontmatter.subtitle}</p>
                <p class="blog-header-details">By <a href="/about" class="clean">{frontmatter.author}</a> on {frontmatter.date}</p>
              </div>
            </div>
            <div class="">
              <div class="feature-image img-fluid">
                <Img fluid={frontmatter.featuredImage.childImageSharp.fluid} alt="" />
              </div>
            </div>
            <div class="row">
              <div
                className="blog-post-content"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          </PageContent>
        <div class="fade-container"><img class="bottom-fade" src={require("../images/bottom-white-fade.png")} /></div>
        </Layout>
    </div>
    </div >
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
        subtitle
        category
        author
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
    }
    }
  }
`