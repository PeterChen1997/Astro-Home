import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'

import react from '@astrojs/react'
import image from '@astrojs/image'
import tailwind from '@astrojs/tailwind'
import addClasses from 'rehype-add-classes'

export default defineConfig({
  site: 'https://blog.peterchen97.cn',
  integrations: [tailwind(), sitemap(), react(), image()],
  markdown: {
    extendDefaultPlugins: true,
    rehypePlugins: [
      [
        addClasses,
        {
          h1: 'text-4xl font-bold py-4',
          h2: 'text-2xl font-bold py-4',
          h3: 'text-xl font-bold',
          h4: 'text-lg font-bold',
          h5: 'font-bold',
          h6: 'font-bold',
          img: 'border border-slate-300 dark:border-zinc-700 rounded-xl mb-6',
          p: 'mb-6',
          a: 'underline underline-offset-2 hover:text-orange-500 decoration-orange-500',
          li: 'list-disc',
          ul: 'pl-5',
          ol: 'pl-5',
          blockquote: 'mb-6 pt-6 border-l-4 border-gray-500 pl-4'
        }
      ]
    ]
  }
})
