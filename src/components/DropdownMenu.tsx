import { Menu, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { IoMenu, IoLogoGithub } from 'react-icons/io5/index.js'
import { BiRss } from 'react-icons/bi/index.js'

// 桌面端导航菜单 - 简洁版
export const MENUS = [
  {
    key: 'posts',
    path: '/posts/index.html',
    title: '文章'
  },
  {
    key: 'bookshelf',
    path: '/bookshelf/index.html',
    title: '书架'
  },
  {
    key: 'projects',
    path: '/projects/index.html',
    title: '项目'
  },
  {
    key: 'links',
    path: '/links/index.html',
    title: '友链'
  },
  {
    key: 'about',
    path: '/about/index.html',
    title: '关于'
  },
  {
    key: 'daily',
    path: 'https://daily.peterchen97.cn',
    title: '日常',
    target: '_blank'
  },
  {
    key: 'photos',
    path: 'https://peterchen97.notion.site/Public-Photos-11645019717480419bb4f12e5ed5e48a',
    title: '照片',
    target: '_blank'
  },
  {
    key: 'rss',
    path: '/rss.xml',
    title: 'RSS',
    icon: BiRss,
    hideTitle: true,
    target: '_blank'
  },
  {
    key: 'github',
    path: 'https://github.com/PeterChen1997',
    title: 'Github',
    icon: IoLogoGithub,
    hideTitle: true,
    target: '_blank'
  }
]

// 移动端菜单分组
const MOBILE_MENUS = [
  { key: 'posts', path: '/posts/index.html', title: '文章' },
  { key: 'bookshelf', path: '/bookshelf/index.html', title: '书架' },
  { key: 'projects', path: '/projects/index.html', title: '项目' },
  { key: 'links', path: '/links/index.html', title: '友链' },
  { key: 'about', path: '/about/index.html', title: '关于' },
  { key: 'daily', path: 'https://daily.peterchen97.cn', title: '日常', target: '_blank' },
  { key: 'photos', path: 'https://peterchen97.notion.site/Public-Photos-11645019717480419bb4f12e5ed5e48a', title: '照片', target: '_blank' },
  { key: 'rss', path: '/rss.xml', title: 'RSS', target: '_blank' },
  { key: 'github', path: 'https://github.com/PeterChen1997', title: 'GitHub', target: '_blank' }
]

export default function DropdownMenu({ open }: { open?: boolean }) {
  return (
    <Menu
      as="div"
      className="relative inline-block text-left block md:hidden"
      __demoMode={open}
    >
      <div>
        <Menu.Button
          className="inline-flex justify-center rounded-lg p-2 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          aria-label="menu"
        >
          <IoMenu className="h-5 w-5" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none overflow-hidden">
          <div className="py-1">
            {MOBILE_MENUS.map(menu => (
              <Menu.Item key={menu.key}>
                {({ active }) => (
                  <a
                    href={menu.path}
                    target={menu.target}
                    className={`
                      flex items-center justify-between px-4 py-2.5 text-sm transition-colors
                      ${active 
                        ? 'bg-black/5 dark:bg-white/10' 
                        : ''
                      }
                      text-zinc-700 dark:text-zinc-200
                    `}
                  >
                    <span>{menu.title}</span>
                    {menu.target === '_blank' && (
                      <svg className="w-3 h-3 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    )}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
