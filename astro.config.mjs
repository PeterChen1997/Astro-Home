import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import addClasses from 'rehype-add-classes'
import compress from 'astro-compress'
import { astroImageTools } from 'astro-imagetools'
import NetlifyCMS from 'astro-netlify-cms'

export default defineConfig({
  site: 'https://blog.peterchen97.cn',
  integrations: [
    tailwind(),
    sitemap(),
    react(),
    compress({
      Image: false
    }),
    astroImageTools,
    NetlifyCMS({
      config: {
        backend: {
          name: 'git-gateway',
          branch: 'master'
        },
        collections: [
          {
            name: 'posts',
            label: 'Blog Posts',
            folder: 'src/pages/posts',
            create: true,
            delete: true,
            fields: [
              { name: 'title', widget: 'string', label: 'Post Title' },
              {
                label: 'Layout',
                name: 'layout',
                widget: 'hidden',
                default: '../../layouts/BlogPost.astro'
              },
              { name: 'body', widget: 'markdown', label: 'Post Body' },
              { name: 'pubDate', widget: 'datetime', label: 'Publish Date' },
              { name: 'heroImage', widget: 'image', label: 'Featured Image' }
            ]
          }
        ]
      }
    })
  ],
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
          p: 'mb-3 pb-1 leading-7 text-justify tracking-wide	',
          a: 'underline underline-offset-2 hover:text-orange-500 decoration-orange-500',
          li: 'leading-7 text-justify',
          ul: 'pl-5',
          ol: 'pl-5',
          blockquote:
            'leading-7 mb-6 pt-6 border-l-4 border-gray-500 pl-4 text-justify'
        }
      ]
    ]
  }
})
