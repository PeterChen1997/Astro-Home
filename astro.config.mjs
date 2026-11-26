import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'
import compress from 'astro-compress'
import { astroImageTools } from 'astro-imagetools'
import rehypeWrapTables from './src/libs/rehypeWrapTables.js'

export default defineConfig({
  site: 'https://blog.peterchen97.cn',
  integrations: [
    tailwind(),
    sitemap(),
    react(),
    mdx(),
    compress({
      Image: false
    }),
    astroImageTools
    // NetlifyCMS({
    //   config: {
    //     backend: {
    //       name: 'git-gateway',
    //       branch: 'master'
    //     },
    //     collections: [
    //       {
    //         name: 'posts',
    //         label: 'Blog Posts',
    //         folder: 'src/pages/posts',
    //         create: true,
    //         delete: true,
    //         fields: [
    //           { name: 'title', widget: 'string', label: 'Post Title' },
    //           {
    //             label: 'Layout',
    //             name: 'layout',
    //             widget: 'hidden',
    //             default: '../../layouts/BlogPost.astro'
    //           },
    //           { name: 'body', widget: 'markdown', label: 'Post Body' },
    //           { name: 'pubDate', widget: 'datetime', label: 'Publish Date' },
    //           { name: 'heroImage', widget: 'image', label: 'Featured Image' }
    //         ]
    //       }
    //     ]
    //   }
    // })
  ],
  // build: {
  //   assetsPrefix: 'https://cdn.peterchen97.cn'
  // },
  markdown: {
    extendDefaultPlugins: true,
    // 正文排版统一在 src/styles/global.css 的 .article 下维护
    rehypePlugins: [
      rehypeWrapTables
    ]
  }
})
