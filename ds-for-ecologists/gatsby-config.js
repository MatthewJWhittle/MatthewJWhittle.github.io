
/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `Data Science for Ecologists`,
    titleabbr: `DS for Ecologists`,
    url: `https://matthewjwhittle.github.io/`,
    description: `Tutorials and blogs about data science for consultant ecologists`,
    twitterUsername: '@matthewjwhittle',
    image: 'src/images/IMG_3031.jpg',
  },
  plugins: [
    // Source filesystem
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/markdown-pages`,
        name: `markdown-pages`,
      },
    },
    // Render markdown
    `gatsby-transformer-remark`,
    // SEO
    `gatsby-plugin-react-helmet`,
    // Source and render inline images:
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-react-leaflet',
      options: {
        linkStyles: true // (default: true) Enable/disable loading stylesheets via CDN
      }
    },
  ]
}