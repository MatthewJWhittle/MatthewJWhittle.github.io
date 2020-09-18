import React from "react"
import Layout from "../components/layout"
import SiteBanner from "../components/site-banner"
import PageContent from "../components/page-content"
import {graphql} from "gatsby"
import GetBlogPosts from "../querys/blog-posts"
import ContentRow from "../components/content-link-row"


const TutorialIndexPage = ({
    
    posts: {
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
              <h2 class="page-title highlight-text-major">Tutorials</h2>
            </div>
            <div class="col-9 page-right">
              {Posts}
            </div>
          </div>
        </PageContent>
      </Layout>
    )
  }
