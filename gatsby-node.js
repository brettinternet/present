const path = require(`path`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const noteTemplate = path.resolve(`src/templates/note.tsx`)

  const { data, errors } = await graphql(`
    {
      site {
        siteMetadata {
          presentationsDirname
        }
      }
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            fileAbsolutePath
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)

  if (errors) {
    console.log(errors)
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  data.allMarkdownRemark.edges.forEach(({ node }) => {
    let path = node.frontmatter.path || undefined
    if (!path) {
      path = makePath(
        node.fileAbsolutePath,
        data.site.siteMetadata.presentationsDirname
      )
    }

    createPage({
      path: addTrailingSlash(path),
      component: noteTemplate,
      context: {
        filePath: node.fileAbsolutePath,
      },
    })
  })
}

function makePath(fileAbsolutePath, noteDirname) {
  const absPathArr = fileAbsolutePath.split("/")
  const relPathArr = absPathArr.slice(absPathArr.indexOf(noteDirname) + 1)
  return removeExtension(relPathArr.join("/"))
}

function removeExtension(str) {
  return (
    str &&
    str
      .split(".")
      .slice(0, -1)
      .join(".")
  )
}

function addTrailingSlash(str) {
  return str.slice(-1) === "/" ? str : str + "/"
}

/**
 * Make `path` nullable
 * @docs https://www.gatsbyjs.org/docs/schema-customization/#nested-types
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      path: [String!]
      description: [String!]
    }
  `
  createTypes(typeDefs)
}
