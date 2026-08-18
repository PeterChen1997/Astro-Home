/**
 * Wrap Markdown tables so they can keep their native table layout while the
 * wrapper handles horizontal scrolling on narrow screens.
 */
export default function rehypeWrapTables() {
  return tree => {
    wrapTables(tree)
  }
}

function wrapTables(node) {
  if (!Array.isArray(node.children)) return

  node.children = node.children.map(child => {
    if (child.type === 'element' && child.tagName === 'table') {
      return {
        type: 'element',
        tagName: 'div',
        properties: { className: ['table-wrapper'] },
        children: [child]
      }
    }

    wrapTables(child)
    return child
  })
}
