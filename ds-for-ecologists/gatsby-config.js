/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `Data Science for Ecologists`,
    url: `https://matthewjwhittle.github.io/`,
    description: `Tutorials and blogs about data science for consultant ecologists`,
    twitterUsername: '@matthewjwhittle',
    image: 'src/images/IMG_3031.jpg',
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/markdown-pages`,
        name: `markdown-pages`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-react-helmet`,
  ]
}
