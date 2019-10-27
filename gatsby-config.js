const pkg = require("./package.json")

const presentationsDirname = "presentations"

module.exports = {
  pathPrefix: `/${pkg.name}`,
  siteMetadata: {
    title: `Present`,
    description: pkg.description,
    author: {
      name: pkg.author,
      shortName: "Brett",
      homePage: "https://brettinternet.com",
      socialHandles: {
        twitter: "@brettinternet",
      },
    },
    fontLink:
      "https://fonts.googleapis.com/css?family=Fira+Mono|Raleway&display=swap",
    presentationsDirname,
    revealjsConfig: {},
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        gfm: true,
        plugins: [
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          /**
           * Create graphs http://viz-js.com/
           */
          `gatsby-remark-graphviz`,
          `gatsby-remark-prismjs`,
          `gatsby-remark-katex`,
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "markdown",
        path: `${__dirname}/${presentationsDirname}`,
      },
    },
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: `${__dirname}/src/templates/Layout`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: pkg.name,
        short_name: `starter`,
        start_url: `/`,
        background_color: `lightgray`,
        theme_color: `black`,
        display: `minimal-ui`,
        icon: `${__dirname}/src/assets/images/logo.png`,
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        src: `${__dirname}/src`,
        static: `${__dirname}/src/static`,
        templates: `${__dirname}/src/templates`,
        pages: `${__dirname}/src/pages`,
        components: `${__dirname}/src/components`,
        assets: `${__dirname}/src/assets`,
        utils: `${__dirname}/src/utils`,
      },
    },
  ],
}
