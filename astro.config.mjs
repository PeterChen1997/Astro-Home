import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import react from '@astrojs/react'
import image from '@astrojs/image'
import tailwind from '@astrojs/tailwind'
import addClasses from 'rehype-add-classes'
import compress from 'astro-compress'

export default defineConfig({
  site: 'https://blog.peterchen97.cn',
  integrations: [
    tailwind(),
    sitemap(),
    react(),
    image({
      serviceEntryPoint: '@astrojs/image/sharp'
    }),
    compress()
  ],
  markdown: {
    extendDefaultPlugins: true,
    rehypePlugins: [
      [
        addClasses,
        {
          h1: 'text-3xl font-bold py-4',
          h2: 'text-2xl font-bold py-4',
          h3: 'text-xl font-bold py-3',
          h4: 'text-lg font-bold py-2',
          h5: 'font-bold py-1',
          h6: 'font-bold',
          img: 'border border-slate-300 dark:border-zinc-700 rounded-xl mb-6 max-h-[500px] mx-auto',
          p: 'mb-3 pb-1 leading-8 text-justify',
          a: 'underline underline-offset-2 hover:text-orange-500 decoration-orange-500',
          li: 'list-disc leading-8 text-justify',
          ul: 'pl-5',
          ol: 'pl-5',
          blockquote:
            'leading-8 mb-6 pt-6 border-l-4 border-gray-500 pl-4 text-justify'
        }
      ]
    ]
  }
})
