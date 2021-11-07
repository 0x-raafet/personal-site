export async function serializeMdxContent(content, meta) {
  const { serialize } = require('next-mdx-remote/serialize')
  return serialize(content, {
    scope: meta,
    mdxOptions: {
      remarkPlugins: [
        require('@fec/remark-a11y-emoji'),
        require('remark-breaks'),
        require('remark-gfm'),
        require('remark-footnotes'),
        require('remark-external-links'),
        [require('remark-toc'), { ordered: true, tight: true, maxDepth: 3 }],
        require('remark-slug'),
        require('remark-sectionize'),
      ],
      rehypePlugins: [],
    },
  })
}
