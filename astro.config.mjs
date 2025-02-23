import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import addClasses from 'rehype-add-classes'
import compress from 'astro-compress'
import { astroImageTools } from 'astro-imagetools'

export default defineConfig({
  site: 'https://blog.peterchen97.cn',
  integrations: [
    tailwind(),
    sitemap(),
    react(),
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
    rehypePlugins: [
      [
        addClasses,
        {
          code: 'bg-gray-200 dark:bg-gray-800 p-1 rounded-md text-red-500 mx-1',
          h1: 'text-3xl font-bold py-4',
          h2: 'text-2xl font-bold py-4',
          h3: 'text-xl font-bold py-3',
          h4: 'text-lg font-bold py-2',
          h5: 'font-bold py-1',
          h6: 'font-bold',
          img: 'border border-slate-300 dark:border-zinc-700 rounded-xl mb-6 max-h-[500px] mx-auto',
          p: 'leading-8 tracking-[.1em]',
          a: 'underline underline-offset-2 hover:text-orange-500 decoration-orange-500',
          li: 'leading-7 text-justify',
          ul: 'pl-5',
          ol: 'pl-5',
          blockquote:
            'my-1 leading-7 border-l-4 border-gray-500 pl-4 text-justify',
          strong: 'dark:text-white',
          table: 'divide-y divide-gray-200',
          th: 'px-2 py-3 text-left  font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider bg-gray-50 dark:bg-gray-600',
          td: 'px-2 py-4 h-10'
        }
      ]
    ]
  }
})
