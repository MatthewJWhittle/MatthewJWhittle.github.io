import React from "react"
import { StaticQuery, graphql } from "gatsby"

export default () => (
  <StaticQuery
    query={graphql`
      query HeadingAbbrQuery {
        site {
          siteMetadata {
            titleabbr
          }
        }
      }
    `}
    render={data => (
      <>
        {data.site.siteMetadata.titleabbr}
      </>
    )}
  />
)