const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPost = path.resolve(`./src/templates/blog-post.tsx`)
  const result = await graphql(
    `
      {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `,
  )

  if (result.errors) {
    throw result.errors
  }

  const posts = result.data.allMarkdownRemark.edges
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node
    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  const { books } = require('./src/content/books/books.json')

  books.forEach((singleBook) => {
    const { title, image } = singleBook

    const { name: imageName, ext } = path.parse(image)
    const absolutePath = path.resolve(__dirname, './src/content/books/', image)
    const imageData = { name: imageName, ext, absolutePath, extension: ext.substring(1) }
    const imageNode = {
      ...imageData,
      id: createNodeId(`book-cover-${imageName}`),
      children: [],
      internal: {
        type: 'BookImage',
        contentDigest: createContentDigest(imageData),
      },
    }
    actions.createNode(imageNode)
    const node = {
      ...singleBook,
      id: createNodeId(title),
      image: imageNode,
      internal: {
        type: 'Book',
        contentDigest: createContentDigest(singleBook),
      },
    }
    actions.createNode(node)
  })
}
